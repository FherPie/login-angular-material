import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import{ GlobalConstants } from '../../global-constants';
const baseUrlHost = GlobalConstants.host;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  constructor(private http: HttpClient) {}

  upload(file: File, resource: string, nameFile: string, idCliente?:number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${baseUrlHost}/`+resource+`/${nameFile}/${idCliente}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }




  getFiles(): Observable<any> {
    return this.http.get(`${baseUrlHost}/files`);
  }
}