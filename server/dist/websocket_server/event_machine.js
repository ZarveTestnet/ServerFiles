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
Object.defineProperty(exports, "__esModule", { value: true });
class EventMachine {
    constructor() {
        this.subscriptions = new Map();
    }
    pushUpdate(offer) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = this.subscriptions.get(offer.deckName); //@ts-ignore
            try { //@ts-ignore
                value.forEach((socket, _index) => {
                    socket.emit('update', offer);
                });
            }
            catch (_e) { }
        });
    }
    subscribe(index, socket, deckName) {
        if (!this.subscriptions.has(deckName))
            this.subscriptions.set(deckName, new Map()); //@ts-ignore
        this.subscriptions.set(deckName, this.subscriptions.get(deckName).set(index, socket));
    }
    unSubscribe(index, deckName) {
        try { //@ts-ignore
            this.subscriptions.get(deckName).delete(index);
        }
        catch (_e) { }
    }
    unSubscribeAll(index) {
        this.subscriptions.forEach((value, key) => {
            value.delete(index);
        });
    }
}
const EM = new EventMachine();
exports.default = EM;
//# sourceMappingURL=event_machine.js.map