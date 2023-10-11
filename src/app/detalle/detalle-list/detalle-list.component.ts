import { Component, Input, OnInit } from '@angular/core';
import { Detalle } from '../detalle.model';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { DetalleServiceServer } from '../detalle.service.server';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-list',
  templateUrl: './detalle-list.component.html',
  styleUrls: ['./detalle-list.component.css'],
})
export class DetalleListComponent implements OnInit {
  @Input() showEditButton: boolean = true;

  detallesList: Detalle[] = [];
  currentDetalle!: Detalle;
  currentIndex = -1;

  dataSource: MatTableDataSource<Detalle> | undefined;

  constructor(
    private detalleService: DetalleServiceServer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retrieveDetalles();
  }

  retrieveDetalles(): void {
    this.detalleService.getAll().subscribe(
      (data: Detalle[]) => {
        this.detallesList = data;

        this.dataSource = new MatTableDataSource<Detalle>(this.detallesList);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setDetalleActive(detalle: Detalle, index: number) {
    this.currentDetalle = detalle;
    this, (this.currentIndex = index);
  }

  agregarDetalle(): void {
    this.router.navigateByUrl('/agregar-detalle');
  }
}
