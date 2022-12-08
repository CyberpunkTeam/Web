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
ENV FIREBASE_AUTHDOMAIN=$FIREBASE_AUTHDOMAIN
ENV FIREBASE_APIKEY=$FIREBASE_APIKEY
ENV FIREBASE_PROJECTID=$FIREBASE_PROJECTID
ENV FIREBASE_STORAGEBUCKET=$FIREBASE_STORAGEBUCKET
ENV FIREBASE_MESSAGINGSENDERID=$FIREBASE_MESSAGINGSENDERID
ENV APP_ID=$APP_ID
ENV MEASUREMENTID=$MEASUREMENTID
RUN npm run build

EXPOSE 3000
CMD [ "node", "server.js" ]
