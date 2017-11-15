# デプロイ方法

```sh
$ /bin/bash restart-all-from-local.sh
```

でポート443で起動し、 https://localhost/ にアクセスできるようになります。

# 測定方法

ローカルから

```sh
$ (cd bench && docker build -t webapp_bench .)
Docker版
$ docker run -it webapp_bench ./local-bench -urls ec2-13-114-142-226.ap-northeast-1.compute.amazonaws.com -timeout 30
Dockerなし版
$ docker run -it webapp_bench ./local-bench -urls ec2-54-250-246-146.ap-northeast-1.compute.amazonaws.com -timeout 30
```

でいけるはず
