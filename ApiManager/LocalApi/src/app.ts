import { NextFunction, Request, Response } from "express";
import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import fs from "fs";

// Routers
import indexRouter from "@/routes/Index";
import userRouter from "@/routes/User";
import sensorRouter from "@/routes/Sensor";
import buildingRouter from "@/routes/Building";

import { client } from '@/middleware/database'

const app = express();
const accessLogStream = fs.createWriteStream(path.join("./logs", 'access.log'), { flags: 'a' })

// view engine setup
app.set("views", path.join(__dirname, "views"));
//app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



app.use("/", indexRouter);
app.use("/user",userRouter);
app.use("/sensor",sensorRouter);
app.use("/building",buildingRouter);

// catch 404
//NewCommentsV2
//newModif
app.use(function (req: Request, res: Response, next: NextFunction) {
  // handle it how it pleases you
  res.status(404).json({ message: "not_found" });
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err});
});

export default app;
