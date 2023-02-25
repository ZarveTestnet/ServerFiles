export default class Raffle {
    static create(deckName: string, address: string, startDate: string, price: string, supply: string): Promise<void>;
    static getRecent(timeLimit: number): Promise<any>;
    static finish(address: string): Promise<void>;
}
//# sourceMappingURL=raffle.controller.d.ts.map