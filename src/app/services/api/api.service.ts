import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginModelResponse} from "../../models/login.model-response";
import {InvitacionModelResponse} from "../../models/invitacion.model-response";

@Injectable({providedIn: "root"})
export class ApiService {

  private API_BASE_URL = environment.API_BASE_URL;

  constructor(private httpClient: HttpClient) {
  }

  public login(user_code: string): Observable<LoginModelResponse> {
    return this.httpClient.post<LoginModelResponse>(`${this.API_BASE_URL}/login`, {
      user_access_token: user_code,
    });
  }

  public invitacionesYConfirmaciones() {
    return this.httpClient.get<InvitacionModelResponse[]>(`${this.API_BASE_URL}/invitadosYConfirmados`);
  }

  public addInvitado(params: any) {
    return this.httpClient.post<string>(`${this.API_BASE_URL}/invitados`, params);
  }
}
