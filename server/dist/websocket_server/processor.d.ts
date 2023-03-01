import { Error } from "../types";
export interface MessageIn {
    method: string;
    params: string[];
    id: number;
    verification: undefined | {
        key: string;
        signature: number[];
    };
    tx: string | undefined;
}
export interface MessageOut {
    result: object | undefined;
    status: Error;
    id: number;
}
declare const _default: (socket: any, req: any) => Promise<MessageOut>;
export default _default;
//# sourceMappingURL=processor.d.ts.map