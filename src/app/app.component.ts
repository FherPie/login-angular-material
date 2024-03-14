import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from './proposal/services/DataService';
import { Factura } from  './proposal/vista-factura/factura';
import { ActivatedRoute, Router } from "@angular/router";
import { TokenStorageServiceService } from './login/token-storage-service.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggeIn=false;
  username?:string | null;
  opened:boolean=false;
  showMenuSecurity:boolean=true;
  showMenuConsultory:boolean=true;
  showMenuFinance:boolean=true;


  @ViewChild('drawer') sidenav: MatSidenav | undefined;


  closeSideNav() {
    this.sidenav?.close();
  }
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private  tokenStorageService: TokenStorageServiceService) {
  }

  ngOnInit() {
    this.isLoggeIn= !! this.tokenStorageService.getToken();

    if(this.isLoggeIn){
      this.username= this.tokenStorageService.getToken();
    }else{
      this.closeSideNav();
    }
  }

  logout():void{
    this.tokenStorageService.signOut();
     window.location.reload();
  }



}
