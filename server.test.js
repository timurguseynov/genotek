import { describe, it, expect, afterAll, beforeAll } from "vitest";
import Fastify from "fastify";
import { main } from "./server.js";
import fetch from "node-fetch";

let server;

beforeAll(async () => {
  const fastify = await main(false);
  await fastify.listen({ port: 3001 });
  server = fastify;
});

afterAll(async () => {
  await server.close();
});

describe("API Route Tests", () => {
  it("should return a success message for /api/random", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/random",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ message: "Cheers!" });
  });

  it("should return a 404 error for any undefined API route", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/undefined-endpoint",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({
      status: 404,
      message:
        "The requested endpoint GET:/api/undefined-endpoint does not exist ",
    });
  });
});
