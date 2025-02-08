import Fastify from "fastify";
import FastifyVite from "@fastify/vite";
import cors from "@fastify/cors";
import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import { dirname } from "path";
import { fileURLToPath } from "url";

export async function main(dev) {
  const server = Fastify();

  server.register(cors, {
    origin: "*",
  });

  await server.register(FastifyVite, {
    root: dirname(fileURLToPath(import.meta.url)),
    dev: dev,
    spa: true,
  });

  if (dev) {
    // https://github.com/fastify/fastify-vite/issues/184
    server.get("*", (_, reply) => {
      return reply.html();
    });
  }

  server.get("/api/random", async (_, reply) => {
    return { message: "Cheers!" };
  });

  server.all("/api/*", (request, reply) => {
    const remainingPath = request.params["*"];
    reply.status(404).send({
      status: 404,
      message: `The requested endpoint GET:/api/${remainingPath} does not exist `,
    });
  });

  server.setErrorHandler((error, request, reply) => {
    reply.status(error.statusCode || 500).send({
      status: error.statusCode || 500,
      message: error.message || "Something went wrong",
    });
  });

  await server.vite.ready();

  return server;
}

function startDevProd() {
  if (process.env.NODE_ENV === "test") {
    return;
  }

  const numCPUs = availableParallelism();

  if (process.env.NODE_ENV === "production" && cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);

    // Fork workers equal to the number of CPU cores
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    // Restart a worker if it exits unexpectedly
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
    return;
  }

  main(process.env.NODE_ENV === "development").then((server) => {
    server.listen(
      { port: process.env.PORT || 3000, host: process.env.HOST },
      (err, address) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(`Worker ${process.pid} listening on ${address}`);
      },
    );
  });
}

startDevProd();
