export interface Trait {
    trait_type: string;
    value: string;
}
export interface Metadata {
    name: string;
    symbol: string;
    description: string;
    seller_fee_basis_points: 800;
    image: string;
    attributes: Trait[];
    properties: {
        files: [
            {
                "uri": string;
                "type": "image/png";
            }
        ];
        category: null;
    };
}
export declare function writeMetadata(meta: Metadata, file: string): string;
//# sourceMappingURL=metadata.d.ts.map