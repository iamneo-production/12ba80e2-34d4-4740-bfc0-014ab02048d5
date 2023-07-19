import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { faEye } from '@fortawesome/free-solid-svg-icons';
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
  showPass: boolean = false;
  showConfirmPass: boolean = false;
  passType: string = 'password';
  confirmPassType: string = 'password';
  faEye=faEye;
  constructor(
    private auth: AuthService,
    private router: Router,
    private notif: ToastrService
  ) {}
  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)]),
      username: new FormControl(null,[Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      userRole: new FormControl('user'),
      mobileNumber: new FormControl(null, [
        Validators.required, this.validateMobileNumber,
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
    }
      );
  }

  validateMobileNumber(control: FormControl): { [key: string]: any } | null {
    const mobileNumber = control.value;
  
    if (
      mobileNumber &&
      (mobileNumber.length === 10) &&                     
      (['6', '8', '9','7'].includes(mobileNumber.charAt(0))) && 
                        // Check for no repeated digits
      !/^(\d)\1{9}$/.test(mobileNumber)                     
    ) {
      return null; // Valid mobile number
    } else {
      return { invalidMobileNumber: true }; // Invalid mobile number
    }
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
            console.log(err);
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
    }else{
      this.signupForm.markAllAsTouched();
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
