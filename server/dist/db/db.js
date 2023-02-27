"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const Pool = pg_1.default.Pool;
exports.default = new Pool({
    user: 'root',
    password: '1234',
    host: 'localhost',
    port: 6669,
    database: 'marketplace'
});
//# sourceMappingURL=db.js.map