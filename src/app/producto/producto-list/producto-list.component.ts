import { Component, Input, OnInit } from '@angular/core';
import { ProductoLite } from '../producto.model2';
import { ProductoServiceServer } from '../producto.service.server';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

 @Input() showEditButton: boolean= true;

 productsList: ProductoLite[] = [];
 currentProduct!: ProductoLite;
 currentIndex = -1;
 nombreProducto = '';
 fileToUpload: File | any = null;

  constructor(private productoService: ProductoServiceServer) { }


  onFileSelected(event:any) {
  const target = event.target as HTMLInputElement;
  //console.log(target);
 // console.log(target.files);
  this.fileToUpload = event.target.files[0]
  console.log(this.fileToUpload);
  if(this.fileToUpload){
    this.onSaveFile();
  }
  }

  
  onSaveFile() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    console.log(formData);
    this.productoService.subirArchivoExcelImportacion(formData,"archivoExcelProdcutos")
    .subscribe(resp => {
      alert("Uploaded")
    })
    // return this.httpClient.post(YOUR_API_URL, formData);
 }

  ngOnInit(): void {
    this.retrieveProductos();
  }

  retrieveProductos(): void {
    this.productoService.getAll()
      .subscribe(
        ( data: ProductoLite[]) => {
          this.productsList = data;
          console.log("loque llega");
          console.log(data);
        },
        (        error: any) => {
          console.log(error);
        });
  }

  buscarPorNombre():void {
    if(this.nombreProducto==null){
      this.nombreProducto='';
    }
    this.productoService.searchByNombre(this.nombreProducto)
    .subscribe((data: ProductoLite[])=>{this.productsList= data;
      console.log(data);
    },(error:any)=>{console.log(error)}) 
  }

  setProductoActive(producto: ProductoLite, index: number){
   this.currentProduct= producto;
   this.currentIndex=index;
  }

}
