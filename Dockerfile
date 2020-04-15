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

EXPOSE 8888
USER node

ENTRYPOINT [ "node", "dist/index.js" ]