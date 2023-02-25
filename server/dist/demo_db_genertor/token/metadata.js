"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeMetadata = void 0;
// @ts-ignore
const path_1 = __importDefault(require("path")); // @ts-ignore
const fs_1 = __importDefault(require("fs"));
function writeMetadata(meta, file) {
    const data = JSON.stringify(meta);
    const filepath = path_1.default.resolve(__dirname, '..', '..', '..', "files", 'metadata', file + '.json');
    fs_1.default.writeFileSync(filepath, data);
    return "http://188.72.203.109:3333/metadata/" + file + ".json";
}
exports.writeMetadata = writeMetadata;
//# sourceMappingURL=metadata.js.map