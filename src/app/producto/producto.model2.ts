export class ProductoLite {
  idProducto?: number;
  nombre?: string;
  precioUnitario?: number;
  stock?: number;
  precioCompra?: number;
  precioVenta?: number;
  descuentoUnitario?: number;
}


export const  COLUMNS_SCHEMA = [
  {
    key: "idProducto",
    type: "number",
    label: "ID"
  },
  {
    key: "nombre",
    type: "text",
    label: "Nombre"
  },
  {
      key: "precioUnitario",
      type: "number",
      label: "Valor"
  },
  {
    key: "precioCompra",
    type: "number",
    label: "Valor Compra"
  },
  {
    key: "actions",
    type: "none",
    label: "Acciones"
  }
];