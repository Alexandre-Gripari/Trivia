cd front-end
docker build -t front-end .
docker run -d -p 4200:80 front-end

cd ..
cd back-end
docker build -t back-end .
docker run -d -p 9428:9428 back-end