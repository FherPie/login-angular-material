import { FileHandle } from "./FileHandle";

export class EstablishmentDto {
    id?: number;
    nombre?: string="";
    identificacion?: String="";
    direccion?: string;
    ciudad?: string;
    telefono?: string;
    telefono2?: string;
    codPostal?: string;
    email?: string;
    webSite?: string;
    imageEstablishment: FileHandle[]=[];
     EsblecimientoDto(id:number){
      this.id=id;
    }
}
