import { Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientLite } from '../client/client.model2';
import { ClienteServiceServer } from '../client/cliente.service.server';
import { DialogData } from './DialogData';

@Component({
  selector: 'app-buscar-factura',
  templateUrl: './buscar-factura.component.html',
  styleUrls: ['./buscar-factura.component.css']
})
export class BuscarFacturaComponent {
 
  @ViewChild('form', { static: true }) ngForm: NgForm | undefined;
  searchinofClients: ClientLite[] = [];
  clienteSelected?: ClientLite;
  indexClienteSelected?: number;
  currentIndex=0;
  data:DialogData= new DialogData();
  @Output() fireDatatoSearch = new EventEmitter();

  error = "";
  constructor(
    private clienteService: ClienteServiceServer) {
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
   /// this.dialogRef.close();
   // this.credentials = { username: 'andrew', nombre: 'ANDRES', apellido: Math.random() * 1000, password: '' };
   // localStorage.setItem("usuario", JSON.stringify(this.credentials));
   // this.onUpdateCounter();
  }

  search(){
     this.fireDatatoSearch.emit(this.data);
  }

clear(){
     this.data={};
     this.ngForm?.setValue({nombreCliente: ""});
    this.fireDatatoSearch.emit(null);
 }



  setActiveClient(client: ClientLite, index: number) {
    this.clienteSelected = client;
    this.indexClienteSelected = index;
    this.searchinofClients = [];
    this.ngForm?.setValue({nombreCliente: client.apellidos +" "+ client.nombres});
  }

}
