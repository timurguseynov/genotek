#!/bin/bash

# Stop and remove the Docker container
docker stop genotek_service && docker rm genotek_service

# Build the Docker image
docker build -t genotek_service .

# Run the Docker container
docker run -d -p 3000:3000 -e HOST=0.0.0.0 --name genotek_service genotek_service

sleep 2
curl -s http://localhost:3000 > /dev/null && echo "Application is running at http://localhost:3000"
