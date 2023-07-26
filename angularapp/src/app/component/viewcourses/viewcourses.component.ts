import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademyService } from 'src/app/services/academy.service';
import {
  faChessBishop,
  faSearch,
  faPenSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  checkCourseEnrolledForm: FormGroup;
  constructor(
    private activeRouter: ActivatedRoute,
    private academy: AcademyService,
    private auth: AuthService,
    private router:Router,
    private toaster: ToastrService
  ) {}
  ngOnInit() {
    this.checkCourseEnrolledForm =new FormGroup({
      courseID: new FormControl(),
      userID: new FormControl()
  })
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
  checkAlreadyEnrolled(courseID){
    this.checkCourseEnrolledForm.get('courseID').setValue(courseID);
    this.checkCourseEnrolledForm.get('userID').setValue(this.auth.getID());
    this.academy.checkEnrolledCourse(this.checkCourseEnrolledForm.value).subscribe(res=>{
      let check=res;
      if(check){
        this.toaster.warning('You Already Enrolled this course');
      }else{
        console.log(check);
        this.router.navigate([`user/addAdmission/${courseID}`]);
      }
    });
    
  }
}