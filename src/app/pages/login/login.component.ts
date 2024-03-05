import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  isLoading = false;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router) {
    this.formGroup = this.fb.group({
      'userAccessToken': ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthorized()) {
      this.router.navigate(['/us/dashboard']);
    }
  }

  login() {
    if (this.formGroup.valid) {
    this.isLoading = true;
    const accessToken = this.formGroup.value.userAccessToken;
    this.authService.login(accessToken)
      .subscribe({
        next: _ => {
          this.isLoading = false;
          this.router.navigate(['/us/dashboard']);
        }, error: err => {
          this.isLoading = false;
          console.error(err);
          this.showErrorAlert(err.error.message, 7000)
        }
      });
    /*// this.newText = this.encryptService.decrypt(accessToken);
    this.newText = this.encryptService.encrypt(accessToken);
    console.log('this.newText', this.newText);*/
    } else {
      const errors = this.formGroup.get('userAccessToken')?.errors || {};
      if (errors['required']) {
        this.showErrorAlert("Ingresa tu codigo de acceso");
      } else if (!!errors['minlength']) {
        this.showErrorAlert("El codigo ingresado no es valido, ingresa el codigo de acceso correcto", 7000);
      }
    }
  }

  private showErrorAlert(message: string, timeMs: number = 5000) {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = "", timeMs)
  }
}
