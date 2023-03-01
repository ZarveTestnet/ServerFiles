import { Socket } from "socket.io";
export declare const trustedClients: Map<number, Socket>;
export declare let trustedClientsCount: number;
export declare function addTrustedClient(index: number, socket: Socket): void;
export declare function removeTrustedClient(index: number): void;
export declare function gatherQuorum(count: number): [Socket[], number[]];
//# sourceMappingURL=trusted.d.ts.map