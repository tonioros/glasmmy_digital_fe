import {Injectable} from "@angular/core";
import {UserActiveModelLocal} from "../../models/user-active.model-local";
import {Constants} from "../../models/constants";
import {map} from "rxjs";
import {EncryptService} from "./encrypt.service";
import {ApiService} from "../api/api.service";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {dateDiffInDays} from "../../utils/dateDiffInDays";

@Injectable({providedIn: "root"})
export class AuthService {
    private _user?: UserActiveModelLocal
    private _lastDateLogin?: Date;

    constructor(private apiServ: ApiService, private localStorageService: LocalStorageService,
                private encryptServ: EncryptService) {
        this.loadUser();
    }

    private loadUser() {
        const userTemp = this.localStorageService.getData(Constants.LS_USER);
        if (!!userTemp) {
            this._user = JSON.parse(userTemp);
            const date = this._user?.last_login.split(" ")[0].split('-') as string[];
            const time = this._user?.last_login.split(" ")[1].split(':') as string[];
            this._lastDateLogin = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]));
            const diffDays = dateDiffInDays(this._lastDateLogin, new Date());
            if (diffDays > 10) {
                this.logout();
            }
        }
    }

    public login(userAccess: string) {
        return this.apiServ.login(this.encryptServ.encryptServer(userAccess))
            .pipe(map(resp => {
                    this._user = resp.user
                    this.localStorageService.save(Constants.LS_USER, JSON.stringify(resp.user));
                    this.localStorageService.save(Constants.LS_API_TOKEN, resp.user.api_token);
                }
            ));
    }


    public user() {
        return this._user;
    }

    public apiToken() {
        return this.localStorageService.getData(Constants.LS_API_TOKEN);
    }
    public isAuthorized() {
        return (!!this._user && !!this._user.api_token && this._user.api_token.length > 10);
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.isAuthorized();
    }

    public logout() {
        this._user = undefined;
        this.localStorageService.remove(Constants.LS_API_TOKEN);
    }
}
