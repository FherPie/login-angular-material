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
import { OdontogramaRespuestasDto } from '../models/OdontogramaRespuestasDto';
import { async } from 'rxjs';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/utils-services/file-upload-service.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  dienteSelected:OdontogramaRespuestasDto={};
  cliente: ClientDto= new ClientDto();
  clienteLite: ClientLite= new ClientLite();
  submitted: boolean=false;
  listRespuestasClientesDto:ClienteRespuestasDto[]=[];
  listOdontogramaRespuestasDto:OdontogramaRespuestasDto[] | undefined;

  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;

  public addClientForm!: FormGroup;
  saving!: boolean;
  response!: ResponseGenerico;

  newItems = {};


  constructor(private uploadService: FileUploadService,
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

          this.newItems = this.groupByType( this.listRespuestasClientesDto);

          this.listOdontogramaRespuestasDto= this.cliente.listaOdontogramaRespuestasDto;
          this.addClientForm = this.fb.group(this.cliente);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    this.iniciarForms();
    this.dienteSelected;
  }


  closeDialog(): void {
     this.dialog.closeAll();
  }

  seleccionarDiente(item: OdontogramaRespuestasDto) {
      this.dienteSelected=item;
  }

  groupByType(array: any[]){
    return array.reduce((r: { [x: string]: any[]; }, a:  ClienteRespuestasDto) => {
          r[a.pregunta.maestro.nombre] = r[a.pregunta?.maestro?.nombre] || [];
          r[a.pregunta?.maestro?.nombre].push(a);
          return r;
      }, Object.create(null));
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
          this.listOdontogramaRespuestasDto= this.cliente.listaOdontogramaRespuestasDto;
          this.obtenerDocumentos();
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

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }




  upload(): void {
    this.progress = 0;
    this.message = '';

    if (this.currentFile) {
      this.uploadService.upload(this.currentFile, "cliente/uploadandSaveFileClient",this.currentFile.name, this.cliente.id).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        }
      );
    }
  }

  private obtenerDocumentos(){
     console.log("servicio obtiene archivos")

  }

  public async onUpdateClient() {
    console.log("Client Info",this.addClientForm.value);
    if(this.addClientForm.invalid){
      this.markAsDirty(this.addClientForm);
      this.msgs.showError("Llene todos los campos obligatorios...")

      return;
    }
    this.cliente = this.addClientForm.value;
    //this.cliente.listaClienteRespuestasDto= this.listRespuestasClientesDto;
   //console.log(Object.values(this.newItems));
   console.log("unica",this.cliente);
    this.cliente.listaClienteRespuestasDto=  await this.getValues(this.newItems)
    this.cliente.listaOdontogramaRespuestasDto=this.listOdontogramaRespuestasDto;
    console.log(this.cliente);
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


  private  async getValues(array: any){
    let respuestas:ClienteRespuestasDto[]=[];
  for (const [key, value ] of Object.entries(array)) {
    let array2:Array<ClienteRespuestasDto>=value as Array<ClienteRespuestasDto>;
     for(const element in array2){
      // console.log("element",array2[element]);
       respuestas.push(array2[element]);
     }
   }
  return respuestas;
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
