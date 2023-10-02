import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-compras-list',
  templateUrl: './compras-list.component.html',
  styleUrls: ['./compras-list.component.css']
})
export class ComprasListComponent implements OnInit {


  @ViewChild('productosTemplate') ProductsComponent: TemplateRef<any> | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
