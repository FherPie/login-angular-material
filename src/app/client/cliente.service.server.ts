import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ GlobalConstants } from '../../global-constants';
const baseUrlCliente = GlobalConstants.baseUrlCliente;
const baseUrl = GlobalConstants.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class ClienteServiceServer {
  
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrlCliente);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrlCliente}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrlCliente, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrlCliente}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrlCliente}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrlCliente);
  }
  searchByNombre(nombre: any): Observable<any> {
    return this.http.get(`${baseUrl}/clienteConNombreContiene?apellidos=${nombre}`);
  }

  subirArchivoExcelImportacion(formData: FormData,nameFile: any ): Observable<any> {
    return this.http.post(`${baseUrlCliente+'/uploadFile'}/${nameFile}`, formData);
  }
}