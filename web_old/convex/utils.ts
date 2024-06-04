export const sha256 = async function(str: string) {
    const utf8 = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
        return hashHex;
    });
    return hash;
};

