import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private notif: ToastrService,
    private router: Router,
  ) {}
  signupForm: FormGroup;
  todayDate = new Date();
  courseDuration;
  faChessKing = faChessKing;
  faTriangleExclamation = faExclamationTriangle;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faMobile = faMobile;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  passType: string = '';
  confirmPassType: string = '';
  confirmPassword: string;
  password: string;
  showPass: boolean = false;
  showConfirmPass: boolean = false;
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)
      ]),
      username: new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      userRole: new FormControl('user'),
      mobileNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?:\+91|0)?[6789]\d{9}$/),
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });
  }

  onAddStudent() {
    if (this.signupForm.valid) {
        this.auth.userRegisterSendEmail(this.signupForm.value).subscribe({next:(res)=>{
          this.notif.success('Student added successfully',res.Message,{timeOut:3000});
          this.router.navigate(['admin/viewInstitutes']);
        },error:(err)=>{
          this.notif.error('Error',err.Message,{timeOut:3000});
        }})
    }
    else{
      this.signupForm.markAllAsTouched();
    }
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