import { ProductoLite } from "src/app/producto/producto.model2";


export interface ItemFactura {
    id?:number;
    cantidad:number;
    precioUnitario:number;
    descuentoUnitario:number;
    productoDto?:ProductoLite;
    edit: false;
  }