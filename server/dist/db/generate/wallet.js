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
const web3_js_1 = require("@solana/web3.js");
const secretKey = [
    41, 184, 49, 248, 229, 123, 122, 201, 25, 81, 88,
    113, 36, 160, 229, 212, 115, 151, 50, 253, 64, 71,
    181, 141, 51, 100, 131, 176, 221, 103, 117, 128, 117,
    241, 112, 127, 162, 56, 172, 60, 19, 148, 75, 164,
    243, 214, 54, 227, 147, 170, 93, 100, 194, 189, 216,
    0, 11, 142, 132, 233, 194, 129, 142, 21
];
class Wallet {
    constructor() {
        this.keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(secretKey));
        this.publicKey = this.keypair.publicKey;
    }
    airdrop() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = new web3_js_1.Connection("https://api.devnet.solana.com/");
            const airdropSignature = yield connection.requestAirdrop(this.publicKey, 1e9);
            const txId = yield connection.confirmTransaction(airdropSignature);
            console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`);
        });
    }
    send(tx, signers) {
        return __awaiter(this, void 0, void 0, function* () {
            signers.push(this.keypair);
            tx.feePayer = this.publicKey;
            const connection = new web3_js_1.Connection("https://api.devnet.solana.com/");
            let txid = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, tx, signers, {
                skipPreflight: true,
                preflightCommitment: "confirmed",
            });
            console.log(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);
        });
    }
}
exports.default = Wallet;
//# sourceMappingURL=wallet.js.map