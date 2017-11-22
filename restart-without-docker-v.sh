#!/bin/bash
set -e
cd /home/isucon/webapp
git fetch origin
git reset --hard origin/master
sudo chmod -R 777 /home/isucon/webapp/react/public/
(cd nodejs && npm install && npm cache clean)
(cd nodejs && MYSQL_HOST=172.29.2.63 node init.js)
(cd react && npm install && npm cache clean && NODE_ENV=production npm run build)
sudo cp etc/nginx/nginx.conf /etc/nginx/nginx.conf
sudo cp etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
sudo systemctl restart mysql
sudo systemctl restart nodejs.service
sudo systemctl restart react.service
sudo systemctl restart nginx.service
echo > /var/log/mysql/slow.log
echo > /var/log/nginx/access.log