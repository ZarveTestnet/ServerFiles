export declare enum Error {
    Ok = 0,
    NotExist = 1,
    AlreadyExist = 2,
    CriticalError = 3,
    InvalidMessage = 4,
    MethodNotFound = 5,
    VerificationFailed = 6
}
export interface IDeck {
    address: string;
    name: string;
    image: string;
    collection: string;
    supply: number;
    volume: number;
    floor: number;
    trade_volume: number;
    description: string;
}
export interface IRaffle {
    address: string;
    deck_address: string;
    deck_name: string;
    collection: string;
    image: string;
    start: number;
    price: number;
    supply: number;
}
export interface IOffer {
    address: string;
    deck_name: string;
    name: string;
    image: string;
    seller: string;
    price: string;
}
export declare enum OfferUpdateType {
    Created = 0,
    Canceled = 1,
    Accepted = 2
}
export interface OfferUpdate {
    type: OfferUpdateType;
    offer: IOffer | undefined;
    deckName: string;
    offerAddress: string;
}
//# sourceMappingURL=types.d.ts.map