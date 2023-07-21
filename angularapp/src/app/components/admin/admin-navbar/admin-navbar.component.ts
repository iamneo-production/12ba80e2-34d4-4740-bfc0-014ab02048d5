import { Component, OnInit} from '@angular/core';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  faChessKnight=faChessKnight;
  adminName:string;
  userID:number;
  constructor(private auth:AuthService){}
  ngOnInit(): void {
    this.userID=this.auth.getID();
    this.auth.getAdminData(this.userID).subscribe((val)=>{
      this.adminName=val.username;
  })
  }
  scrollToAcademy(){
    const targetElement = document.getElementById('allAcademy');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  logout(){
    this.auth.signout();
  }
 
}