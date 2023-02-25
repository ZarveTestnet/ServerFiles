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
class Raffle {
    static create(deckName, address, startDate, price, supply) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, middlewear_1.notExist)('raffle', 'address', address);
            const deckId = (yield deck_controller_1.default.getByName(deckName)).id;
            const _newRaffle = yield db_1.default.query(`insert into raffle (address, deck_id, start, supply, price) values ($1, $2, $3, $4, $5) 
                                        returning *`, [address, deckId, parseInt(startDate), parseInt(supply), parseInt(price)]);
            yield global_state_1.default.raffleAdded();
        });
    }
    static getRecent(timeLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            const upperBound = timeLimit + utils_1.default.getTime();
            const bottomBound = timeLimit - utils_1.default.getTime();
            const res = yield db_1.default.query(`select raffle.address, deck.address as deck_address, deck.name as deck_name, deck.collection, deck.image, raffle.start, raffle.price, raffle.supply
                                    from raffle join deck on deck.id=raffle.deck_id
                                    where raffle.start > ($1) and raffle.start < ($2) and raffle.fulfilled=false`, [bottomBound, upperBound]);
            return res.rows;
        });
    }
    static finish(address) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, middlewear_1.exist)('raffle', 'address', address);
            yield db_1.default.query(`update raffle
                        set fulfilled=true
                        where raffle.address=($1)`, [address]);
        });
    }
}
exports.default = Raffle;
//# sourceMappingURL=raffle.controller.js.map