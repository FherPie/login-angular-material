import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinanzasService } from '../../service/finanzas-service.service';
import { Ingreso } from '../ingresoModel';

@Component({
     templateUrl: './addIngreso.component.html',
     styleUrls: ['./addIngreso.component.css'] 
})
export class AddIngresoComponent implements OnInit{

     ingreso = new Ingreso();
     public addIngresoForm!: FormGroup;
     submitted = false;
     currentIngreso: any;
     saving: boolean = false;
     mostrarErrores: boolean = false;
     constructor(private fb: FormBuilder, 
          public dialog:MatDialog,
          @Inject(MAT_DIALOG_DATA) public data: any,
          private finanzasService: FinanzasService,){}

     ngOnInit():void{
       this.iniciarForma();

       this.ingreso=this.data;
       if(this.ingreso.id){
            this.finanzasService.getIngreso(this.ingreso.id).subscribe({
                 next: data =>{
                      this.ingreso=data;
                      this.addIngresoForm=this.fb.group(this.ingreso);
                 }
            })
       }

     }

     iniciarForma () {
          this.addIngresoForm= this.fb.group({
               tipo: [0],
               precio: [0, [Validators.required]],
               concepto:["", [Validators.required]]
          })
     }

     closeDialog():void{
          this.dialog.closeAll();
     }

     public save():void{
         this.saving=true;
         if(this.addIngresoForm.invalid){
              alert("Revise el Formulario");
              this.saving=false;
              return;
         }

     this.ingreso= this.addIngresoForm.value;
     this.finanzasService.saveIngreso(this.ingreso).subscribe({
          next:(data)=>{
               this.ingreso=data;
               alert("Informacion Ingresada con Exito");
               this.closeDialog();
          }, error: error=>{
               alert(error);
          }
      })
     }

}