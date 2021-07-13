#!/usr/bin/make


up:
	docker-compose up -d

down:
	docker-compose down -v 

start: 
	docker-compose run -d -u 1000 proxy node /src/proxy && docker-compose run -u 1000  cli node /src/cli 

cli: 
	docker-compose run -u 1000  cli node /src/cli 

build:
	docker-compose build

proxy: 
	docker-compose run  -u 1000 proxy node /src/proxy
