import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faRoad,
  faHome,
  faGenderless,
  faUserAlt,
  faVenusMars,
  faBook,
  faChessBishop,
  faLocationArrow,
  faChessKnight,
  faEnvelope,
  faLock,
  faExclamationTriangle,
  faChessKing,
  faUser,
  faMobile,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AcademyService } from 'src/app/services/academy.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-admission',
  templateUrl: './add-admission.component.html',
  styleUrls: ['./add-admission.component.css'],
})
export class AddAdmissionComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private toaster: ToastrService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private academy: AcademyService
  ) {}
  addStudentForm: FormGroup;
  todayDate = new Date();
  courseDuration;
  faChessKnight = faChessKnight;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faTriangleExclamation = faExclamationTriangle;
  faUser = faUser;
  faMobile = faMobile;
  faImage = faImage;
  faLocation = faLocationArrow;
  faChessBishop = faChessBishop;
  faVenusMars = faVenusMars;
  faBook = faBook;
  faPerson = faUserAlt;
  faPersonDress = faGenderless;
  faHouse = faHome;
  faRoad = faRoad;
  ngOnInit(): void {
    this.addStudentForm = new FormGroup({
      courseID: new FormControl(null),
      userID: new FormControl(null),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      fathername: new FormControl(null, [Validators.required]),
      phonenumber: new FormControl(null, [Validators.required]),
      alternatenumber: new FormControl(null, [Validators.required]),
      mothername: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      housenumber: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      area: new FormControl(null, [Validators.required]),
      passcode: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      nationality: new FormControl(null, [Validators.required]),
      joiningDate: new FormControl(null),
      endDate: new FormControl(null),
    });
    this.addStudentForm
      .get('courseID')
      .setValue(this.activeRouter.snapshot.params['id']);
    this.addStudentForm.get('userID').setValue(this.auth.getID());
    this.addStudentForm
      .get('joiningDate')
      .setValue(formatDate(this.todayDate, 'dd/MM/yyyy', 'en'));

    this.academy
      .getCourse(this.activeRouter.snapshot.params['id'])
      .subscribe((res) => {
        this.courseDuration = res.courseDuration;
      });
  }

  onAddStudent() {
    const joinDate = new Date(this.todayDate);
    console.log(joinDate);
    const expiryDate = new Date(
      joinDate.getFullYear(),
      joinDate.getMonth() + this.courseDuration,
      joinDate.getDate()
    );
    console.log(expiryDate)
    const formattedExpiryDate =
      ('0' + expiryDate.getDate()).slice(-2) +
      '/' +
      ('0' + (expiryDate.getMonth() + 1)).slice(-2) +
      '/' +
      expiryDate.getFullYear();
    this.addStudentForm.get('endDate').setValue(formattedExpiryDate);
    if (this.addStudentForm.valid) {
      this.academy.addStudent(this.addStudentForm.value).subscribe((res) => {
        this.toaster.success('SUCCESS', 'Course Enrolled Successfully', {
          timeOut: 3000,
        });
      });
      this.router.navigate(['/user/login']);
    } else {
      this.toaster.error('FAILURE', 'Something went wrong', { timeOut: 3000 });
    }
  }
}
