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
const raffle_controller_1 = __importDefault(require("../controllers/raffle.controller"));
const status_controller_1 = __importDefault(require("../controllers/status.controller"));
const event_machine_1 = __importDefault(require("./event_machine"));
let GS;
class GlobalState {
    constructor() {
        this.topCollections = [];
        this.collectionList = [];
        this.collectionAddress = {};
        this.recentRaffles = [];
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            this.topCollections = yield deck_controller_1.default.getTop(10);
            this.recentRaffles = yield raffle_controller_1.default.getRecent(5);
            const decks = yield deck_controller_1.default.getListed();
            this.collectionList = Array(decks.length);
            this.collectionAddress = {};
            let index = 0;
            decks.forEach((d) => {
                this.collectionList[index] = d.name;
                this.collectionAddress[d.collection] = index;
                index++;
            });
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield status_controller_1.default.updateAll();
            yield GS.load();
        });
    }
    pack() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                topCollections: GS.topCollections,
                collectionList: GS.collectionList,
                collectionAddress: GS.collectionAddress,
                recentRaffles: GS.recentRaffles
            };
        });
    }
    collectionAdded(name, collectionAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            GS.collectionList.push(name);
            GS.collectionAddress[collectionAddress] = GS.collectionList.length - 1;
        });
    }
    raffleAdded() {
        return __awaiter(this, void 0, void 0, function* () {
            GS.recentRaffles = yield raffle_controller_1.default.getRecent(5);
        });
    }
    offerUpdated(type, offerAddress, deckName, offer) {
        return __awaiter(this, void 0, void 0, function* () {
            const offerUpdate = {
                type,
                offerAddress,
                deckName,
                offer
            };
            event_machine_1.default.pushUpdate(offerUpdate);
        });
    }
}
GS = new GlobalState();
exports.default = GS;
//# sourceMappingURL=global_state.js.map