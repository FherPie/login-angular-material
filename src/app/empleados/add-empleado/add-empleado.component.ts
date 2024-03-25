import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmpleadosService } from '../empleados.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/proposal/services/DataService';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/app/utils-services/message-service.service';
import { DiscardInfoComponent } from 'src/app/client/utils-components/discard-info-component-component/discard-info-component-component.component';
import { ResponseGenerico } from 'src/app/client/models/ResponseGenerico';
import { EmpleadoDto } from '../empleado.model2';

@Component({
  selector: 'app-add-empleado',
  templateUrl: './add-empleado.component.html',
  styleUrls: ['./add-empleado.component.css'],
})
export class AddEmpleadoComponent implements OnInit {
  @ViewChild('form') Form!: NgForm;

  empleado = new EmpleadoDto();
  public addEmpleadoForm!: FormGroup;
  submitted = false;
  currentProducto: any;
  response!: ResponseGenerico;
  saving: boolean=false;



  constructor(
    private empleadosService: EmpleadosService,
    private http: HttpClient,
    private app: DataService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private msgs:MessageService
  ) {}

  ngOnInit(): void {
  
    this.empleado = this.data;
    if(this.empleado.username){
      this.empleadosService.get(this.empleado.username).subscribe(
        (data) => {
          this.empleado = data.objetoOb;
          this.addEmpleadoForm = this.fb.group(this.empleado);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    this.iniciarForms();
    }

    
  openDialog(): void {
    if(this.addEmpleadoForm?.dirty) {
       const dialogRef = this.dialog.open(DiscardInfoComponent, {
         width: '50em',
       });
     } else {
      this.dialog.closeAll();
     }
  }

  public onAddProducto(): void {
    this.saving = true;
    console.log("Product Info",this.addEmpleadoForm.value);
    if(this.addEmpleadoForm.invalid){
       this.markAsDirty(this.addEmpleadoForm);
       this.msgs.showError("Campos Obligatorios")
       this.saving = false;

       return;
     }
    this.empleado = this.addEmpleadoForm.value;
    this.empleadosService.create(this.empleado).subscribe({
      next: (data) => {
          this.saving = false;
          this.response = data;
          this.empleado= data.objetoOb;
          this.msgs.showInfo("Registro Ingresado...")
          this.dialog.closeAll();
      },
      complete: () => {},
      error: error => {
        this.saving = false;
        console.log(error);
        this.msgs.showError(error.error.mensaje)
      }
  })
  }

  public onUpdateProducto(): void {
    this.saving = true;
    console.log("Client Info",this.addEmpleadoForm.value);
    if(this.addEmpleadoForm.invalid){
      this.markAsDirty(this.addEmpleadoForm);
      this.saving = false;
      return;
    }
    this.empleado = this.addEmpleadoForm.value;
    this.empleadosService.update(this.empleado).subscribe({
      next: (data) => {
          this.saving = false;
          this.response = data;
          this.empleado= data.objetoOb;
          this.msgs.showInfo("Registro Actualizado...")
          this.dialog.closeAll();
      },
      complete: () => {},
      error: error => {
        this.saving = false;
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

  // agregarProducto(form: { value: any }) {
  //   this.empleado = form.value;
  //   console.log(this.empleado);
  //   this.empleadosService.create(this.empleado).subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.submitted = true;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }



  iniciarForms() {
    //this.addEmpleadoForm.reset;
    this.addEmpleadoForm = this.fb.group({
      id: null,
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
