import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, NgForm, FormGroup, FormControl } from '@angular/forms';
import { Factura } from  '../models/factura';
import { ItemFactura } from  '../models/itemFactura';
import { DataService } from '../services/DataService';
//import * as _moment from 'moment';
//import {default as _rollupMoment} from 'moment';
//const moment = _rollupMoment || _moment;
import * as moment from 'moment';
import { ClientLite } from '../../client/client.model2';
import { ProductoLite } from '../../producto/producto.model2';
import { ProductoServiceServer } from '../../producto/producto.service.server';
import { ClienteServiceServer } from '../../client/cliente.service.server';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/autocomplete-product/product-service.service';


const COLUMNS_SCHEMA = [
  {
    key: "id",
    type: "id",
    label: "ID"
  },
  {
    key: "productoDto",
    type: "object",
    label: "Tratamiento"
  },
  {
      key: "cantidad",
      type: "number",
      label: "Cantidad"
  },
  {
    key: "precioUnitario",
    type: "number",
    label: "Precio Unitario"
  },
  {
    key: "descuentoUnitario",
    type: "number",
    label: "Descuento"
  },
  {
      key: "isEdit",
      type: "isEdit",
      label: ""
  }
];

interface Product {
  id: number;
  nombre: string;
}

@Component({
  selector: 'creacion-factura',
  templateUrl: './creacion-factura.component.html',
  styleUrls: ['./creacion-factura.component.css']
})
export class CreacionFacturaComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col!.key);

 //displayedColumns: string[] = ['cantidad', 'precioUnitario', 'descuentoUnitario', 'productoDto'];
  dataSourceDetalleVentaDto: any;
  columnsSchema: any = COLUMNS_SCHEMA;


  
  factura = new Factura();
  totalDescuento:number=0;
  impuestoAlaVenta:number=12;

  itemsFactura: ItemFactura[] = [];
  currentIndex = -1;
  fechaFactura = moment();

  @ViewChild('form',{static:true}) ngForm: NgForm | undefined;

   
  @ViewChild('form2',{static:true}) ngForm2: NgForm= new NgForm([], []) ;

  totalFactura= 0.0;
  subTotalFactura= 0.0;
  totalImpuestosFactura=0.0;
  totalDescuentosFactura=0.0;
  
  searchinofClients: ClientLite[]= [];
  clienteSelected?: ClientLite= new ClientLite();
  indexClienteSelected?: number;

  searchofProductos: ProductoLite[]= [];
  productoSelected?: ProductoLite;
  indexProductoSelected?: number;
  savingProposal:boolean=false;

  dataSource2 = this.itemsFactura;
  optionsProduct!: ProductoLite[];

  constructor(private fb: UntypedFormBuilder,  private  dataService:  DataService, 
    private clienteService: ClienteServiceServer
    , private prodcutoService: ProductoServiceServer, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
  }

  ngOnDestroy(): void {
  }



  ngOnInit(): void {

   this.factura=this.data;
   if(this.factura.id){
    this.dataService.getById(this.factura.id).subscribe({
      next:data=>{
        this.factura= data;
        this.clienteSelected=this.factura.idCliente;
        this.itemsFactura= this.factura.detallesVentaDto;
        this.dataSourceDetalleVentaDto=this.itemsFactura;
        //this.addPacientForm = this.fb.group(this.pacientDto);
        //this.loading=false;
      },
      error:error=>{

      }
    })
   }
    this.listProduct();

    // this.ngForm2.form = new FormGroup({
    //   productoNombre: new FormControl(''),
    //   numeroItems: new FormControl(1),
    //   precioUnitario: new FormControl(0),
    //   descuentoUnitario: new FormControl(0)
    // });

    // this.ngForm2?.controls['productoNombre'].setValue(this.productoSelected.nombre);
    // this.ngForm2?.controls['numeroItems'].setValue(1);
    // this.ngForm2?.controls['precioUnitario'].setValue(this.productoSelected.precioUnitario);
    // this.ngForm2?.controls['descuentoUnitario'].setValue(this.productoSelected.descuentoUnitario);


//INICIO ESCUCHA PARA PRODCUTO AUTOCOMPLETAR
    // this.ngForm2?.form.valueChanges.subscribe(x=> {
    // if(x.productoNombre.length>=3){
    //   this.prodcutoService.searchByNombre(x.productoNombre).subscribe(
    //     ( response: any) => {
    //       console.log(response);
    //       this.searchofProductos=response;
    //      },
    //     (  error: any) => {
    //       console.log(error);
    //     }
    //   );
    // }
  
    // if(x.productoNombre.length==0){
    //   this.productoSelected= undefined;
    // }});
   // FIN ESCUCHA PARA PRODCUTO AUTOCOMPLETAR

  }

    
