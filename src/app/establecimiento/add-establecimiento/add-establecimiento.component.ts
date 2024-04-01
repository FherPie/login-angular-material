import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageService } from 'src/app/utils-services/message-service.service';
import { EstablishmentDto } from '../models/EstablishmentDto';
import { EstablishmentService } from '../services/establishment.service';
import { ResponseGenerico } from 'src/app/client/models/ResponseGenerico';
import { DiscardInfoComponent } from 'src/app/client/utils-components/discard-info-component-component/discard-info-component-component.component';
import { UserStorageService } from 'src/app/login/user.storage-service.service';


@Component({
  selector: 'app-add-establecimiento',
  templateUrl: './add-establecimiento.component.html',
  styleUrls: ['./add-establecimiento.component.css']
})
export class AddEstablismentComponent implements OnInit {
  establishment: EstablishmentDto= new EstablishmentDto();
  submitted: boolean=false;
  public addEstablishmentForm!: FormGroup;
  saving!: boolean;
  response!: ResponseGenerico;
  userId!: number;

  

  constructor(
    private route: ActivatedRoute,
    private establishmentService: EstablishmentService, 
    public dialog: MatDialog,
    private fb: FormBuilder, private _snackBar: MatSnackBar, private msgs:MessageService,
     private userStorageService: UserStorageService ) {


     }

  ngOnInit(): void {
    this.establishmentService.getEstablishment().subscribe(
        (data) => {
          this.establishment = data;
          this.addEstablishmentForm = this.fb.group(this.establishment);
        },
        (error) => {
          console.error(error);
        }
      );
   
    this.iniciarForms();
  }




  openDialog(): void {
    if(this.addEstablishmentForm?.dirty) {
       const dialogRef = this.dialog.open(DiscardInfoComponent, {
         width: '50em',
       });
     } else {
      this.dialog.closeAll();
     }
  }

  public onAddClient(): void {
    console.log("Pacient Info",this.addEstablishmentForm.value);
    if(this.addEstablishmentForm.invalid){
       this.markAsDirty(this.addEstablishmentForm);
       this._snackBar.open("Campos Obligatorios", 'X', {
        panelClass: ['snackbar-error']
      }) 
       return;
     }
    this.establishment = this.addEstablishmentForm.value;
    this.establishmentService.create(this.establishment).subscribe({
      next: (data) => {
          this.saving = false;
          this.response = data;
          this.establishment= data.objetoOb;
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
    console.log("Client Info",this.addEstablishmentForm.value);
    if(this.addEstablishmentForm.invalid){
      this.markAsDirty(this.addEstablishmentForm);
      this.msgs.showError("Llene todos los campos obligatorios...")

      return;
    }
    this.establishment = this.addEstablishmentForm.value;
    this.establishmentService.updateEstablishment(this.establishment).subscribe({
      next: (data) => {
          this.saving = false;
          this.response = data;
          this.establishment= data.objetoOb;
          console.log(this.establishment);
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
    this.addEstablishmentForm = this.fb.group({
      id: null,
      nombre: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      telefono2: [''],
      telefono: [''],
      codPostal: [''],
      email: ['', [Validators.email]],
      webSite: ['']
      });
  }

}
