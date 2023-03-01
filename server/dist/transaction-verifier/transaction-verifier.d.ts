import { Socket } from "socket.io";
declare enum VerifyAnswer {
    False = 0,
    True = 1,
    Rejected = 2,
    Missed = 3
}
interface VerifyResponse {
    tx: string;
    answer: VerifyAnswer;
}
export declare const trustedClients: Map<number, Socket>;
export declare function addTrustedClient(index: number, socket: Socket): void;
export declare function removeTrustedClient(index: number): void;
export declare function processVerifyResponse(res: VerifyResponse, socketIndex: number): Promise<void>;
export declare const Tx: {
    checkCancel: Function;
    checkPlace: Function;
    checkAccept: Function;
};
export {};
//# sourceMappingURL=transaction-verifier.d.ts.map