import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AcademyService } from 'src/app/services/academy.service';
import {
  faSearch,
  faPenSquare,
  faTrash,
  faChessBishop,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  constructor(
    private router: Router,
    private academy: AcademyService,
    private toaster: ToastrService
  ) {}
  allStudents = [];
  allCourses = [];
  allAcademies = [];
  faSearch = faSearch;
  faPenToSquare = faPenSquare;
  faTrashCan = faTrash;
  faChessBishop = faChessBishop;
  studentID = '';
  addCourseForm:FormGroup;
  ngOnInit(): void {
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

    this.academy.getStudent().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.allStudents[i] = res[i];
      }
    });
    this.academy.getAllCourses().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.allCourses[i] = res[i];
      }
    });
    this.academy.getAcademy().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.allAcademies[i] = res[i];
      }
    });
  }

  addStudent() {
    this.router.navigate(['admin/addStudent']);
  }
  onDeleteStudent(id: number,courseId:number) {
    this.academy.deleteStudent(id).subscribe((res) => {
      this.academy.getCourse(courseId).subscribe(val=>{
        this.addCourseForm.get('courseId').setValue(val.courseId);
        this.addCourseForm.get('instituteID').setValue(val.instituteID);
        this.addCourseForm.get('courseName').setValue(val.courseName);
        this.addCourseForm.get('courseDuration').setValue(val.courseDuration);
        this.addCourseForm.get('courseDescription').setValue(val.courseDescription);
        this.addCourseForm.get('studentenrolled').setValue((Number(val.studentenrolled)+1).toString());
        this.addCourseForm.get('startTime').setValue(val.startTime);
        this.addCourseForm.get('endTime').setValue(val.endTime);
        this.academy.updateCourse(courseId,this.addCourseForm.value).subscribe();
        location.reload();
      })
      this.toaster.success('Student deleted successfully', 'DELETED', {
        timeOut: 3000,
      });
    });
  }
  inputvalue= '';
  searchInInput = '';
  onSearch(){
    this.searchInInput=this.inputvalue;
  }
}
