import {Injectable} from '@angular/core';
import { Factura } from  './factura';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject, of } from  'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from  '@angular/common/http';
import{ GlobalConstants } from '../global-constants';

//https://www.c-sharpcorner.com/article/learn-about-asynchronous-service-in-angular/
const baseUrl = GlobalConstants.baseUrl;

@Injectable()
export class DataService {


    private httpHeader=new HttpHeaders({'Content-type': 'application/json'});
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



   public authenticate(credentials: { username: string; password: string; } | undefined, callback: (() => any) | undefined){
    const headers= new HttpHeaders(credentials ?{
        authorization: 'Basic '+btoa(credentials.username+':'+credentials.password)
    }:{});
    console.log("LISTO LISTO ");
    this.httpClient.get<HttpResponse<any>>('/api/user', {headers: headers}).subscribe(response=>{
        console.log("SERSTUS"+response);
        this.authenticated= true;
        // if(response){
        //     this.authenticated= true;
        //     }else{
        //     this.authenticated= false;
        // }
        return callback && callback();
    });
}


}