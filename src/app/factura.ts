import * as moment from "moment";
import { ItemFactura } from  './itemFactura';

export class Factura {
    id:number=0;
    ruc?: string;
    numeroFactura: string='';
    nombreCliente?: string;
    telefonoCliente?: string;
    total?: string;
    fechaEmision?:string;
    direccionCliente?: string;
    direccionMatriz?: string;
    correoElectronicoCliente?: string;
    totalDescuento: number = 0;
    telefono?: string;
    identificacionCliente?: string;
    itemsFactura: ItemFactura[] = [];
    idCliente?: number;
    codigo?: string;
    estado?: string;
    formaPago?: string;
    fechayHora?: string;
  }
