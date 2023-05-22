import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface AddFriendResponse {
  status: string;
  errors?: any;
}

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.css']
})

export class BirthdayComponent {

  first_name: string = '';
  last_name: string = ''
  birthdayDate!: Date;
  user_id = localStorage.getItem('user_id')

  status: string | null = null;
  loginInfo: string | null = null;
  errors: any | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ajouterAnniversaire(): void {
    const formData = new FormData();
    formData.append('last_name', this.last_name);
    formData.append('first_name', this.first_name);
    
    const formattedDate = new Date(this.birthdayDate).toISOString().split('T')[0];
    formData.append('birthday_date', formattedDate);
      
    this.http.post<AddFriendResponse>(`http://localhost:8000/api/anniversaire/${this.user_id}/`, formData)
    .subscribe((response: AddFriendResponse) => {
      if (response.status === 'success') {
        this.status = response.status
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