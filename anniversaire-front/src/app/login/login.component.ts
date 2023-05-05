import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface LoginResponse {
  token: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: string | null = null;
  password: string | null = null;
  token: string | null = null;
  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.username && this.password) {
      const data = { username: this.username, password: this.password };
      this.http.post<LoginResponse>('http://localhost:8000/api/login/', data).subscribe(
        response => {
          this.token = response.token;
          console.log(response);
        },
        error => console.log(error)
      );
    }
  }
}