import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PacientService } from './pacient-service.service';
import { PacientDto } from './PacientDto';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

myControl= new FormControl("");

options:PacientDto[]=[];

loading!: boolean;


constructor(public dialog: MatDialog,
  private pacientService: PacientService,
  ){

}

  ngOnInit(): void {
    console.log(":Llamar!!!!!!!!!!");
    this.listPacient();
  }

listPacient(){
  this.loading = true;
   this.pacientService.getListPacient().subscribe({
          next: data => {
              this.options = data.listadoOb;
          },
          complete: () => {
              this.loading = false;
          },
          error: error => {
            //this.toastr.error('Error', error);
            this.loading = false;
          }
      }
  );
}


}
