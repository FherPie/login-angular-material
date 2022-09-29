import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Factura } from  '../factura';
import { ItemFactura } from  '../itemFactura';
import { DataService } from '../DataService';
//import * as _moment from 'moment';
//import {default as _rollupMoment} from 'moment';
//const moment = _rollupMoment || _moment;
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
import { ClientLite } from '../client/client.model2';
import { ClientService } from '../client/client.service';
import { ProductoLite } from '../producto/producto.model2';


@Component({
  selector: 'app-creacion-factura',
  templateUrl: './creacion-factura.component.html',
  styleUrls: ['./creacion-factura.component.css']
})
export class CreacionFacturaComponent implements OnInit, OnDestroy {
  
  factura = new Factura();

  itemsFactura: ItemFactura[] = [];
  currentIndex = -1;
  fechaFactura = moment();

  @ViewChild('form',{static:true}) ngForm: NgForm | undefined;

   
  @ViewChild('form2',{static:true}) 2: NgForm | undefined;

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

  // addressForm = this.fb.group({
  //   nombreCliente: null,
  //   nombreCliente: [null, Validators.required],
  //   lastName: [null, Validators.required],
  //   address: [null, Validators.required],
  //   address2: null,
  //   city: [null, Validators.required],
  //   state: [null, Validators.required],
  //   postalCode: [null, Validators.compose([
  //     Validators.required, Validators.minLength(5), Validators.maxLength(5)])
  //   ],
  //   shipping: ['free', Validators.required]
  // });

  constructor(private fb: FormBuilder,  private  dataService:  DataService, private clienteService: ClientService) {
  }

  ngOnDestroy(): void {
  }



  ngOnInit(): void {
  this.ngForm?.form.valueChanges.subscribe(x=> {
  if(x.nombreCliente.length>=3){
    this.clienteService.findByNombres(x.nombreCliente).subscribe(
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
  }

  });

  }

  onSubmit(): void {
    alert('Thanks!');
  }

  agregarFactura(form: { value: any; }){
    this.factura=form.value;
    this.factura.fechaEmision=this.fechaFactura.format("YYYY-MM-DD HH:mm:ss"); 
    console.log(this.factura);
    // this.dataService.createData(this.factura)
    // .subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.log(error);
    //   });
  }

  agregarDetalle(form2: { value: any; }){
    //console.log(form2.value);
    const data={producto: form2.value.producto, numeroItems: form2.value.numeroItems, precioUnitario: form2.value.precioUnitario, descuentoUnitario: form2.value.descuentoUnitario};
    this.itemsFactura.push(data);
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
  calculoTotales(): void{
    //CALCULO SUBTOTAL
    for (var item of this.itemsFactura) {
     this.subTotalFactura+= item.numeroItems*item.precioUnitario;
    }
    //CALCULO DESCUENTOS
    for (var item of this.itemsFactura) {
      if(item.descuentoUnitario>0){
      this.totalDescuentosFactura+= (item.numeroItems*item.precioUnitario)*(item.descuentoUnitario/100);
     }
     if(this.factura.totalDescuento>0){
     this.totalDescuentosFactura+=this.subTotalFactura
     }
     } 
  }

   setActiveClient(client: ClientLite, index:number){
     this.clienteSelected= client;
     this.indexClienteSelected= index;
     this.searchinofClients=[];
   }

}
