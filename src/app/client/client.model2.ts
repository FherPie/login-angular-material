export class ClientLite {
    nombres?: string="";
    apellidos?: String="";
    direccion?: string;
    telefono?: string;
    email?: string;
    identificacion?: string;
    id?: number;
    nombresCompletos?: string;
}


export const  COLUMNS_SCHEMA = [
    {
      key: "id",
      type: "number",
      label: "ID"
    },
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