import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faChessBishop,
  faSearch,
  faPenSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Toast, ToastrService } from 'ngx-toastr';
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
  searchInInput = '';
  faSearch = faSearch;
  faPenToSquare = faPenSquare;
  faTrashCan = faTrash;
  faChessBishop = faChessBishop;
  feedbackForm: FormGroup;
  instituteId;
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
  onDelete(id:number){
    this.academy.deleteStudent(id).subscribe(res=>{
      this.toaster.warning("Student deleted","Deleted",{timeOut:3000});
    })
    location.reload();
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
        averageRating.toFixed(2);
        this.feedbackForm.get('rating').setValue(instituteRating);
        this.feedbackForm.get('userGiveRating').setValue(instituteUserGiveRating);
        this.feedbackForm.get('averageRating').setValue(averageRating);
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
}
