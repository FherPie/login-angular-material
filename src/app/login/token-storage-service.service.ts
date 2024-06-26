import { Injectable } from '@angular/core';

const TOKEN_KEY='auth-token';
const USER_KEY='auth-user';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageServiceService {

  constructor() { }

  signOut(): Promise<boolean>{
    window.sessionStorage.clear();
    return  new Promise(resolve =>{
      resolve(true)
    })
  }

public saveToken(token:string):void{
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, token)
}

public getToken():string | null{
  return window.sessionStorage.getItem(TOKEN_KEY);
}


}
