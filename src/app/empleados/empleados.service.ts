import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ GlobalConstants } from '../../global-constants';
const baseUrl = GlobalConstants.secure;
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  
  constructor(private http: HttpClient) { }
  
  getAll(): Observable<any> {
    return this.http.get(baseUrl+"/empleados");
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/empleados/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl+"/registrations", data);
  }
  update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/empleados/`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/empleados/${id}`);
  }

  activeempleados(id: any): Observable<any> {
    return this.http.put(`${baseUrl}/activeempleados/${id}`, {});
  }
  
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  searchByNombre(nombre: any): Observable<any> {
    return this.http.get(GlobalConstants.host+`/productoConNombreContiene?nombre=${nombre}`);
  }

  subirArchivoExcelImportacion(formData: FormData,nameFile: any ): Observable<any> {
    console.log('llega al serviciO');
    return this.http.post(`${baseUrl+'/uploadFile'}/${nameFile}`, formData);
  }
}