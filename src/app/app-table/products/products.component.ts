import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core'
import { Router } from '@angular/router'
//import { HttpService } from 'src/app/services/http.service'
//import { StorageService } from 'src/app/services/storage.service'

@Component( {
	templateUrl: './products.component.html',
	styleUrls: [ './products.component.scss' ]
} )

export class ProductsComponent implements AfterViewInit {
	
	// constructor( private http: HttpService ) {
	// 	if ( window.innerWidth < window.innerHeight ) {
	// 		this.active = false
	// 	}
	// }


  	constructor(private http: HttpClient) {
		if ( window.innerWidth < window.innerHeight ) {
			this.active = false
		}
	}

	ngAfterViewInit( ): void {
		this.refresh( )
	}

	@ViewChild( 'sidebar' ) sidebar: ElementRef | undefined;
	@ViewChild( 'container' ) container: ElementRef| undefined

	title: string = 'Products'
	page: number = 1

	canCreate: boolean = true

	columns: any = [
		{ name: 'idProducto', type: 'id', hidden: true },
		{ name: 'nombre', type: 'text' },
	    { name: 'precioUnitario', type: 'number' },
		{ name: 'stock', type: 'number' },
		{ name: 'precioCompra', type: 'number' },
		// { name: 'image', type: 'image' },
		// { name: 'discount', type: 'text' },
		// { name: 'description', type: 'text' },
		// { name: 'stock', type: 'number' },
		// { name: 'active', type: 'boolean' },
		// { name: 'special', type: 'boolean' }
	]
	rows: any = []

	async create( value: any ): Promise < void > { 
		//await this.http.post( '/dashboard/addproduct', value )
		this.refresh()
	}

	async update( value: any ): Promise < void > { 
		//await this.http.post( '/dashboard/editproduct', value )
		this.refresh()
	}

	async refresh( ): Promise < void > { 
		this.rows = []
		//const data = await this.http.post( '/dashboard/getproducts', { page: this.page - 1 } )
    this.http
    .get('http://localhost:8080/api?page=1&size=10')
    .subscribe((response: any) => {
     const data = response;
      for ( let i in data ) {
		// { name: 'stock', type: 'number' },
        const { idProducto, nombre, precioUnitario,stock ,precioCompra   } = data[ i ]
        this.rows.push( { idProducto, nombre, precioUnitario,stock ,precioCompra  } )
      }
    });

	}
	
	prev( ): void { 
		if ( this.page >= 2 ) {
			this.page -= 1
			this.refresh()
		}
	}
	next( ): void { 
		if ( this.rows.length >= 10 ) {
			this.page += 1
			this.refresh()
		}
	}

	active: boolean = true
	toggle( ): void { this.active = window.innerWidth > window.innerHeight ? !this.active : this.active }

}
