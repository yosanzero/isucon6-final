#!/bin/bash -xe
scp restart-without-docker-v.sh isucon@ec2-54-250-246-146.ap-northeast-1.compute.amazonaws.com:webapp/restart-without-docker-v.sh
scp restart-without-docker-v.sh isucon@ec2-54-238-184-241.ap-northeast-1.compute.amazonaws.com:webapp/restart-without-docker-v.sh
scp restart-without-docker-v.sh isucon@ec2-54-249-24-93.ap-northeast-1.compute.amazonaws.com:webapp/restart-without-docker-v.sh
ssh -A isucon@ec2-54-250-246-146.ap-northeast-1.compute.amazonaws.com /bin/bash webapp/restart-without-docker-v.sh
ssh -A isucon@ec2-54-238-184-241.ap-northeast-1.compute.amazonaws.com /bin/bash webapp/restart-without-docker-v.sh
ssh -A isucon@ec2-54-249-24-93.ap-northeast-1.compute.amazonaws.com /bin/bash webapp/restart-without-docker-v.sh
