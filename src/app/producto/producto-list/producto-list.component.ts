import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { COLUMNS_SCHEMA, ProductoLite } from '../producto.model2';
import { ProductoServiceServer } from '../producto.service.server';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddProductoComponent } from '../add-producto/add-producto.component';
import { MessageService } from 'src/app/utils-services/message-service.service';
import { DeleteConfirmDialogComponent } from 'src/app/proposal/util-components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css'],
})
export class ProductoListComponent implements OnInit, AfterViewInit {
  @Input() showEditButton: boolean = true;

  productsList: ProductoLite[] = [];
  selectedProduct!: ProductoLite;
  currentIndex = -1;
  nombreProducto = '';
  fileToUpload: File | any = null;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Output() eventNew = new EventEmitter();
  filterValue: string = "";

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEMA;
  dataSource = new MatTableDataSource<ProductoLite>();


  constructor(
    private productoService: ProductoServiceServer,
    private router: Router,
    public dialog: MatDialog, private msgs:MessageService
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  
  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  clearFilterValue() {
    this.dataSource.filter = "";
    this.filterValue = "";
  }


  retrieveProductos(): void {
    this.productoService.getAll().subscribe(
      (data: ProductoLite[]) => {
        this.productsList = data;
        this.dataSource.data = this.productsList;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  new() {
    this.openDialogProductForm(new ProductoLite());
  }

  
  openEditClient(client: ProductoLite) {
    this.selectedProduct = client;
    this.openDialogProductForm(this.selectedProduct);
  }


  openDialogProductForm(data: ProductoLite | null) {

    const dialogRef = this.dialog.open(AddProductoComponent, {
      width: '640px', disableClose: true,
      data: data,
      maxHeight: '120vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.retrieveProductos();
    })


  }

  // buscarPorNombre(): void {
  //   if (this.nombreProducto == null) {
  //     this.nombreProducto = '';
  //   }
  //   this.productoService.searchByNombre(this.nombreProducto).subscribe(
  //     (data: ProductoLite[]) => {
  //       this.productsList = data;
  //       console.log(data);
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

  deleteClient(pacientDtoToDelete: any) {
    this.dialog
      .open(DeleteConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
         
          this.productoService.delete(pacientDtoToDelete.id).subscribe({
            next: data => {
            },
            complete: () => {
              alert('Registro Eliminado');
              this.retrieveProductos();
            },
            error: error => {
              this.msgs.showError(error.error.mensaje)
            }
        }
    );}
      });
  
}


}
