import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface CreateUserResponse {
  status: string;
  errors?: any;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  username: string | null = null;
  password: string | null = null;
  email: string | null = null;
  status: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.username && this.password && this.email) {
      const data = { username: this.username, password: this.password, email: this.email, group: 'default' };
      this.http.post<CreateUserResponse>('http://localhost:8000/api/users/create', data).subscribe(
        (response: CreateUserResponse) => {
          this.status = response.status;
          console.log(response);
        },
        (error: any) => console.log(error)
      );
    }
  }
}
