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
  faSearch = faSearch;
  faPenToSquare = faPenSquare;
  faTrashCan = faTrash;
  faChessBishop = faChessBishop;
  studentID = '';
  searchInInput = '';
  ngOnInit(): void {
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
  }

  addStudent() {
    this.toaster.warning(
      'Select the course in which you want to enroll student',
      'Select Your Course',
      { timeOut: 5000 }
    );
  }
  onDeleteStudent(id: number) {
    this.academy.deleteStudent(id).subscribe((res) => {
      this.toaster.success('Student deleted successfully', 'DELETED', {
        timeOut: 5000,
      });
      location.reload();
    });
  }
}
