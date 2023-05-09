import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Vérifie si le token est présent et valide, si non redirige l'utilisateur vers la page de connexion
    const token = localStorage.getItem('access_token');
    if (!token || this.isTokenExpired(token)) {
      this.router.navigate(['/login']);
    }
  }

  private isTokenExpired(token: string): boolean {
    // Vérifie si le token est expiré en comparant la date d'expiration avec l'heure actuelle
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expiration = new Date(decodedToken.exp * 1000);
    return expiration < new Date();
  }
}
