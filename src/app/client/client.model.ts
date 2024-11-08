import { ClienteRespuestasDto } from "./models/ClienteRespuestasDto";
import { OdontogramaRespuestasDto } from "./models/OdontogramaRespuestasDto";

export class ClientDto {

    nombres?: string;
    apellidos?: string;
    id?: number;
    direccion?: string;
    telefono?: string;
    telefono2?: string;
    referido?: string;
    email?: string;
    fechaNacimiento?:Date;
    identificacion?: string;
    motivoConsulta?: string;
    referidoPor?: string;
    idPersona?: number;
    listaClienteRespuestasDto:ClienteRespuestasDto[]=[];
    listaOdontogramaRespuestasDto?:OdontogramaRespuestasDto[];
    
    //     genero?: string;
    // estado?: string;
    // password?: string;
}
