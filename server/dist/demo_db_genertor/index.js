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
const wallet_1 = __importDefault(require("./wallet"));
const transactions_1 = require("./token/transactions");
const metadata_1 = require("./token/metadata");
const collection_1 = require("./token/collection");
const global_state_1 = __importDefault(require("../websocket_server/global_state"));
const deck_controller_1 = __importDefault(require("../controllers/deck.controller"));
const offer_controller_1 = __importDefault(require("../controllers/offer.controller"));
const lorem_ipsum_1 = require("lorem-ipsum");
function Do() {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet = new wallet_1.default();
        //await wallet.airdrop();
        yield wallet.airdrop();
        yield global_state_1.default.load();
        const { collectionMetadata, nftMetadatas } = yield (0, collection_1.generateCollection)();
        const collectionUrl = (0, metadata_1.writeMetadata)(collectionMetadata, collectionMetadata.name);
        const [collectionMint, collectionMeta, collectionMaster] = yield (0, transactions_1.createCollection)(collectionMetadata.name, collectionMetadata.symbol, collectionUrl, wallet);
        const deck = yield (0, transactions_1.createDeck)(wallet, collectionMint);
        const lorem = new lorem_ipsum_1.LoremIpsum({
            sentencesPerParagraph: {
                max: 8,
                min: 4
            },
            wordsPerSentence: {
                max: 16,
                min: 8
            }
        });
        const description = lorem.generateParagraphs(1).slice(0, 1000);
        yield deck_controller_1.default.create(deck.toBase58(), collectionMetadata.name, collectionMetadata.image, collectionMint.toBase58(), (nftMetadatas.length * 100).toString(), description);
        for (let i = 0; i < nftMetadatas.length; i++) {
            const nftMetadata = nftMetadatas[i];
            const nftUrl = (0, metadata_1.writeMetadata)(nftMetadata, nftMetadata.symbol + i.toString());
            const [mint, account, meta] = yield (0, transactions_1.createNFT)(nftMetadata.name, nftMetadata.symbol, nftUrl, wallet, collectionMint, collectionMeta, collectionMaster);
            const offer = yield (0, transactions_1.createOffer)(wallet, deck, mint, account, meta);
            yield offer_controller_1.default.create("0", wallet.publicKey.toBase58(), collectionMetadata.name, offer.toBase58(), nftMetadata.name, nftMetadata.image, "65536");
        }
        console.log(yield global_state_1.default.pack());
    });
}
Do();
//# sourceMappingURL=index.js.map