import { Component} from '@angular/core';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent {
  faChessKnight=faChessKnight;
  constructor(private auth:AuthService){}
  logout(){
    this.auth.signout();
  }
}
