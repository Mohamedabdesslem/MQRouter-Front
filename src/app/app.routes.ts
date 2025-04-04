import { Routes } from '@angular/router';
import { PartnersComponent } from './composants/partners/partners.component';
import { MessagesComponent } from './composants/messages/messages.component';
import {LoginComponent} from "./composants/login/login.component";
import {AuthGuard} from "./services/auth.guard";

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },  // Page de connexion initiale
  { path: 'login', component: LoginComponent },  // Redirection vers la page de connexion
  {
    path: 'partners',
    component: PartnersComponent,
    canActivate: [AuthGuard],  // Utilisation de AuthGuard pour protéger la route
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard],  // Utilisation de AuthGuard pour protéger la route
  },
  { path: '**', component: LoginComponent }  // Redirection vers la page de login si la route n'existe pas
];
