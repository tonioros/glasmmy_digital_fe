import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, of} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services";

export class ErrorHandlerInterceptor implements HttpInterceptor {
  private authService?: AuthService;

  constructor() {
    this.authService = inject(AuthService);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((e) => {
          console.log(e.status == 401 && this.authService?.isAuthorized())
          if (e.status == 401 && this.authService?.isAuthorized()) {
            // Se invalido el Token de acceso
            this.authService?.logout();
          }
          return of(e);
        }));
  }
}
