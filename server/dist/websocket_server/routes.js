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
const global_state_1 = __importDefault(require("./global_state"));
const event_machine_1 = __importDefault(require("./event_machine"));
function none(...args) {
    console.log("Not implemented!");
    return {};
}
exports.default = {
    GetGlobal: global_state_1.default.pack,
    GetDeck: (name) => __awaiter(void 0, void 0, void 0, function* () {
        const deck = yield deck_controller_1.default.getByName(name);
        return { Deck: deck, Offers: yield offer_controller_1.default.getActiveOffers(deck.id) };
    }),
    GetUserOffers: offer_controller_1.default.getUserActiveOffers,
    GetPastOffers: offer_controller_1.default.getUserPastOffers,
    CreateOffer: offer_controller_1.default.create,
    CancelOffer: offer_controller_1.default.delete,
    AcceptOffer: offer_controller_1.default.finish,
    InsertCollection: deck_controller_1.default.create,
    CreateRaffle: raffle_controller_1.default.create,
    ApproveRaffle: none,
    RaffleTickets: none,
    Subscribe: (socket, ...args) => {
        args.forEach((name) => {
            event_machine_1.default.subscribe(socket.index, socket, name);
        });
    },
    UnSubscribe: (socket, ...args) => {
        args.forEach((name) => {
            event_machine_1.default.unSubscribe(socket.index, name);
        });
    },
    SocketRequired: new Set(['Subscribe', 'UnSubscribe']),
    VerificationRequired: new Set(["GetUserOffers", "GetPastOffers", 'CreateOffer', 'CancelOffer', 'AcceptOffer'])
};
//# sourceMappingURL=routes.js.map