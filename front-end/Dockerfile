FROM node:20.14 as build


#Set the working directory
WORKDIR /usr/local/app

COPY package*.json ./

RUN npm install 
#Add the source code to app
COPY ./ ./

#Install all the dependencies

#Generate the build of the application
RUN npm run build


#Stage 2 : Serve app with nginx server
#Use official nginx image as the base image
FROM nginx:latest
ENV BACKEND_URL=http://backend:9428

#Copy the build output to replace the default nginx contents
COPY  --from=build /usr/local/app/dist/trivia/ /usr/share/nginx/html
COPY ./default.conf.template /etc/nginx/templates/default.conf.template

#Expose port 80
EXPOSE 80

#Generate the build of the application
#ENTRYPOINT ["nginx","-g","daemon off;"]