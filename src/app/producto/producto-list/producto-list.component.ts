import { Component, Input, OnInit } from '@angular/core';
import { ProductoLite } from '../producto.model2';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

 @Input() showEditButton: boolean= true;

 productsList: ProductoLite[] = [];
 currentProduct!: ProductoLite;
 currentIndex = -1;
 nombreProducto = '';

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.retrieveProductos();
  }

  retrieveProductos(): void {
    this.productoService.getAll()
      .subscribe(
        ( data: ProductoLite[]) => {
          this.productsList = data;
          console.log("loque llega");
          console.log(data);
        },
        (        error: any) => {
          console.log(error);
        });
  }

  buscarPorNombre():void {
    if(this.nombreProducto==null){
      this.nombreProducto='';
    }
    this.productoService.findByNombreProducto(this.nombreProducto)
    .subscribe((data: ProductoLite[])=>{this.productsList= data;
      console.log(data);
    },(error:any)=>{console.log(error)}) 
  }

  setProductoActive(producto: ProductoLite, index: number){
   this.currentProduct= producto;
   this.currentIndex=index;
  }

}
