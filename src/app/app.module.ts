import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './proposal/services/DataService';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {VistaFacturaComponent } from './proposal/vista-factura/vista-factura.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { CreacionFacturaComponent } from './proposal/creacion-factura/creacion-factura.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS as MY_FORMAT_DATE } from './myDateFormats';
import { MatNativeDateModule } from '@angular/material/core';

import {MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ClientListComponent } from './client/client-list/client-list.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { AddProductoComponent } from './producto/add-producto/add-producto.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { CommonModule } from '@angular/common';
import { MaestroListComponent } from './maestro/maestro-list/maestro-list.component';
import { MaestroAddComponent } from './maestro/maestro-add/maestro-add.component';
import { DetalleAddComponent } from './detalle/detalle-add/detalle-add.component';
import { DetalleListComponent } from './detalle/detalle-list/detalle-list.component';
import { ComprasListComponent } from './compras/compras-list/compras-list.component';
import { TablePaginationBuilderComponent } from './dynamic-table-builder/table-pagination-builder';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppTableModule } from './app-table/app-table.module';
import { AutocompleteComponent } from './autocomplete-pacient/autocomplete.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BuscarFacturaComponent } from './buscar-factura/buscar-factura.component';
import { AutocompleteProductoComponent } from './autocomplete-product/autocomplete-product.component';
import { DeleteConfirmDialogComponent } from './proposal/util-components/delete-confirm-dialog/delete-confirm-dialog.component';
import { DiscardInfoComponent } from './client/utils-components/discard-info-component-component/discard-info-component-component.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EmpleadoListComponent } from './empleados/empleado-list/empleado-list.component';
import { AddEmpleadoComponent } from './empleados/add-empleado/add-empleado.component';
import { authInterceptoProviders } from './login/AuthInterceptor';



@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    MaestroListComponent,
    MaestroAddComponent,
    DetalleAddComponent,
    DetalleListComponent,
    VistaFacturaComponent,
    CreacionFacturaComponent,
    ClientListComponent,
    AddClientComponent,
    AddProductoComponent,
    ProductoListComponent,
    LoginComponent,
     MaestroListComponent, 
     MaestroAddComponent, 
     DetalleAddComponent, 
     DetalleListComponent,
     ComprasListComponent, 
     TablePaginationBuilderComponent, 
     AutocompleteComponent,
    BuscarFacturaComponent,
    AutocompleteProductoComponent,
    DeleteConfirmDialogComponent,
    DiscardInfoComponent,
    EmpleadoListComponent,
    AddEmpleadoComponent   ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    AppTableModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
providers: [DataService,  { provide: DateAdapter, useClass:  MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
 { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT_DATE }, {provide: MatDialogRef, useValue:{}}, authInterceptoProviders 
 ], 
  // providers: [DataService
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
