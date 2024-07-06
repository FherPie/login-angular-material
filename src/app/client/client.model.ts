import { ClienteRespuestasDto } from "./models/ClienteRespuestasDto";

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
    listaClienteRespuestasDto?:ClienteRespuestasDto[];
    //     genero?: string;
    // estado?: string;
    // password?: string;
}
