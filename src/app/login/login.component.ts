import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../DataService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  credentials = {username: '', password: ''};
  error="";

  constructor(private app: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  authenticated(){
  }

  login() {
    console.log("LISTO LISTO SE EJEcuta lingn");
    console.log(this.credentials);
    this.app.authenticate(this.credentials, () => {
      console.log("ANTES DE NAvigate");
      this.router.navigateByUrl('/vista-factura');
    });
    return false;
  }

}
