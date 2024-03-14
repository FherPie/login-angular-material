export interface ItemFactura {
    id?:number;
    nombreProducto: string;
    cantidad:number;
    precioUnitario:number;
    descuentoUnitario:number;
    productoDto?:number;
  }