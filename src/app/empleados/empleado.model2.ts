export class EmpleadoDto {
  id?: number;
  firstName?: string;
  lastName?: string;
  role?: string;
  username?: string;
  password?: string;
}

export const  COLUMNS_SCHEMA = [
  {
    key: "id",
    type: "number",
    label: "ID"
  },
  {
    key: "firstName",
    type: "text",
    label: "Nombre"
  },
  {
      key: "lastName",
      type: "text",
      label: "Apellido"
  },
  {
    key: "username",
    type: "text",
    label: "Nombre Usuario"
  },
  {
    key: "status",
    type: "text",
    label: "Estado"
  },
  {
    key: "actions",
    type: "none",
    label: "Acciones"
  }
];