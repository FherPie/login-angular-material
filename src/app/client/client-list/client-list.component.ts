import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ClientLite, COLUMNS_SCHEMA } from '../client.model2';
import { ClienteServiceServer } from '../cliente.service.server';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/proposal/util-components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AddClientComponent } from '../add-client/add-client.component';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/utils-services/message-service.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit, AfterViewInit {
  constructor(
    private clienteService: ClienteServiceServer,
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
      .subscribe((resp) => {
        alert('Uploaded');
      });
    // return this.httpClient.post(YOUR_API_URL, formData);
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
    // this.toastr.success('Hello world!', filterValue);
  }

  clearFilterValue() {
    this.dataSource.filter = "";
    this.filterValue = "";
  }

  new() {
    //this.eventNew.emit(new Map().set("app" ,"0"));
    this.openDialogClientForm(new ClientLite());
  }

  openEditClient(client: ClientLite) {
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
            next: data => {
                 //this.toastr.error('Eliminado con Exito');
                //this.dialogRef.close({ data: true });
            },
            complete: () => {
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
      width: '640px', disableClose: true,
      data: data,
      maxHeight: '120vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.retrieveClients();
    })


  }

  // searchIdentification(): void {
  //   if (this.identification == null) {
  //     this.identification = '';
  //   }
  //   this.clienteService.searchByNombre(this.identification).subscribe(
  //     (data: ClientLite[]) => {
  //       this.clients = data;
  //       console.log(data);
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

  setActiveClient(client: ClientLite, index: number): void {
    this.currentClient = client;
    this.currentIndex = index;
  }

  agregarClientes(): void {
    this.router.navigateByUrl('/addClient');
  }




}
