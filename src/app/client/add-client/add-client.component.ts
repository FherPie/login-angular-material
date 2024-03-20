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


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  cliente: ClientDto= new ClientDto();
  clienteLite: ClientLite= new ClientLite();
  submitted: boolean=false;

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
    console.log("EStuiante", this.clienteLite);
    this.clienteLite = this.data;
    if(this.clienteLite.id){
      this.clienteSrv.getClient(this.clienteLite.id).subscribe(
        (data) => {
          this.cliente = data;
          this.addClientForm = this.fb.group(this.cliente);
        },
        (error) => {
          console.error(error);
        }
      );
    }






    this.iniciarForms();
    
    // if (this.route.snapshot.paramMap.get('id')) {
    //   console.log('viene el id', this.route.snapshot.paramMap.get('id'));
    //   this.getCliente(this.route.snapshot.paramMap.get('id'));
    // }
  }

  // agregarCliente(form: { value: any; }) {
  //   this.cliente = form.value;
  //   console.log(this.cliente);
  //   this.clienteSrv.create(this.cliente).subscribe(
  //     response => {
  //       console.log(response);
  //       this.submitted = true;
  //     }, error => {
  //       this.showToastByResponseError(error);
  //     });
  // }



  openDialog(): void {
    //console.log(this.wasFormChanged);
    if(this.addClientForm?.dirty) {
       const dialogRef = this.dialog.open(DiscardInfoComponent, {
         width: '50em',
       });
     } else {
      this.dialog.closeAll();
     }
  }


    // public close(): void { // To cancel the dialog window
    //    this.dialog.closeAll();
    // }

  
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
      return;
    }
    this.cliente = this.addClientForm.value;
    this.clienteSrv.updateClient( this.cliente).subscribe({
      next: (data) => {
          this.saving = false;
          this.response = data;
          this.cliente= data.objetoOb;
          this.msgs.showInfo("Registro Actualizado...")
          //this.showToastByResponseSucess(this.response);
      },
      complete: () => {},
      error: error => {
        this.msgs.showError(error.error.mensaje)
      }
  })
  }


  private markAsDirty(group: FormGroup | undefined): void {
    group?.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group?.controls) {
      group?.controls[i].markAsDirty();
    }
  }


  setearForm() {
    this.addClientForm.reset();
    this.iniciarForms();
 }

  iniciarForms() {
    this.addClientForm = this.fb.group({
      id: null,
      fechaNacimiento: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: [''],
      ocupacion: [''],
      telefono: [''],
      telefono2: [''],
      referidoPor: [''],
      email: ['', [Validators.email]],
      identificacion: ['', [Validators.required]],
      motivoConsulta: ['']
      });
  }

}
