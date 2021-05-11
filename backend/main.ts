import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Server } from "http";
import { NextApiHandler } from "next";
import { INestApplication } from "@nestjs/common";
import session from "express-session";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import redis from "redis";

const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient(process.env.REDIS_URL ?? "");

let app: INestApplication;
let doc: OpenAPIObject;

export async function getAppAndDoc(): Promise<
  [INestApplication, OpenAPIObject]
> {
  if (app) {
    return [app, doc];
  }

  app = await NestFactory.create(AppModule, { bodyParser: false });
  app.setGlobalPrefix("api");

  // session
  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? "secret",
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient }),
      cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
    })
  );

  // swagger
  const config = new DocumentBuilder()
    .setTitle("Api Documentation")
    .setVersion("1.0")
    .build();
  doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, doc);

  await app.init();
  return [app, doc];
}

export async function getNestListener() {
  const [app] = await getAppAndDoc();
  const server = app.getHttpServer() as Server;
  const [listener] = server.listeners("request") as NextApiHandler[];
  return listener;
}
