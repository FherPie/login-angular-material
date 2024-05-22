import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseGenerico } from 'src/app/client/models/ResponseGenerico';
import { DeleteConfirmDialogComponent } from 'src/app/proposal/util-components/delete-confirm-dialog/delete-confirm-dialog.component';
import { FinanzasService } from '../../service/finanzas-service.service';
import { AddIngresoComponent } from '../addIngresos/addIngresos.component';
import { Ingreso } from '../ingresoModel';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {


  constructor(private finanzasService: FinanzasService,public dialog: MatDialog) {

  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Output() eventNew = new EventEmitter();
  filterValue: string = "";
  ELEMENT_DATA!: Ingreso[];
  dataSource = new MatTableDataSource<Ingreso>(this.ELEMENT_DATA);
  sumaEntradas:number=0;
  selectedProposal!: Ingreso;


  displayedColumns = ['precio', 'concepto', 'createdDate', 'actions'];

  ngOnInit(): void {
    this.listIngreso();
  }


  listIngreso() {
    this.sumaEntradas=0;
    this.finanzasService.getListIngresos().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data.forEach((data)=>{
          this.sumaEntradas= this.sumaEntradas + Number(data.precio) | 0;
        });
      }
    })
  }

  new() {
    this.openEditIngresoForm(new Ingreso());
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


  openEditItem(ingreso: any) {
    this.openEditIngresoForm(ingreso);
  }


  openEditIngresoForm(data: Ingreso | null) {

    const dialogRef = this.dialog.open(AddIngresoComponent, {
      width: '640px', disableClose: true,
      data: data,
      maxHeight: '120vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.listIngreso();
    })


  }

}
