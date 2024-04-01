import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/global-constants';
const baseUrlEstablishment = GlobalConstants.baseUrlEstablishment;


@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrlEstablishment);
  }
  getEstablishment(): Observable<any> {
    return this.http.get(`${baseUrlEstablishment}`+"user");
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrlEstablishment, data);
  }
  updateEstablishment(data: any): Observable<any> {
    return this.http.put(`${baseUrlEstablishment}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrlEstablishment}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrlEstablishment);
  }
  searchByNombre(nombre: any): Observable<any> {
    return this.http.get(`${baseUrlEstablishment}/clienteConNombreContiene?apellidos=${nombre}`);
  }

  subirArchivoExcelImportacion(formData: FormData,nameFile: any ): Observable<any> {
    return this.http.post(`${baseUrlEstablishment+'/uploadFile'}/${nameFile}`, formData);
  }
}