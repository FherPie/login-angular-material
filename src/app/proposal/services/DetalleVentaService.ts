import {Injectable} from '@angular/core';
import { Factura } from  '../models/factura';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject, of } from  'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from  '@angular/common/http';
import{ GlobalConstants } from '../../../global-constants';

const baseUrl = GlobalConstants.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {


    authenticated=false;
    dataList: Factura[] = [];
    constructor(private  httpClient:  HttpClient) {
    }


    listarDetallesVenta(key:any): Observable<any> {
      return this.httpClient.get(baseUrl+ '/listarDetallesVenta/' + key);
  }


}