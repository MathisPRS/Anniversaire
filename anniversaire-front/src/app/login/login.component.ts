import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  access: string;
  data_user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    id: string;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: string | null = null;
  password: string | null = null;
  loginError: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.username && this.password) {
      const data = { username: this.username, password: this.password };
      this.http.post<LoginResponse>('http://localhost:8000/api/login/', data).subscribe(
        response => {
          if (response.access) {
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('username', response.data_user.username);
            localStorage.setItem('email', response.data_user.email);
            localStorage.setItem('first_name', response.data_user.first_name);
            localStorage.setItem('last_name', response.data_user.last_name);
            localStorage.setItem('user_id', response.data_user.id);
            this.router.navigate(['/home']);
          } else {
            this.loginError = "Identifiants invalides";
          }
        },
        error => {
          console.log(error);
          this.loginError = "Une erreur est survenue lors de la connexion";
        }
      );
    }
  }
}