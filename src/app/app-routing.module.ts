import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VistaFacturaComponent } from "./vista-factura/vista-factura.component";
import { CreacionFacturaComponent } from "./creacion-factura/creacion-factura.component";
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { ComprasListComponent } from './compras/compras-list/compras-list.component';
import { AddProductoComponent } from './producto/add-producto/add-producto.component';
import { ProductoDetailsComponent } from './producto/producto-details/producto-details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'vista-factura', component:VistaFacturaComponent },
  { path: 'creacion-factura', component:CreacionFacturaComponent },
  { path: 'clientes', component:ClientListComponent },
  { path: 'clientes/:id', component:ClientDetailsComponent },
  { path: 'proveedores', component:ProductoListComponent },
  { path: 'compras', component:ComprasListComponent },
  { path: 'productos', component: ProductoListComponent},
  { path: 'agregarProductos', component: AddProductoComponent},
  { path: 'productos/:id', component: ProductoDetailsComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,   RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
