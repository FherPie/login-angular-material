import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { COLUMNS_SCHEMA, EmpleadoDto } from '../empleado.model2';
import { EmpleadosService } from '../empleados.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddEmpleadoComponent } from '../add-empleado/add-empleado.component';
import { MessageService } from 'src/app/utils-services/message-service.service';
import { DeleteConfirmDialogComponent } from 'src/app/proposal/util-components/delete-confirm-dialog/delete-confirm-dialog.component';
import { UnActiveConfirmDialogComponent } from '../util-components/unactive-confirm-dialog/unactive-confirm-dialog.component';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css'],
})
export class EmpleadoListComponent implements OnInit, AfterViewInit {

  @Input() showEditButton: boolean = true;

  productsList: EmpleadoDto[] = [];
  selectedProduct!: EmpleadoDto;
  currentIndex = -1;
  nombreProducto = '';
  fileToUpload: File | any = null;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Output() eventNew = new EventEmitter();
  filterValue: string = "";

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEMA;
  dataSource = new MatTableDataSource<EmpleadoDto>();


  constructor(
    private empleadosService: EmpleadosService,
    private router: Router,
    public dialog: MatDialog, private msgs:MessageService
  ) {}

  onFileSelected(event: any) {
    const target = event.target as HTMLInputElement;

    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
    if (this.fileToUpload) {
      this.onSaveFile();
    }
  }

  onSaveFile() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    console.log(formData);
    this.empleadosService
      .subirArchivoExcelImportacion(formData, 'archivoExcelProdcutos')
      .subscribe((resp) => {
        alert('Uploaded');
      });
  }

  ngOnInit(): void {
    this.retrieveEmpleados();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  
  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  clearFilterValue() {
    this.dataSource.filter = "";
    this.filterValue = "";
  }


  retrieveEmpleados(): void {
    this.empleadosService.getAll().subscribe(
      (data: EmpleadoDto[]) => {
        this.productsList = data;
        this.dataSource.data = this.productsList;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  new() {
    this.openDialogEmpleadoForm(new EmpleadoDto());
  }

  
  openEditEmpleado(client: EmpleadoDto) {
    this.selectedProduct = client;
    this.openDialogEmpleadoForm(this.selectedProduct);
  }


  openDialogEmpleadoForm(data: EmpleadoDto | null) {

    const dialogRef = this.dialog.open(AddEmpleadoComponent, {
      width: '640px', disableClose: true,
      data: data,
      maxHeight: '120vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.retrieveEmpleados();
    })


  }

  deleteEmpleado(empleado: any) {
    this.dialog
      .open(UnActiveConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
         
          this.empleadosService.delete(empleado.id).subscribe({
            next: data => {
            },
            complete: () => {
              alert('Usuario Inactivado!');
              this.retrieveEmpleados();
            },
            error: error => {
              this.msgs.showError(error.error.mensaje)
            }
        }
    );}
      });
  
}

activeEmpleado(empleado: any) {
  this.dialog
  .open(UnActiveConfirmDialogComponent)
  .afterClosed()
  .subscribe((confirm) => {
    if (confirm) {
     
      this.empleadosService.activeempleados(empleado.id).subscribe({
        next: data => {
        },
        complete: () => {
          alert('Usuario Activado!');
          this.retrieveEmpleados();
        },
        error: error => {
          this.msgs.showError(error.error.mensaje)
        }
    }
);}
  });



  }


}
