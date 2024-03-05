import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({setHeaders: {Authorization: `Bearer ${this.authService?.apiToken()}`}});
    return next.handle(modifiedRequest);
  }
}
