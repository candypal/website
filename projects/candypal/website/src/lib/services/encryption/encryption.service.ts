import {Injectable} from '@angular/core';

// import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() {
  }


  public encryptAndGet(userId: string) {

    // Pads a given string with whitespace to make it 16 chars. long
    const padString = function (source: string | any[]) {
      const paddingChar = ' ';
      const size = 16;
      const padLength = size - source.length;

      for (let i = 0; i < padLength; i++) {
        source += paddingChar;
      }

      return source;
    };

    // Get key and IV from configuration
 //    const key = CryptoJS.enc.Hex.parse(environment.ga.key);
 //    const iv = CryptoJS.enc.Hex.parse(environment.ga.iv);

    // Get padded value
    const padMsg = padString(userId);

    // Encrypt with a constant IV to always get a deterministic output
    /*const encrypted = CryptoJS.AES.encrypt(
      padMsg,
      key,
      {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      }
    );*/

    // return the cipher-text
    // return encrypted.toString();
    return userId;
  }

}
