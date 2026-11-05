import express from "express";
import ViteExpress from "vite-express";
import fs from "fs";

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.get("/images{/:searchParam}", (req, res) => {
  const { searchParam } = req.params;
  const files = fs.readdirSync("./uploads")
  if (searchParam) {
    res.send(files.filter(file => file.includes(searchParam)));
  } else {
    res.send(files);
  }
});

app.post("/delete/:imageName", (req, res) => {
  const { imageName } = req.params;


  fs.unlink(`./uploads/${imageName}`, (err => {
    if (err) {
      res.send(err)
    }
    else {
      console.log("\nDeleted file: example_file.txt");
      res.sendStatus(200);

      // Get the files in current directory
      // after deletion
    }
  }));
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
