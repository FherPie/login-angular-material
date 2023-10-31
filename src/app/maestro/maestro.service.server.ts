import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../global-constants';

const baseUrl = GlobalConstants.baseUrlMaestro;

@Injectable({
  providedIn: 'root',
})
export class MaestroServiceServer {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  update(data: any): Observable<any> {
    return this.http.put(baseUrl, data);
  }
}
