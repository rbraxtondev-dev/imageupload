import express from "express";
import ViteExpress from "vite-express";
import fs from "fs";

const app = express();

// 1. Middleware to parse JSON payloads
app.use(express.json({ limit: "10mb" }));


app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.get("/images{/:searchParam}", (req, res) => {
  const { searchParam } = req.params;
  // Do not send .DS_Store files. These are metadata files automatically generated on Macs.
  const files = fs.readdirSync("./uploads").filter(file => !file.includes('.DS_Store'))
  if (searchParam) {
    res.send(files.filter(file => file.includes(searchParam)));
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
      // 2. Write the file specifying the 'base64' encoding
      fs.writeFile(`./uploads/${images[i].name}`, base64Data, { encoding: "base64" }, (err) => {
        if (err) throw err;
        res.sendStatus(200);
        console.log('The file has been saved!');
      });
    } catch (error) {
      res.sendStatus(500);
      console.error('Failed to save file:', error);
    }
  }

})


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
