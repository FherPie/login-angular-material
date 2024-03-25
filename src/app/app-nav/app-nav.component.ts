import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DataService } from '../proposal/services/DataService';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {

  usuario:any;
  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
     private app: DataService, private http: HttpClient,
      private router: Router) {
    
    //http.get('/api/resource').subscribe(data => this.greeting = data);
  }
  ngOnInit(): void {
    this.usuario= JSON.parse(localStorage.getItem("usuario")|| '{}');
  }

  
  
    public authenticated(): boolean{
      return this.app.authenticated;
    }



  // logout() {
  //   this.http.post('logout', {}).pipe(
  //     finalize(() => {
  //       this.app.authenticated = false;
  //       this.router.navigateByUrl('/login');
  //     })).subscribe();
  // }

}
