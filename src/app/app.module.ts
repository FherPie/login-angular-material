import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './DataService';
import { HttpClientModule } from '@angular/common/http';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogBuscarFactura, VistaFacturaComponent } from './vista-factura/vista-factura.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { CreacionFacturaComponent } from './creacion-factura/creacion-factura.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ReactiveFormsModule } from '@angular/forms';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS as MY_FORMAT_DATE } from './myDateFormats';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogAnimationsExampleDialog, LoginComponent } from './login/login.component';

import {MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
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
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { AppTableModule } from './app-table/app-table.module';
import { TableComponent } from './app-table/table/table.component';
import { InputComponent } from './app-table/input/input.component';
import { ProductsComponent } from './app-table/products/products.component';
import { CardModule } from 'primeng/card';






@NgModule({
  declarations: [
    AppComponent,
    VistaFacturaComponent,
    CreacionFacturaComponent,
    AppNavComponent,
    ClientListComponent,
    AddClientComponent,
    AddProductoComponent,
    ProductoListComponent,
    LoginComponent,DialogBuscarFactura, DialogAnimationsExampleDialog,
     MaestroListComponent, MaestroAddComponent, DetalleAddComponent, DetalleListComponent,
     ComprasListComponent, TablePaginationBuilderComponent
    ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
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
    FormsModule,
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
    CardModule
  ],
providers: [DataService,  { provide: DateAdapter, useClass:  MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
 { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT_DATE }, {provide: MatDialogRef, useValue:{}}
 ], 
  // providers: [DataService
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
