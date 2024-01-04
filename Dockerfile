FROM node:lts-alpine
WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install
RUN npm run build
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]
