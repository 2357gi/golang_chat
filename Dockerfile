FROM  golang:1.12.1-alpine
WORKDIR /go/src/golang_chat
COPY . .
ENV GO111MODULE=on

RUN apk add --no-cache \
    alpine-sdk \
    git \
    && go get github.com/pilu/fresh

CMD ["fresh", "-c", "./fresh.conf"]


