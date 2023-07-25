import { Component,  OnInit } from '@angular/core';
import { AcademyService } from 'src/app/services/academy.service';
import { AuthService } from 'src/app/services/auth.service';
import { faChessBishop,faSearch,faPenSquare,faTrash,faSquare } from '@fortawesome/free-solid-svg-icons';
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
  constructor(private auth: AuthService,private academy:AcademyService){}
  userID:string;
  academies:any=[];
  ngOnInit(){
      this.userID=this.auth.getID();
      this.academy.getAcademy().subscribe((val)=>{
        for (const element of val) {
          this.academies.push(element);
        }        
      })  
  }
  inputvalue= '';
  searchInInput = '';
  onSearch(){
    this.searchInInput=this.inputvalue;
  }
}

