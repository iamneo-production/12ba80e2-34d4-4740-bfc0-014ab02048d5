import { Component} from '@angular/core';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  faChessKnight=faChessKnight;
  constructor(private auth:AuthService){}
  logout(){
    this.auth.signout();
  }
}