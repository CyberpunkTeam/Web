FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
#RUN npm ci --only=production

# Bundle app source
COPY . .
RUN APIKEY=${{ secrets.APIKEY }} AUTHDOMAIN=${{ secrets.AUTHDOMAIN }} PROJECTID=${{ secrets.PROJECTID }} STORAGEBUCKET=${{ secrets.STORAGEBUCKET }} MESSAGINGSENDERID=${{ secrets.MESSAGINGSENDERID }} APPID=${{ secrets.APPID }} MEASUREMENTID=${{ secrets.APIKEY }} npm run build

EXPOSE 3000
CMD [ "node", "server.js" ]