listProduct(){
   this.prodcutoService.getAll().subscribe({
          next: data => {
              this.optionsProduct = data;
          },
          complete: () => {
          },
          error: error => {
            //this.toastr.error('Error', error);
          }
      }
  );
}

  onSubmit(): void {
    alert('Thanks!');
  }

  agregarFactura(form: { value: any; }){
    this.savingProposal=true;
    this.factura=form.value;
    this.factura.totalDescuento=this.totalDescuento; 
     this.factura.idCliente=this.clienteSelected;
    this.factura.detallesVentaDto=[];
    this.factura.detallesVentaDto=this.itemsFactura;
    console.log(this.factura);
    this.dataService.guardarVenta(this.factura)
    .subscribe(
      response => {
        console.log(response);
        this.dialog.closeAll();
        this.savingProposal=false;
      },
      error => {
        console.log(error);
        this.savingProposal=false;
      });
  }

  agregarDetalle(){
    //console.log(form2.value);
    const data={
       productoDto: {nombre:""}, 
       cantidad: 0,
        precioUnitario: 0, 
        descuentoUnitario: 0,
        isEdit:true};
    //this.itemsFactura.push(data);
    this.dataSourceDetalleVentaDto = [data,...this.dataSourceDetalleVentaDto];
    //console.log(this.itemsFactura);
    //this.dataSource2 = this.itemsFactura;
    this.calculoTotales();
  }

  deleteDetalle(index: number): void{
    this.currentIndex=index;
    if (index !== -1) {
        this.itemsFactura.splice(index, 1);
    } 
    this.calculoTotales();
  }
  

  editDetalle(index: number): void{
    this.currentIndex=index;
    if (index !== -1) {
        this.itemsFactura.splice(index, 1);
    } 
    this.calculoTotales();
  }

  encerarTotales(){
    this.subTotalFactura=0.0;
    this.totalDescuentosFactura=0.0;
    this.totalFactura=0.0;
    this.totalImpuestosFactura=0.0;
  }

  calculoTotales(): void{
    this.encerarTotales();
    //CALCULO SUBTOTAL
    for (var item of this.itemsFactura) {
     this.subTotalFactura+= (item.cantidad*item.precioUnitario);
    }
     //FIN CALCULO SUBTOTAL
    //CALCULO DESCUENTOS
    for (var item of this.itemsFactura) {
          if(item.descuentoUnitario>0){
          this.totalDescuentosFactura+= (item.cantidad*item.precioUnitario)*(item.descuentoUnitario/100);
        }
     }

     console.log(this.totalDescuento);

     if(this.totalDescuento>0){
       this.totalDescuentosFactura+=((this.subTotalFactura-this.totalDescuentosFactura)*this.totalDescuento/100)
     }
       this.totalImpuestosFactura= ((this.subTotalFactura-this.totalDescuentosFactura))

      //  this.totalFactura= (this.subTotalFactura-this.totalDescuentosFactura)+ ((this.subTotalFactura-this.totalDescuentosFactura)*this.impuestoAlaVenta/100)


      this.totalFactura= (this.subTotalFactura-this.totalDescuentosFactura);

     console.log(this.totalDescuento);
     //FIN CALCULO DESCUENTOS

  }

   setActiveClient(client: ClientLite){
    console.log("Cliente selected", client);
     this.clienteSelected= client;
     //this.indexClienteSelected= index;
     ///this.searchinofClients=[];
   }


   setActiveProduct(producto: ProductoLite){
    
    this.productoSelected= producto;
    this.ngForm2?.controls['numeroItems'].setValue(1);
    this.ngForm2?.controls['precioUnitario'].setValue(this.productoSelected.precioUnitario);
    this.ngForm2?.controls['descuentoUnitario'].setValue(this.productoSelected.descuentoUnitario);
    //console.log(this.productoSelected);
  }

  cancelDialog(): void {
    //console.log(this.wasFormChanged);
    // if(this.addPacientForm?.dirty) {
    //    const dialogRef = this.dialog.open(DiscardInfoComponentComponent, {
    //      width: '50em',
    //    });
    //  } else {
      this.dialog.closeAll();
    //  }
  }
}
