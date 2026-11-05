import express from "express";
import ViteExpress from "vite-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

//The code below allows the app to access the uploads folder when built for production
const uploadsDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../uploads"
);

fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(uploadsDir));

// 1. Middleware to parse JSON payloads
app.use(express.json({ limit: "15mb" }));


app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.get("/images{/:searchParam}", (req, res) => {
  const { searchParam } = req.params;
  // Do not send .DS_Store files. These are metadata files automatically generated on Macs.
  const files = fs.readdirSync(uploadsDir).filter(file => !file.includes('.DS_Store'))
  if (searchParam) {
    res.send(files.filter(file => file.toLowerCase().includes(searchParam.toLowerCase())));
  } else {
    res.send(files);
  }
});

app.post("/upload", (req, res) => {
  const images = req.body.images;

  for (let i = 0; i < images.length; i++) {
    const imageString = images[i].base64;
    const base64Data = imageString.replace(/^data:[^;]+;base64,/, '');

    try {
      fs.writeFile(`${uploadsDir}/${images[i].name}`, base64Data, { encoding: "base64" }, (err) => {
        if (err) throw err;
        console.log(`${images[i].name} has been saved!`);
      });
    } catch (error) {
      res.sendStatus(500);
      console.error('Failed to save file:', error);
    }
  }
  res.sendStatus(200);

})


app.post("/delete/:imageName", (req, res) => {
  const { imageName } = req.params;

  try {
    fs.unlink(`${uploadsDir}/${imageName}`, (err => {
      if (err) throw err;
      else {
        console.log(`Deleted file: ${imageName}`);
        res.sendStatus(200);
      }
    }));
  } catch (error) {
    res.sendStatus(500);
    console.error('Failed to delete file:', error);
  }
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
