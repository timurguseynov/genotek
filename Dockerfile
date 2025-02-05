# Stage 1: Build the client
FROM node:20 as client
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# # Stage 2: Install the server
FROM node:20 as server
WORKDIR /app
COPY . .
RUN rm -rf client
RUN npm install --production

# Stage 3: Install the new version of node and merge both into genotek/r-base
FROM genotek/r-base
RUN wget https://nodejs.org/dist/v20.9.0/node-v20.9.0-linux-x64.tar.xz -P /tmp && \
  tar -xJf /tmp/node-v20.9.0-linux-x64.tar.xz -C /usr/local --strip-components=1 && \
  ln -s /usr/local/bin/node /usr/bin/node && \
  ln -s /usr/local/bin/npm /usr/bin/npm
COPY --from=server /app /app
COPY --from=client /app/client/dist /app/client/dist
RUN node -v

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "run", "prod"]
