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

  findAll(): Observable<consulta[]> {
    return this.http.get<consulta[]>(`${API_CONFIG.baseUrl}/consulta`);
  }

  create(consulta: consulta): Observable<consulta> {
    return this.http.post<consulta>(`${API_CONFIG.baseUrl}/consulta`, consulta);
  }
}
