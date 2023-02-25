import { OfferUpdate } from "../types";
import { Socket } from "socket.io";
declare class EventMachine {
    subscriptions: Map<string, Map<number, Socket>>;
    pushUpdate(offer: OfferUpdate): Promise<void>;
    subscribe(index: number, socket: Socket, deckName: string): void;
    unSubscribe(index: number, deckName: string): void;
    unSubscribeAll(index: number): void;
}
declare const EM: EventMachine;
export default EM;
//# sourceMappingURL=event_machine.d.ts.map