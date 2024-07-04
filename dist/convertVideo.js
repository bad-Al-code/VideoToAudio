"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertVideo = convertVideo;
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
function convertVideo(inputFilePath, outputFilePath, resolution) {
    return __awaiter(this, void 0, void 0, function* () {
        const ffmpegPath = "ffmpeg"; // Assumes ffmpeg is in your PATH
        let command = `${ffmpegPath} -i "${inputFilePath}" "${outputFilePath}"`;
        if (resolution) {
            command = `${ffmpegPath} -i "${inputFilePath}" -vf scale=${resolution} "${outputFilePath}"`;
        }
        try {
            const { stdout, stderr } = yield execAsync(command);
            if (stdout)
                console.log("Output:", stdout);
            if (stderr)
                console.error("Error:", stderr);
            console.log(`Conversion complete: ${outputFilePath}`);
        }
        catch (error) {
            console.error("Error during conversion:", error);
        }
    });
}
