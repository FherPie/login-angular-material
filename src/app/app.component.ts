import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from './proposal/services/DataService';
import { Factura } from  './proposal/models/factura';
import { ActivatedRoute, Router } from "@angular/router";
import { TokenStorageServiceService } from './login/token-storage-service.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { finalize, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './AuthService';
import { UserStorageService } from './login/user.storage-service.service';

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

  constructor(private breakpointObserver: BreakpointObserver, 
    private  tokenStorageService: TokenStorageServiceService,private authService: AuthService,
    private router: Router, private userStorageService: UserStorageService) {
  }

  ngOnInit() {
    this.isLoggeIn= !! this.tokenStorageService.getToken();

    if(this.isLoggeIn){
      this.username= this.userStorageService.getUser()?.username;
    }else{
      this.closeSideNav();
    }
  }

  logout():void{
     this.authService.logout().pipe(
      finalize(() => {
        this.tokenStorageService.signOut().then(()=>{
          this.router.navigateByUrl('/login').then(()=> {window.location.reload();});
        });
      })).subscribe({
        next: data=>{
    
        }
      });
  }



}
