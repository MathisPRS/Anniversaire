import { Component, HostListener } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showSidebar = false;
  showProfileMenu = false ;

  constructor(private router: Router, private sidebarService: SidebarService) { }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.sidebarService.updateSidebar(this.showSidebar);
  }
  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }
    onLogout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
  checkprofile() {
    this.router.navigate(['/monprofile']);
  }
  
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const profileIcon = document.querySelector('.profile-icon');

    if (profileIcon && !profileIcon.contains(target)) {
      this.showProfileMenu = false;
    }
  }
}