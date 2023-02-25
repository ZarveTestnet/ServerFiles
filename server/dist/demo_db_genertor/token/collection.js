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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCollection = void 0;
const unique_names_generator_1 = require("unique-names-generator");
const image_1 = require("./image");
function rand(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
/*
const img_src = "https://source.unsplash.com/random/200x200?sig=";

async function getImage(index: number): Promise<string> {
    return `https://picsum.photos/200/200?random&t=${index}`
}
*/
function generateCollection() {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = Math.ceil(Math.random() * 1000) * 1000;
        const collectionName = (0, unique_names_generator_1.uniqueNamesGenerator)({
            dictionaries: [unique_names_generator_1.adjectives, unique_names_generator_1.starWars, unique_names_generator_1.countries],
            style: 'capital',
            separator: '',
            length: 2
        });
        const symbol = collectionName[0] + collectionName[collectionName.length - 1];
        console.log("Collection Name:", collectionName, "Symbol:", symbol);
        const nftCount = rand(10, 20);
        const traitCount = rand(3, 8);
        console.log("NFT Count:", nftCount, "Trait Count:", traitCount);
        const images = yield (0, image_1.generateImages)(collectionName, symbol, nftCount);
        const collectionMetadata = {
            name: collectionName + "s",
            symbol,
            description: "Test collection",
            seller_fee_basis_points: 800,
            image: images[0],
            attributes: [],
            properties: {
                files: [
                    {
                        "uri": images[0],
                        "type": "image/png"
                    }
                ],
                category: null
            }
        };
        let traitTypes = [];
        for (let i = 0; i < traitCount; i++) {
            traitTypes.push((0, unique_names_generator_1.uniqueNamesGenerator)({
                dictionaries: [unique_names_generator_1.adjectives, unique_names_generator_1.animals, unique_names_generator_1.starWars, unique_names_generator_1.countries, unique_names_generator_1.colors, unique_names_generator_1.names, unique_names_generator_1.languages],
                style: 'capital',
                length: 1
            }));
        }
        let nftMetadatas = [];
        for (let i = 0; i < nftCount; i++) {
            let traits = [];
            traitTypes.forEach(type => {
                traits.push({
                    trait_type: type,
                    value: (0, unique_names_generator_1.uniqueNamesGenerator)({
                        dictionaries: [unique_names_generator_1.adjectives, unique_names_generator_1.animals, unique_names_generator_1.starWars, unique_names_generator_1.countries, unique_names_generator_1.colors, unique_names_generator_1.names, unique_names_generator_1.languages],
                        style: 'capital',
                        length: 1
                    })
                });
            });
            nftMetadatas.push({
                name: collectionName + " #" + i.toString(),
                symbol,
                description: "",
                seller_fee_basis_points: 800,
                image: images[i + 1],
                attributes: traits,
                properties: {
                    files: [
                        {
                            "uri": images[i + 1],
                            "type": "image/png"
                        }
                    ],
                    category: null
                }
            });
        }
        return { collectionMetadata, nftMetadatas };
    });
}
exports.generateCollection = generateCollection;
//# sourceMappingURL=collection.js.map