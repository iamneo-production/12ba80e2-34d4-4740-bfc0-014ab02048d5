import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcademyService } from 'src/app/services/academy.service';
import { faBook,faChessBishop,faLocationArrow,faChessKnight,faEnvelope,faLock,faExclamationTriangle,faChessKing,faUser,faMobile,faImage } from '@fortawesome/free-solid-svg-icons';

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
  constructor(
    private academy: AcademyService,
    private activeRouter: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addCourseForm = new FormGroup({
      instituteID: new FormControl(null),
      courseName: new FormControl(null, [Validators.required]),
      studentenrolled: new FormControl(null, [Validators.required]),
      courseDuration: new FormControl(null, [Validators.required]),
      timing: new FormControl(null, [Validators.required]),
      courseDescription: new FormControl(null, [Validators.required]),
    });
    this.addCourseForm
      .get('instituteID')
      .setValue(this.activeRouter.snapshot.params['id']);
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
      this.toaster.error('ERROR', 'Something went wrong', { timeOut: 2000 });
    }
  }
}
