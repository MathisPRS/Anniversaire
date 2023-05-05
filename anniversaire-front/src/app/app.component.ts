import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'My App';
  ngOnInit() {
    const authDataString = localStorage.getItem('authData');
    if (authDataString) {
      const authData = JSON.parse(authDataString);
      const { token, expiration } = authData;
      if (new Date() < new Date(expiration)) {
        // L'utilisateur est authentifié et la session est valide
        this.router.navigate(['/home']);
        this.setSessionTimeout(expiration); // démarre la session timer
      } else {
        // La session a expiré
        localStorage.removeItem('authData');
        this.router.navigate(['/login']);
      }
    } else {
      // L'utilisateur n'est pas authentifié
      this.router.navigate(['/login']);
    }
  }

  private setSessionTimeout(expiration: string) {
    const expiresInMs = new Date(expiration).getTime() - new Date().getTime();
    setTimeout(() => {
      localStorage.removeItem('authData');
      this.router.navigate(['/login']);
    }, expiresInMs);
  }
}
