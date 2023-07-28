# Use an official Node.js runtime as a parent image
FROM node:20 as base


FROM base as backend
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/. .
EXPOSE 5001
CMD [ "node", "index.js" ]