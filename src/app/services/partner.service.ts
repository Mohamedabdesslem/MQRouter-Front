import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartnerCreateDTO } from './partner.model';
import { API_CONFIG } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private apiUrl = `${API_CONFIG.backendUrl}/partners`;
  constructor(private http: HttpClient) {}

  createPartner(partner: PartnerCreateDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addpartner`, partner);
  }

  deletePartner(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletepartner/${id}`);
  }

  getPartners(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listpartners`, { params: { page: page.toString(), size: size.toString() } });
  }
}
