import {Injectable} from "@angular/core";
import * as CryptoJS from 'crypto-js';
import {environment} from "../../../environments/environment";

@Injectable({providedIn: "root"})
export class EncryptService {
    private password: string = environment.API_KEY;
    private localPassword: string = environment.LOCAL_KEY;

    constructor() {
    }

    encryptLocal(message: string) {
        const value = CryptoJS.AES.encrypt(message, atob(this.localPassword));
        return btoa(JSON.stringify({value: value.toString(), iv: value.iv.toString()}));
    }

    decryptLocal(message: string) {
        const jsonObj = JSON.parse(atob(message));
        const decrypted = CryptoJS.AES.decrypt(jsonObj.value, atob(this.localPassword), {
            iv: CryptoJS.enc.Base64.parse(jsonObj.iv)
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    encryptServer(message: string) {
        let value = message;
        for (let i = 0; i <= 3; i++) {
            value = btoa(value);
        }
        /*const value = CryptoJS.AES.encrypt(message, atob(this.password)); // default: CBC, PKCS#7 padding
        return btoa(JSON.stringify({value: value.toString(), iv: value.iv.toString()}));*/
        return btoa(value);
    }

    decryptServer(message: string) {
        const jsonStr = atob(message);
        const jsonObj = JSON.parse(jsonStr);
        const decrypted = CryptoJS.AES.decrypt(jsonObj.value, atob(this.password), {
            iv: CryptoJS.enc.Base64.parse(jsonObj.iv)
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}
