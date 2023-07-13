import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcademyService } from 'src/app/services/academy.service';
import { faBook,faChessBishop,faLocationArrow,faChessKnight,faEnvelope,faLock,faExclamationTriangle,faChessKing,faUser,faMobile,faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-institute',
  templateUrl: './add-institute.component.html',
  styleUrls: ['./add-institute.component.css']
})
export class AddInstituteComponent implements OnInit {
  addAcademyForm: FormGroup;
  faChessKnight=faChessKnight;
  faEnvelope=faEnvelope;
  faLock=faLock;
  faTriangleExclamation=faExclamationTriangle;
  faUser=faUser;
  faMobile=faMobile;
  faImage=faImage;
  faLocation=faLocationArrow;
  faChessBishop=faChessBishop;
  faBook=faBook;
  constructor(private router:Router,private academy:AcademyService,private toaster:ToastrService){}

  ngOnInit(){
    this.addAcademyForm=new FormGroup({
      instituteName:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9\s]+$/)]),
      mobile:new FormControl(null,[Validators.required,Validators.pattern(/^(?:\+91|0)?[6789]\d{9}$/)]),
      image:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      instituteAddress:new FormControl(null,[Validators.required]),
      instituteDescription:new FormControl(null,[Validators.required]),
    });
  }
  onAddAcademy(){
    if(this.addAcademyForm.valid){
      this.academy.addAcademy(this.addAcademyForm.value).subscribe({
        next:((res)=>{
          this.addAcademyForm.reset();
          this.toaster.success('Success',res.message,{timeOut:3000});
          this.router.navigate(['admin/viewInstitutes']);
        }), 
        error:(err)=>{
          this.toaster.warning('Error',err.message,{timeOut:3000});
        }
      })
    }else{
      this.addAcademyForm.markAllAsTouched();
    }
  }

}
