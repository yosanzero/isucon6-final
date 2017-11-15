# デプロイ方法

ローカルから

```sh
$ /bin/bash restart-all-from-local.sh
```

で、gitのコードをpullしてデプロイ

# 測定方法

```sh
docker run -it webapp_bench ./local-bench -urls https://{ホスト名} -timeout 30
```
