FROM golang:alpine

RUN \
  apk update && \
  apk --no-cache add openssl wget

RUN \
  apk add --no-cache curl git make && \
  go get -u github.com/jteeuwen/go-bindata/... && \
  go get -u github.com/Masterminds/glide

RUN \
  wget -O isucon6.zip https://github.com/isucon/isucon6-final/archive/master.zip && \
  unzip isucon6.zip && \
  mkdir -p ${GOPATH}/src/github.com/isucon && \
  mv isucon6-final-master ${GOPATH}/src/github.com/isucon/isucon6-final

WORKDIR ${GOPATH}/src/github.com/isucon/isucon6-final/bench
COPY . ${GOPATH}/src/github.com/isucon/isucon6-final/bench

RUN \
  glide install && \
  make
