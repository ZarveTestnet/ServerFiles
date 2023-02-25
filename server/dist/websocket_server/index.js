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
const socket_io_1 = require("socket.io");
const env_1 = __importDefault(require("../env"));
const event_machine_1 = __importDefault(require("./event_machine"));
const processor_1 = __importDefault(require("./processor"));
const global_state_1 = __importDefault(require("./global_state"));
let length = 0;
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    yield global_state_1.default.load();
    const io = new socket_io_1.Server(env_1.default.SocketPORT, { transports: ['websocket'] });
    console.log("WebSocket Server started PORT:", env_1.default.SocketPORT);
    io.on("connection", (socket) => {
        socket.index = length;
        length++;
        socket.on('call', (req) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, processor_1.default)(socket, req);
            socket.emit('response', res);
        }));
        socket.on('disconnect', (args) => {
            event_machine_1.default.unSubscribeAll(socket.index);
        });
    });
});
//# sourceMappingURL=index.js.map