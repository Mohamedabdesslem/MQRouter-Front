import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from './services/auth.service';
import {LoginComponent} from './composants/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule, LoginComponent]
})
export class AppComponent {
  title = 'Routing Messages App';
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit() {
    // Vérifiez si l'utilisateur est authentifié au chargement de l'application
    this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }
}
