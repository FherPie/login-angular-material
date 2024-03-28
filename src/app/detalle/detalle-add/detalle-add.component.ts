import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { Detalle } from '../detalle.model';
import { DetalleServiceServer } from '../detalle.service.server';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/proposal/services/DataService';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviousRouteService } from 'src/app/previous-route.service';
import { Maestro } from 'src/app/maestro/maestro.model';
import { MaestroServiceServer } from 'src/app/maestro/maestro.service.server';

@Component({
  selector: 'app-detalle-add',
  templateUrl: './detalle-add.component.html',
  styleUrls: ['./detalle-add.component.css'],
})
export class DetalleAddComponent implements OnInit {
  @ViewChild('form') Form!: NgForm;

  detalle = new Detalle();
  form: UntypedFormGroup = new UntypedFormGroup({});
  submitted = false;
  currentDetalle: any;

  isEdit: boolean = false;
  id_maestro: String = '';

  maestrosList: Maestro[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private http: HttpClient,
    private app: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private previousRouteService: PreviousRouteService,
    private detalleService: DetalleServiceServer,
    private maestroService: MaestroServiceServer
  ) {}

  ngOnInit(): void {
    this.setearForm();
    this.getMaestros();

    if (this.route.snapshot.paramMap.get('id')) {
      this.isEdit = true;

      this.getDetalle(this.route.snapshot.paramMap.get('id'));
    }
  }

  setearForm() {
    this.form.reset;
    this.form = this.fb.group({
      id: [''],
      id_maestro: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      parametros: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  getMaestros(): void {
    this.maestroService.getAll().subscribe(
      (data: Maestro[]) => {
        this.maestrosList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDetalle(id: string | null): void {
    this.detalleService.get(id).subscribe(
      (data) => {
        this.currentDetalle = data;
        this.form.controls.id.setValue(this.currentDetalle.id);
        this.form.controls.id_maestro.setValue(this.currentDetalle.id_maestro);
        this.form.controls.nombre.setValue(this.currentDetalle.nombre);
        this.form.controls.parametros.setValue(this.currentDetalle.parametros);
        this.form.controls.descripcion.setValue(
          this.currentDetalle.descripcion
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  agregarDetalle(form: { value: any }) {
    this.detalle = form.value;

    this.detalleService.create(this.detalle).subscribe(
      (response) => {
        this.submitted = true;
      },
      (error) => {
        this.submitted = false;
      }
    );
  }

  actualizarDetalle(form: { value: any }) {
    this.detalle = form.value;

    this.detalleService.update(this.detalle).subscribe(
      (response) => {
        this.submitted = true;
      },
      (error) => {
        this.submitted = false;
      }
    );
  }

  newDetalle(): void {
    this.submitted = false;
    this.detalle = new Detalle();
  }

  irDetalle(): void {
    this.router.navigateByUrl('detalles');
  }

  navegarAtras() {
    this.router.navigateByUrl(this.previousRouteService.getPrevious());
  }
}
