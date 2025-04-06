import {
    ecdsaRecover,
    ecdsaSign
} from 'secp256k1';
import {
    removeLeading0x,
    hexToUnit8Array,
    uint8ArrayToHex
} from './util';
import { generateMnemonic, mnemonicToSeedSync } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/simplified-chinese";
import { hdkey } from "@ethereumjs/wallet";
import { encrypt, decrypt } from "eciesjs";

export function generateAccount() {
    // 生成助记词（12 个单词）
    const mnemonic = generateMnemonic(wordlist);
    return generateAccountWithMnemonic(mnemonic);
}
/**
 * 恢复/生成账户
 * @param {string} mnemonic 
 * @returns 
 */
export function generateAccountWithMnemonic(mnemonic) {
    // 从助记词生成种子
    const seed = mnemonicToSeedSync(mnemonic); // 返回 Uint8Array

    // 使用 @ethereumjs/wallet 派生账户    
    const hdwallet = hdkey.EthereumHDKey.fromMasterSeed(seed);
    const wallet = hdwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    const address = wallet.getAddressString();
    const privateKey = wallet.getPrivateKeyString();
    console.log('generated account:', { mnemonic, privateKey, address });
    return { mnemonic, privateKey, address };
}


export function signMessage(message, privateKey) {
    const signature = ecdsaSign(
        hexToUnit8Array(removeLeading0x(message)),
        hexToUnit8Array(removeLeading0x(privateKey))
    );
    return uint8ArrayToHex(signature.signature);
}

/**
 * returns the publicKey for the privateKey with which the messageHash was signed
 * @param  {string} signature
 * @param  {string} hash
 * @return {string} publicKey
 */
export function recoverPublicKey(signature, hash) {
    signature = removeLeading0x(signature);

    // split into v-value and sig
    const sigOnly = signature.substring(0, signature.length - 2); // all but last 2 chars
    const vValue = signature.slice(-2); // last 2 chars

    const recoveryNumber = vValue === '1c' ? 1 : 0;

    let pubKey = uint8ArrayToHex(ecdsaRecover(
        hexToUnit8Array(sigOnly),
        recoveryNumber,
        hexToUnit8Array(removeLeading0x(hash)),
        false
    ));
    // remove trailing '04'
    pubKey = pubKey.slice(2);

    return pubKey;
}

export function encryptWithPublicKey(message, publicKey) {
    return encrypt(
        Buffer.from(removeLeading0x(publicKey), "hex"),
        Buffer.from(message)
    ).toString("hex");
}

export function decryptWithPrivateKey(encryptedHex, privateKey) {
    const decrypted = decrypt(
        Buffer.from(removeLeading0x(privateKey), "hex"),
        Buffer.from(encryptedHex, "hex")
    );
    return decrypted.toString();
}