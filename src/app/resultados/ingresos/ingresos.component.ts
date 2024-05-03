import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseGenerico } from 'src/app/client/models/ResponseGenerico';
import { FinanzasService } from '../service/finanzas-service.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {


  constructor(private finanzasService: FinanzasService,
    public dialog: MatDialog) {

  }


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Output() eventNew = new EventEmitter();
  filterValue: string = "";
  ELEMENT_DATA!: Ingreso[];
  dataSource = new MatTableDataSource<Ingreso>(this.ELEMENT_DATA);
  selectedProposal!: Ingreso;


  displayedColumns = ['precio', 'concepto', 'createdDate', 'actions'];

  ngOnInit(): void {
    this.listIngreso();
  }


  listIngreso() {
    this.finanzasService.getListIngresos().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  new() {
    this.openDialogProductForm(new Ingreso());
  }


  
  openDialogProductForm(data: Ingreso | null) {

    const dialogRef = this.dialog.open(RegistroIngresoComponent, {
      width: '640px', disableClose: true,
      data: data,
      maxHeight: '120vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.listIngreso();
    })


  }

  deleteItem(_t52: any) {
    throw new Error('Method not implemented.');
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


@Component({
  template: `<h1 mat-dialog-title>Registro de Ingreso</h1>`,
  styleUrls: ['./ingresos.component.css']
})
export class RegistroIngresoComponent implements OnInit {

  @ViewChild('form') Form!: NgForm;
  ingreso = new Ingreso();
  public addIngresoForm!: FormGroup;
  submitted = false;
  currentIngreso: any;
  saving: boolean = false;

  constructor(private finanzasService: FinanzasService,
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder
  ) {


  }
  ngOnInit(): void {
    this.ingreso = this.data;
    this.finanzasService.getIngreso(this.ingreso.id).subscribe({
      next: (data) => {
        this.ingreso = data;
        this.addIngresoForm = this.fb.group(data);
      }
    })
    this.iniciarForms();
  }

  iniciarForms() {

  }


}