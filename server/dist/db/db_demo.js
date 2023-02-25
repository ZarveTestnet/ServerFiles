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
const deck_controller_1 = __importDefault(require("../controllers/deck.controller"));
const offer_controller_1 = __importDefault(require("../controllers/offer.controller"));
const raffle_controller_1 = __importDefault(require("../controllers/raffle.controller"));
const web3_js_1 = require("@solana/web3.js");
const utils_1 = __importDefault(require("../utils"));
const db_clear_1 = __importDefault(require("./db_clear"));
const unique_names_generator_1 = require("unique-names-generator");
const global_state_1 = __importDefault(require("../websocket_server/global_state"));
function newKey() {
    return new web3_js_1.Keypair().publicKey.toBase58();
}
function newName(length = 1) {
    return (0, unique_names_generator_1.uniqueNamesGenerator)({
        dictionaries: [unique_names_generator_1.adjectives, unique_names_generator_1.colors, unique_names_generator_1.animals, unique_names_generator_1.names],
        style: 'capital',
        length: length
    });
}
exports.default = (deckNumber, offerLimit) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_clear_1.default)();
    for (let i = 0; i < deckNumber; i++) {
        const deckName = newName(2);
        //const deckImage = "http://"+newName(3)+".com";
        const deckImage = "https://loremflickr.com/320/320";
        yield deck_controller_1.default.create(newKey(), deckName, deckImage, newKey(), Math.ceil(Math.random() * 20000).toString(), "Lorem Description");
        const offerCount = Math.ceil(Math.random() * offerLimit);
        if (Math.random() > 0.5) {
            let delta = Math.ceil(Math.random() * 604800);
            delta = Math.random() > 0.5 ? delta : delta * (-1);
            const raffleAddress = newKey();
            yield raffle_controller_1.default.create(deckName, raffleAddress, (utils_1.default.getTime() + delta).toString(), (Math.ceil(Math.random() * 30) * 1e9).toString(), Math.ceil(Math.random() * 20000).toString());
            if (Math.random() > 0.75) {
                yield raffle_controller_1.default.finish(raffleAddress);
            }
        }
        else {
            for (let i = 0; i < offerCount; i++) {
                const offerAddress = newKey();
                //const nftImage = "http://"+newName(2)+".com"
                const nftImage = "https://loremflickr.com/240/240";
                yield offer_controller_1.default.create(newKey(), deckName, offerAddress, newName(), nftImage, (Math.ceil(Math.random() * 500) * 1e9).toString());
                if (Math.random() > 0.75) {
                    yield offer_controller_1.default.finish(newKey(), offerAddress);
                }
            }
        }
    }
    console.log("Generated Database");
    yield global_state_1.default.update();
});
//# sourceMappingURL=db_demo.js.map