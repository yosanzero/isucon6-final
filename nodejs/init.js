'use strict';
const path = require('path');
const fs = require('fs');
const React = require('react');
const server = require('react-dom/server');
const Canvas = require('./components/Canvas');
const mysql = require('promise-mysql');

const getDBH = () => {
  const host = process.env.MYSQL_HOST || 'localhost';
  const port = process.env.MYSQL_PORT || '3306';
  const user = process.env.MYSQL_USER || 'root';
  const pass = process.env.MYSQL_PASS || '';
  const dbname = 'isuketch';
  return mysql.createPool({
    host: host,
    port: port,
    user: user,
    password: pass,
    database: dbname,
    connectionLimit: 1,
    charset: 'utf8mb4',
  });
};

const selectAll = (dbh, sql, params = []) => {
  return dbh.query(sql, params);
};

const getAllRooms = (dbh) => {
  let rooms;
  let strokes;
  let points;
  
  return Promise.all([
    selectAll(dbh, 'SELECT `id`, `name`, `canvas_width`, `canvas_height`, `created_at` FROM `rooms`')
      .then((v) => {
        rooms = v;
        return Promise.resolve();
      }),
    selectAll(dbh, 'SELECT `id`, `room_id`, `width`, `red`, `green`, `blue`, `alpha`, `created_at` FROM `strokes`')
      .then((v) => {
        strokes = v;
        return Promise.resolve();
      }),
    selectAll(dbh, 'SELECT `id`, `stroke_id`, `x`, `y` FROM `points`')
      .then((v) => {
        points = v;
        return Promise.resolve();
      })
  ]).then(() => {
    let pointsBuffer = {};
    for (const point of points) {
      if (!pointsBuffer[point.stroke_id]) {
        pointsBuffer[point.stroke_id] = [];
      }
      pointsBuffer[point.stroke_id].push(point);
    }
    const strokesBuffer = {};
    for (const stroke of strokes) {
      if (pointsBuffer[stroke.id]) {
        stroke.points = pointsBuffer[stroke.id];
      } else {
        stroke.points = [];
      }
      if (!strokesBuffer[stroke.room_id]) {
        strokesBuffer[stroke.room_id] = []
      }
      strokesBuffer[stroke.room_id].push(stroke);
    }
    for (const room of rooms) {
      const strokesOfRoom = strokesBuffer[room.id];
      room.strokes = !!strokesOfRoom ? strokesOfRoom : [];
      room['stroke_count'] = room.strokes.length;
    }
    return Promise.resolve(rooms);
  });
};

const typeCastPointData = (data) => {
  return {
    id: data.id,
    stroke_id: data.stroke_id,
    x: data.x,
    y: data.y,
  };
};

const toRFC3339Micro = (date) => {
  return date.toISOString();
};

const typeCastStrokeData = (data) => {
  return {
    id: data.id,
    room_id: data.room_id,
    width: data.width,
    red: data.red,
    green: data.green,
    blue: data.blue,
    alpha: data.alpha,
    points: typeof(data.points) !== 'undefined' ? data.points.map(typeCastPointData) : [],
    created_at: typeof(data.created_at) !== 'undefined' ? toRFC3339Micro(data.created_at) : '',
  };
};

const typeCastRoomData = (data) => {
  return {
    id: data.id,
    name: data.name,
    canvas_width: data.canvas_width,
    canvas_height: data.canvas_height,
    created_at: typeof(data.created_at) !== 'undefined' ? toRFC3339Micro(data.created_at) : '',
    strokes: typeof(data.strokes) !== 'undefined' ? data.strokes.map(typeCastStrokeData) : [],
    stroke_count: data.stroke_count,
    watcher_count: data.watcher_count,
  };
};

const writeRoomSvg = (room) => {
  const json = typeCastRoomData(room);
  const svg = server.renderToStaticMarkup(
    React.createElement(Canvas.default, {
      width: json.canvas_width,
      height: json.canvas_height,
      strokes: json.strokes
    })
  );
  const body =
    '<?xml version="1.0" standalone="no"?>' +
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
    svg;
  
  new Promise((resolve) => {
    fs.writeFileSync(path.join(__dirname, './public/img/' + json.id), body);
    resolve();
  });
};

const dbh = getDBH();
const allRooms = getAllRooms(dbh);
allRooms
  .then((rooms) => {
    return Promise.all(
      rooms.map((room) => {
        return writeRoomSvg(room);
      })
    );
  })
  .then(() => {
    process.exit(0);
  });