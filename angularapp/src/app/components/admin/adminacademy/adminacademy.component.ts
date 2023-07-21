import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademyService } from 'src/app/services/academy.service';
import { AuthService } from 'src/app/services/auth.service';
import { faChessBishop,faSearch,faPenSquare,faTrash,faSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-adminacademy',
  templateUrl: './adminacademy.component.html',
  styleUrls: ['./adminacademy.component.css']
})
export class AdminacademyComponent implements OnInit {
  faSearch=faSearch;
  faPenToSquare=faPenSquare;
  faTrashCan=faTrash;
  faPlus=faSquare;
  faChessBishop=faChessBishop;
  adminAcademyGridNumber:number=0;
  
  constructor(private toaster:ToastrService,private router:Router,private auth: AuthService,private academy:AcademyService,private activeRouter:ActivatedRoute){}
  role:string;
  userID:number;
  academies:any=[];
  coursePK:number;
  ngOnInit(){
      this.role=this.auth.getRole();
      this.userID=this.auth.getID();

      this.academy.getAcademy().subscribe((val)=>{
       for(let i=0;i<val.length;i++){
          this.academies.push(val[i]);
       }
      })
  }

  deleteAcademy(id:number){
    this.academy.deleteAcademy(id).subscribe(res=>{
      this.academy.deleteAcademyCourse(id).subscribe(res=>{
        this.toaster.warning('Academy & its courses deleted successfully','DELETED',{timeOut:3000})
      })
      location.reload();
    })
  }
  inputvalue= '';
  searchInInput = '';
  onSearch(){
    this.searchInInput=this.inputvalue;
  }
}
