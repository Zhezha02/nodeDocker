#!/usr/bin/make


up:
	docker-compose up -d

down:
	docker-compose down -v 

start:
	docker-compose exec cli node /src/cli 

# build:
# 	docker-compose build

# cli: 
# 	docker-compose run -u 1000  cli node /src/cli 

# proxy: 
# 	docker-compose run  -u 1000 proxy node /src/proxy
