import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCompraComponent } from './add-compra/add-compra.component';
import { ProductoComprasComponent } from './producto-compras/producto-compras.component';
import { ComprasDetailsComponent } from './compras-details/compras-details.component';
import { ComprasListComponent } from './compras-list/compras-list.component';



@NgModule({
  declarations: [
    AddCompraComponent,
    ProductoComprasComponent,
    ComprasDetailsComponent,
    ComprasListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComprasModule { }
