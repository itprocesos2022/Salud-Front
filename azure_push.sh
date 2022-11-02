#/bin/bash!
docker context use default
docker-compose --file docker-compose.test.yml up --build
docker tag develop-frontend-salud-cchc cchcsaluddev.azurecr.io/develop-frontend-salud-cchc:latest
docker push cchcsaluddev.azurecr.io/develop-frontend-salud-cchc:latest:latest
docker context use azurecontext
docker compose --file docker-compose.test.yml up --build