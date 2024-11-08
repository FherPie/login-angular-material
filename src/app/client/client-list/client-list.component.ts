import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ClientLite, COLUMNS_SCHEMA } from '../client.model2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/proposal/util-components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AddClientComponent } from '../add-client/add-client.component';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/utils-services/message-service.service';
import { ClienteService } from '../cliente.service';

import { VistaFacturaComponent } from 'src/app/proposal/vista-factura/vista-factura.component';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit, AfterViewInit {

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    public dialog: MatDialog, private msgs:MessageService
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Output() eventNew = new EventEmitter();
  filterValue: string = "";
  ELEMENT_DATA!: ClientLite[];
  selectedClient!: ClientLite;

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEMA;
  dataSource = new MatTableDataSource<ClientLite>();


  loading!: boolean;



  @Input() showEditButton: boolean = true;
  clients: ClientLite[] = [];
  currentClient!: ClientLite;
  identification = '';
  currentIndex = -1;
  fileToUpload: File | any = null;

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
    this.clienteService
      .subirArchivoExcelImportacion(formData, 'archivoExcelProdcutos')
      .subscribe(() => {
        alert('Uploaded');
      });
  }

  ngOnInit(): void {
    this.retrieveClients();
  }

  retrieveClients(): void {
    this.clienteService.getAll().subscribe(
      (data: ClientLite[]) => {
        this.clients = data;
        this.dataSource.data = this.clients;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
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

  new() {
    this.openDialogClientForm(new ClientLite());
  }

  openEditClient(client: ClientLite) {
    this.selectedClient = client;
    this.openDialogClientForm(this.selectedClient);
  }



  openRegistroPago(client: ClientLite) {
    this.selectedClient = client;
    this.openDialogClientForm(this.selectedClient);
  }


  deleteClient(pacientDtoToDelete: any) {
    this.dialog
      .open(DeleteConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
         
          this.clienteService.delete(pacientDtoToDelete.id).subscribe({
            next: () => {
            },
            complete:  () => {
            
              alert('Registro Eliminado');
              this.retrieveClients();
            },
            error: error => {
              this.msgs.showError(error.error.mensaje)
            }
        }
    );}
      });
  
}





  openDialogClientForm(data: ClientLite | null) {

    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '100%', disableClose: true,
      data: data,
      height: '100%'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.retrieveClients();
    })


  }


  openDialogPresupuestodelCliente(data: ClientLite | null) {
 
    const dialogRef = this.dialog.open(VistaFacturaComponent, {
      width: '930px', disableClose: true,
      data: data,
      maxHeight: '120vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.retrieveClients();
    })


    }


}
