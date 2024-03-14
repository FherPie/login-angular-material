import {Injectable} from '@angular/core';
import { Factura } from  '../models/factura';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject, of } from  'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from  '@angular/common/http';
import{ GlobalConstants } from '../../../global-constants';

//https://www.c-sharpcorner.com/article/learn-about-asynchronous-service-in-angular/
const baseUrl = GlobalConstants.baseUrl;

@Injectable()
export class DataService {


    authenticated=false;
    dataList: Factura[] = [];
    constructor(private  httpClient:  HttpClient) {
        console.log("Pasa por Constructor Servicio")
    }

    getDataListFactura(): Observable < Factura[] > {
        console.log("Pasa por Get data List Servicio")
        return this.httpClient.get<Factura []>(`${baseUrl}`+'/listarVenta').pipe(
            tap(async (res:  Factura[] ) => {
                return of(res);
            })
          );
    }

    getDataListFacturawithFilter(idCliente: number, desde: string, hasta: string): Observable < Factura[] > {
        let params = new HttpParams()
        .set('clienteId', idCliente)
        .set('startDate', desde)
        .set('endDate', hasta)

        return this.httpClient.get<Factura []>(`${baseUrl}`+'/reporteVentaxFechas', {params: params}).pipe(
            tap(async (res:  Factura[] ) => {
                return of(res);
            })
          );
    }

     guardarVenta(data: any): Observable<any> {
        return this.httpClient.post(baseUrl+'/guardarVenta', data);
      }

      getById(key:any): Observable<any> {
        return this.httpClient.get(`${baseUrl}`+'/getByIdVenta/' + key);
    }

}