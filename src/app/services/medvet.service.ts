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

  findAll(): Observable<medvet[]> {
    return this.http.get<medvet[]>(`${API_CONFIG.baseUrl}/medvet`);
  }
}
