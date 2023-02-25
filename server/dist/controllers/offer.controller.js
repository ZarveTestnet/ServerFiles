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
const db_1 = __importDefault(require("../db/db"));
const deck_controller_1 = __importDefault(require("./deck.controller"));
const utils_1 = __importDefault(require("../utils"));
const middlewear_1 = require("./middlewear");
const global_state_1 = __importDefault(require("../websocket_server/global_state"));
const types_1 = require("../types");
const status_controller_1 = __importDefault(require("./status.controller"));
class Offer {
    static create(seller, deckName, offerAddress, nftName, nftImage, price) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, middlewear_1.exist)('deck', 'name', deckName);
            const deckId = (yield deck_controller_1.default.getByName(deckName)).id;
            const newOffer = yield db_1.default.query(`insert into offer (address, deck_id, seller, name, image, price) values ($1, $2, $3, $4, $5, $6) 
                                        returning *`, [offerAddress, deckId, seller, nftName, nftImage, parseInt(price)]);
            const offer = yield db_1.default.query(`select offer.address, deck.name as deck_name, offer.name, offer.image, offer.seller, offer.price from offer
                                    join deck on deck.id=offer.deck_id
                                    where offer.id=($1)`, [newOffer.rows[0].id]);
            yield global_state_1.default.offerUpdated(types_1.OfferUpdateType.Created, offerAddress, deckName, offer.rows[0]);
            yield status_controller_1.default.updateFloor(deckId);
        });
    }
    static delete(address) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, middlewear_1.exist)('offer', 'address', address);
            const deck = yield db_1.default.query(`select deck.name, deck.id from offer join deck on deck.id=offer.deck_id where offer.address=($1)`, [address]);
            yield db_1.default.query(`delete from offer where offer.address=($1)`, [address]);
            yield global_state_1.default.offerUpdated(types_1.OfferUpdateType.Canceled, address, deck.rows[0].name, undefined);
            yield status_controller_1.default.updateFloor(deck.rows[0].id);
        });
    }
    static finish(buyer, address) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, middlewear_1.exist)('offer', 'address', address);
            const deck = yield db_1.default.query(`select deck.name, deck.id from offer join deck on deck.id=offer.deck_id where offer.address=($1)`, [address]);
            yield db_1.default.query(`update offer
                        set buyer=($1), fulfilled=true, time=($2)
                        where offer.address=($3)`, [buyer, utils_1.default.getTime(), address]);
            yield global_state_1.default.offerUpdated(types_1.OfferUpdateType.Accepted, address, deck.rows[0].name, undefined);
            yield status_controller_1.default.updateFloor(deck.rows[0].id);
        });
    }
    static getActiveOffers(deckId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.default.query(`select offer.address, deck.name as deck_name, offer.name, offer.image, offer.seller, offer.price from offer
                                    join deck on deck.id=offer.deck_id
                                    where offer.deck_id=($1) and offer.fulfilled=false`, [deckId]);
            return res.rows;
        });
    }
    static getUserActiveOffers(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.default.query(`select offer.address, deck.name as deck_name, offer.name, offer.image, offer.seller, offer.price from offer
                                    join deck on deck.id=offer.deck_id
                                    where offer.seller=($1) and offer.fulfilled=false`, [user]);
            return res.rows;
        });
    }
    static getUserPastOffers(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.default.query(`select deck.name as deck_name, offer.name, offer.price, offer.time from offer
                                    join deck on deck.id=offer.deck_id
                                    where offer.seller=($1) and offer.fulfilled=true limit 10`, [user]);
            return res.rows;
        });
    }
}
exports.default = Offer;
//# sourceMappingURL=offer.controller.js.map