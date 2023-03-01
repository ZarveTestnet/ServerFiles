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
const env_1 = __importDefault(require("../env")); //@ts-ignore
const big_integer_1 = __importDefault(require("big-integer"));
const big_byte_1 = require("./big-byte");
const parsers_1 = require("./parsers");
const accounts_1 = require("./accounts");
const bs58_1 = __importDefault(require("bs58"));
function extractString(s) {
    return s.replace(/\0/g, '');
}
function rawToParsed(txRaw) {
    let keys = [];
    txRaw.transaction.message.instructions[0].accounts.forEach((accountId) => {
        keys.push({
            pubkey: txRaw.transaction.message.accountKeys[accountId]
        });
    });
    let tx = {
        programId: txRaw.transaction.message.accountKeys[txRaw.transaction.message.instructions[0].programIdIndex],
        data: bs58_1.default.decode(txRaw.transaction.message.instructions[0].data),
        keys: keys
    };
    return tx;
}
function parseTx(func) {
    return (txId, ...args) => __awaiter(this, void 0, void 0, function* () {
        try {
            const txRaw = yield env_1.default.connection.getTransaction(txId, { commitment: "confirmed" }); //@ts-ignore
            const tx = rawToParsed(txRaw); //@ts-ignore
            if (txRaw.transaction.message.instructions.length !== 1)
                return false;
            if (!tx.programId.equals(env_1.default.MarketplaceProgram))
                return false;
            return yield func(tx, ...args);
        }
        catch (_e) {
            return false;
        }
    });
}
function checkCancelTx(tx, offerAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        if (tx.data[0] !== 2)
            return false;
        if (!tx.keys[2].pubkey.equals(offerAddress))
            return false;
        return true;
    });
}
function checkAcceptTx(tx, buyer, offerAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        if (tx.data[0] !== 3)
            return false;
        if (!tx.keys[0].pubkey.equals(buyer))
            return false;
        if (!tx.keys[3].pubkey.equals(offerAddress))
            return false;
        return true;
    });
}
function checkPlaceTx(tx, seller, offerAddress, deckAddress, price, name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (tx.data[0] !== 1)
            return false;
        if (!tx.keys[0].pubkey.equals(seller))
            return false;
        if (!tx.keys[1].pubkey.equals(deckAddress))
            return false;
        if (!tx.keys[2].pubkey.equals(offerAddress))
            return false; //@ts-ignore
        const idxArray = (0, big_byte_1.toLittleEndian)((0, big_integer_1.default)(price), 8);
        if (JSON.stringify(Array.from(tx.data)) !== JSON.stringify([1].concat(Array.from(idxArray))))
            return false;
        const offer = yield (0, parsers_1.parseOffer)(offerAddress); //@ts-ignore
        const meta = yield (0, parsers_1.parseMetadata)(yield (0, accounts_1.getMetadataAddress)(offer.nft_mint)); //@ts-ignore
        if (extractString(meta.data.name) !== name)
            return false;
        return true;
    });
}
exports.default = {
    checkPlace: parseTx(checkPlaceTx),
    checkAccept: parseTx(checkAcceptTx),
    checkCancel: parseTx(checkCancelTx)
};
//# sourceMappingURL=transaction-parser.js.map