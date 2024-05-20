import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseGenerico } from 'src/app/client/models/ResponseGenerico';
import { DeleteConfirmDialogComponent } from 'src/app/proposal/util-components/delete-confirm-dialog/delete-confirm-dialog.component';
import { FinanzasService } from '../service/finanzas-service.service';
import { AddIngresoComponent } from './addIngresos.component';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {


  constructor(private finanzasService: FinanzasService,
    public dialog: MatDialog) {

  }


  @Output() eventNew = new EventEmitter();
  filterValue: string = "";
  ELEMENT_DATA!: Ingreso[];
  dataSource = new MatTableDataSource<Ingreso>(this.ELEMENT_DATA);
  dataSourceSalidas = new MatTableDataSource<Ingreso>(this.ELEMENT_DATA);
  sumaEntradas:number=0;
  sumaSalidas:number=0;
  selectedProposal!: Ingreso;


  displayedColumns = ['precio', 'concepto', 'createdDate', 'actions'];

  ngOnInit(): void {
    this.listIngreso();
    this.listEgresos();
  }


  listIngreso() {
    this.sumaEntradas=0;
    this.finanzasService.getListIngresos().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.data.forEach((data)=>{
          this.sumaEntradas= this.sumaEntradas + Number(data.precio) | 0;
        });
      }
    })
  }

  listEgresos() {
    this.sumaSalidas=0;
    this.finanzasService.getListEgresos().subscribe({
      next: (data) => {
        this.dataSourceSalidas = new MatTableDataSource(data);
        this.dataSourceSalidas.data.forEach((data)=>{
          this.sumaSalidas= this.sumaSalidas + Number(data.precio) | 0;
        });
      }
    })
  }


  new() {
    this.openDialogProductForm(new Ingreso());
  }


  
  openDialogProductForm(data: Ingreso | null) {

    const dialogRef = this.dialog.open(AddIngresoComponent, {
      width: '640px', disableClose: true,
      data: data,
      maxHeight: '120vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.listIngreso();
      this.listEgresos();
    })


  }

  deleteItem(ingreso: any) {
    console.log("Ingreso", ingreso);
    this.dialog.open(DeleteConfirmDialogComponent)
    .afterClosed().subscribe((confirm)=>{
       if(confirm){
        this.finanzasService.deleteIngreso(ingreso).subscribe({
          complete:()=>{
            alert("Registro Eliminado");
            this.listIngreso();
          }
        })
       }
    })

  }


  openEditItem(_t52: any) {
    throw new Error('Method not implemented.');
  }

}

class Ingreso {
  id: number = 0;
  precio: string = '';
  concepto?: string;
  createdDate?: string;
}


// @Component({
//   templateUrl: './addIngreso.component.html',
//   styleUrls: ['./ingresos.component.css']
// })
// export class RegistroIngresoComponent implements OnInit {

//   ingreso = new Ingreso();
//   public addIngresoForm!: FormGroup;
//   submitted = false;
//   currentIngreso: any;
//   saving: boolean = false;

//   constructor(private finanzasService: FinanzasService,
//     public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder
//   ) {


//   }
//   ngOnInit(): void {
//     this.ingreso = this.data;
//     this.finanzasService.getIngreso(this.ingreso.id).subscribe({
//       next: (data) => {
//         this.ingreso = data;
//         this.addIngresoForm = this.fb.group(data);
//       }
//     })
//     this.iniciarForms();
//   }

//   iniciarForms() {

//   }


// }