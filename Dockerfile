# Stage 1: Build the client
FROM node:20 AS client
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# # Stage 2: Install the server
FROM node:20 AS server
WORKDIR /app
COPY . .
RUN rm -rf client
RUN npm install --production

# Stage 3: Install the new version of node and merge both
FROM node:20
COPY --from=server /app /app
COPY --from=client /app/client/dist /app/client/dist
RUN node -v
WORKDIR /app

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "run", "prod"]
