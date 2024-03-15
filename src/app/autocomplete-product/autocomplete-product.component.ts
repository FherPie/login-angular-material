import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductoLite } from '../producto/producto.model2';
import { ProductService } from './product-service.service';

@Component({
  selector: 'app-autocomplete-product',
  templateUrl: './autocomplete-product.component.html',
  styleUrls: ['./autocomplete-product.component.css']
})
export class AutocompleteProductoComponent implements OnInit {

myControl= new FormControl("");

options:ProductoLite[]=[];
@Output() fireSelectedProduct = new EventEmitter();
loading!: boolean;
readonly customerFilterControl=  new FormControl();
filteredOptions!: Observable<ProductoLite[]>;


constructor(public dialog: MatDialog,
  private productService: ProductService,
  ){

}

  ngOnInit(): void {

    this.listPacient();
  }

  
listPacient(){
  this.loading = true;
   this.productService.getAllProduct().subscribe({
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

setActiveClient(client: ProductoLite){
  console.log("object", client);
  this.fireSelectedProduct.emit(client);
}

clearActiveClient(client: ProductoLite){
  console.log("object", client);
  this.fireSelectedProduct.emit({});
  this.customerFilterControl.setValue('')
}

displayFn(product: ProductoLite): string  {
  return product ? product.nombre +""  : '';
}

  filterx(value:string):ProductoLite[] {
    console.log("value", value)
    const filterValue = value.toLowerCase();
    if(value==""){
      return [];
    }
    //console.log("Antes Fitlrado",this.options);
    //console.log("Fitlrado",this.options.filter(option => option.apellidos?.toLowerCase().indexOf(value.toLowerCase()) === 0  ) );
    return this.options.filter(option => option.nombre?.toLowerCase().indexOf(filterValue.toLowerCase()) === 0 );
  }
  







}
