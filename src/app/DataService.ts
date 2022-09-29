import {Injectable} from '@angular/core';
import { Factura } from  './factura';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject, of } from  'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';

//https://www.c-sharpcorner.com/article/learn-about-asynchronous-service-in-angular/

@Injectable()
export class DataService {
    //GET_OPE:  string  =  'http://186.4.141.253:255/api/factura';
    //POST_OPE:  string  =  'http://186.4.141.253:255/api/factura';

    authenticated=false;
    dataList: Factura[] = [];
    constructor(private http:HttpClient){}

    // constructor(private  httpClient:  HttpClient) {
    //     //this.dataList = Mockdata.dataList;
    //     //this.getDataList().subscribe(res => this.dataList = res);
    //     console.log("Pasa por Constructor Servicio")
    // }

    // getDataList(): Observable < Factura[] > {
    //     console.log("Pasa por Get data List Servicio")
    //     return this.httpClient.get<Factura []>(`${this.GET_OPE}`).pipe(
    //         tap(async (res:  Factura[] ) => {
    //             return of(res);
    //         })
    //       );
    // }

    // createData(data: any): Observable<any> {
    //     return this.httpClient.post(this.POST_OPE, data);
    // }


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
    this.http.get<HttpResponse<any>>('/api/user', {headers: headers}).subscribe(response=>{
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