# 起動方法

```sh
$ docker-compose build
$ docker-compose up -d
```

でポート443で起動し、 https://localhost/ にアクセスできるようになります。

# 測定方法

```sh
docker run -it webapp_bench ./local-bench -urls https://{ホスト名} -timeout 30
```
