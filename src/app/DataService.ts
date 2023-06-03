import {Injectable} from '@angular/core';
import { Factura } from  './factura';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject, of } from  'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
//import { GlobalConstants } from './global-constants';
import{ GlobalConstants } from '../global-constants';

//https://www.c-sharpcorner.com/article/learn-about-asynchronous-service-in-angular/
const baseUrl = GlobalConstants.baseUrlVenta;

@Injectable()
export class DataService {
    GET_OPE:  string  =  'http://186.4.141.253:255/api/venta';
   // POST_OPE:  string  =  'http://localhost:8080/api/';

    private httpHeader=new HttpHeaders({'Content-type': 'application/json'});
    authenticated=false;
    dataList: Factura[] = [];
    // constructor(private http:HttpClient){}

    constructor(private  httpClient:  HttpClient) {
        //this.dataList = Mockdata.dataList;
        //this.getDataList().subscribe(res => this.dataList = res);
        console.log("Pasa por Constructor Servicio")
    }

    getDataList(): Observable < Factura[] > {
        console.log("Pasa por Get data List Servicio")
        return this.httpClient.get<Factura []>(`${baseUrl}`).pipe(
            tap(async (res:  Factura[] ) => {
                return of(res);
            })
          );
    }

    //  createData(data: any, resource: string): Observable<any> {
    //     return this.http.post(resource, data, {headers: this.httpHeader});
    //  }

     createData(data: any): Observable<any> {
        return this.httpClient.post(baseUrl, data);
      }


    // removedata(data: Factura) {
    //     let index = this.dataList.indexOf(data);
    //     if (index !== -1) {
    //         this.dataList.splice(index, 1);
    //     }
    // }

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