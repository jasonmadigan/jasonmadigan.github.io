# README

## Compile & Serve

`hugo serve`

## Build

```
git submodule update --init --recursive
docker buildx build --platform linux/amd64,linux/arm64 . -t jasonmadigan/blog:latest --push
docker push jasonmadigan/blog:latest
```

## Run

```
docker run -p 8080:8888 jasonmadigan/blog:latest
```
