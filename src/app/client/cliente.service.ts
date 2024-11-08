import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ GlobalConstants } from '../../global-constants';
const baseUrlCliente = GlobalConstants.baseUrlCliente;


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrlCliente);
  }
  getClient(id: any): Observable<any> {
    return this.http.get(`${baseUrlCliente}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrlCliente, data);
  }
  updateClient(data: any): Observable<any> {
    console.log("data",data);
    return this.http.put(`${baseUrlCliente}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrlCliente}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrlCliente);
  }
  searchByNombre(nombre: any): Observable<any> {
    return this.http.get(`${baseUrlCliente}/clienteConNombreContiene?apellidos=${nombre}`);
  }

  subirArchivoExcelImportacion(formData: FormData,nameFile: any ): Observable<any> {
    return this.http.post(`${baseUrlCliente+'/uploadFile'}/${nameFile}`, formData);
  }


}