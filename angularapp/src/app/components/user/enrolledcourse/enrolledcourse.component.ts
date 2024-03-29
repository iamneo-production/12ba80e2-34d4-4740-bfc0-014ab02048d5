import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faChessBishop,
  faSearch,
  faPenSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AcademyService } from 'src/app/services/academy.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-enrolledcourse',
  templateUrl: './enrolledcourse.component.html',
  styleUrls: ['./enrolledcourse.component.css'],
})
export class EnrolledcourseComponent implements OnInit{
  constructor(private auth:AuthService,private academy:AcademyService,private toaster:ToastrService,private router:Router){}
  EnrolledStudentData = [];
  courses=[];
  academies=[];
  loginID;
  
  faPenToSquare = faPenSquare;
  faTrashCan = faTrash;
  faChessBishop = faChessBishop;
  faSearch=faSearch;
  feedbackForm: FormGroup;
  addCourseForm: FormGroup;
  instituteId;
  reloadPage:boolean=false;
  ngOnInit(): void {

    this.feedbackForm = new FormGroup({
      rating : new FormControl(null,Validators.required),
      instituteId: new FormControl(),
      instituteName: new FormControl(null),
      mobile: new FormControl(null),
      image: new FormControl(null),
      email: new FormControl(null),
      instituteAddress: new FormControl(null),
      instituteDescription: new FormControl(null),
      userGiveRating : new FormControl(null),
      averageRating: new FormControl(null),
    })
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


    this.loginID=this.auth.getID();
    this.academy.getStudent().subscribe(res=>{
      for (let i = 0; i < res.length; i++) {
        this.EnrolledStudentData[i] = res[i];  
      }
    })
    this.academy.getAllCourses().subscribe(res=>{
      for (let i = 0; i < res.length; i++) {
        this.courses[i] = res[i];  
      }
    })
    this.academy.getAcademy().subscribe(res=>{
      for (let i = 0; i < res.length; i++) {
        this.academies[i] = res[i];  
      }
    })
  }
  onDelete(id:number,courseId:number){
    this.academy.deleteStudent(id).subscribe(res=>{
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
      this.toaster.error("Enrolled course deleted","Deleted",{timeOut:3000});
    })
  }
  fetchinstituteId(id){
    this.instituteId=id;
  }
  onSubmitFeedback(){
    if(this.feedbackForm.valid){
      this.academy.getAcademyById(this.instituteId).subscribe(res=>{
        let instituteUserGiveRating=res.userGiveRating+1;
        let instituteRating=this.feedbackForm.get('rating').value+res.rating;
        let averageRating= instituteRating/instituteUserGiveRating;
        this.feedbackForm.get('rating').setValue(instituteRating);
        this.feedbackForm.get('userGiveRating').setValue(instituteUserGiveRating);
        this.feedbackForm.get('averageRating').setValue(averageRating.toFixed(2));
        this.feedbackForm.get('instituteId').setValue(this.instituteId);
        this.feedbackForm.get('instituteName').setValue(res.instituteName);
        this.feedbackForm.get('mobile').setValue(res.mobile);
        this.feedbackForm.get('image').setValue(res.image);
        this.feedbackForm.get('email').setValue(res.email);
        this.feedbackForm.get('instituteAddress').setValue(res.instituteAddress);
        this.feedbackForm.get('instituteDescription').setValue(res.instituteDescription);
        this.academy.updateAcademy(this.instituteId,this.feedbackForm.value).subscribe(res=>{
          this.toaster.success("Feedback Submitted");
          this.feedbackForm.reset();
        })
      })
    }else{
      this.toaster.error("Feedback form invalid!!!");
    }
  }
  inputvalue= '';
  searchInInput = '';
  onSearch(){
    this.searchInInput=this.inputvalue;
  }
}
