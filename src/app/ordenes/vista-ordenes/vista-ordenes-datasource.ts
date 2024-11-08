import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Factura } from  '../models/factura';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DataService } from 'src/app/proposal/services/DataService';

// TODO: Replace this with your own data model type
// export interface Factura {
//   numeroFactura: string;
//   id: number;
// }

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: Factura[] = [
//   {idFactura: 1, numeroFactura: 'Hydrogen'},
//   {idFactura: 2, numeroFactura: 'Helium'},
//   {idFactura: 3, numeroFactura: 'Lithium'},
//   {idFactura: 4, numeroFactura: 'Beryllium'},
//   {idFactura: 5, numeroFactura: 'Boron'}];

/**
 * Data source for the VistaFactura view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

export class VistaFacturaDataSource extends DataSource<Factura> {
  data: Factura[] =  [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private  dataService:  DataService) {
    super();
    //this.dataService.getDataList().subscribe(res => this.data = res);
  }



  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Factura[]> {
    console.log("PASA POR EL CONNECT");
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      //observableOf(this.data).subscribe(res =>console.log(res));
      //this.dataService.getDataList().subscribe(res => this.data = res);
      //this.dataService.getDataList().subscribe(res => this.data = res)
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return [...this.data ];
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Factura[]): Factura[] {
    console.log("PAGED DATA");
    console.log(this.data);
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Factura[]): Factura[] {
    console.log("SORTED");
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      console.log(this.data);
      //observableOf(this.data).subscribe(res =>console.log(res));
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'numeroFactura': return compare(a.numeroFactura, b.numeroFactura, isAsc);
        //case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/numeroFactura columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
