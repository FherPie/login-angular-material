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
import { FileHandle } from '../models/FileHandle';
import { DomSanitizer } from '@angular/platform-browser';


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
  selectedFile: any=null;
  

  constructor(
    private route: ActivatedRoute,
    private establishmentService: EstablishmentService, 
    public dialog: MatDialog,
    private fb: FormBuilder, private _snackBar: MatSnackBar, private msgs:MessageService,
     private userStorageService: UserStorageService, private sanitaizer: DomSanitizer ) {


     }

  ngOnInit(): void {
    this.establishmentService.getEstablishment().subscribe(
        (data) => {
          this.establishment = data.objetoOb;
          console.log("HOla");
          if(data.objetoOb!=null){
            this.addEstablishmentForm = this.fb.group(this.establishment);
          }else{
            this.establishment= new EstablishmentDto(); 
          }
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
  

    console.log("Establecimiento Info",this.addEstablishmentForm);
    if(this.addEstablishmentForm.invalid){
       this.markAsDirty(this.addEstablishmentForm);
       this._snackBar.open("Campos Obligatorios", 'X', {
        panelClass: ['snackbar-error']
      }) 
       return;
     }
    this.establishment = this.addEstablishmentForm.value;
    const formData= this.prepareFormData(this.establishment);
    this.establishmentService.createEstablishment(formData).subscribe({
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

    prepareFormData(establishment: EstablishmentDto): FormData{
     const formaData= new FormData();
     formaData.append('establecimientoDto', new Blob([JSON.stringify(establishment)], {type: 'application/json'}) );
     
     if(establishment.imageEstablishment!=null){
      for (var i=0; i< establishment.imageEstablishment.length; i++){
        formaData.append('imageFile', establishment.imageEstablishment[i].file, establishment.imageEstablishment[i].file.name)
       }
     }
      return formaData;
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
      if(group?.controls[i].status=="INVALID"){
        group?.controls[i].markAsTouched();
        group?.controls[i].markAsDirty();
      }
      
    }
  }

  onFileSelected(event: any) {
    if(event.target?.files){
      this.selectedFile=event.target?.files[0];
      const fileHandle: FileHandle={
          file: this.selectedFile,
          url: this.sanitaizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedFile))
      }
    let imageList:any[]=[];
    imageList.push(fileHandle);
    this.addEstablishmentForm.patchValue({imageEstablishment:imageList});
    }
     ///console.log(event.target?.files[0]);
  }



  iniciarForms() {
    this.addEstablishmentForm = this.fb.group({
      id: null,
      nombre: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      direccion: [''],
      ciudad: ['', [Validators.required]],
      telefono2: [''],
      // telefono: [''],
      // codPostal: [''],
      // email: ['', [Validators.email]],
      // webSite: [''],
      imageEstablishment: [null],
      });
  }

}
