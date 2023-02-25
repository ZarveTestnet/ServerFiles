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
exports.verify = void 0;
const nacl_signature_1 = __importDefault(require("nacl-signature"));
const types_1 = require("../types");
const web3_js_1 = require("@solana/web3.js");
function verify(w) {
    return __awaiter(this, void 0, void 0, function* () {
        try { //@ts-ignore
            const msg = "Marketplace wants to sign you these message to verify wallet: " + w.key + '.';
            if (!nacl_signature_1.default.verify(msg, Buffer.from(new Uint8Array(w.signature)).toString('base64'), new web3_js_1.PublicKey(w.key).toBuffer().toString('base64'))) {
                throw types_1.Error.VerificationFailed;
            }
        }
        catch (_e) {
            throw types_1.Error.VerificationFailed;
        }
    });
}
exports.verify = verify;
//# sourceMappingURL=verification.js.map