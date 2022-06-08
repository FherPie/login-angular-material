import { Component } from '@angular/core';
import { DataService } from './DataService';
import { Factura } from  './factura';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private  dataService:  DataService) {}

  allFacturas: Factura[] = [];

  ngOnInit() {
    this.dataService.getDataList().subscribe(res => this.allFacturas = res);
  }


  // addFactura(form){
  //   this.dataService.addData(form.value).subscribe(res=>{
     
  //     this.router.navigateByUrl('home');
  //   },
  //   err=>{
  //     this.presentToast(err.error);
  //   } );
  // }




  title = 'todo';
  filter: 'all' | 'active' | 'done' = 'all';

  allItems = [
    { description: 'eat', done: true },
    { description: 'sleep', done: false },
    { description: 'play', done: false },
    { description: 'laugh', done: false },
  ];


  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter(item => this.filter === 'done' ? item.done : !item.done);
  }


  addItem(description: string) {
    this.allItems.unshift({
      description,
      done: false
    });
  }

}
