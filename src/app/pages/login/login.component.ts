import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  isLoading = false;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
          console.log('err', err)
          this.errorMessage = err.error.message;
          this.isLoading = false;
          setTimeout(() => this.errorMessage = "", 8000);
        }
      });
    /*// this.newText = this.encryptService.decrypt(accessToken);
    this.newText = this.encryptService.encrypt(accessToken);
    console.log('this.newText', this.newText);*/
    }
  }
}
