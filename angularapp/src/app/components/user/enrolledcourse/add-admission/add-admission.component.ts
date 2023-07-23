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
  addCourseForm : FormGroup;
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
      firstname: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      lastname: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      gender: new FormControl("", [Validators.required]),
      fathername: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      phonenumber: new FormControl(null, [Validators.required,Validators.pattern(/^(?!([0-9])\1{9}$)\d{10}$/)]),
      alternatenumber: new FormControl(null, [Validators.required,Validators.pattern(/^(?!([0-9])\1{9}$)\d{10}$/)]),
      mothername: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      email: new FormControl(null, [Validators.required,Validators.email]),
      age: new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
      housenumber: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      area: new FormControl(null, [Validators.required]),
      passcode: new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
      state: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      nationality: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
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
      this.addCourseForm = new FormGroup({
        courseId: new FormControl(null),
        instituteID: new FormControl(null),
        courseName: new FormControl(null),
        studentenrolled: new FormControl(null),
        courseDuration: new FormControl(null),
        startTime: new FormControl (null),
        endTime: new FormControl (null),
        courseDescription: new FormControl(null)
  })
    }

  onAddStudent() {
    const joinDate = new Date(this.todayDate);
    const expiryDate = new Date(
      joinDate.getFullYear(),
      joinDate.getMonth() + this.courseDuration,
      joinDate.getDate()
    );

    const formattedExpiryDate =
      ('0' + expiryDate.getDate()).slice(-2) +
      '/' +
      ('0' + (expiryDate.getMonth() + 1)).slice(-2) +
      '/' +
      expiryDate.getFullYear();
    this.addStudentForm.get('endDate').setValue(formattedExpiryDate);
    if (this.addStudentForm.valid) {
      this.academy.addStudent(this.addStudentForm.value).subscribe({next:res=>{ 
        this.academy.getCourse(this.addStudentForm.get('courseID').value).subscribe(val=>{
          this.addCourseForm.get('courseId').setValue(val.courseId);
          this.addCourseForm.get('instituteID').setValue(val.instituteID);
          this.addCourseForm.get('courseName').setValue(val.courseName);
          this.addCourseForm.get('courseDuration').setValue(val.courseDuration);
          this.addCourseForm.get('courseDescription').setValue(val.courseDescription);
          this.addCourseForm.get('studentenrolled').setValue(((val.studentenrolled)-1).toString());
          this.addCourseForm.get('startTime').setValue(val.startTime);
          this.addCourseForm.get('endTime').setValue(val.endTime);
          this.academy.updateCourse(this.addStudentForm.get('courseID').value,this.addCourseForm.value).subscribe();
        })
        this.router.navigate(['/user/login']);
        this.toaster.success('SUCCESS', 'Course Enrolled Successfully', {
          timeOut: 3000,
        });

      },error:err=>{
        this.toaster.error('ERROR', err.Message, {
          timeOut: 3000,
        });
        this.router.navigate(['/user/login']);
      }})
  } else {
    this.addStudentForm.markAllAsTouched();
  }
  }}
