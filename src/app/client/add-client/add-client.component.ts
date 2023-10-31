import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClientDto } from '../client.model';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  cliente: ClientDto= new ClientDto();
  submitted: boolean=false;
  @ViewChild('form') form: NgForm | undefined;


  constructor(
    private route: ActivatedRoute,
    private clienteSrv: ClienteService) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      console.log('viene el id', this.route.snapshot.paramMap.get('id'));
      this.getCliente(this.route.snapshot.paramMap.get('id'));
    }
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

  
  getCliente(id: string | null): void {
  this.form?.reset();
    this.clienteSrv.get(id).subscribe(
      (data) => {
        this.cliente = data;
        this.form?.setValue(this.cliente );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  irClientes(){
    
  }

  newCliente(){
    
  }

}
