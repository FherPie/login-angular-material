import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  cliente: any;
  submitted: boolean=false;

  constructor(private clienteSrv: ClienteService) { }

  ngOnInit(): void {
  }

  public fields:any []=[
      {
        type: 'text',
        name: 'nombres',
        label: 'Nombres',
        value: '',
        required:true
      },
      {
        type: 'text',
        name: 'apellidos',
        label: 'Apellidos',
        value: '',
        required:true
      },
      {
        type: 'text',
        name: 'telefono',
        label: 'Telefono',
        value: '',
        required:true
      },      
      {
        type: 'text',
        name: 'direccion',
        label: 'Direccion',
        value: '',
        required:true
      },
      {
        type: 'text',
        name: 'identificacion',
        label: 'Identificacion',
        value: '',
        required:true
      },
      {
        type: 'text',
        name: 'email',
        label: 'Email',
        value: '',
        required:true
      }
  ]

  agregarCliente(form: { value: any; }) {
    this.cliente = form.value;
    console.log(this.cliente);
    this.clienteSrv.create(this.cliente).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      }, error => {
        console.log(error);
      });
  }

  irClientes(){
    
  }

  newCliente(){
    
  }

}
