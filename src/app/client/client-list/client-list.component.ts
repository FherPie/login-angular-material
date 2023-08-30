import { Component, Input, OnInit } from '@angular/core';
import { ClientLite } from '../client.model2';
import { ClienteServiceServer } from '../cliente.service.server';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  constructor(
    private clienteService: ClienteServiceServer,
    private router: Router
  ) {}

  @Input() showEditButton: boolean = true;
  clients: ClientLite[] = [];
  currentClient!: ClientLite;
  identification = '';
  currentIndex = -1;
  fileToUpload: File | any = null;

  onFileSelected(event: any) {
    const target = event.target as HTMLInputElement;

    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
    if (this.fileToUpload) {
      this.onSaveFile();
    }
  }

  onSaveFile() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    console.log(formData);
    this.clienteService
      .subirArchivoExcelImportacion(formData, 'archivoExcelProdcutos')
      .subscribe((resp) => {
        alert('Uploaded');
      });
    // return this.httpClient.post(YOUR_API_URL, formData);
  }

  ngOnInit(): void {
    this.retrieveClients();
  }

  retrieveClients(): void {
    this.clienteService.getAll().subscribe(
      (data: ClientLite[]) => {
        this.clients = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  searchIdentification(): void {
    if (this.identification == null) {
      this.identification = '';
    }
    this.clienteService.searchByNombre(this.identification).subscribe(
      (data: ClientLite[]) => {
        this.clients = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setActiveClient(client: ClientLite, index: number): void {
    this.currentClient = client;
    this.currentIndex = index;
  }

  agregarClientes(): void {
    this.router.navigateByUrl('/addClient');
  }
}
