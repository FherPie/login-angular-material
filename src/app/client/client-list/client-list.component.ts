import { Component, Input, OnInit } from '@angular/core';
import { ClientLite } from '../client.model2';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  constructor(private clienteService: ClientService) { }

  @Input() showEditButton: boolean= true;
  clients: ClientLite[] = [];
  currentClient!: ClientLite;
  identification = '';
  currentIndex = -1;


  ngOnInit(): void {
    this.retrieveClients();
  }

  retrieveClients(): void {
    this.clienteService.getAll()
      .subscribe(
        (        data: ClientLite[]) => {
          this.clients = data;
          console.log(data);
        },
        (        error: any) => {
          console.log(error);
        });
  }


  searchIdentification(): void {
    if(this.identification==null){  
      this.identification='';
    }
    this.clienteService.findByIdentification(this.identification)
      .subscribe(
        (        data: ClientLite[]) => {
          this.clients = data;
          console.log(data);
        },
        (        error: any) => {
          console.log(error);
        });
  }

  setActiveClient(client: ClientLite, index: number): void {
    this.currentClient = client;
    this.currentIndex = index;
  }

}
