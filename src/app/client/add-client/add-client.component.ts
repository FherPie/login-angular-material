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
