"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferUpdateType = exports.Error = void 0;
var Error;
(function (Error) {
    Error[Error["Ok"] = 0] = "Ok";
    Error[Error["NotExist"] = 1] = "NotExist";
    Error[Error["AlreadyExist"] = 2] = "AlreadyExist";
    Error[Error["CriticalError"] = 3] = "CriticalError";
    Error[Error["InvalidMessage"] = 4] = "InvalidMessage";
    Error[Error["MethodNotFound"] = 5] = "MethodNotFound";
    Error[Error["VerificationFailed"] = 6] = "VerificationFailed";
})(Error = exports.Error || (exports.Error = {}));
var OfferUpdateType;
(function (OfferUpdateType) {
    OfferUpdateType[OfferUpdateType["Created"] = 0] = "Created";
    OfferUpdateType[OfferUpdateType["Canceled"] = 1] = "Canceled";
    OfferUpdateType[OfferUpdateType["Accepted"] = 2] = "Accepted";
})(OfferUpdateType = exports.OfferUpdateType || (exports.OfferUpdateType = {}));
//# sourceMappingURL=types.js.map