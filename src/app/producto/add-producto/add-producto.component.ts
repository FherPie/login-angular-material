import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProductoLite } from '../producto.model2';
import { ProductoServiceServer } from '../producto.service.server';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DataService } from 'src/app/DataService';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviousRouteService } from 'src/app/previous-route.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent implements OnInit {

  @ViewChild('form') Form!: NgForm;

  producto = new ProductoLite();
  form: FormGroup = new FormGroup({});
  submitted = false;
  currentProducto: any;

  constructor(private productoService: ProductoServiceServer, private fb: FormBuilder, 
    private http: HttpClient, private app: DataService,
    private route: ActivatedRoute, private router: Router,
    private previousRouteService : PreviousRouteService) {}


  
  ngOnInit(): void {
    this.setearForm();
    if(this.route.snapshot.paramMap.get("id")){
      console.log("viene el id",this.route.snapshot.paramMap.get("id") );
      this.getProducto(this.route.snapshot.paramMap.get("id"))
    }

  }

  setearForm(){
    this.form.reset
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      precioUnitario: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      precioCompra: ['', [Validators.required]],
    })
  }

  getProducto(id:string | null): void {
    this.productoService.get(id)
    .subscribe(data => {
      this.currentProducto= data;
       this.form.controls.nombre.setValue(this.currentProducto.nombre);
       this.form.controls.precioUnitario.setValue(this.currentProducto.precioUnitario);
       this.form.controls.stock.setValue(this.currentProducto.stock);
       this.form.controls.precioCompra.setValue(this.currentProducto.precioCompra);
    }, error=>{
      console.error(error);
    })
  }


  agregarProducto(form: { value: any; }) {
    this.producto = form.value;
    console.log(this.producto);
    this.productoService.create(this.producto).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      }, error => {
        console.log(error);
      });
  }

  newProducto(): void {
    this.submitted = false;
    this.producto = new ProductoLite();
  }

  irProductos(): void {
    this.router.navigateByUrl('/productos');
  }

  navegarAtras(){
    console.log("Previor",this.previousRouteService.getPrevious());
    this.router.navigateByUrl(this.previousRouteService.getPrevious());
  }
  
}
