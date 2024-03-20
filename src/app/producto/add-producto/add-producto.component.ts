import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductoLite } from '../producto.model2';
import { ProductoServiceServer } from '../producto.service.server';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DataService } from 'src/app/proposal/services/DataService';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviousRouteService } from 'src/app/previous-route.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/app/utils-services/message-service.service';
import { DiscardInfoComponent } from 'src/app/client/utils-components/discard-info-component-component/discard-info-component-component.component';
import { ResponseGenerico } from 'src/app/client/models/ResponseGenerico';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css'],
})
export class AddProductoComponent implements OnInit {
  @ViewChild('form') Form!: NgForm;

  producto = new ProductoLite();
  public addProductForm!: FormGroup;
  submitted = false;
  currentProducto: any;
  response!: ResponseGenerico;
  saving!: boolean;



  constructor(
    private productoService: ProductoServiceServer,
    private http: HttpClient,
    private app: DataService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private msgs:MessageService
  ) {}

  ngOnInit(): void {
  
    this.producto = this.data;
    if(this.producto.idProducto){
      this.productoService.get(this.producto.idProducto).subscribe(
        (data) => {
          this.producto = data;
          this.addProductForm = this.fb.group(this.producto);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    this.iniciarForms();
    }



    
  openDialog(): void {
    if(this.addProductForm?.dirty) {
       const dialogRef = this.dialog.open(DiscardInfoComponent, {
         width: '50em',
       });
     } else {
      this.dialog.closeAll();
     }
  }

  public onAddClient(): void {
    console.log("Product Info",this.addProductForm.value);
    if(this.addProductForm.invalid){
       this.markAsDirty(this.addProductForm);
       this.msgs.showError("Campos Obligatorios")
       return;
     }
    this.producto = this.addProductForm.value;
    this.productoService.create(this.producto).subscribe({
      next: (data) => {
          this.saving = false;
          this.response = data;
          this.producto= data.objetoOb;
          this.msgs.showInfo("Registro Ingresado...")
          this.dialog.closeAll();
      },
      complete: () => {},
      error: error => {
        console.log(error);
        this.msgs.showError(error.error.mensaje)
      }
  })
  }

  public onUpdateClient(): void {
    console.log("Client Info",this.addProductForm.value);
    if(this.addProductForm.invalid){
      this.markAsDirty(this.addProductForm);
      return;
    }
    this.producto = this.addProductForm.value;
    this.productoService.update(this.producto).subscribe({
      next: (data) => {
          this.saving = false;
          this.response = data;
          this.producto= data.objetoOb;
          this.msgs.showInfo("Registro Actualizado...")
          this.dialog.closeAll();
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

  // agregarProducto(form: { value: any }) {
  //   this.producto = form.value;
  //   console.log(this.producto);
  //   this.productoService.create(this.producto).subscribe(
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
    //this.addProductForm.reset;
    this.addProductForm = this.fb.group({
      idProducto: null,
      nombre: ['', [Validators.required]],
      precioUnitario: ['', [Validators.required]],
      precioCompra: [''],
    });
  }
}
