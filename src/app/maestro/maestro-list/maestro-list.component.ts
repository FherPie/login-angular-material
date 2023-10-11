import { Component, OnInit, Input } from '@angular/core';
import { MaestroServiceServer } from '../maestro.service.server';
import { Router } from '@angular/router';
import { Maestro } from '../maestro.model';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';

@Component({
  selector: 'app-maestro-list',
  templateUrl: './maestro-list.component.html',
  styleUrls: ['./maestro-list.component.css'],
})
export class MaestroListComponent implements OnInit {
  @Input() showEditButton: boolean = true;

  maestrosList: Maestro[] = [];
  currentMaestro!: Maestro;
  currentIndex = -1;

  dataSource: MatTableDataSource<Maestro> | undefined;
  constructor(
    private maestroService: MaestroServiceServer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retrieveMaestros();
  }

  retrieveMaestros(): void {
    this.maestroService.getAll().subscribe(
      (data: Maestro[]) => {
        this.maestrosList = data;

        this.dataSource = new MatTableDataSource(this.maestrosList);

        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setMaestroActive(maestro: Maestro, index: number) {
    this.currentMaestro = maestro;
    this.currentIndex = index;
  }

  agregarMaestro(): void {
    this.router.navigateByUrl('/agregar-maestro');
  }
}
