import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { InputComponent } from './input/input.component';
import { ProductsComponent } from './products/products.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    TableComponent,
    InputComponent,
    ProductsComponent,
    
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class AppTableModule { }
