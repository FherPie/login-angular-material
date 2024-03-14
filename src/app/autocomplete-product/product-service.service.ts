import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalConstants } from 'src/global-constants';

const baseUrl = GlobalConstants.baseUrlProductos;

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  endpoint: string = 'private';

  

  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<any> {
    return this.http.get(baseUrl);
  }

  // getListPacient(): Observable<any> {
  //     return this.http.get(this.url + this.endpoint + '/listPacient');
  // }

  // getById(key:any): Observable<any> {
  //     return this.http.get(this.url + this.endpoint + '/getByIdPacient/' + key);
  // }
  
}
