import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services";

export class AuthInterceptor implements HttpInterceptor {
  private authService?: AuthService;
  constructor() {
    this.authService = inject(AuthService);
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('this.authService?.user()', this.authService?.user());
    const modifiedRequest = request.clone({setHeaders: {Authorization: `Bearer ${this.authService?.apiToken()}`}});
    return next.handle(modifiedRequest);
  }
}