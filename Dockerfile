FROM node

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

ENV PORT 8000

EXPOSE 8000

CMD ["npm","start"]