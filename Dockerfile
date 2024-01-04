FROM node:lts-alpine
WORKDIR /app

COPY package.json .
COPY tsconfig.node.json .

RUN npm install
RUN npm run build
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]
