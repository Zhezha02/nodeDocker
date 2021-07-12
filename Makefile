#!/usr/bin/make


up:
	docker-compose up

down:
	docker-compose down --rmi all -v 

cli: 
	docker-compose run -u 1000  cli node /src/cli 

build:
	docker-compose build

proxy: 
	docker-compose run -u 1000 proxy node /src/proxy