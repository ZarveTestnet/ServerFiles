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
const status_controller_1 = __importDefault(require("./status.controller"));
const middlewear_1 = require("./middlewear");
const global_state_1 = __importDefault(require("../websocket_server/global_state"));
class Deck {
    static print() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(global_state_1.default);
        });
    }
    static create(address, name, image, collection, supply, description) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, middlewear_1.notExist)('deck', 'address', address);
            yield (0, middlewear_1.notExist)('deck', 'name', name);
            const newDeck = yield db_1.default.query(`insert into deck (name, image, address, collection, description) values ($1, $2, $3, $4, $5) returning *`, [name, image, address, collection, description]);
            yield status_controller_1.default.create(newDeck.rows[0].id, supply, "0", "0");
            yield global_state_1.default.collectionAdded(name, collection);
        });
    }
    static getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, middlewear_1.exist)('deck', 'name', name);
            const res = yield db_1.default.query(`select deck.id, deck.name, deck.image, deck.address, deck.collection, deck.description, status.supply, status.floor, status.volume, status.trade_volume 
                                        from deck 
                                        join status on status.deck_id = deck.id
                                        where deck.name = ($1)`, [name]);
            return res.rows[0];
        });
    }
    static getTop(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.default.query(`select deck.id, deck.name, deck.image, deck.address, deck.collection, deck.description, status.supply, status.floor, status.volume, status.trade_volume 
                                    from deck 
                                    join status on status.deck_id = deck.id
                                    order by status.volume desc
                                    limit ($1)`, [limit]);
            return res.rows;
        });
    }
    static getListed() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.default.query(`select deck.name, deck.collection from deck`);
            return res.rows;
        });
    }
}
exports.default = Deck;
//# sourceMappingURL=deck.controller.js.map