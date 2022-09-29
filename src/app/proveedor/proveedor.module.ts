import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProveedorComponent } from './add-proveedor/add-proveedor.component';
import { ProveedorDetailsComponent } from './proveedor-details/proveedor-details.component';



@NgModule({
  declarations: [
    AddProveedorComponent,
    ProveedorDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProveedorModule { }
