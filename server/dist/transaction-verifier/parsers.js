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
exports.parseMetadata = exports.parseOffer = void 0;
/* eslint-disable */
const web3_js_1 = require("@solana/web3.js");
const env_1 = __importDefault(require("../env"));
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
function parseOffer(record) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const data = (yield env_1.default.connection.getAccountInfo(record)).data;
            return {
                deck: new web3_js_1.PublicKey(data.slice(1, 33)),
                seller: new web3_js_1.PublicKey(data.slice(33, 65)),
                nft_mint: new web3_js_1.PublicKey(data.slice(65, 97))
            };
        }
        catch (e) {
            console.log(e);
            return undefined;
        }
    });
}
exports.parseOffer = parseOffer;
function parseMetadata(record) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (typeof (record) === "string") {
                record = new web3_js_1.PublicKey(record);
            }
            return yield mpl_token_metadata_1.Metadata.fromAccountAddress(env_1.default.connection, record);
        }
        catch (e) {
            return undefined;
        }
    });
}
exports.parseMetadata = parseMetadata;
//# sourceMappingURL=parsers.js.map