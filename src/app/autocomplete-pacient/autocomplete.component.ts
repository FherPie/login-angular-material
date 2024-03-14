import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { interval, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClientLite } from '../client/client.model2';
import { PacientService } from './pacient-service.service';

@Component({
  selector: 'app-autocomplete-client',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnChanges  {

myControl= new FormControl("");
@Input() inputClient?: ClientLite;
options:ClientLite[]=[];
@Output() fireSelectedClient = new EventEmitter<ClientLite>();
loading!: boolean;
readonly customerFilterControl=  new FormControl();
filteredOptions!: Observable<ClientLite[]>;
isThereClient:boolean=false;


constructor(public dialog: MatDialog,
  private pacientService: PacientService,
  ){

}
  ngOnChanges(changes: SimpleChanges): void {
 
    if(this.inputClient){
      this.isThereClient=true;
      this.customerFilterControl.setValue(this.inputClient);
    }else{
      
    }
  }

  ngOnInit(): void {
    console.log("INIT",this.inputClient);
    this.listPacient();
  }

  
listPacient(){
  this.loading = true;
   this.pacientService.getAllClient().subscribe({
          next: data => {
              this.options = data;
              this.filteredOptions = this.customerFilterControl.valueChanges.pipe(                    
                startWith(''),
                map(value =>
                  {
                    if (typeof value === 'string') {
                      return this.filterx(value);
                    }
                    return [];
                  })
              );
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

setActiveClient(client: ClientLite){
  console.log("object", client);
  this.fireSelectedClient.emit(client);
}

clearActiveClient(client: ClientLite){
  console.log("object", client);
  this.fireSelectedClient.emit({});
  this.customerFilterControl.setValue('');
  this.isThereClient=false;
}

displayFn(user: ClientLite): string  {
  return user ? user.apellidos +"" + user.nombres : '';
}

  filterx(value:string):ClientLite[] {
    console.log("value", value)
    const filterValue = value.toLowerCase();
    if(value==""){
      return [];
    }
    //console.log("Antes Fitlrado",this.options);
    //console.log("Fitlrado",this.options.filter(option => option.apellidos?.toLowerCase().indexOf(value.toLowerCase()) === 0  ) );
    return this.options.filter(option => option.apellidos?.toLowerCase().indexOf(filterValue.toLowerCase()) === 0 );
  }
  







}
