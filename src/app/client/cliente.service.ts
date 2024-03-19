import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ GlobalConstants } from '../../global-constants';
const baseUrl = GlobalConstants.baseUrlCliente;
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  getClient(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  updateClient( data: any): Observable<any> {
    return this.http.put(`${baseUrl}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  searchByNombre(nombre: any): Observable<any> {
    return this.http.get(`/api/clienteConNombreContiene?apellidos=${nombre}`);
  }

  subirArchivoExcelImportacion(formData: FormData,nameFile: any ): Observable<any> {
    return this.http.post(`${baseUrl+'/uploadFile'}/${nameFile}`, formData);
  }
}