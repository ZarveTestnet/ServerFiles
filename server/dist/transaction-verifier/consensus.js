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
exports.Tx = exports.processVerifyResponse = void 0;
const transaction_parser_1 = __importDefault(require("./transaction-parser"));
const types_1 = require("./types");
const trusted_1 = require("./trusted");
const delegatedVerifications = new Map(); // <txSignature, Delegate>
function countdownVerification(tx) {
    const quorum = delegatedVerifications.get(tx);
    if (!quorum)
        return;
    console.log(quorum);
    delegatedVerifications.delete(tx);
    quorum.resolver(quorum.accepted >= quorum.rejected);
}
const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};
function sendVerifyRequests(req, count) {
    return __awaiter(this, void 0, void 0, function* () {
        const [acceptors, acceptorIndex] = (0, trusted_1.gatherQuorum)();
        acceptors.forEach((s) => {
            s.emit('verify_request', req);
        });
        return new Promise((resolve, _reject) => __awaiter(this, void 0, void 0, function* () {
            delegatedVerifications.set(req.tx, {
                sockets: new Set(acceptorIndex),
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
                case types_1.VerifyAnswer.True:
                    delegate.accepted++;
                    break;
                case types_1.VerifyAnswer.False:
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
        if (trusted_1.trustedClientsCount < 3) {
            return yield func(...args);
        }
        else { // Delegating to trusted clients
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
    checkCancel: wrapper(transaction_parser_1.default.checkCancel, types_1.VerifyType.OfferCanceled),
    checkPlace: wrapper(transaction_parser_1.default.checkPlace, types_1.VerifyType.OfferPlaced),
    checkAccept: wrapper(transaction_parser_1.default.checkAccept, types_1.VerifyType.OfferAccepted),
};
//# sourceMappingURL=consensus.js.map