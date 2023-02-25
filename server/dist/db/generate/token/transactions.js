"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createOffer = exports.createDeck = exports.createNFT = exports.createCollection = void 0;
const web3_js_1 = require("@solana/web3.js");
const splToken = require("@solana/spl-token"); // @ts-ignore
const mpl = __importStar(require("@metaplex-foundation/mpl-token-metadata"));
const connection = new web3_js_1.Connection("https://api.devnet.solana.com");
const MPL_TOKEN_METADATA_PROGRAM_ID = mpl.PROGRAM_ID;
function createToken(wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        const mint = new web3_js_1.Keypair();
        let tx = new web3_js_1.Transaction();
        tx.add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mint.publicKey,
            space: splToken.MINT_SIZE,
            lamports: yield splToken.getMinimumBalanceForRentExemptMint(connection),
            programId: splToken.TOKEN_PROGRAM_ID,
        }), splToken.createInitializeMintInstruction(mint.publicKey, 0, wallet.publicKey, wallet.publicKey));
        let associatedAccount = yield splToken.getAssociatedTokenAddress(mint.publicKey, // mint
        wallet.publicKey, // owner
        false);
        tx.add(splToken.createAssociatedTokenAccountInstruction(wallet.publicKey, associatedAccount, wallet.publicKey, mint.publicKey));
        tx.add(splToken.createMintToInstruction(mint.publicKey, associatedAccount, wallet.publicKey, 1));
        yield wallet.send(tx, [mint]);
        return [mint.publicKey, associatedAccount];
    });
}
function getMetadataPDA(mint) {
    return __awaiter(this, void 0, void 0, function* () {
        const [publicKey] = yield web3_js_1.PublicKey.findProgramAddress([Buffer.from("metadata"), MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()], MPL_TOKEN_METADATA_PROGRAM_ID);
        return publicKey;
    });
}
function getMasterEditionPDA(mint) {
    return __awaiter(this, void 0, void 0, function* () {
        const [publicKey] = yield web3_js_1.PublicKey.findProgramAddress([Buffer.from("metadata"), MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer(), Buffer.from("edition")], MPL_TOKEN_METADATA_PROGRAM_ID);
        return publicKey;
    });
}
function createMetadata(wallet, mint, collection, collectionMeta, collectionMaster, name, symbol, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const tx = new web3_js_1.Transaction();
        const meta = yield getMetadataPDA(mint);
        const master = yield getMasterEditionPDA(mint);
        tx.add(mpl.createCreateMetadataAccountV2Instruction({
            metadata: meta,
            mint: mint,
            mintAuthority: wallet.publicKey,
            payer: wallet.publicKey,
            updateAuthority: wallet.publicKey,
        }, {
            createMetadataAccountArgsV2: {
                data: {
                    name: name,
                    symbol: symbol,
                    uri: url,
                    sellerFeeBasisPoints: 800,
                    creators: [
                        {
                            address: wallet.publicKey,
                            verified: true,
                            share: 100,
                        },
                    ],
                    collection: {
                        verified: false,
                        key: collection
                    },
                    uses: null
                },
                isMutable: true,
            },
        }));
        tx.add(mpl.createCreateMasterEditionInstruction({
            edition: master,
            mint: mint,
            updateAuthority: wallet.publicKey,
            mintAuthority: wallet.publicKey,
            payer: wallet.publicKey,
            metadata: meta,
        }, {
            createMasterEditionArgs: {
                maxSupply: 0,
            },
        }));
        tx.add(mpl.createVerifyCollectionInstruction({
            metadata: meta,
            collectionAuthority: wallet.publicKey,
            payer: wallet.publicKey,
            collectionMint: collection,
            collection: collectionMeta,
            collectionMasterEditionAccount: collectionMaster
        }));
        yield wallet.send(tx, []);
        return meta;
    });
}
function createCollectionMetadata(wallet, mint, name, symbol, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const tx = new web3_js_1.Transaction();
        const meta = yield getMetadataPDA(mint);
        const master = yield getMasterEditionPDA(mint);
        tx.add(mpl.createCreateMetadataAccountInstruction({
            metadata: meta,
            mint: mint,
            mintAuthority: wallet.publicKey,
            payer: wallet.publicKey,
            updateAuthority: wallet.publicKey,
        }, {
            createMetadataAccountArgs: {
                data: {
                    name: name,
                    symbol: symbol,
                    uri: url,
                    sellerFeeBasisPoints: 800,
                    creators: [{
                            address: wallet.publicKey,
                            verified: true,
                            share: 100,
                        }],
                },
                isMutable: true,
            },
        }));
        tx.add(mpl.createCreateMasterEditionInstruction({
            edition: master,
            mint: mint,
            updateAuthority: wallet.publicKey,
            mintAuthority: wallet.publicKey,
            payer: wallet.publicKey,
            metadata: meta,
        }, {
            createMasterEditionArgs: {
                maxSupply: 0,
            },
        }));
        yield wallet.send(tx, []);
        return [meta, master];
    });
}
function createCollection(name, symbol, url, owner) {
    return __awaiter(this, void 0, void 0, function* () {
        const [collectionMint, _collectionAccount] = yield createToken(owner);
        const [collectionMeta, collectionMaster] = yield createCollectionMetadata(owner, collectionMint, name, symbol, url);
        return [collectionMint, collectionMeta, collectionMaster];
    });
}
exports.createCollection = createCollection;
function createNFT(name, symbol, url, owner, collectionMint, collectionMeta, collectionMaster) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!collectionMeta)
            collectionMeta = yield getMetadataPDA(collectionMint);
        if (!collectionMaster)
            collectionMaster = yield getMasterEditionPDA(collectionMint);
        const [mint, account] = yield createToken(owner);
        const meta = yield createMetadata(owner, mint, collectionMint, collectionMeta, collectionMaster, name, symbol, url);
        return [mint, account, meta];
    });
}
exports.createNFT = createNFT;
function getDeckAddress(collection, program) {
    return __awaiter(this, void 0, void 0, function* () {
        const a = yield web3_js_1.PublicKey.findProgramAddress([
            Buffer.from('deck'),
            collection.toBuffer(),
        ], program);
        return a[0];
    });
}
const SystemProgramId = new web3_js_1.PublicKey("11111111111111111111111111111111");
const TokenProgram = new web3_js_1.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const AssociatedProgram = new web3_js_1.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
const MetadataProgram = new web3_js_1.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
const Sysvar = new web3_js_1.PublicKey("SysvarRent111111111111111111111111111111111");
const program = new web3_js_1.PublicKey("7oN9YSCxyUjPd791FJUBrKin1Lg2RaoGwcdLr6B94aHH");
function createDeck(wallet, collection) {
    return __awaiter(this, void 0, void 0, function* () {
        const tx = new web3_js_1.Transaction();
        const deck = yield getDeckAddress(collection, program);
        tx.add(new web3_js_1.TransactionInstruction({
            programId: program,
            data: Buffer.from(new Uint8Array([0])),
            keys: [
                {
                    pubkey: wallet.publicKey,
                    isSigner: true,
                    isWritable: true,
                },
                {
                    pubkey: deck,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: collection,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: SystemProgramId,
                    isSigner: false,
                    isWritable: false,
                },
            ]
        }));
        yield wallet.send(tx, []);
        return deck;
    });
}
exports.createDeck = createDeck;
function getOfferAddress(mint, program) {
    return __awaiter(this, void 0, void 0, function* () {
        const a = yield web3_js_1.PublicKey.findProgramAddress([
            Buffer.from('offer'),
            mint.toBuffer(),
        ], program);
        return a[0];
    });
}
function getTreasuryAddress(mint, deck, program) {
    return __awaiter(this, void 0, void 0, function* () {
        const a = yield web3_js_1.PublicKey.findProgramAddress([
            Buffer.from('treasury'),
            mint.toBuffer(),
            deck.toBuffer()
        ], program);
        return a[0];
    });
}
function createOffer(wallet, deck, mint, account, meta) {
    return __awaiter(this, void 0, void 0, function* () {
        const tx = new web3_js_1.Transaction();
        const treasury = yield getTreasuryAddress(mint, deck, program);
        const offer = yield getOfferAddress(mint, program);
        tx.add(new web3_js_1.TransactionInstruction({
            programId: program,
            data: Buffer.from(new Uint8Array([1, 0, 0, 1, 0, 0, 0, 0, 0])),
            keys: [
                {
                    pubkey: wallet.publicKey,
                    isSigner: true,
                    isWritable: true,
                },
                {
                    pubkey: deck,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: offer,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: mint,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: treasury,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: account,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: meta,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: SystemProgramId,
                    isSigner: false,
                    isWritable: false,
                },
                {
                    pubkey: TokenProgram,
                    isSigner: false,
                    isWritable: false,
                },
                {
                    pubkey: AssociatedProgram,
                    isSigner: false,
                    isWritable: false,
                },
                {
                    pubkey: Sysvar,
                    isSigner: false,
                    isWritable: false,
                },
            ]
        }));
        yield wallet.send(tx, []);
        return offer;
    });
}
exports.createOffer = createOffer;
//# sourceMappingURL=transactions.js.map