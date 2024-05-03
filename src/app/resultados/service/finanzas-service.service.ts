import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/global-constants';

const baseUrl= GlobalConstants.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {

  constructor(private httpClient: HttpClient) { }

  getListIngresos(): Observable <any>{
     return this.httpClient.get(`${baseUrl}`+'/entradas');
  }

 getIngreso(id: any): Observable<any> {
  return this.httpClient.get(`${baseUrl}/entradas/${id}`);
 }

}
