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
exports.notExist = exports.exist = void 0;
const db_1 = __importDefault(require("../db/db"));
const types_1 = require("../types");
function exist(table, attribute, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const s = "select * from " + table + " where " + table + "." + attribute + "='" + value + "'";
        const res = yield db_1.default.query(s);
        if (res.rowCount === 0) {
            //console.log("Not exist")
            throw types_1.Error.NotExist;
        }
    });
}
exports.exist = exist;
function notExist(table, attribute, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const s = "select * from " + table + " where " + table + "." + attribute + "='" + value + "'";
        const res = yield db_1.default.query(s);
        if (res.rowCount !== 0) {
            //console.log("Already exist")
            throw types_1.Error.AlreadyExist;
        }
    });
}
exports.notExist = notExist;
//# sourceMappingURL=middlewear.js.map