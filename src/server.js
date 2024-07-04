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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const convertVideo_1 = require("./convertVideo");
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.post("/convert", upload.single("video"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { format, resolution } = req.body;
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const inputFilePath = req.file.path;
    const outputFilePath = path_1.default.join("output", `${req.file.filename}.${format}`);
    try {
        yield (0, convertVideo_1.convertVideo)(inputFilePath, outputFilePath, resolution);
        res.download(outputFilePath);
    }
    catch (error) {
        res.status(500).send("Conversion failed");
    }
}));
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
