import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  constructor(private router: Router, private sidebarService: SidebarService) {}
  showSidebar = false;

  onLogout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
  checkprofile() {
    this.router.navigate(['/monprofile']);
  }
  
  ngOnInit() {
    this.sidebarService.showSidebar$.subscribe(show => {
      this.showSidebar = show;
    });
  }
  
}
