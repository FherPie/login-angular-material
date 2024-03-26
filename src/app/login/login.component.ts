import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from '../AuthService';
import { AuthenticationRequest } from './AuthenticationRequest';
import { TokenStorageServiceService } from './token-storage-service.service';
import { UserStorageService } from './user.storage-service.service';


export interface DialogData {
  username: string;
  password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials:AuthenticationRequest={username:'', password:''};

  isLoggedIn= false;
  isLoginFailed= false;
  errorMessage='';
  roles: string[]=[];

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageServiceService, private userStorageService:UserStorageService
    ) {
    
   }

  ngOnInit(): void {
   if(this.tokenStorage.getToken()){
    this.isLoggedIn=true;
   }

  }

  authenticated(){
  }

  login() {
    console.log("LISTO LISTO SE EJEcuta lingn");
    console.log(this.credentials);
    this.authService.authenticate(this.credentials).subscribe({
      next: (data)=>{
      this.tokenStorage.saveToken(data.token);
      this.userStorageService.saveUser(data.user);
        this.isLoggedIn=true;
        this.reloadPage();
      },
       error: (error)=>{
        this.errorMessage= error.error;
        console.log(error);
        this.isLoginFailed=true;
      }
    })
    return false;
  }

    reloadPage():void{
      window.location.reload();
    }

}

