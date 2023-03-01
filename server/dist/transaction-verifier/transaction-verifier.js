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
exports.Tx = exports.processVerifyResponse = exports.removeTrustedClient = exports.addTrustedClient = exports.trustedClients = void 0;
const transaction_parser_1 = __importDefault(require("./transaction-parser"));
var VerifyType;
(function (VerifyType) {
    VerifyType[VerifyType["OfferPlaced"] = 0] = "OfferPlaced";
    VerifyType[VerifyType["OfferCanceled"] = 1] = "OfferCanceled";
    VerifyType[VerifyType["OfferAccepted"] = 2] = "OfferAccepted";
})(VerifyType || (VerifyType = {}));
var VerifyAnswer;
(function (VerifyAnswer) {
    VerifyAnswer[VerifyAnswer["False"] = 0] = "False";
    VerifyAnswer[VerifyAnswer["True"] = 1] = "True";
    VerifyAnswer[VerifyAnswer["Rejected"] = 2] = "Rejected";
    VerifyAnswer[VerifyAnswer["Missed"] = 3] = "Missed";
})(VerifyAnswer || (VerifyAnswer = {}));
exports.trustedClients = new Map();
let trustedClientsCount = 0;
function addTrustedClient(index, socket) {
    if (!exports.trustedClients.has(index)) {
        exports.trustedClients.set(index, socket);
        trustedClientsCount++;
    }
}
exports.addTrustedClient = addTrustedClient;
function removeTrustedClient(index) {
    if (exports.trustedClients.delete(index)) {
        trustedClientsCount--;
    }
}
exports.removeTrustedClient = removeTrustedClient;
const delegatedVerifications = new Map(); // <txSignature, Delegate>
function countdownVerification(tx) {
    const delegate = delegatedVerifications.get(tx);
    if (!delegate)
        return;
    console.log(delegate);
    delegatedVerifications.delete(tx);
    delegate.resolver(delegate.accepted >= delegate.rejected);
}
const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};
function randInt(max) {
    return Math.floor(Math.random() * (max + 1));
}
function randomSubArray(a, count) {
    if (a.length <= count)
        return a;
    let b = [];
    let length = a.length;
    while (count > 0) {
        b.push(a[randInt(length)]);
        length--;
        count--;
    }
    return b;
}
function sendVerifyRequests(req, count) {
    return __awaiter(this, void 0, void 0, function* () {
        const dArray = randomSubArray([...exports.trustedClients], count);
        const delegates = [];
        const delegatesIndex = [];
        dArray.forEach(([index, socket]) => {
            delegates.push(socket);
            delegatesIndex.push(index);
        });
        console.log(delegatesIndex);
        delegates.forEach((s) => {
            s.emit('verify_request', req);
        });
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            delegatedVerifications.set(req.tx, {
                sockets: new Set(delegatesIndex),
                left: count,
                rejected: 0,
                accepted: 0,
                missed: 0,
                resolver: resolve
            });
            //console.log("Waiting")
            yield delay(5000);
            //console.log("To long, starting countdown");
            countdownVerification(req.tx);
        }));
    });
}
function processVerifyResponse(res, socketIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const delegate = delegatedVerifications.get(res.tx);
            if (!delegate)
                return;
            if (!delegate.sockets.delete(socketIndex))
                return;
            switch (res.answer) {
                case VerifyAnswer.True:
                    delegate.accepted++;
                    break;
                case VerifyAnswer.False:
                    delegate.left--;
                    break;
                default: {
                    delegate.missed++;
                }
            }
            delegate.left--;
            if (delegate.left <= 0)
                countdownVerification(res.tx);
        }
        catch (_e) { }
    });
}
exports.processVerifyResponse = processVerifyResponse;
function wrapper(func, type) {
    return (...args) => __awaiter(this, void 0, void 0, function* () {
        if (trustedClientsCount < 3) {
            return yield func(...args);
        }
        else {
            let a = [];
            args.forEach((aa) => {
                a.push(aa.toString());
            });
            return yield sendVerifyRequests({
                type,
                tx: a[0],
                args: a.slice(1, a.length)
            }, 3);
        }
    });
}
exports.Tx = {
    checkCancel: wrapper(transaction_parser_1.default.checkCancel, VerifyType.OfferCanceled),
    checkPlace: wrapper(transaction_parser_1.default.checkPlace, VerifyType.OfferPlaced),
    checkAccept: wrapper(transaction_parser_1.default.checkAccept, VerifyType.OfferAccepted),
};
//# sourceMappingURL=transaction-verifier.js.map