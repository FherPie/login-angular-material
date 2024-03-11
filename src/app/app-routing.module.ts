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
import { AutocompleteComponent } from './autocomplete-pacient/autocomplete.component';
import { AppNavComponent } from './app-nav/app-nav.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'vista-factura', component: VistaFacturaComponent },
  { path: 'creacion-factura', component: CreacionFacturaComponent },
  { path: 'clientes', component: ClientListComponent },
  { path: 'proveedores', component: ProductoListComponent },
  { path: 'compras', component: ComprasListComponent },
  { path: 'productos', component: ProductoListComponent },
  { path: 'agregarProductos', component: AddProductoComponent },
  { path: 'addClient', component: AddClientComponent },
  { path: 'maestros', component: MaestroListComponent },
  { path: 'agregar-maestro', component: MaestroAddComponent },
  { path: 'agregar-detalle', component: DetalleAddComponent },
  { path: 'productos/:id', component: AddProductoComponent },
  { path: 'detalles', component: DetalleListComponent },
  { path: 'products', component:ProductsComponent },
  { path: 'app-nav', component: AppNavComponent },
  { path: 'maestro/:id', component: MaestroAddComponent },
  { path: 'detalle/:id', component: DetalleAddComponent },
  { path: 'addClient/:id', component: AddClientComponent },
  { path: 'autocomplete', component: AutocompleteComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
