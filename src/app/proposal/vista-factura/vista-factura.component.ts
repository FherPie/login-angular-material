import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { VistaFacturaDataSource } from './vista-factura-datasource';
import { Router } from "@angular/router";
import { DataService } from '../services/DataService';
import { Factura } from '../models/factura';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ClientLite } from '../../client/client.model2';
import * as moment from 'moment';
import { CreacionFacturaComponent } from '../creacion-factura/creacion-factura.component';
import { DeleteConfirmDialogComponent } from '../util-components/delete-confirm-dialog/delete-confirm-dialog.component';


@Component({
  selector: 'app-vista-factura',
  templateUrl: './vista-factura.component.html',
  styleUrls: ['./vista-factura.component.css']
})
export class VistaFacturaComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Output() eventNew = new EventEmitter();
  filterValue:string="";
  ELEMENT_DATA!: Factura[];
  dataSource= new MatTableDataSource<Factura>(this.ELEMENT_DATA);
  selectedProposal!:Factura;

  @ViewChild(MatTable) table!: MatTable<Factura>;


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
  displayedColumns = ['id', 'numeroFactura',  'nombreCliente', 'fechaFormat', "actions"];

  constructor(private router: Router, private dataService: DataService, public dialog: MatDialog) {

  }

  allFacturas: Factura[] = [];

  ngOnInit() {
    this.listProposals();
  }

  
  listProposals(){
     this.dataService.getDataListFactura().subscribe({
            next: (data) => {
                let proposals: Factura[] = [];
                proposals = data.listadoOb;
                this.dataSource= new MatTableDataSource(proposals);
                this.dataSource.paginator= this.paginator;
                this.dataSource.sort= this.sort;
            },
            complete: () => {
                //this.loading = false;
            },
            error: error => {
              //this.toastr.error('Error', error);
              //this.loading = false;
            }
        }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator= this.paginator;
    this.dataSource.sort= this.sort;
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

    new() {
      this.openDialogProposalForm(new Factura());
    }


    viewOdontograma() {
    throw new Error('Method not implemented.');
    }

    applyFilter(filterValue: any) {
     filterValue= filterValue.target.value;
     filterValue = filterValue.trim(); // Remove whitespace
     filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
     this.dataSource.filter = filterValue;
   // this.toastr.success('Hello world!', filterValue);
    }

    clearFilterValue() {
      this.dataSource.filter="";
      this.filterValue="";
    }

    openEditProposal(proposalSelected:Factura){
      this.selectedProposal=proposalSelected;
      this.openDialogProposalForm(this.selectedProposal);
    }


    
  openDialogProposalForm(data:Factura | null){

    const dialogRef = this.dialog.open(CreacionFacturaComponent,{
      height: '100%',
      width: '100%',
      disableClose: true,
     position: {top: '10px'} ,
      data: data
    });

    dialogRef.afterClosed().subscribe(()=>{
      this.listProposals();
    })


  }
  
  deleteProposal(factura: any) {
            this.dialog
              .open(DeleteConfirmDialogComponent)
              .afterClosed()
              .subscribe((confirm) => {
                if (confirm) {
                 
                  this.dataService.borrarVenta(factura.id).subscribe({
                    next: data => {
                         //this.toastr.error('Eliminado con Exito');
                        //this.dialogRef.close({ data: true });
                    },
                    complete: () => {
                      this.listProposals();
                    },
                    error: error => {
                      //this.toastr.error('Error', error);
                    }
                }
            );}
              });
          
      }
  

}








