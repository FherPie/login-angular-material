import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmDialogComponent } from 'src/app/proposal/util-components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AddIngresoComponent } from '../../ingresos/addIngresos/addIngresos.component';
import { Ingreso } from '../../ingresos/ingresoModel';
import { FinanzasService } from '../../service/finanzas-service.service';
import { AddEgresosComponent } from '../add-egresos/add-egresos.component';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css']
})
export class EgresosComponent {



  startDate: any;
  endDate: any;

  focusOutFunction() {
    alert(this.startDate.toDate()+" "+this.endDate.toDate());
    this.listEgresos();
  }


  constructor(private finanzasService: FinanzasService,
    public dialog: MatDialog) {

  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Output() eventNew = new EventEmitter();
  filterValue: string = "";
  ELEMENT_DATA!: Ingreso[];
  dataSourceSalidas = new MatTableDataSource<Ingreso>(this.ELEMENT_DATA);
  sumaSalidas: number = 0;
  selectedProposal!: Ingreso;
  displayedColumns = ['precio', 'concepto', 'createdDate', 'actions'];

  ngOnInit(): void {
    this.listEgresos();
  }


  listEgresos() {
    this.sumaSalidas = 0;
    this.finanzasService.getListEgresos().subscribe({
      next: (data) => {
        this.dataSourceSalidas = new MatTableDataSource(data);
        this.dataSourceSalidas.paginator = this.paginator;
        this.dataSourceSalidas.sort = this.sort;
        this.dataSourceSalidas.data.filter(x=> {
          if(!this.startDate || !this.endDate){
               return true;
          } 
          let endEndDate=new Date(this.endDate+1);
           if( (this.startDate && this.endDate) 
            && (new Date(x.createdDate) >= this.startDate && new Date(x.createdDate) <= endEndDate )){
               return true
           } else { return false}
        }).forEach((data) => {
          this.sumaSalidas = this.sumaSalidas + Number(data.precio);
        });
      }
    })
  }


  new() {
    this.openEditEgresoForm(new Ingreso());
  }


  deleteItem(egreso: any) {
    console.log("Ingreso", egreso);
    this.dialog.open(DeleteConfirmDialogComponent)
      .afterClosed().subscribe((confirm) => {
        if (confirm) {
          this.finanzasService.deleteSalida(egreso).subscribe({
            complete: () => {
              alert("Registro Eliminado");
              this.listEgresos();
            }
          })
        }
      })
  }

  openEditItem(egreso: any) {
    this.openEditEgresoForm(egreso);

  }

  openEditEgresoForm(data: Ingreso | null) {
    const dialogRef = this.dialog.open(AddEgresosComponent, {
      width: '640px', disableClose: true,
      data: data,
      maxHeight: '120vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.listEgresos();
    })
  }


}
