FROM nginx:alpine AS build

RUN apk add --no-cache \
    ca-certificates wget
    
ARG HUGO_VERSION="0.140.2"
ARG TARGETARCH
RUN wget --quiet "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-${TARGETARCH}.tar.gz" && \
    tar xzf hugo_${HUGO_VERSION}_linux-${TARGETARCH}.tar.gz && \
    rm hugo_${HUGO_VERSION}_linux-${TARGETARCH}.tar.gz && \
    mv hugo /usr/bin

COPY ./ /site
WORKDIR /site
RUN hugo --minify

# Copy static files to Nginx
FROM nginx:alpine
COPY --from=build /site/public /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 8888

RUN chmod -R 755 /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
