import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  show: boolean = false;
  passType: string = 'password';
  loginForm: FormGroup;
  constructor(
    private auth: AuthService,
    private router: Router,
    private notif: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.notif.success('SUCCESS', res.message, { timeOut: 3000 });
          if (this.auth.getRole() === 'admin') {
            this.router.navigate(['/admin/viewInstitutes']);
          } else {
            this.router.navigate(['/user/login']);
          }
        },
        error: (err) => {
          this.notif.error('Error', 'Incorrect email and password', {
            timeOut: 3000,
          });
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  signupLink() {
    this.router.navigate(['/signup']);
  }
  toggle() {
    if (this.show) {
      this.show = false;
      this.passType = 'password';
    } else {
      this.show = true;
      this.passType = 'text';
    }
  }
}
