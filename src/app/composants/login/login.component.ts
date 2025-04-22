import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    // Appel au service d'authentification
    this.authService.login(this.username, this.password).subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          // Si authentification réussie, redirection vers Partners
          this.router.navigate(['/partners']);
        } else {
          // Si erreur, afficher un message d'erreur
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
        }
      },
      (error) => {
        // Si une erreur se produit pendant l'authentification
        this.errorMessage = 'Une erreur est survenue, veuillez réessayer.';
      }
    );
  }
}
