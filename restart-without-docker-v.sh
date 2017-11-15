#!/bin/bash
set -e
cd /home/isucon/webapp
git pull
(cd nodejs && npm install && npm cache clean)
(cd react && npm install && npm cache clean && NODE_ENV=production npm run build)
(\cp etc/nginx/nginx.conf /etc/nginx/nginx.conf)
sudo systemctl restart mysql
sudo systemctl restart nodejs.service
sudo systemctl restart react.service
sudo systemctl restart nginx.service
