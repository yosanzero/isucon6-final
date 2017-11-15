# デプロイ方法

```sh
$ /bin/bash restart-all-from-local.sh
```

でポート443で起動し、 https://localhost/ にアクセスできるようになります。

# 測定方法

ローカルから

```sh
$ (cd bench && docker build -t webapp_bench .)
$ docker run -it webapp_bench ./local-bench -urls https://{ホスト名} -timeout 30
```

でいけるはず
