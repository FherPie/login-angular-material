import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DataService } from '../DataService';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {

  greeting= {};
  usuario:any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
     private app: DataService, private http: HttpClient,
      private router: Router) {
     
    //this.app.authenticate(undefined, undefined);
    //http.get('/api/resource').subscribe(data => this.greeting = data);
  }
  ngOnInit(): void {
   //while(true){
    this.usuario= JSON.parse(localStorage.getItem("usuario")|| '{}');
   //}
  }

  
  
    public authenticated(): boolean{
      return this.app.authenticated;
    }



  logout() {

  
    this.http.post('logout', {}).pipe(
      finalize(() => {
        this.app.authenticated = false;
        this.router.navigateByUrl('/login');
      })).subscribe();
  }

}
