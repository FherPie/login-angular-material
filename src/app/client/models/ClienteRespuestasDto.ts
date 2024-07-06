import { Detalle } from "src/app/detalle/detalle.model";

export class ClienteRespuestasDto{
    id?:number;
    repuestText?: string;
    respuestInteger?: number;
    respuestBoolean?: boolean;
    respuestDouble?: number;
    pregunta?: Detalle;
}