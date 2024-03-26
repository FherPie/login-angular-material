import { Injectable } from '@angular/core';
import { UserDTO } from './UserDto';

const USER_KEY='auth-user';


@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }


public saveUser(user:string):void{
  window.sessionStorage.removeItem(USER_KEY);
  window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
}

public getUser():UserDTO | null{
  let value=window.sessionStorage.getItem(USER_KEY);
  if(value==null){
  return null;
  }else{
    return  JSON.parse(value);
  }

}


}
