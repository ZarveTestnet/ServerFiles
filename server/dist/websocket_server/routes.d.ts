import Deck from "../controllers/deck.controller";
import Offer from "../controllers/offer.controller";
import Raffle from "../controllers/raffle.controller";
declare function none(...args: any[]): {};
declare const _default: {
    GetGlobal: () => Promise<{
        topCollections: import("../types").IDeck[];
        collectionList: string[];
        collectionAddress: object;
        recentRaffles: import("../types").IRaffle[];
    }>;
    GetDeck: (name: string) => Promise<{
        Deck: any;
        Offers: any;
    }>;
    GetUserOffers: typeof Offer.getUserActiveOffers;
    GetPastOffers: typeof Offer.getUserPastOffers;
    CreateOffer: typeof Offer.create;
    CancelOffer: typeof Offer.delete;
    AcceptOffer: typeof Offer.finish;
    InsertCollection: typeof Deck.create;
    CreateRaffle: typeof Raffle.create;
    ApproveRaffle: typeof none;
    RaffleTickets: typeof none;
    Subscribe: (socket: any, ...args: any[]) => void;
    UnSubscribe: (socket: any, ...args: any[]) => void;
    SocketRequired: Set<string>;
    VerificationRequired: Set<string>;
};
export default _default;
//# sourceMappingURL=routes.d.ts.map