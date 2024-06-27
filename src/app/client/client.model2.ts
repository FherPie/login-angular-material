export class ClientLite {
    nombres?: string="";
    apellidos?: String="";
    direccion?: string;
    telefono?: string;
    email?: string;
    identificacion?: string;
    id?: number;
    nombresCompletos?: string;
    motivoConsulta?: string;
    referidoPor?: string;
    idPersona?: number;
}


export const  COLUMNS_SCHEMA = [

    {
      key: "identificacion",
      type: "text",
      label: "Identificacion"
    },
    {
        key: "apellidos",
        type: "text",
        label: "Apellidos"
    },
    {
      key: "nombres",
      type: "text",
      label: "Nombres"
    },
    {
      key: "telefono",
      type: "text",
      label: "Teléfono"
    },
    {
      key: "email",
      type: "text",
      label: "Email"
    },
    {
      key: "actions",
      type: "none",
      label: "Acciones"
    }
  ];