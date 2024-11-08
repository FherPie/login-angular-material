export class ProductoLite {
  idProducto?: number;
  nombre?: string;
  precioUnitario?: number;
  stock?: number;
  precioCompra?: number;
  precioVenta?: number;
  descuentoUnitario?: number;
  servdeOdontograma?: boolean=false;
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
    key: "servdeOdontograma",
    type: "number",
    label: "Servicio de Odontograma"
  },
  {
    key: "actions",
    type: "none",
    label: "Acciones"
  }
];