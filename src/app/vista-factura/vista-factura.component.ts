import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTable as MatTable } from '@angular/material/legacy-table';
import { VistaFacturaDataSource } from './vista-factura-datasource';
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from '../DataService';
import { Factura } from '../factura';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { NgForm } from '@angular/forms';
import { ClientLite } from '../client/client.model2';
import * as moment from 'moment';
import { ClienteServiceServer } from '../client/cliente.service.server';


export interface DialogData {
  animal: string;
  name: string;
  desde: moment.Moment;
  hasta: moment.Moment;
  cedula: string;
  estado: string;
  clienteSelected?: ClientLite;
}

@Component({
  selector: 'app-vista-factura',
  templateUrl: './vista-factura.component.html',
  styleUrls: ['./vista-factura.component.css']
})
export class VistaFacturaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Factura>;
  dataSource: VistaFacturaDataSource;


  searchinofClients: ClientLite[] = [];
  clienteSelected?: ClientLite;
  indexClienteSelected?: number;
  verBuscar: boolean = false;
  desde = moment();
  hasta = moment();
  estado: string = "";


  title = 'Facturas';
  greeting = { 'id': 'xxx', 'content': 'Hello World!!' }
  @ViewChild('form', { static: true }) ngForm: NgForm | undefined;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'numeroFactura', 'fechaEmision', 'totalFactura'];

  constructor(private router: Router, private dataService: DataService, public dialog: MatDialog) {
    console.log("PASA POR CONSTRUTOR DE  VISTA FACTURA");
    this.dataSource = new VistaFacturaDataSource(dataService);
  }

  allFacturas: Factura[] = [];

  ngOnInit() {
    this.dataService.getDataListFactura().subscribe(res => this.allFacturas = res);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //this.table.dataSource = this.dataSource;
  }


  public product = { id: "1", name: "Angular 2" };

  nueva() {
    //this.router.navigateByUrl('/dynamic', { state: { id:1 , name:'Angular' } });
    this.router.navigateByUrl("/creacion-factura", { state: this.product });
  }

  buscar() {
    this.verBuscar = true;
    console.log("Buscar");
    const dialogRef = this.dialog.open(DialogBuscarFactura, {
      height: '500px',
      width: '600px',
      disableClose: true,
      data: { desde: this.desde, hasta: this.hasta, clienteSelected: this.clienteSelected, estado: this.estado }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result.clienteSelected.idCliente, moment(result.desde).format('YYYY-MM-DD HH:MM:SS'), moment(result.hasta).format('YYYY-MM-DD HH:MM:SS'));
        var desde = moment(result?.desde).startOf('day').format('YYYY-MM-DD HH:mm:ss');
        console.log("desde", desde);

        var hasta = moment(result?.hasta).set({
          hour: 23,
          minute: 59,
          second: 59,
          millisecond: 0,
         });
        console.log("hasta", hasta.format('YYYY-MM-DD HH:mm:ss'));


        console.log("cliente", result?.clienteSelected?.idCliente);
        if(result?.clienteSelected?.idCliente){
        this.dataService.getDataListFacturawithFilter(result.clienteSelected?.idCliente, desde, hasta.format('YYYY-MM-DD HH:mm:ss')).subscribe(res => this.allFacturas = res);
        }
    });
  }


      


  traerFacturasBusqueda(form: { value: any; }) {
    console.log("Ir busqueda");
  }

  onCounterChange(event: any) {

    this.verBuscar = false;
  }

  setActiveClient(client: ClientLite, index: number) {
    this.clienteSelected = client;
    this.indexClienteSelected = index;
    this.searchinofClients = [];
  }

}

@Component({
  selector: 'dialog-buscar-factura',
  templateUrl: 'dialog-buscar-factura.html',
})
export class DialogBuscarFactura implements OnInit {
  credentials: any;
  @ViewChild('form', { static: true }) ngForm: NgForm | undefined;
  @Input() counter: number = 0;
  @Output() counterChange = new EventEmitter<number>();

  searchinofClients: ClientLite[] = [];
  clienteSelected?: ClientLite;
  indexClienteSelected?: number;
  currentIndex = -1;




  error = "";
  constructor(public dialogRef: MatDialogRef<DialogBuscarFactura>,
    private clienteService: ClienteServiceServer, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
  }


  ngOnInit(): void {
    //INICIO ESCUCHA PARA CLIENTE AUTOCOMPLETAR
    this.ngForm?.form.valueChanges.subscribe(x => {
      if (x.nombreCliente?.length >= 3) {
        this.clienteService.searchByNombre(x.nombreCliente).subscribe(
          (response: any) => {
            console.log(response);
            this.searchinofClients = response;
          },
          (error: any) => {
            console.log(error);
          }
        );
      }

      if (x.nombreCliente?.length == 0) {
        this.clienteSelected = undefined;
      }
    });
    //FIN ESCUCHA PARA CLIENTE AUTOCOMPLETAR

  }

  closeDialog() {
    this.dialogRef.close();
    this.credentials = { username: 'andrew', nombre: 'ANDRES', apellido: Math.random() * 1000, password: '' };
    localStorage.setItem("usuario", JSON.stringify(this.credentials));
    this.onUpdateCounter();
  }

  traerFacturasBusqueda(form: { value: any; }) {
    console.log("Ir busqueda");
    this.credentials = { username: 'andrew', nombre: 'ANDRES', apellido: Math.random() * 1000, password: '' };
    localStorage.setItem("usuario", JSON.stringify(this.credentials));
  }

  onUpdateCounter() {
    this.counterChange.emit(this.counter + 1);
  }

  setActiveClient(client: ClientLite, index: number) {
    this.clienteSelected = client;
    this.indexClienteSelected = index;
    this.searchinofClients = [];
  }

}
