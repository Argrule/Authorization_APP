import {
    ecdsaRecover,
    ecdsaSign
} from 'secp256k1';
import {
    removeLeading0x,
    hexToUnit8Array,
    uint8ArrayToHex
} from './util';

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