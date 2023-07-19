import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faIcons,faChessKnight, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.css'],
})
export class UserFooterComponent {
  constructor(private router:Router){}
  faIcons=faIcons;
  faChessKnight=faChessKnight;
  faArrowRight= faArrowRight;
}
