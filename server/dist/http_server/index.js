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
//@ts-ignore
const express_1 = __importDefault(require("express")); // @ts-ignore
const cors_1 = __importDefault(require("cors"));
const env_1 = __importDefault(require("../env"));
const processor_1 = __importDefault(require("../websocket_server/processor"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/call', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const msgIn = req.body;
            if (!msgIn) {
                console.log('Invalid Message In:', req.body);
                res.status(500);
            }
            return res.json(yield (0, processor_1.default)({}, msgIn));
        }
        catch (e) {
            console.log(e); //@ts-ignore
            return res.status(404).json({ error: e.toString() });
        }
    });
});
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(env_1.default.HttpPort, () => {
        console.log(`HTTP Server started on port:`, env_1.default.HttpPort);
    });
});
//# sourceMappingURL=index.js.map