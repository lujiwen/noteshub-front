docker run --rm -d  \
 -v /root/go:/go \
 -v /root/notes/:/go/src/notes \
 -v /root/data/:/root/data \
 -p 3389:8080 \
 golang:1.10.3 \
 go run /go/src/notes/server/server.go