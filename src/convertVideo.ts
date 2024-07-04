import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function convertVideo(
  inputFilePath: string,
  outputFilePath: string,
  resolution?: string,
): Promise<void> {
  const ffmpegPath = "ffmpeg"; // Assumes ffmpeg is in your PATH
  let command = `${ffmpegPath} -i "${inputFilePath}" "${outputFilePath}"`;

  if (resolution) {
    command = `${ffmpegPath} -i "${inputFilePath}" -vf scale=${resolution} "${outputFilePath}"`;
  }

  try {
    const { stdout, stderr } = await execAsync(command);
    if (stdout) console.log("Output:", stdout);
    if (stderr) console.error("Error:", stderr);
    console.log(`Conversion complete: ${outputFilePath}`);
  } catch (error) {
    console.error("Error during conversion:", error);
  }
}
