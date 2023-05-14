import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
  checkprofile() {
    this.router.navigate(['/monprofile']);
  }
  addbirthday() {
    this.router.navigate(['/birthday']);

  }
  
}
