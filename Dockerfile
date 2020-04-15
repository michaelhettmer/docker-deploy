FROM node:12.16.2-alpine3.11

COPY . /src
WORKDIR /src

RUN npm ci

ENV NODE_ENV=production
RUN npm run build

FROM node:12.16.2-alpine3.11

ENV NODE_ENV=production
WORKDIR /home/node/app

COPY --from=0 /src/dist ./dist
COPY --from=0 /src/package.json ./package.json
COPY --from=0 /src/package-lock.json ./package-lock.json
RUN npm ci

RUN apk add --no-cache python2 \
  && apk add --no-cache --virtual .docker-compose-deps \
  py-pip python-dev libffi-dev openssl-dev gcc libc-dev make \
  && pip install docker-compose==1.25.0 \
  && apk del .docker-compose-deps

# RUN groupadd docker
# RUN usermod -aG docker node
# USER node

EXPOSE 8888

ENTRYPOINT [ "node", "dist/index.js" ]