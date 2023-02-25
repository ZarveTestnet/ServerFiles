export default class Deck {
    static print(): Promise<void>;
    static create(address: string, name: string, image: string, collection: string, supply: string, description: string): Promise<void>;
    static getByName(name: string): Promise<any>;
    static getTop(limit: number): Promise<any>;
    static getListed(): Promise<any>;
}
//# sourceMappingURL=deck.controller.d.ts.map