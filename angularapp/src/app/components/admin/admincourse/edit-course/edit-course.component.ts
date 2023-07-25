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
  faClock,
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
  faClock=faClock;
  ngOnInit(): void {
    this.updateCourseForm = new FormGroup({
      courseId: new FormControl(null),
      instituteID: new FormControl(null),
      courseName: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9\s]+$/)]),
      studentenrolled: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
      courseDuration: new FormControl(null, [Validators.required]),
      startTime: new FormControl(null, [Validators.required]),
      endTime: new FormControl(null, [Validators.required]),
      courseDescription: new FormControl(null, [Validators.required]),
    },{validators: this.courseTimingValidator });

    this.academy
      .getCourse(this.activeRouter.snapshot.params['id'])
      .subscribe((res) => {
        this.updateCourseForm.get('courseId').setValue(res.courseId);
        this.updateCourseForm.get('instituteID').setValue(res.instituteID);
        this.updateCourseForm.get('courseName').setValue(res.courseName);
        this.updateCourseForm.get('studentenrolled').setValue(res.studentenrolled);
        this.updateCourseForm.get('courseDuration').setValue(res.courseDuration);
        this.updateCourseForm.get('startTime').setValue(res.startTime);
        this.updateCourseForm.get('endTime').setValue(res.endTime);
        this.updateCourseForm.get('courseDescription').setValue(res.courseDescription);
      });
  }

  courseTimingValidator(formGroup: FormGroup): { [key: string]: any } | null {
    const startTime = formGroup.get('startTime').value;
    const endTime = formGroup.get('endTime').value;
  
    if (startTime && endTime) {
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
  
      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;
  
      if (endMinutes < startMinutes) {
        // Handling the case of crossing midnight
        const timeDifference = (endMinutes + 24 * 60) - startMinutes;
        const maxTimeGap = 4 * 60; // 4 hours in minutes
  
        if (timeDifference > maxTimeGap) {
          return { maxTimeGapExceeded: true };
        }
      } else {
        const timeDifference = endMinutes - startMinutes;
        const maxTimeGap = 4 * 60; // 4 hours in minutes
  
        if (timeDifference > maxTimeGap) {
          return { maxTimeGapExceeded: true };
        }
      }
    }
  
    return null;
  }

  onUpdateCourse() {
    if(this.updateCourseForm.valid){
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
  }else{
    this.updateCourseForm.markAllAsTouched();
  }
}
}
