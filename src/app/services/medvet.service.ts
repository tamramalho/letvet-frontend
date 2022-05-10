import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { medvet } from '../models/medvet';

@Injectable({
  providedIn: 'root'
})
export class MedvetService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<medvet>{
    return this.http.get<medvet>(`${API_CONFIG.baseUrl}/medvet/${id}`);
  }

  findAll(): Observable<medvet[]> {
    return this.http.get<medvet[]>(`${API_CONFIG.baseUrl}/medvet`);
  }

  create(medvet: medvet): Observable<medvet> {
    return this.http.post<medvet>(`${API_CONFIG.baseUrl}/medvet`, medvet);
  } 

  update(medvet: medvet): Observable<medvet>{
    return this.http.put<medvet>(`${API_CONFIG.baseUrl}/medvet/${medvet.id}`, medvet);
  }
}
