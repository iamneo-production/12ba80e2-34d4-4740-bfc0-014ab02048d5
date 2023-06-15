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
  faUser,
  faMobile,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AcademyService } from 'src/app/services/academy.service';

@Component({
  selector: 'app-edit-admission',
  templateUrl: './edit-admission.component.html',
  styleUrls: ['./edit-admission.component.css'],
})
export class EditAdmissionComponent implements OnInit {
  constructor(
    private router: Router,
    private toaster: ToastrService,
    private academy: AcademyService,
    private activeRouter: ActivatedRoute
  ) {}
  updateStudentForm: FormGroup;
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
    this.updateStudentForm = new FormGroup({
      id: new FormControl(null),
      courseID: new FormControl(null),
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
    });
    this.academy
      .getStudentDataById(this.activeRouter.snapshot.params['id'])
      .subscribe((res) => {
        console.log(res);

        this.updateStudentForm.get('id').setValue(res.id);
        this.updateStudentForm.get('courseID').setValue(res.courseID);
        this.updateStudentForm.get('firstname').setValue(res.firstname);
        this.updateStudentForm.get('lastname').setValue(res.lastname);
        this.updateStudentForm.get('gender').setValue(res.gender);
        this.updateStudentForm.get('fathername').setValue(res.fathername);
        this.updateStudentForm.get('phonenumber').setValue(res.phonenumber);
        this.updateStudentForm.get('alternatenumber').setValue(res.alternatenumber);
        this.updateStudentForm.get('mothername').setValue(res.mothername);
        this.updateStudentForm.get('email').setValue(res.email);
        this.updateStudentForm.get('age').setValue(res.age);
        this.updateStudentForm.get('housenumber').setValue(res.housenumber);
        this.updateStudentForm.get('street').setValue(res.street);
        this.updateStudentForm.get('area').setValue(res.area);
        this.updateStudentForm.get('passcode').setValue(res.passcode);
        this.updateStudentForm.get('state').setValue(res.state);
        this.updateStudentForm.get('nationality').setValue(res.nationality);
      });
  }
  onUpdateStudent() {
    console.log(this.updateStudentForm.value);
    if (this.updateStudentForm.valid) {
      this.academy
        .updateStudent(
          this.updateStudentForm.get('id').value,
          this.updateStudentForm.value
        )
        .subscribe((res) => {
          this.toaster.success('student  updated successfully', 'SUCCESS', {
            timeOut: 5000,
          });
          this.router.navigate(['/user/viewAdmission']);
        });
    } else {
      this.toaster.error('Something Went Wrong', 'ERROR', { timeOut: 5000 });
    }
  }
}
