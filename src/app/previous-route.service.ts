import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {

  private currentUrl: string;
  private prevu: string='';

  constructor(private router: Router) { 
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.prevu= this.currentUrl;
        this.currentUrl= event.url;
      }
    });
  }

  public getPrevious(){
    return this.prevu;
  }
}
