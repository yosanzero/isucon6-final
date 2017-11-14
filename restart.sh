#!/bin/bash
set -e
cd /home/isucon/webapp
git pull
(cd nodejs && npm install && npm cache clean)
(cd react && npm install && npm cache clean && NODE_ENV=production npm run build)
