import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Server } from "http";
import { NextApiHandler } from "next";
import { INestApplication } from "@nestjs/common";
import session from "express-session";

let app: INestApplication;

async function getApp() {
  if (app) {
    return app;
  }

  app = await NestFactory.create(AppModule, { bodyParser: false });
  app.setGlobalPrefix("api");
  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? "secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  await app.init();
  return app;
}

export async function getNestListener() {
  const app = await getApp();
  const server = app.getHttpServer() as Server;
  const [listener] = server.listeners("request") as NextApiHandler[];
  return listener;
}
