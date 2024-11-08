
export class OdontogramaRespuestasDto{
    id?:number;
    descripcion?: string;
    pieza?: number;
    nombre?: string;
    odontogramaPieza?: string;



    // azules prestaciones requeridas
    machaBlanca?: boolean=false;
    fractura?: boolean=false;
    caries?: boolean=false;
    indicadoExtracciones?: boolean=false;

    // rojas prestaciones existentes
    obturacionAmalgama?: boolean=false;
    corona?: boolean=false;
    selladoresFosa?: boolean=false;
    obturacionResina?: boolean=false;

}