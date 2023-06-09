import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcademyService } from 'src/app/services/academy.service';
import {
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

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  constructor(
    private academy: AcademyService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toaster: ToastrService
  ) {}
  updateCourseForm: FormGroup;
  faChessKnight = faChessKnight;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faTriangleExclamation = faExclamationTriangle;
  faUser = faUser;
  faMobile = faMobile;
  faImage = faImage;
  faLocation = faLocationArrow;
  faChessBishop = faChessBishop;
  faBook = faBook;
  ngOnInit(): void {
    this.updateCourseForm = new FormGroup({
      courseId: new FormControl(null),
      instituteID: new FormControl(null),
      courseName: new FormControl(null, [Validators.required]),
      studentenrolled: new FormControl(null, [Validators.required]),
      courseDuration: new FormControl(null, [Validators.required]),
      timing: new FormControl(null, [Validators.required]),
      courseDescription: new FormControl(null, [Validators.required]),
    });

    this.academy
      .getCourse(this.activeRouter.snapshot.params['id'])
      .subscribe((res) => {
        this.updateCourseForm.get('courseId').setValue(res.courseId);
        this.updateCourseForm.get('instituteID').setValue(res.instituteID);
        this.updateCourseForm.get('courseName').setValue(res.courseName);
        this.updateCourseForm.get('studentenrolled').setValue(res.studentenrolled);
        this.updateCourseForm.get('courseDuration').setValue(res.courseDuration);
        this.updateCourseForm.get('timing').setValue(res.timing);
        this.updateCourseForm.get('courseDescription').setValue(res.courseDescription);
      });
  }
  onUpdateCourse() {
    this.academy
      .updateCourse(
        this.activeRouter.snapshot.params['id'],
        this.updateCourseForm.value
      )
      .subscribe((res) => {
        this.toaster.success('SUCCESS', 'Course Updated', { timeOut: 3000 });
        this.router.navigate([
          `admin/viewCourse/${this.updateCourseForm.get('instituteID').value}`,
        ]);
      });
  }
}
