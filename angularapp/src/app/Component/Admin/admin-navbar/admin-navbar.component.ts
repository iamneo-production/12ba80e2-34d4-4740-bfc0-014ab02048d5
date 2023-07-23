import { Component, OnInit } from '@angular/core';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent  {
  faChessKnight=faChessKnight;
  constructor() { }

}
