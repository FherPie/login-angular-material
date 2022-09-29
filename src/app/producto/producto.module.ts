import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductoComponent } from './add-producto/add-producto.component';
import { ProductoDetailsComponent } from './producto-details/producto-details.component';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AddProductoComponent,
    ProductoDetailsComponent,
    ProductoListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ProductoModule { }
