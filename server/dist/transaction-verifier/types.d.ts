export declare enum VerifyType {
    OfferPlaced = 0,
    OfferCanceled = 1,
    OfferAccepted = 2
}
export declare enum VerifyAnswer {
    False = 0,
    True = 1,
    Rejected = 2,
    Missed = 3
}
export interface VerifyRequest {
    type: VerifyType;
    tx: string;
    args: string[];
}
export interface VerifyResponse {
    tx: string;
    answer: VerifyAnswer;
}
//# sourceMappingURL=types.d.ts.map