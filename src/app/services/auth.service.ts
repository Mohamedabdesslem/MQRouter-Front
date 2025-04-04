import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { API_CONFIG } from '../config/config'; // Assurez-vous d'avoir bien défini votre URL backend dans config.ts
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${API_CONFIG.backendUrl}/authenticate`; // URL de votre endpoint d'authentification

  private authStatus = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient,  private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    const credentials = { username, password };
    return this.http.post<any>(`${this.apiUrl}`, credentials).pipe(
        map(response => {
          const token = response.token;
          if (token) {
            localStorage.setItem('token', token);
            this.authStatus.next(true);
            this.router.navigate(['/partners']);  // Redirection après la connexion réussie
            return true;
          }
          return false;
        }),
        catchError(() => {
          this.authStatus.next(false);
          return [false];
        })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Vérifie si un token est présent dans le localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token'); // Supprime le token du localStorage
    this.authStatus.next(false);
  }
}
