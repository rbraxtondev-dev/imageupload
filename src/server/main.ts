import express from "express";
import ViteExpress from "vite-express";
import fs from "fs";

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.get("/images{/:name}", (req, res) => {
  const { name } = req.params;
  const files = fs.readdirSync("./uploads")
  if (name) {
    res.send(files.filter(file => file.includes(name)));
  } else {
    res.send(files);
  }
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
