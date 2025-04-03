import { Routes } from '@angular/router';
import { PartnersComponent } from './composants/partners/partners.component';
import { MessagesComponent } from './composants/messages/messages.component';

export const appRoutes: Routes = [
  { path: 'partners', component: PartnersComponent },
  { path: 'messages', component: MessagesComponent }

];
