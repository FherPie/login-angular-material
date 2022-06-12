import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Factura } from  '../factura';
import { ItemFactura } from  '../itemFactura';
import { DataService } from '../DataService';
import * as _moment from 'moment';
//import {default as _rollupMoment} from 'moment';
//const moment = _rollupMoment || _moment;
import {FormControl} from '@angular/forms';
import * as moment from 'moment';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];




@Component({
  selector: 'app-creacion-factura',
  templateUrl: './creacion-factura.component.html',
  styleUrls: ['./creacion-factura.component.css']
})
export class CreacionFacturaComponent {

  displayedColumns2: string[] = ['producto', 'numeroItems', 'precioUnitario'];
  
  factura = new Factura();

  itemsFactura: ItemFactura[] = [];
  currentIndex = -1;
  date = moment();

  //dataSource2 = ELEMENT_DATA;
  dataSource2 = this.itemsFactura;

  // addressForm = this.fb.group({
  //   nombreCliente: null,
  //   nombreCliente: [null, Validators.required],
  //   lastName: [null, Validators.required],
  //   address: [null, Validators.required],
  //   address2: null,
  //   city: [null, Validators.required],
  //   state: [null, Validators.required],
  //   postalCode: [null, Validators.compose([
  //     Validators.required, Validators.minLength(5), Validators.maxLength(5)])
  //   ],
  //   shipping: ['free', Validators.required]
  // });

  // hasUnitNumber = false;

  // states = [
  //   {name: 'Alabama', abbreviation: 'AL'},
  //   {name: 'Alaska', abbreviation: 'AK'},
  //   {name: 'American Samoa', abbreviation: 'AS'},
  //   {name: 'Arizona', abbreviation: 'AZ'},
  //   {name: 'Arkansas', abbreviation: 'AR'},
  //   {name: 'California', abbreviation: 'CA'},
  //   {name: 'Colorado', abbreviation: 'CO'},
  //   {name: 'Connecticut', abbreviation: 'CT'},
  //   {name: 'Delaware', abbreviation: 'DE'},
  //   {name: 'District Of Columbia', abbreviation: 'DC'},
  //   {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
  //   {name: 'Florida', abbreviation: 'FL'},
  //   {name: 'Georgia', abbreviation: 'GA'},
  //   {name: 'Guam', abbreviation: 'GU'},
  //   {name: 'Hawaii', abbreviation: 'HI'},
  //   {name: 'Idaho', abbreviation: 'ID'},
  //   {name: 'Illinois', abbreviation: 'IL'},
  //   {name: 'Indiana', abbreviation: 'IN'},
  //   {name: 'Iowa', abbreviation: 'IA'},
  //   {name: 'Kansas', abbreviation: 'KS'},
  //   {name: 'Kentucky', abbreviation: 'KY'},
  //   {name: 'Louisiana', abbreviation: 'LA'},
  //   {name: 'Maine', abbreviation: 'ME'},
  //   {name: 'Marshall Islands', abbreviation: 'MH'},
  //   {name: 'Maryland', abbreviation: 'MD'},
  //   {name: 'Massachusetts', abbreviation: 'MA'},
  //   {name: 'Michigan', abbreviation: 'MI'},
  //   {name: 'Minnesota', abbreviation: 'MN'},
  //   {name: 'Mississippi', abbreviation: 'MS'},
  //   {name: 'Missouri', abbreviation: 'MO'},
  //   {name: 'Montana', abbreviation: 'MT'},
  //   {name: 'Nebraska', abbreviation: 'NE'},
  //   {name: 'Nevada', abbreviation: 'NV'},
  //   {name: 'New Hampshire', abbreviation: 'NH'},
  //   {name: 'New Jersey', abbreviation: 'NJ'},
  //   {name: 'New Mexico', abbreviation: 'NM'},
  //   {name: 'New York', abbreviation: 'NY'},
  //   {name: 'North Carolina', abbreviation: 'NC'},
  //   {name: 'North Dakota', abbreviation: 'ND'},
  //   {name: 'Northern Mariana Islands', abbreviation: 'MP'},
  //   {name: 'Ohio', abbreviation: 'OH'},
  //   {name: 'Oklahoma', abbreviation: 'OK'},
  //   {name: 'Oregon', abbreviation: 'OR'},
  //   {name: 'Palau', abbreviation: 'PW'},
  //   {name: 'Pennsylvania', abbreviation: 'PA'},
  //   {name: 'Puerto Rico', abbreviation: 'PR'},
  //   {name: 'Rhode Island', abbreviation: 'RI'},
  //   {name: 'South Carolina', abbreviation: 'SC'},
  //   {name: 'South Dakota', abbreviation: 'SD'},
  //   {name: 'Tennessee', abbreviation: 'TN'},
  //   {name: 'Texas', abbreviation: 'TX'},
  //   {name: 'Utah', abbreviation: 'UT'},
  //   {name: 'Vermont', abbreviation: 'VT'},
  //   {name: 'Virgin Islands', abbreviation: 'VI'},
  //   {name: 'Virginia', abbreviation: 'VA'},
  //   {name: 'Washington', abbreviation: 'WA'},
  //   {name: 'West Virginia', abbreviation: 'WV'},
  //   {name: 'Wisconsin', abbreviation: 'WI'},
  //   {name: 'Wyoming', abbreviation: 'WY'}
  // ];


  constructor(private fb: FormBuilder,  private  dataService:  DataService) {


    
  }

  onSubmit(): void {
    alert('Thanks!');
  }


  agregarFactura(form: { value: any; }){
    this.factura=form.value;
    this.factura.fechaEmision=this.date.format("YYYY-MM-DD HH:mm:ss"); 
    console.log(this.factura);
    this.dataService.createData(this.factura)
    .subscribe(
      response => {
        console.log(response);
        //this.submitted = true;
      },
      error => {
        console.log(error);
      });
  }

  agregarDetalle(form2: { value: any; }){
    //console.log(form2.value);
    const data={producto: form2.value.producto, numeroItems: form2.value.numeroItems, precioUnitario: form2.value.precioUnitario};
    this.itemsFactura.push(data);
    //console.log(this.itemsFactura);
    //this.dataSource2 = this.itemsFactura;
  }

  deleteDetalle(index: number): void{
    this.currentIndex=index;
    if (index !== -1) {
        this.itemsFactura.splice(index, 1);
    } 
  }

}
