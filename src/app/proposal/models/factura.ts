import * as moment from "moment";
import { ClientLite } from "../../client/client.model2";
import { ItemFactura } from  './itemFactura';

export class Factura {
    id?:number;
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
    detallesVentaDto: ItemFactura[] = [];
    idCliente?: ClientLite;
    codigo?: string;
    estado?: string;
    formaPago: string="";
    fechayHora?: string;
    fechaFormat:string | undefined;
    totalSinDescuento: number = 0;
    motivoConsulta: string='';
  }
