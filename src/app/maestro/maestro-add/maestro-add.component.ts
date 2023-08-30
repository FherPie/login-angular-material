import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Maestro } from '../maestro.model';
import { MaestroServiceServer } from '../maestro.service.server';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/DataService';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviousRouteService } from 'src/app/previous-route.service';

@Component({
  selector: 'app-maestro-add',
  templateUrl: './maestro-add.component.html',
  styleUrls: ['./maestro-add.component.css'],
})
export class MaestroAddComponent implements OnInit {
  @ViewChild('form') Form!: NgForm;

  maestro = new Maestro();
  form: FormGroup = new FormGroup({});
  submitted = false;
  currentMaestro: any;

  isEdit: boolean = false;

  constructor(
    private maestroService: MaestroServiceServer,
    private fb: FormBuilder,
    private http: HttpClient,
    private app: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private previousRouteService: PreviousRouteService
  ) {}

  ngOnInit(): void {
    this.setearForm();

    if (this.route.snapshot.paramMap.get('id')) {
      this.isEdit = true;

      this.getMaestro(this.route.snapshot.paramMap.get('id'));
    }
  }

  setearForm() {
    this.form.reset;
    this.form = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  getMaestro(id: string | null): void {
    this.maestroService.get(id).subscribe(
      (data) => {
        this.currentMaestro = data;
        this.form.controls.id.setValue(this.currentMaestro.id);
        this.form.controls.nombre.setValue(this.currentMaestro.nombre);
        this.form.controls.descripcion.setValue(
          this.currentMaestro.descripcion
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  agregarMaestro(form: { value: any }) {
    this.maestro = form.value;

    this.maestroService.create(this.maestro).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  actualizarMaestro(form: { value: any }) {
    this.maestro = form.value;

    this.maestroService.update(this.maestro).subscribe(
      (response) => {
        console.log('Update');
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newMaestro(): void {
    this.submitted = false;
    this.maestro = new Maestro();
  }

  irMaestros(): void {
    this.router.navigateByUrl('maestros');
  }

  navegarAtras() {
    this.router.navigateByUrl(this.previousRouteService.getPrevious());
  }
}
