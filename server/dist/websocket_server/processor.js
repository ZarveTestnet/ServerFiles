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
const types_1 = require("../types");
const routes_1 = __importDefault(require("./routes"));
const routes_2 = __importDefault(require("./routes"));
const verification_1 = require("./verification");
function process(socket, req) {
    return __awaiter(this, void 0, void 0, function* () {
        const msgIn = req;
        if (!msgIn)
            throw types_1.Error.InvalidMessage;
        const route = routes_1.default[msgIn.method];
        if (!route)
            throw types_1.Error.MethodNotFound;
        let res;
        if (routes_2.default.VerificationRequired.has(msgIn.method)) { //@ts-ignore
            yield (0, verification_1.verify)(msgIn.verification, socket);
        }
        if (routes_2.default.SocketRequired.has(msgIn.method)) {
            res = yield route(socket, ...msgIn.params);
        }
        else {
            if (msgIn.tx) {
                res = yield route(msgIn.tx, ...msgIn.params);
            }
            else {
                res = yield route(...msgIn.params);
            }
        }
        return {
            result: res,
            status: types_1.Error.Ok,
            id: msgIn.id
        };
    });
}
exports.default = (socket, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield process(socket, req);
    }
    catch (e) {
        if (typeof (e) == "number") {
            return {
                result: undefined,
                status: e,
                id: req.id
            };
        }
        else {
            console.log(e);
            return {
                result: undefined,
                status: types_1.Error.CriticalError,
                id: req.id
            };
        }
    }
});
//# sourceMappingURL=processor.js.map