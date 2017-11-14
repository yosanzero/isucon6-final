#!/bin/bash
set -e
cd /home/isucon/webapp
git pull
docker-compose build
docker-compose up -d
