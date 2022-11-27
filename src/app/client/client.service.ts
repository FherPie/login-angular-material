import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientLite } from './client.model2';




@Injectable({
  providedIn: 'root'
})
export class ClientService {



  // subirArchivoExcelImportacion(formData: FormData, arg1: string): Observable<any> {
  //   console.log('llega al serviciO');
  //   //return this.http.post(`${baseUrl+'/uploadFile'}/${nameFile}`, formData);
  // }

  // findByIdentification(identification: string): any {
  //   const clientsObservable = new Observable(observer => {
  //     setTimeout(() => {
  //       observer.next(this.clients.filter(x => x.identificacion == identification)[0]);
  //     }, 1000);
  //   });
  //   return clientsObservable;
  // }

  // findByNombres(nombre: string): any {
  //   //return this.clients.filter(x => x.nombre == nombre || x.apellido == nombre );
  //   const clientsObservable = new Observable(observer => {
  //     setTimeout(() => {
  //       observer.next(this.clients.filter(x => x.nombre == nombre || x.apellido == nombre ));
  //     }, 1000);
  //   });
  //   return clientsObservable;
  // }

  // clients: ClientLite[] = [{
  //   clienteId: 1,
  //   email: "email",
  //   direccion: "monjas",
  //   identificacion: "1722714795",
  //   nombre: "Andres",
  //   apellido: "Piedra",
  //   telefono: "2063218",
  //   estado: "activo",
  // },
  // {
  //   clienteId: 2,
  //   email: "email",
  //   direccion: "monjas",
  //   identificacion: "1722714795",
  //   nombre: "Johanna",
  //   apellido: "Mendoza",
  //   telefono: "0995215112",
  //   estado: "activo",
  // },
  // {
  //   clienteId: 3,
  //   email: "email",
  //   direccion: "monjas",
  //   identificacion: "1722714789",
  //   nombre: "Carlos",
  //   apellido: "Piedra",
  //   telefono: "2063218",
  //   estado: "activo",
  // }];


  // constructor() { }


  // public getAll(): any {
  //   const clientsObservable = new Observable(observer => {
  //     setTimeout(() => {
  //       observer.next(this.clients);
  //     }, 1000);
  //   });

  //   return clientsObservable;
  // }
}
