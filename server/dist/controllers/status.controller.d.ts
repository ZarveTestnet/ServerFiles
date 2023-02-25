export default class Status {
    static create(deckId: number, supply: string, volume: string, tradeVolume: string): Promise<void>;
    static updateDeck(deckId: number, statusId: number): Promise<void>;
    static updateAll(): Promise<void>;
    static updateFloor(deckId: number): Promise<void>;
}
//# sourceMappingURL=status.controller.d.ts.map