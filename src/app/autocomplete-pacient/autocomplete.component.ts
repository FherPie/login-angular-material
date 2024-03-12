import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientLite } from '../client/client.model2';
import { PacientService } from './pacient-service.service';

@Component({
  selector: 'app-autocomplete-client',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

myControl= new FormControl("");

options:ClientLite[]=[];

loading!: boolean;


constructor(public dialog: MatDialog,
  private pacientService: PacientService,
  ){

}

  ngOnInit(): void {
    this.listPacient();
  }

listPacient(){
  this.loading = true;
   this.pacientService.getAllClient().subscribe({
          next: data => {
              this.options = data;
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
