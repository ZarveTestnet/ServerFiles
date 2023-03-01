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
exports.getMetadataAddress = void 0;
const web3_js_1 = require("@solana/web3.js");
const MetadataProgram = new web3_js_1.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
function getMetadataAddress(mint) {
    return __awaiter(this, void 0, void 0, function* () {
        const a = yield web3_js_1.PublicKey.findProgramAddress([
            Buffer.from('metadata'),
            MetadataProgram.toBuffer(),
            mint.toBuffer(),
        ], MetadataProgram);
        return a[0];
    });
}
exports.getMetadataAddress = getMetadataAddress;
//# sourceMappingURL=accounts.js.map