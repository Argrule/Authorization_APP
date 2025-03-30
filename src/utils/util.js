export function removeLeading0x(str) {
    if (str.startsWith('0x'))
        return str.substring(2);
    else return str;
}

export function addLeading0x(str) {
    if (!str.startsWith('0x'))
        return '0x' + str;
    else return str;
}

export function uint8ArrayToHex(arr) {
    // without Buffer
    return Array.from(arr).map(byte => {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

export function hexToUnit8Array(str) {
    return new Uint8Array(str.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}