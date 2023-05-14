import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';


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
  errors: any | null = null;
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.username && this.password && this.email) {
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(this.password, salt);
      const data = { 
        username: this.username, 
        password: hashedPassword, 
        email: this.email, 
        group: 'default', 
        salt: salt 
      };

      this.http.post<CreateUserResponse>('http://localhost:8000/api/users/create', data).subscribe(
        (response: CreateUserResponse) => {
          this.status = response.status;
          if (response.errors) {
            this.errors = Object.values(response.errors);
          }
          console.log(response);
        },
        (error: any) => console.log(error)
      );
    }
  }
}
