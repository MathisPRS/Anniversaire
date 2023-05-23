import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showSidebar = false;

  constructor(private router: Router, private sidebarService: SidebarService) {}

  addbirthday() {
    this.router.navigate(['/birthday']);
  }

  ngOnInit() {
    this.sidebarService.showSidebar$.subscribe(show => {
      this.showSidebar = show;
    });
  }
}
