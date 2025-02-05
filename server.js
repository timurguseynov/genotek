import Fastify from "fastify";
import FastifyVite from "@fastify/vite";
import cors from "@fastify/cors";

export async function main(dev) {
  const server = Fastify();

  server.register(cors, {
    origin: "*",
  });

  await server.register(FastifyVite, {
    root: import.meta.url,
    dev: dev,
    spa: true,
  });

  server.get("*", (_, reply) => {
    return reply.html();
  });

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

!process.env.NODE_ENV !== "test" &&
  main(process.env.NODE_ENV === "development").then((server) => {
    server.listen({ port: 3000 }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening on ${address}`);
    });
  });
