## ISUCON6 FINAL EXERCISE

### HOST

ec2-13-114-142-226.ap-northeast-1.compute.amazonaws.com

### HOW TO BUILD AND UP

```
$ cd /home/isucon/webapp
$ docker-compose build
$ docker-compose up -d
$ docker-compose logs
```

https://ec2-13-114-142-226.ap-northeast-1.compute.amazonaws.com/


### BENCH

```
$ docker run -it bench ./local-bench -urls https://ec2-13-114-142-226.ap-northeast-1.compute.amazonaws.com/ -timeout 30
```
