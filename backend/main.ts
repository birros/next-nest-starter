import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Server } from "http";
import { NextApiHandler } from "next";
import { INestApplication } from "@nestjs/common";
import session from "express-session";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

let app: INestApplication;

async function getApp() {
  if (app) {
    return app;
  }

  app = await NestFactory.create(AppModule, { bodyParser: false });
  app.setGlobalPrefix("api");

  // session
  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? "secret",
      resave: false,
      saveUninitialized: false,
    })
  );

  // swagger
  const config = new DocumentBuilder()
    .setTitle("Api Documentation")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.init();
  return app;
}

export async function getNestListener() {
  const app = await getApp();
  const server = app.getHttpServer() as Server;
  const [listener] = server.listeners("request") as NextApiHandler[];
  return listener;
}
