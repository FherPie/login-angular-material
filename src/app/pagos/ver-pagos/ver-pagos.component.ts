import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ingreso } from 'src/app/resultados/ingresos/ingresoModel';
import { FinanzasService } from 'src/app/resultados/service/finanzas-service.service';

@Component({
  selector: 'app-ver-pagos',
  templateUrl: './ver-pagos.component.html',
  styleUrls: ['./ver-pagos.component.css']
})
export class VerPagosComponent implements OnInit {
  ingreso?: Ingreso;
  dataSource!: MatTableDataSource<any>;
  pagos!: Ingreso[];
  displayedColumns = ["nombreProducto","precio", "concepto", "createdDate"]
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private finanzasService: FinanzasService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
   }
   ngOnInit(): void {
    this.ingreso = this.data;




    if (this.ingreso?.id) {
         this.finanzasService.getPagosVenta(this.ingreso.id).subscribe({
              next: data => {
               this.dataSource= new MatTableDataSource(data);
               this.dataSource.paginator= this.paginator;
               this.dataSource.sort= this.sort;
              }
         })
    }
}


closeDialog(): void {
  this.dialog.closeAll();
}


}
