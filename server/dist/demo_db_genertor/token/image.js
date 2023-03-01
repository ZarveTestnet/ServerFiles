"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.generateImages = void 0;
const path = __importStar(require("path"));
const open_ai_1 = require("../open-ai");
function generateImages(name, symbol, count) {
    return __awaiter(this, void 0, void 0, function* () {
        let files = ["https://188.72.203.109:3333/images/" + name + "s.png"];
        yield (0, open_ai_1.generateImage)(name, path.resolve(__dirname, '..', '..', '..', "files", 'images', name + 's.png'));
        for (let i = 0; i < count; i++) {
            files.push("https://188.72.203.109:3333/images/" + symbol + i.toString() + ".png");
            yield (0, open_ai_1.generateImage)(name, path.resolve(__dirname, '..', '..', '..', "files", 'images', symbol + i.toString() + '.png'));
        }
        return files;
    });
}
exports.generateImages = generateImages;
//# sourceMappingURL=image.js.map