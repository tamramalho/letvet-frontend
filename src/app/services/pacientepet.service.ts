import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { pacientepet } from '../models/pacientepet';

@Injectable({
  providedIn: 'root'
})
export class PacientepetService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<pacientepet>{
    return this.http.get<pacientepet>(`${API_CONFIG.baseUrl}/pacientepet/${id}`);
  }

  findAll(): Observable<pacientepet[]> {
    return this.http.get<pacientepet[]>(`${API_CONFIG.baseUrl}/pacientepet`);
  }

  create(pacientepet: pacientepet): Observable<pacientepet> {
    return this.http.post<pacientepet>(`${API_CONFIG.baseUrl}/pacientepet`, pacientepet);
  } 

  update(pacientepet: pacientepet): Observable<pacientepet>{
    return this.http.put<pacientepet>(`${API_CONFIG.baseUrl}/pacientepet/${pacientepet.id}`, pacientepet);
  }

  delete(id: any): Observable<pacientepet>{
    return this.http.delete<pacientepet>(`${API_CONFIG.baseUrl}/pacientepet/${id}`);
  }
}
