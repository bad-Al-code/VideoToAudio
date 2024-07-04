import { exec } from "child_process";
import { promisify } from "util";
import * as path from "path";

const execAsync = promisify(exec);

async function convertVideoToAudio(
  inputFilePath: string,
  outputFilePath: string,
): Promise<void> {
  const ffmpegPath = "ffmpeg";
  const command = `${ffmpegPath} -i "${inputFilePath}"  "${outputFilePath}"`;

  try {
    const { stdout, stderr } = await execAsync(command);
    if (stdout) console.log("Output:", stdout);
    if (stderr) console.error("Error:", stderr);
    console.log(`Conversion complete: ${outputFilePath}`);
  } catch (error) {
    console.error("Error during conversion:", error);
  }
}

const inputFilePath = path.resolve(__dirname, "../assets/1.mp4");
const outputFilePath = path.resolve(__dirname, "../assets/output/1.mp3");

convertVideoToAudio(inputFilePath, outputFilePath).catch(console.error);
