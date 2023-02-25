import { IDeck, IOffer, IRaffle, OfferUpdateType } from "../types";
declare let GS: GlobalState;
declare class GlobalState {
    topCollections: IDeck[];
    collectionList: string[];
    collectionAddress: object;
    recentRaffles: IRaffle[];
    constructor();
    load(): Promise<void>;
    update(): Promise<void>;
    pack(): Promise<{
        topCollections: IDeck[];
        collectionList: string[];
        collectionAddress: object;
        recentRaffles: IRaffle[];
    }>;
    collectionAdded(name: any, collectionAddress: any): Promise<void>;
    raffleAdded(): Promise<void>;
    offerUpdated(type: OfferUpdateType, offerAddress: string, deckName: string, offer: IOffer | undefined): Promise<void>;
}
export default GS;
//# sourceMappingURL=global_state.d.ts.map