FROM node:20.14 as build


#Set the working directory
WORKDIR /usr/local/app

#Add the source code to app
COPY ./ /usr/local/app/

#Install all the dependencies
RUN npm install
EXPOSE 9428

#Generate the build of the application
ENTRYPOINT [ "npm","run","dev" ]