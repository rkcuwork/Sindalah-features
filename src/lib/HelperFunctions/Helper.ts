import CryptoJS from 'crypto-js';

export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;


export const encrypt = (textToEncrypt:string) => {
    const encrypted = CryptoJS.AES.encrypt(textToEncrypt, SECRET_KEY).toString();
    return encrypted;
  };

export const decrypt = (encryptedText:string) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decrypted;
  };
