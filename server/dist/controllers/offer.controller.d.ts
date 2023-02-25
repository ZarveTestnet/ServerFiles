export default class Offer {
    static create(seller: string, deckName: string, offerAddress: string, nftName: string, nftImage: string, price: string): Promise<void>;
    static delete(address: string): Promise<void>;
    static finish(buyer: string, address: string): Promise<void>;
    static getActiveOffers(deckId: number): Promise<any>;
    static getUserActiveOffers(user: string): Promise<any>;
    static getUserPastOffers(user: string): Promise<any>;
}
//# sourceMappingURL=offer.controller.d.ts.map