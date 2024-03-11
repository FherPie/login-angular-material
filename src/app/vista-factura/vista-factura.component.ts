import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { VistaFacturaDataSource } from './vista-factura-datasource';
import { Router } from "@angular/router";
import { DataService } from '../DataService';
import { Factura } from '../factura';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ClientLite } from '../client/client.model2';
import * as moment from 'moment';


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
  title = 'Presupuestos';

  @ViewChild('form', { static: true }) ngForm: NgForm | undefined;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'numeroFactura', 'fechaEmision', 'totalFactura'];

  constructor(private router: Router, private dataService: DataService, public dialog: MatDialog) {
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


  nueva() {
    
    // const dialogRef = this.dialog.open(DialogNuevaFactura, {
    //   height: '95%',
    //   width: '95%',
    //   disableClose: true,
    //   position: {top: '10px'} ,
    //   data: { desde: this.desde, hasta: this.hasta, clienteSelected: this.clienteSelected, estado: this.estado }
    // });


   }

   search(data: any) {
    if(data!=null){
       var desde = moment(data?.desde).startOf('day').format('YYYY-MM-DD HH:mm:ss');
         console.log("desde", desde);
         var hasta = moment(data?.hasta).set({
           hour: 23,
           minute: 59,
           second: 59,
           millisecond: 0,
          });
         console.log("hasta", hasta.format('YYYY-MM-DD HH:mm:ss'));
         console.log("cliente", data?.clienteSelected?.idCliente);
         if(data?.clienteSelected?.idCliente){
         this.dataService.getDataListFacturawithFilter(data.clienteSelected?.idCliente, desde, hasta.format('YYYY-MM-DD HH:mm:ss')).subscribe(res => this.allFacturas = res);
         }
    }else{
      this.dataService.getDataListFactura().subscribe(res => this.allFacturas = res);
    }
   }



 edit(){
//   const dialogRef = this.dialog.open(DialogNuevaFactura, {
//     height: '95%',
//     width: '95%',
//     disableClose: true,
//     position: {top: '10px'} ,
//     data: { desde: this.desde, hasta: this.hasta, clienteSelected: this.clienteSelected, estado: this.estado }
//   });
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








