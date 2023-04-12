import dayjs from 'dayjs';
import AES from 'crypto-js/aes';
import EncUtf8 from 'crypto-js/enc-utf8';
import ModeCfb from 'crypto-js/mode-cfb';
import Cryptojs from 'crypto-js';
import Pkcs7 from 'crypto-js/pad-pkcs7';

const keyHex = Cryptojs.enc.Utf8.parse('PwKOAJv2DzYS70gk');
const iv = Cryptojs.enc.Utf8.parse('PwKOAJv2DzYS70gk');

export function getMonthDate(s: string) {
  return `${dayjs(s).format('MM月DD日')}`;
}

export function getDays(start: string, end: string) {
  return `${dayjs(end).diff(dayjs(start), 'days') + 1}`;
}

export function encrypt(word: string) {
  var encrypted = Cryptojs.AES.encrypt(word, keyHex, {
    iv: iv,
    mode: Cryptojs.mode.CBC,
    padding: Cryptojs.pad.Pkcs7,
  });
  return encrypted.toString();
}
export function decrypt(word: string) {
  let _decrypt = AES.decrypt(word, keyHex, {
    iv: iv,
    mode: ModeCfb,
    padding: Pkcs7,
  });
  let decryptedStr = _decrypt.toString(EncUtf8);
  return decryptedStr.toString();
}
