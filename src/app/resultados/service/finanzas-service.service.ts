import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/global-constants';
import { Ingreso } from '../ingresos/ingresoModel';

const baseUrl= GlobalConstants.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {

  constructor(private httpClient: HttpClient) { }

  getListIngresos(): Observable <any>{
     return this.httpClient.get(`${baseUrl}`+'/entradas');
  }

  getListEgresos(): Observable <any>{
    return this.httpClient.get(`${baseUrl}`+'/salidas');
 }

  saveIngreso(data:any):Observable<any> {
    return this.httpClient.post(`${baseUrl}`+'/entrada',data );
  }

  deleteIngreso(data:Ingreso):Observable<any>{
  return this.httpClient.delete(`${baseUrl}`+'/entrada/'+data.id);
  }


  saveSalida(data:any):Observable<any> {
    return this.httpClient.post(`${baseUrl}`+'/salida',data );
  }

  deleteSalida(egreso:any):Observable<any> {
    return this.httpClient.delete(`${baseUrl}`+'/salida/'+egreso.id );
  }


 getIngreso(id: any): Observable<any> {
  return this.httpClient.get(`${baseUrl}/entrada/${id}`);
 }

 getEgreso(id: any): Observable<any> {
  return this.httpClient.get(`${baseUrl}/salida/${id}`);
 }


}
