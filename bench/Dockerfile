FROM golang:alpine

RUN \
  apk add --no-cache curl git make && \
  go get -u github.com/jteeuwen/go-bindata/... && \
  go get -u github.com/Masterminds/glide && \
  go get -u github.com/isucon/isucon6-final && \
  go get -u github.com/PuerkitoBio/goquery && \
  go get -u golang.org/x/net/http2/hpack && \
  go get -u golang.org/x/net/lex/httplex

WORKDIR ${GOPATH}/src/github.com/isucon/isucon6-final/bench
COPY . ${GOPATH}/src/github.com/isucon/isucon6-final/bench

RUN \
  glide install && \
  make

#CMD ["./local-bench", "-urls", "https://react", "-timeout", "30"]
