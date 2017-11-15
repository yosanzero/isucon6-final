#!/bin/bash -xe
ssh -A isucon@ec2-13-114-142-226.ap-northeast-1.compute.amazonaws.com /bin/bash webapp/restart-docker-v.sh
ssh -A isucon@ec2-54-250-246-146.ap-northeast-1.compute.amazonaws.com /bin/bash webapp/restart-without-docker-v.sh
