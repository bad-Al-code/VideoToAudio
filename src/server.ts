import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { convertVideo } from "./convertVideo";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/convert", upload.single("video"), async (req, res) => {
  const { format, resolution } = req.body;

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const inputFilePath = req.file.path;
  const outputFilePath = path.join("output", `${req.file.filename}.${format}`);

  try {
    await convertVideo(inputFilePath, outputFilePath, resolution);
    res.download(outputFilePath);
  } catch (error) {
    res.status(500).send("Conversion failed");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
