import * as path from "path";
import { convertVideo } from "./convertVideo";

const inputFilePath = path.resolve(__dirname, "input.mp4");
const outputFilePath = path.resolve(__dirname, "output.mp4");
const resolution = "1280x720";

convertVideo(inputFilePath, outputFilePath, resolution).catch(console.error);
