import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClientDto } from '../client.model';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientLite } from '../client.model2';
import { ResponseGenerico } from '../models/ResponseGenerico';
import { DiscardInfoComponent } from '../utils-components/discard-info-component-component/discard-info-component-component.component';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageService } from 'src/app/utils-services/message-service.service';
import { ClienteRespuestasDto } from '../models/ClienteRespuestasDto';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  cliente: ClientDto= new ClientDto();
  clienteLite: ClientLite= new ClientLite();
  submitted: boolean=false;
  listRespuestasClientesDto:ClienteRespuestasDto[] | undefined;

  public addClientForm!: FormGroup;
  saving!: boolean;
  response!: ResponseGenerico;

  

  constructor(
    private route: ActivatedRoute,
    private clienteSrv: ClienteService, 
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private _snackBar: MatSnackBar, private msgs:MessageService ) { }

  ngOnInit(): void {
    this.clienteLite = this.data;
    if(this.clienteLite.id){
      this.clienteSrv.getClient(this.clienteLite.id).subscribe(
        (data) => {
          this.cliente = data;
          this.listRespuestasClientesDto= this.cliente.listaClienteRespuestasDto;
          this.addClientForm = this.fb.group(this.cliente);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    this.iniciarForms();
  }




  openDialog(): void {
    if(this.addClientForm?.dirty) {
       const dialogRef = this.dialog.open(DiscardInfoComponent, {
         width: '50em',
       });
     } else {
      this.dialog.closeAll();
     }
  }

  public onAddClient(): void {
    console.log("Pacient Info",this.addClientForm.value);
    if(this.addClientForm.invalid){
       this.markAsDirty(this.addClientForm);
       this._snackBar.open("Campos Obligatorios", 'X', {
        panelClass: ['snackbar-error']
      }) 
       return;
     }
    this.cliente = this.addClientForm.value;
    this.clienteSrv.create(this.cliente).subscribe({
      next: (data) => {
          this.saving = false;
          this.response = data;
          this.cliente= data.objetoOb;
          this.listRespuestasClientesDto= this.cliente.listaClienteRespuestasDto;
          this.msgs.showInfo("Registro Ingresado...")
      },
      complete: () => {},
      error: error => {
        console.log(error);
          this._snackBar.open(error.error.mensaje, 'X', {
            panelClass: ['snackbar-error']
          }) 
      }
  })
  }

  public onUpdateClient(): void {
    console.log("Client Info",this.addClientForm.value);
    if(this.addClientForm.invalid){
      this.markAsDirty(this.addClientForm);
      this.msgs.showError("Llene todos los campos obligatorios...")

      return;
    }
    this.cliente = this.addClientForm.value;
    this.cliente.listaClienteRespuestasDto= this.listRespuestasClientesDto;
    this.clienteSrv.updateClient(this.cliente).subscribe({
      next: (data) => {
          this.saving = false;
          this.response = data;
          this.cliente= data.objetoOb;
          console.log(this.cliente);
          this.msgs.showInfo("Registro Actualizado...")
      },
      complete: () => {},
      error: error => {
        this.msgs.showError(error.error.mensaje)
      }
  })
  }


  private markAsDirty(group: FormGroup | undefined): void {
    group?.markAsDirty();
    for (const i in group?.controls) {
      group?.controls[i].markAsDirty();
    }
  }


  iniciarForms() {
    this.addClientForm = this.fb.group({
      id: null,
      fechaNacimiento: [''],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: [''],
      ocupacion: [''],
      telefono: [''],
      telefono2: [''],
      referidoPor: [''],
      email: ['', [Validators.email]],
      identificacion: [''],
      motivoConsulta: ['']
      });
  }

}
