# PREPARATION
FROM node:18-alpine As preparation
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node

# BUILD
FROM node:18-alpine As build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=preparation /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npx prisma generate
RUN npm run build
ENV NODE_ENV "$NODE_ENV"
RUN npm ci --only=production && npm cache clean --force
USER node

# CREATE PRODUCTION IMAGE
FROM node:18-alpine As production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
ENV JWT_SECRET "$JWT_SECRET"
EXPOSE 80
CMD [ "npm", "run", "start:migrate:prod" ]