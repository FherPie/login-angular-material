import { Maestro } from '../maestro/maestro.model';

export class Detalle {
  id?: number;
  id_maestro?: number;
  nombre?: string;
  parametros?: string;
  descripcion?: string;

  maestro: Maestro={nombre:""};
}
