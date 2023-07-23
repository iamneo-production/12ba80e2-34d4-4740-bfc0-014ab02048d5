import { Component, OnInit} from '@angular/core';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  faChessKnight=faChessKnight;
  userName:string;
  userID:number;
  constructor(private auth:AuthService){}
  ngOnInit(): void {
    this.userID=this.auth.getID();
    this.auth.getUserData(this.userID).subscribe((val)=>{
      this.userName=val.username;
  })
  }
  scrollToAcademy(){
    const targetElement = document.getElementById('ourAcademy');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  logout(){
    this.auth.signout();
  }
}
