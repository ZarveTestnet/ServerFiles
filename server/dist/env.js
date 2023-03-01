"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
exports.default = {
    SocketPORT: 666,
    HttpPort: 7000,
    connection: new web3_js_1.Connection("https://api.devnet.solana.com"),
    MarketplaceProgram: new web3_js_1.PublicKey("7oN9YSCxyUjPd791FJUBrKin1Lg2RaoGwcdLr6B94aHH"),
};
//# sourceMappingURL=env.js.map