#!/bin/bash
set -e
cd /home/isucon/webapp
git pull origin without-dokcer
(cd nodejs && npm install && npm cache clean)
(cd react && npm install && npm cache clean && NODE_ENV=production npm run build)
sudo systemctl restart mysql
sudo systemctl restart nodejs.service
sudo systemctl restart react.service
