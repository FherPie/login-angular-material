import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  url = `${environment.apiUrlPaciente}/`;
  endpoint: string = 'private';

  constructor(private http: HttpClient) {}


  getListPacient(): Observable<any> {
      return this.http.get(this.url + this.endpoint + '/listPacient');
  }

  getById(key:any): Observable<any> {
      return this.http.get(this.url + this.endpoint + '/getByIdPacient/' + key);
  }
  
}
