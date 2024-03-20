import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar){ }
    showError(message:string){
     this._snackBar.open(message, 'Descartar', {
      panelClass: ['snackbar-error']
    }) 
   }

   showSuccess(message:string){
    this._snackBar.open(message, 'Descartar', {
     panelClass: ['snackbar-success']
   }) 
  }

  showInfo(message:string){
    this._snackBar.open(message, 'Descartar', {
     panelClass: ['custom-snackbar']
   }) 
  }

  showWarn(message:string){
    this._snackBar.open(message, 'Descartar', {
     panelClass: ['snackbar-warn']
   }) 
  }
}

