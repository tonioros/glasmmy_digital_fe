import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private toast: ToastrService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request)
      .pipe(
        catchError((e) => {
          if (e.status == 401 && this.authService?.isAuthorized()) {
            // Se invalido el Token de acceso
            this.authService?.logout();
            this.toast.info("La sesion ha finalizado, vuelve a iniciar sesion");
          } else if (e.status == 500) {
            this.toast.error("No hemos podido conectar al servidor: " + e.error.message,
              "Error de conexion");
          } else if (e.status == 0) {
            this.toast.error("No hemos podido conectar al servidor, revisa tu conexion de Internet o contactate con Servicio al Cliente",
              "Opss, algo salio mal");
          }
          throw e;
        }));
  }
}
