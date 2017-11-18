#!/bin/bash
set -e
cd /home/isucon/webapp
git fetch origin
git reset --hard origin/master
docker-compose build
docker-compose up -d
