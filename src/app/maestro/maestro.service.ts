import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maestro } from './maestro.model';
import { observeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MaestroService {
  maestros: Maestro[] = [];

  findByIdMaestro(id: any): Observable<any> {
    const maestroObservable = new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.maestros.filter((x) => x.id == id));
      }, 1000);
    });

    return maestroObservable;
  }

  public getAll(): any {
    const maestroObservable = new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.maestros);
      }, 1000);
    });

    return maestroObservable;
  }
  constructor() {}
}
