import { ClientLite } from "../client/client.model2";

export class DialogData {
    animal?: string;
    name?: string;
    desde?: moment.Moment;
    hasta?: moment.Moment;
    cedula?: string;
    estado?: string;
    clienteSelected?: ClientLite;
  }