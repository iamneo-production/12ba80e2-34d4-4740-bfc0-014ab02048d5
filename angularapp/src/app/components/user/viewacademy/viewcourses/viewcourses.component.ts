import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademyService } from 'src/app/services/academy.service';
import {
  faChessBishop,
  faSearch,
  faPenSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-viewcourses',
  templateUrl: './viewcourses.component.html',
  styleUrls: ['./viewcourses.component.css'],
})
export class ViewcoursesComponent {
  faSearch = faSearch;
  faPenToSquare = faPenSquare;
  faTrashCan = faTrash;
  faChessBishop = faChessBishop;
  Instituteid: number;
  academyname: string;
  allCourses = [];
  constructor(
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
  inputvalue= '';
  searchInInput = '';
  onSearch(){
    this.searchInInput=this.inputvalue;
  }
}
