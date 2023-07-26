import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcademyService } from 'src/app/services/academy.service';
import {
  faChessBishop,
  faSearch,
  faPenSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css'],
})
export class ViewCourseComponent implements OnInit {
  Instituteid: number;
  allCourses = [];
  allAcademy = [];
  faSearch = faSearch;
  faPenToSquare = faPenSquare;
  faTrashCan = faTrash;
  faChessBishop = faChessBishop;
  constructor(
    private router: Router,
    private toaster: ToastrService,
    private activeRouter: ActivatedRoute,
    private academy: AcademyService
  ) {}
  ngOnInit() {
    this.academy.getAcademy().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.allAcademy[i] = res[i];
      }
    });
    this.academy.getAllCourses().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.allCourses[i] = res[i];
      }
    });
  }

  addCourses() {
    this.toaster.warning(
      'Select academy in which you want to add course!!',
      'Error!!!',
      { timeOut: 3000 }
    );
    this.router.navigate(['admin/viewInstitutes'])
  }
  deleteCourse(id: number) {
    this.academy.deleteCourse(id).subscribe((res) => {
      this.toaster.success('Course deleted successfully', 'Deleted', {
        timeOut: 5000,
      });
      location.reload();
    });
  }
  inputvalue= '';
  searchInInput = '';
  onSearch(){
    this.searchInInput=this.inputvalue;
  }
}