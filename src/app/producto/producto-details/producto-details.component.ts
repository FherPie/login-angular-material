import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { ProductoLite } from '../producto.model2';

@Component({
  selector: 'app-producto-details',
  templateUrl: './producto-details.component.html',
  styleUrls: ['./producto-details.component.css']
})
export class ProductoDetailsComponent implements OnInit {

   message:String | undefined;
   form: FormGroup= new FormGroup({});
   productoId=0;
   currentProducto= new ProductoLite();

  constructor(public productoService: ProductoService, 
    private route: ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
   this.form= this.fb.group({
      nombre: ['', [Validators.required]],
      precioUnitario:['', [Validators.required]]
   });
    this.message='';
    this.getProducto(this.route.snapshot.paramMap.get("id"));
  }

  getProducto(id:string | null): void {
    this.productoService.findByIdProducto(id)
    .subscribe(data => {
      this.currentProducto= data[0];
       console.log(data[0]);
       this.form.controls.nombre.setValue(this.currentProducto.nombre);
       this.form.controls.precioUnitario.setValue(this.currentProducto.precioUnitario);
    }, error=>{
      console.error(error);
    })
  }

  actualizarProducto(){
    console.log(this.currentProducto.productoId);
    this.productoService.updateProducto(this.currentProducto.productoId, this.currentProducto);
    // .subscribe(response=>{
    //      console.log(response);
    //      this.message="Actualizar producto";
    //      }, error=>{
    //       console.error(error);
    // });
  }
}
