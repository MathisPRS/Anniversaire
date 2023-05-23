import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SidebarService } from '../services/sidebar.service';


interface ProfileResponse {
  status: string;
  errors?: any;
}

@Component({
  selector: 'app-monprofile',
  templateUrl: './mon-profile.component.html',
  styleUrls: ['./mon-profile.component.css']
})

export class MonprofileComponent{

  last_name: string | null = null;
  first_name: string | null = null;
  username: string | null = null;
  email: string | null = null;
  user_id = localStorage.getItem('user_id')

  isEditMode: boolean = false;
  status: string | null = null;
  loginInfo: string | null = null;
  errors: any | null = null;

  constructor(private http: HttpClient, private router: Router, private sidebarService: SidebarService) {}
  showSidebar = false;

  ngOnInit(): void {
    this.initializeVariables();
    this.sidebarService.showSidebar$.subscribe(show => {
      this.showSidebar = show;
    });
  }

  initializeVariables(): void {
    this.last_name = localStorage.getItem('last_name');
    this.first_name = localStorage.getItem('first_name');
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
  }
  
  onEditClick(): void {
        this.isEditMode = true;
  }
  onCancelClick(): void {
    this.isEditMode = false;
    this.initializeVariables();
  }
  onSaveClick(): void {
    localStorage.setItem('last_name', this.last_name ?? '');
    localStorage.setItem('first_name', this.first_name ?? '');
    localStorage.setItem('username', this.username ?? '');
    localStorage.setItem('email', this.email ?? '');
    const data = { 
      username: this.username,
      first_name : this.first_name,
      last_name : this.last_name,
      email: this.email, 
    };
    this.http.put<ProfileResponse>(`http://localhost:8000/api/users/update/${this.user_id}/`, data)
    .subscribe((response: ProfileResponse) => {
        if (response.status === 'success') {
          this.isEditMode = false;
        } else {
          this.errors = response.errors;
        }
        console.log(response);
      },
      (error: any) => console.log(error)
    );
  }
  GoHome() {
    this.router.navigate(['/home']);
  }
}