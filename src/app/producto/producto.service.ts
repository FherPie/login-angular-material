import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoLite } from './producto.model2';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  findByNombreProducto(nombreProducto: string): any {
    const productsObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.products.filter(x => x.nombre == nombreProducto));
      }, 1000);
    });
    return productsObservable;
  }


  findByIdProducto(id:any): Observable<any>{
   const productsObservable= new Observable(observer => {
   setTimeout(()=> {
      observer.next(this.products.filter(x=> x.productoId==id));
     },1000);
   });
    return productsObservable;
  }

  inser(nombreProducto: string): any {
    const productsObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.products.filter(x => x.nombre == nombreProducto));
      }, 1000);
    });
    return productsObservable;
  }

  updateProducto(id:any, data:ProductoLite): void {
    var bueno: ProductoLite | any;
    this.findByIdProducto(id).subscribe(data=>{bueno=data;},error=>{console.log(error)});
    let index= this.products.indexOf(bueno);
    this.products[index]= bueno;
    //return bueno;
  }

  
createProduct(data: ProductoLite) {
    data.productoId= this.products.length+1;
    this.products.push(data);
    console.log(this.products);
}

  products: ProductoLite[] = [{
    productoId: 1,
    nombre: "Bio Pet",
    precioUnitario: 10.0
  },
  {
    productoId: 2,
    nombre: "Vit Force Adultos",
    precioUnitario: 6.0
  },
  {
    productoId: 3,
    nombre: "Nutra Pro Arena 4 kg",
    precioUnitario: 2.0
  }];


  constructor() { }


  public getAll(): any {
    const productsObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.products);
      }, 1000);
    });

    return productsObservable;
  }
}
