import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})

export class ConsultaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<consulta> {
    return this.http.get<consulta>(`${API_CONFIG.baseUrl}/consulta/${id}`);
  }

  findAll(): Observable<consulta[]> {
    return this.http.get<consulta[]>(`${API_CONFIG.baseUrl}/consulta`);
  }

  create(consulta: consulta): Observable<consulta> {
    return this.http.post<consulta>(`${API_CONFIG.baseUrl}/consulta`, consulta);
  }

  update(consulta: consulta): Observable<consulta> {
    return this.http.put<consulta>(`${API_CONFIG.baseUrl}/consulta/${consulta.id}`, consulta); 
  }
}
