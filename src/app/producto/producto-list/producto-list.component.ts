import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductoLite } from '../producto.model2';
import { ProductoServiceServer } from '../producto.service.server';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css'],
})
export class ProductoListComponent implements OnInit {
  @Input() showEditButton: boolean = true;

  productsList: ProductoLite[] = [];
  currentProduct!: ProductoLite;
  currentIndex = -1;
  nombreProducto = '';
  fileToUpload: File | any = null;

  dataSource: MatTableDataSource<ProductoLite> | undefined;
  displayedColumns = [];

  constructor(
    private productoService: ProductoServiceServer,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    const target = event.target as HTMLInputElement;

    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
    if (this.fileToUpload) {
      this.onSaveFile();
    }
  }

  onSaveFile() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    console.log(formData);
    this.productoService
      .subirArchivoExcelImportacion(formData, 'archivoExcelProdcutos')
      .subscribe((resp) => {
        alert('Uploaded');
      });
  }

  ngOnInit(): void {
    this.retrieveProductos();
  }

  retrieveProductos(): void {
    this.productoService.getAll().subscribe(
      (data: ProductoLite[]) => {
        this.productsList = data;

        this.dataSource = new MatTableDataSource(this.productsList);

        console.log('loque llega');
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  buscarPorNombre(): void {
    if (this.nombreProducto == null) {
      this.nombreProducto = '';
    }
    this.productoService.searchByNombre(this.nombreProducto).subscribe(
      (data: ProductoLite[]) => {
        this.productsList = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setProductoActive(producto: ProductoLite, index: number) {
    this.currentProduct = producto;
    this.currentIndex = index;
  }

  agregarProductos(): void {
    this.router.navigateByUrl('/agregarProductos');
  }
}
