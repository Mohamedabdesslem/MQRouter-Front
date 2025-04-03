import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = `${API_CONFIG.backendUrl}/messages`;
  constructor(private http: HttpClient) {}

  getMessages(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }
}
