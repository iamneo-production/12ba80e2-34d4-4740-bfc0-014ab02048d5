import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcademyService } from 'src/app/services/academy.service';
import { faBook,faChessBishop,faLocationArrow,faChessKnight,faEnvelope,faLock,faExclamationTriangle,faClock,faUser,faMobile,faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  Courses: any = [];
  addCourseForm: FormGroup;
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
  constructor(
    private academy: AcademyService,
    private activeRouter: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addCourseForm = new FormGroup({
      instituteID: new FormControl(null),
      courseName: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9\s]+$/)]),
      studentenrolled: new FormControl(null, [Validators.required,Validators.pattern(/^(?!0+$)\d+$/)]),
      courseDuration: new FormControl(null, [Validators.required]),
      // timing: new FormControl(null, [Validators.required]),
      startTime: new FormControl ('', Validators.required),
      endTime: new FormControl ('', Validators.required),
      courseDescription: new FormControl(null, [Validators.required]),
    },{validators: this.courseTimingValidator });
    this.addCourseForm
      .get('instituteID')
      .setValue(this.activeRouter.snapshot.params['id']);
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
  

  onAddCourse() {
    if (this.addCourseForm.valid) {
      this.academy.addCourse(this.addCourseForm.value).subscribe((res) => {
        this.toaster.success('SUCCESS', 'Course added successfully', {
          timeOut: 3000,
        });
        this.router.navigate([`/admin/viewCourse/${this.activeRouter.snapshot.params['id']}`]);
      });
    } else {
      this.addCourseForm.markAllAsTouched();
    }
  }
}
