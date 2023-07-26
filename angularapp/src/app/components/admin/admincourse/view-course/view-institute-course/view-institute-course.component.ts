import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {
  faChessBishop,
  faSearch,
  faPenSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AcademyService } from 'src/app/services/academy.service';

@Component({
  selector: 'app-view-institute-course',
  templateUrl: './view-institute-course.component.html',
  styleUrls: ['./view-institute-course.component.css'],
})
export class ViewInstituteCourseComponent implements OnInit {
  searchInInput = '';
  faSearch = faSearch;
  faPenToSquare = faPenSquare;
  faTrashCan = faTrash;
  faChessBishop = faChessBishop;
  Instituteid: number;
  academyname:string;
  allCourses = [];
  constructor(
    private router: Router,
    private toaster: ToastrService,
    private activeRouter: ActivatedRoute,
    private academy: AcademyService
  ) {}
  ngOnInit() {
    this.Instituteid = this.activeRouter.snapshot.params['id'];
    this.academy.getAllCourses().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.allCourses[i] = res[i];
      }
    });
    this.academy.getAcademyById(this.Instituteid).subscribe(res=>{
      this.academyname=res.instituteName;
    })
  }
  deleteCourse(id: number) {
    this.academy.deleteCourse(id).subscribe((res) => {
      location.reload();
      this.toaster.success('Course deleted successfully', 'Deleted', {
        timeOut: 5000,
      });
    });
  }
}
