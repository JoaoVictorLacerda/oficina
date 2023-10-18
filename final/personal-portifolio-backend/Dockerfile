FROM node:16.17.0

WORKDIR /personal-portifolio

COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]