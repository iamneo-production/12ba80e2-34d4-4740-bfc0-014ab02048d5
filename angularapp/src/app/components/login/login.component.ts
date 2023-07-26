import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faChessQueen,
  faChessKing,
  faEyeSlash,
  faEye,
  faChessKnight,
  faEnvelope,
  faLock,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faChessKnight = faChessKnight;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faTriangleExclamation = faExclamationTriangle;
  faChessKing = faChessKing;
  faChessQueen = faChessQueen;
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
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      try {
        this.auth.userLogin(this.loginForm.value).subscribe((res) => {
          this.notif.success('Success', res.Message, { timeOut: 5000 });
          this.auth.storeToken(res.token);
          console.log('login to user dashboard');
        });
      } catch (error) {
        console.log('ok you r not a user');
      }
      try {
        this.auth.adminLogin(this.loginForm.value).subscribe((res) => {
          this.notif.success('Admin Logged in', res.Message, { timeOut: 5000 });
          this.auth.storeToken(res.token);
          this.router.navigate(['admin/viewInstitutes']);
        });
      } catch (error) {
        console.log('not a admin'+error);
      }
    }else{
      this.notif.error('Wrong email or password','ERROR!!!',{timeOut:3000});
    }
  }
  signupLink(){
    this.router.navigate(['/signup']);
  }
  toggle(){
    if(this.show){
       this.show=false;
       this.passType="password";
    }
    else {
      this.show=true;
      this.passType="text";
    }
  }
}
