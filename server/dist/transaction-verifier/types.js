"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyAnswer = exports.VerifyType = void 0;
var VerifyType;
(function (VerifyType) {
    VerifyType[VerifyType["OfferPlaced"] = 0] = "OfferPlaced";
    VerifyType[VerifyType["OfferCanceled"] = 1] = "OfferCanceled";
    VerifyType[VerifyType["OfferAccepted"] = 2] = "OfferAccepted";
})(VerifyType = exports.VerifyType || (exports.VerifyType = {}));
var VerifyAnswer;
(function (VerifyAnswer) {
    VerifyAnswer[VerifyAnswer["False"] = 0] = "False";
    VerifyAnswer[VerifyAnswer["True"] = 1] = "True";
    VerifyAnswer[VerifyAnswer["Rejected"] = 2] = "Rejected";
    VerifyAnswer[VerifyAnswer["Missed"] = 3] = "Missed";
})(VerifyAnswer = exports.VerifyAnswer || (exports.VerifyAnswer = {}));
//# sourceMappingURL=types.js.map