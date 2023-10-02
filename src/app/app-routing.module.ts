import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VistaFacturaComponent } from './vista-factura/vista-factura.component';
import { CreacionFacturaComponent } from './creacion-factura/creacion-factura.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { ComprasListComponent } from './compras/compras-list/compras-list.component';
import { AddProductoComponent } from './producto/add-producto/add-producto.component';
import { LoginComponent } from './login/login.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { MaestroListComponent } from './maestro/maestro-list/maestro-list.component';
import { MaestroAddComponent } from './maestro/maestro-add/maestro-add.component';
import { DetalleListComponent } from './detalle/detalle-list/detalle-list.component';
import { DetalleAddComponent } from './detalle/detalle-add/detalle-add.component';
import { ProductsComponent } from './app-table/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'vista-factura', component: VistaFacturaComponent },
  { path: 'creacion-factura', component: CreacionFacturaComponent },
  { path: 'clientes', component: ClientListComponent },
  { path: 'proveedores', component: ProductoListComponent },
  { path: 'compras', component: ComprasListComponent },
  { path: 'productos', component: ProductoListComponent },
  { path: 'agregarProductos', component: AddProductoComponent },
  { path: 'productos/:id', component: AddProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addClient', component: AddClientComponent },
  { path: 'maestros', component: MaestroListComponent },
  { path: 'agregar-maestro', component: MaestroAddComponent },
  { path: 'maestro/:id', component: MaestroAddComponent },
  { path: 'detalles', component: DetalleListComponent },
  { path: 'agregar-detalle', component: DetalleAddComponent },
  { path: 'detalle/:id', component: DetalleAddComponent },
  { path: 'products', component:ProductsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
