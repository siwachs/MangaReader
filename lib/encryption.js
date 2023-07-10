import CryptoJS from "crypto-js";

const secretKey =
  "7733f0e4c54410df49bf7716fe0ab50dc1fd80a52f3c24c878a5d7995eee99bf1cdee81ee861354545721df331dbc9";

export const encrypt = (uid) => {
  try {
    const encryptedText = CryptoJS.AES.encrypt(uid, secretKey).toString();
    return encodeURIComponent(encryptedText);
  } catch (error) {
    return "";
  }
};

export const decrypt = (uid) => {
  try {
    const decryptedText = CryptoJS.AES.decrypt(
      decodeURIComponent(uid),
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    return encodeURIComponent(decryptedText);
  } catch (error) {
    return "";
  }
};
