import {Injectable} from '@angular/core';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject, of } from  'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from  '@angular/common/http';
import{ GlobalConstants } from '../global-constants';
import { AuthenticationRequest } from './login/AuthenticationRequest';

//https://www.c-sharpcorner.com/article/learn-about-asynchronous-service-in-angular/
const baseUrl = GlobalConstants.secure;


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
    providedIn:"root",
  })  
export class AuthService {
    
    authenticated=false;

    constructor(private  httpClient:  HttpClient) {
        console.log("Pasa por Constructor Servicio")
    }

   public authenticate(credentials: AuthenticationRequest): Observable<any>{
     return this.httpClient.post<HttpResponse<any>>(baseUrl+'/authenticate', credentials, httpOptions);
   }
   public logout(): Observable<any>{
    return this.httpClient.post(baseUrl+'/logout', {});
  }

}