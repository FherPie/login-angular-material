import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './proposal/services/DataService';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';


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
import {MatTabsModule} from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatBadgeModule} from '@angular/material/badge';


import { AppComponent } from './app.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS as MY_FORMAT_DATE } from './myDateFormats';
import { ClientListComponent } from './client/client-list/client-list.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { AddProductoComponent } from './producto/add-producto/add-producto.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
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
import { EmpleadoListComponent } from './empleados/empleado-list/empleado-list.component';
import { AddEmpleadoComponent } from './empleados/add-empleado/add-empleado.component';
import { authInterceptoProviders } from './login/AuthInterceptor';
import { UnActiveConfirmDialogComponent } from './empleados/util-components/unactive-confirm-dialog/unactive-confirm-dialog.component';
import { ListEstablecimientoComponent } from './establecimiento/list-establecimiento/list-establecimiento.component';
import { AddEstablismentComponent } from './establecimiento/add-establecimiento/add-establecimiento.component';
import { IngresosComponent } from './resultados/ingresos/tableIngresos/ingresos.component';
import { EgresosComponent } from './resultados/egresos/tableEgresos/egresos.component';
import { ResultadosComponent } from './resultados/resultados/resultados.component';
import { AddIngresoComponent } from './resultados/ingresos/addIngresos/addIngresos.component';
import { PanelContenedorTodoComponent } from './resultados/panel-contenedor-todo/panel-contenedor-todo.component';
import { AddEgresosComponent } from './resultados/egresos/add-egresos/add-egresos.component'
import { MatTableResponsiveDirective } from './mat-table-responsive/mat-table-responsive-directive';
import { TableBasicExample } from './mat-table-responsive/TableBasicExample';
import { CreacionOrdenesComponent } from './ordenes/creacion-ordenes/creacion-ordenes.component';
import { VistaOrdenesComponent } from './ordenes/vista-ordenes/vista-ordenes.component';
import { PagosComponent } from './pagos/pagos.component';
import { VerPagosComponent } from './pagos/ver-pagos/ver-pagos.component';

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
    AddEmpleadoComponent,
    UnActiveConfirmDialogComponent,
    AddEstablismentComponent,
    ListEstablecimientoComponent,
    IngresosComponent,
    EgresosComponent,
    ResultadosComponent,
    IngresosComponent,
    AddIngresoComponent,
    PanelContenedorTodoComponent,
    AddEgresosComponent,
    MatTableResponsiveDirective,
    TableBasicExample,
    CreacionOrdenesComponent,
    VistaOrdenesComponent,
    PagosComponent,
    VerPagosComponent
      ],
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
    MatSnackBarModule,
    MatTabsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatBadgeModule
  ],
providers: [DataService,  { provide: DateAdapter, useClass:  MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
 { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT_DATE }, {provide: MatDialogRef, useValue:{}}, authInterceptoProviders 
 ], 
  // providers: [DataService
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
