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
const utils_1 = __importDefault(require("../utils"));
class Status {
    static create(deckId, supply, volume, tradeVolume) {
        return __awaiter(this, void 0, void 0, function* () {
            const _newStatus = yield db_1.default.query(`insert into status (deck_id, supply, updated, volume, floor, trade_volume) values ($1, $2, $3, $4, $5, $6) returning *`, [deckId, parseInt(supply), utils_1.default.getTime(), parseInt(volume), 0, parseInt(tradeVolume)]);
        });
    }
    static updateDeck(deckId, statusId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bottomBound = utils_1.default.getTime() - 86400;
            let tradeVolume = (yield db_1.default.query(`select sum(offer.price) from offer
                                      where offer.fulfilled=true and offer.time > ($1) and offer.deck_id=($2)`, [bottomBound, deckId])).rows[0].sum;
            let volume = (yield db_1.default.query(`select sum(offer.price) from offer
                                 where offer.fulfilled=false and offer.deck_id=($1)`, [deckId])).rows[0].sum; //
            volume = volume != null ? volume : 0;
            tradeVolume = tradeVolume != null ? tradeVolume : 0;
            yield db_1.default.query(`update status
                        set volume=($1), trade_volume=($2), updated=($3)
                        where status.id=($4)`, [volume, tradeVolume, utils_1.default.getTime(), statusId]);
        });
    }
    static updateAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.default.query(`select deck.id as deck_id, status.id as status_id from deck join status on deck.id=status.deck_id`);
            for (let i = 0; i < res.rowCount; i++) {
                yield Status.updateDeck(res.rows[i].deck_id, res.rows[i].status_id);
            }
            console.log("Updated All Statuses");
        });
    }
    static updateFloor(deckId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.default.query('select min(offer.price) from offer where offer.deck_id=($1) and offer.buyer is null', [deckId]);
            yield db_1.default.query('update status set floor=($1) where status.deck_id=($2)', [res.rows[0].min, deckId]);
        });
    }
}
exports.default = Status;
//# sourceMappingURL=status.controller.js.map