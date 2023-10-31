import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, NgForm, Validators } from '@angular/forms';
import { Factura } from  '../factura';
import { ItemFactura } from  '../itemFactura';
import { DataService } from '../DataService';
//import * as _moment from 'moment';
//import {default as _rollupMoment} from 'moment';
//const moment = _rollupMoment || _moment;
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
import { ClientLite } from '../client/client.model2';
import { ProductoLite } from '../producto/producto.model2';
import { ProductoServiceServer } from '../producto/producto.service.server';
import { ClienteServiceServer } from '../client/cliente.service.server';


@Component({
  selector: 'creacion-factura',
  templateUrl: './creacion-factura.component.html',
  styleUrls: ['./creacion-factura.component.css']
})
export class CreacionFacturaComponent implements OnInit, OnDestroy {
  
  factura = new Factura();
  totalDescuento:number=0;
  impuestoAlaVenta:number=12;

  itemsFactura: ItemFactura[] = [];
  currentIndex = -1;
  fechaFactura = moment();

  @ViewChild('form',{static:true}) ngForm: NgForm | undefined;

   
  @ViewChild('form2',{static:true}) ngForm2: NgForm | undefined;

  totalFactura= 0.0;
  subTotalFactura= 0.0;
  totalImpuestosFactura=0.0;
  totalDescuentosFactura=0.0;
  
  searchinofClients: ClientLite[]= [];
  clienteSelected?: ClientLite;
  indexClienteSelected?: number;

  searchofProductos: ProductoLite[]= [];
  productoSelected?: ProductoLite;
  indexProductoSelected?: number;

  dataSource2 = this.itemsFactura;

  constructor(private fb: UntypedFormBuilder,  private  dataService:  DataService, private clienteService: ClienteServiceServer
    , private prodcutoService: ProductoServiceServer) {
  }

  ngOnDestroy(): void {
  }



  ngOnInit(): void {


    //INICIO ESCUCHA PARA CLIENTE AUTOCOMPLETAR
  this.ngForm?.form.valueChanges.subscribe(x=> {
  if(x.nombreCliente.length>=3){
    this.clienteService.searchByNombre(x.nombreCliente).subscribe(
      ( response: any) => {
        console.log(response);
        this.searchinofClients=response;
       },
      (  error: any) => {
        console.log(error);
      }
    );
  }

  if(x.nombreCliente.length==0){
    this.clienteSelected= undefined;
  }});
  //FIN ESCUCHA PARA CLIENTE AUTOCOMPLETAR



  
//INICIO ESCUCHA PARA PRODCUTO AUTOCOMPLETAR
    this.ngForm2?.form.valueChanges.subscribe(x=> {
    if(x.productoNombre.length>=3){
      this.prodcutoService.searchByNombre(x.productoNombre).subscribe(
        ( response: any) => {
          console.log(response);
          this.searchofProductos=response;
         },
        (  error: any) => {
          console.log(error);
        }
      );
    }
  
    if(x.productoNombre.length==0){
      this.productoSelected= undefined;
    }});
    //FIN ESCUCHA PARA PRODCUTO AUTOCOMPLETAR

  }

  onSubmit(): void {
    alert('Thanks!');
  }

  agregarFactura(form: { value: any; }){
    this.factura=form.value;
    this.factura.fechaEmision=this.fechaFactura.format("YYYY-MM-DDTHH:mm:ss"); 
    //this.factura.fechaEmision=this.fechaFactura.date().toString(); 
    this.factura.codigo="001";
    this.factura.formaPago="Efectivo"
    this.factura.estado="Nueva"
    this.factura.totalDescuento=this.totalDescuento; 
     this.factura.idCliente=this.clienteSelected?.idCliente;
    this.factura.itemsFactura=[];
    this.factura.itemsFactura=this.itemsFactura;
    console.log(this.factura);
    this.dataService.guardarVenta(this.factura)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  agregarDetalle(form2: { value: any; }){
    //console.log(form2.value);
    const data={productoId:this.productoSelected?.idProducto,  nombreProducto: form2.value.productoNombre, numeroItems: form2.value.numeroItems, precioUnitario: form2.value.precioUnitario, descuentoUnitario: form2.value.descuentoUnitario};
    this.itemsFactura.push(data);
    console.log(this.itemsFactura);
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
     this.subTotalFactura+= (item.numeroItems*item.precioUnitario);
    }
     //FIN CALCULO SUBTOTAL
    //CALCULO DESCUENTOS
    for (var item of this.itemsFactura) {
      if(item.descuentoUnitario>0){
      this.totalDescuentosFactura+= (item.numeroItems*item.precioUnitario)*(item.descuentoUnitario/100);
     }
     }

     console.log(this.totalDescuento);

     if(this.totalDescuento>0){
       this.totalDescuentosFactura+=((this.subTotalFactura-this.totalDescuentosFactura)*this.totalDescuento/100)
     }
       this.totalImpuestosFactura= ((this.subTotalFactura-this.totalDescuentosFactura)*this.impuestoAlaVenta/100)

       this.totalFactura= (this.subTotalFactura-this.totalDescuentosFactura)+ ((this.subTotalFactura-this.totalDescuentosFactura)*this.impuestoAlaVenta/100)

     console.log(this.totalDescuento);
     //FIN CALCULO DESCUENTOS

  }

   setActiveClient(client: ClientLite, index:number){
     this.clienteSelected= client;
     this.indexClienteSelected= index;
     this.searchinofClients=[];
   }


   setActiveProduct(producto: ProductoLite, index:number){
    
    this.productoSelected= producto;
    this.indexProductoSelected= index;
    this.searchofProductos=[];
    this.ngForm2?.controls['productoNombre'].setValue(this.productoSelected.nombre);
    this.ngForm2?.controls['numeroItems'].setValue(1);
    this.ngForm2?.controls['precioUnitario'].setValue(this.productoSelected.precioUnitario);
    this.ngForm2?.controls['descuentoUnitario'].setValue(this.productoSelected.descuentoUnitario);
    console.log(this.productoSelected);
  }
}
