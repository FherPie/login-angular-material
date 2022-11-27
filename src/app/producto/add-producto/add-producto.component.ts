import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoLite } from '../producto.model2';
import { ProductoService } from '../producto.service';
import { ProductoServiceServer } from '../producto.service.server';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DataService } from 'src/app/DataService';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent implements OnInit {

  producto = new ProductoLite();
  form: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private productoService: ProductoServiceServer, private fb: FormBuilder, 
    private http: HttpClient, private app: DataService) {
     }


  
  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      precioUnitario: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      precioCompra: ['', [Validators.required]],
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

}
