import { ClientLite } from "src/app/client/client.model2";

export class Ingreso {
    id: number=0;
    tipo:number=0;
    precio:number=0;
    concepto?:string;
    createdDate:string="1989-07-02";
    idCliente?: ClientLite;
    nombreCliente?:string;
}