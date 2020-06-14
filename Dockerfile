FROM node:12
WORKDIR /
COPY package.json ./
RUN npm install
COPY . ./
EXPOSE 3008
CMD ["npm", "run", "start"]