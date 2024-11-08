import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientLite } from 'src/app/client/client.model2';
import { Factura } from 'src/app/proposal/models/factura';
import { MessageService } from 'src/app/utils-services/message-service.service';
import { FinanzasService } from '../../service/finanzas-service.service';
import { Ingreso } from '../ingresoModel';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoLite } from 'src/app/producto/producto.model2';
import { ProductoServiceServer } from 'src/app/producto/producto.service.server';
import { ItemFactura } from 'src/app/proposal/models/itemFactura';
import { DetalleVentaService } from 'src/app/proposal/services/DetalleVentaService';
import { MatSelectChange } from '@angular/material/select';

@Component({
     templateUrl: './addIngreso.component.html',
     styleUrls: ['./addIngreso.component.css']
})
export class AddIngresoComponent implements OnInit {
    
    
     doSomething($event: MatSelectChange, element:any) {
      


       this.optionsDetallesVenta = this.optionsDetallesVenta.filter((u: any) => u.id !== $event.value.id);

         console.log(element)
       //$event.value.id
         element.controls['saldo'].setValue($event.value.saldo)

          // this.finanzasService.getIngreso(this.ingreso.id).subscribe({
          //      next: data => {
          //           this.ingreso = data;
          //           this.addIngresoForm.controls['nombreCliente'].setValue(this.ingreso.nombreCliente);
          //           this.addIngresoForm = this.fb.group(this.ingreso);
          //      }
          // })


     }

     dataSourcePacks!: MatTableDataSource<any>;
     pagos!: Ingreso[];
     displayedColumns = ["detalle","saldo","valor", "descripcion", "eliminar"]
     optionsDetallesVenta!: ItemFactura[];

     valor = new FormControl('')
     descripcion = new FormControl('')

     onStepChange(event: any): void {
          //use event.selectedIndex to know which step your user in.
          //console.log(event.selectedIndex);
     }

     enabled: boolean = true;

     countChange(item: Factura) {
          //console.log(item)
          this.firstFormGroup.controls['firstCtrl'].setValue(item.toString());


     this.listDetalle(item.id);

     }

     get pagosItems() {
          return this.addIngresoForm.controls["pagos"] as FormArray;
     };

     listDetalle(idVenta:any){
          this.detalleVentaService.listarDetallesVenta(idVenta).subscribe({
                 next: data => {
                     this.optionsDetallesVenta = data.listadoOb;
                     console.log("detalles", this.optionsDetallesVenta)
                 },
                 complete: () => {
                 },
                 error: error => {
                   //this.toastr.error('Error', error);
                 }
             }
         );
       }


     reloadTree() {
          this.enabled = false;
          // now notify angular to check for updates
          this.changeDetector.detectChanges();
          // change detection should remove the component now
          // then we can enable it again to create a new instance
          this.enabled = true;
          this.pagosItems.clear();
          this.dataSourcePacks = new MatTableDataSource(this.pagosItems.controls);     
     
     }




     firstFormGroup = this.fb.group({
          firstCtrl: ['', Validators.required],
     });

     secondFormGroup = this.fb.group({
          secondCtrl: ['', Validators.required],
     });

     ingreso = new Ingreso();
     public addIngresoForm!: FormGroup;
     submitted = false;
     currentIngreso: any;
     saving: boolean = false;
     mostrarErrores: boolean = false;
     nameCliente: any;
     constructor(private fb: FormBuilder,
          public dialog: MatDialog,
          @Inject(MAT_DIALOG_DATA) public data: any,
          private finanzasService: FinanzasService,
          private msgs: MessageService, private changeDetector: ChangeDetectorRef
          , private detalleVentaService: DetalleVentaService) { }

     ngOnInit(): void {
          this.iniciarForma();

          this.ingreso = this.data;
          if (this.ingreso.id) {
               this.finanzasService.getIngreso(this.ingreso.id).subscribe({
                    next: data => {
                         this.ingreso = data;
                         this.addIngresoForm.controls['nombreCliente'].setValue(this.ingreso.nombreCliente);

                         this.addIngresoForm = this.fb.group(this.ingreso);
                    }
               })
          }
     }

     iniciarForma() {
          this.addIngresoForm = this.fb.group({
               precio: [0.0],
               concepto: [""],
               pagos: this.fb.array([])
          })
     }

     closeDialog(): void {
          this.dialog.closeAll();
     }

     public save(): void {
          this.saving = true;
          console.log(this.addIngresoForm.value)
          if (this.addIngresoForm.invalid) {
               this.msgs.showInfo("Formulario Invalido...")
               this.saving = false;
               return;
          }

          console.log(this.pagosItems.value);

          // this.ingreso = this.addIngresoForm.value;

          var objetoEnvio={listaPagos:[]=this.pagosItems.value};
          this.finanzasService.guardarPagos(objetoEnvio).subscribe({
               next: (data) => {
                   console.log(data);
                    this.msgs.showInfo("Informacion Ingresada con Exito")
                    this.closeDialog();
               }, error: error => {
                    alert(error);
               }
          })

         // console.log(this.pagosItems.value);

     }


     public agregarPago(): void {
          const pagoForm = this.fb.group({
               precio: [0.0, [Validators.required]],
               saldo: [0.0],
               concepto: ["", [Validators.required]],
               idDetalle: ["", [Validators.required]],
             });
             this.pagosItems.push(pagoForm);
             this.dataSourcePacks = new MatTableDataSource(this.pagosItems.controls);
             this.changeDetector.detectChanges();
     }

     deletePago(lessonIndex: number, element: any): void {
          this.pagosItems.removeAt(lessonIndex);
          this.optionsDetallesVenta.push(element.get('idDetalle').value)
          this.dataSourcePacks = new MatTableDataSource(this.pagosItems.controls);
      
        };

        onSubmit() {
          console.log(this.pagosItems.value)
        }




     setIngreso(client: ClientLite) {
          console.log("Cliente selected", client);
          this.ingreso.idCliente = client;
          this.addIngresoForm.patchValue({
               idCliente: client
          });

          //this.indexClienteSelected= index;
          ///this.searchinofClients=[];
     }

}