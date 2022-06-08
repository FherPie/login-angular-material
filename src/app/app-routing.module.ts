import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VistaFacturaComponent } from "./vista-factura/vista-factura.component";
import { CreacionFacturaComponent } from "./creacion-factura/creacion-factura.component";

const routes: Routes = [
  { path: '', redirectTo: 'vista-factura', pathMatch: 'full' },
  { path: 'vista-factura', component:VistaFacturaComponent },
  { path: 'creacion-factura', component:CreacionFacturaComponent },
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
