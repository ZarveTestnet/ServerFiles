"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatherQuorum = exports.removeTrustedClient = exports.addTrustedClient = exports.trustedClientsCount = exports.trustedClients = void 0;
exports.trustedClients = new Map();
exports.trustedClientsCount = 0;
function addTrustedClient(index, socket) {
    if (!exports.trustedClients.has(index)) {
        exports.trustedClients.set(index, socket);
        exports.trustedClientsCount++;
    }
}
exports.addTrustedClient = addTrustedClient;
function removeTrustedClient(index) {
    if (exports.trustedClients.delete(index)) {
        exports.trustedClientsCount--;
    }
}
exports.removeTrustedClient = removeTrustedClient;
function randInt(max) {
    return Math.floor(Math.random() * (max + 1));
}
function randomSubArray(a, count) {
    if (a.length <= count)
        return a;
    let b = [];
    let length = a.length;
    while (count > 0) {
        b.push(a[randInt(length)]);
        length--;
        count--;
    }
    return b;
}
function gatherQuorum(count) {
    const dArray = randomSubArray([...exports.trustedClients], count);
    let acceptors = [];
    let acceptorIndex = [];
    dArray.forEach(([index, socket]) => {
        acceptors.push(socket);
        acceptorIndex.push(index);
    });
    return [acceptors, acceptorIndex];
}
exports.gatherQuorum = gatherQuorum;
//# sourceMappingURL=trusted.js.map