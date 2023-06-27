import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  faEye,
  faEyeSlash,
  faExclamationTriangle,
  faEnvelope,
  faLock,
  faChessKing,
  faUser,
  faMobile,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  confirmPassword: String;
  password: string;
  isMatched: boolean = true;
  faChessKing = faChessKing;
  faTriangleExclamation = faExclamationTriangle;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faMobile = faMobile;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPass: boolean = false;
  showConfirmPass: boolean = false;
  passType: string = 'password';
  confirmPassType: string = 'password';
  constructor(
    private auth: AuthService,
    private router: Router,
    private notif: ToastrService
  ) {}
  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      username: new FormControl(null),
      userRole: new FormControl('user'),
      mobileNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      if (this.signupForm.get('userRole').value == 'user') {
        this.auth.userRegister(this.signupForm.value).subscribe({
          next: (res) => {
            this.router.navigate(['login']);
            this.notif.success('Success', res.message, { timeOut: 3000 });
          },
          error: (err) => {
            this.notif.error('Error', 'Email already registered!!!', { timeOut: 3000 });
          },
        });
      } else if (this.signupForm.get('userRole').value == 'admin') {
        this.auth.adminRegister(this.signupForm.value).subscribe({
          next: (res) => {
            this.router.navigate(['login']);
            this.notif.success('Success', res.message, { timeOut: 3000 });
          },
          error: (err) => {
            this.notif.error('Error', 'Email already registered!!!', { timeOut: 3000 });
          },
        });
      }
    }else if(this.signupForm.invalid){
      this.notif.error('Form is not valid', 'Invalid Deatils', { timeOut: 3000 });
    }
  }
  loginButton() {
    this.router.navigate(['/login']);
  }
  toggle() {
    if (this.showPass) {
      this.showPass = false;
      this.passType = 'password';
    } else {
      this.showPass = true;
      this.passType = 'text';
    }
  }
  toggleConfirmPass() {
    if (this.showConfirmPass) {
      this.showConfirmPass = false;
      this.confirmPassType = 'password';
    } else {
      this.showConfirmPass = true;
      this.confirmPassType = 'text';
    }
  }
}
