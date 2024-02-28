import {Injectable} from "@angular/core";
import {EncryptService} from "../security/encrypt.service";

@Injectable({providedIn: "root"})
export class LocalStorageService {

    constructor(private encryptService: EncryptService) {
    }

    save(key: string, value: string) {
        localStorage.setItem(key, this.encryptService.encryptLocal(value));
    }

    getData(key: string): string | null {
        const v = localStorage.getItem(key);
        if (!!v && v.length > 0) {
            return this.encryptService.decryptLocal(localStorage.getItem(key) as string);
        } else {
            return null;
        }
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }
}
