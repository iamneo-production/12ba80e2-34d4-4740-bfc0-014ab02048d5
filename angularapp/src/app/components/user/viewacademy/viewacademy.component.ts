import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademyService } from 'src/app/services/academy.service';
import { AuthService } from 'src/app/services/auth.service';
import { faChessBishop,faSearch,faPenSquare,faTrash,faSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-viewacademy',
  templateUrl: './viewacademy.component.html',
  styleUrls: ['./viewacademy.component.css']
})
export class ViewacademyComponent implements OnInit {
  faSearch=faSearch;
  faPenToSquare=faPenSquare;
  faTrashCan=faTrash;
  faPlus=faSquare;
  faChessBishop=faChessBishop;
  searchInInput= '';
  
  constructor(private auth: AuthService,private academy:AcademyService){}
  userID:string;
  academies:any=[];
  ngOnInit(){
      this.userID=this.auth.getID();
      this.academy.getAcademy().subscribe((val)=>{
       for(let i=0;i<val.length;i++){
          this.academies.push(val[i]);
       }
      })
     
  }
}

