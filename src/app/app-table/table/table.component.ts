import { Component, ElementRef, ViewChildren, AfterViewInit, Input, Output, ChangeDetectorRef } from '@angular/core'
import { EventEmitter } from '@angular/core'
import { InputComponent } from '../input/input.component'

@Component( {
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: [ './table.component.scss' ]
} )

export class TableComponent {

	@Input( ) title: string=""
	@Input( ) rows: any
	@Input( ) columns: any
	@Input( ) page: number=0;
	@Input( ) canCreate: boolean=false
	@Input( ) canDelete: boolean=false;

	@Output( ) onRefresh: EventEmitter < any > = new EventEmitter()
	@Output( ) onDelete: EventEmitter < any > = new EventEmitter()
	@Output( ) onPrev: EventEmitter < any > = new EventEmitter()
	@Output( ) onNext: EventEmitter < any > = new EventEmitter()

	@ViewChildren( 'element' ) elements: ElementRef[]=[];

	selected: any

	onSelect( element: object, selected: object ) {
		for ( let e of this.elements ) {
			if ( element == e.nativeElement ) {
				e.nativeElement.classList.add( 'selected' )
			} else if ( e.nativeElement.classList.contains( 'selected' ) ) {
				e.nativeElement.classList.remove( 'selected' )
			} 
		}
		this.selected = selected
	}

	_onRefresh( ) { this.onRefresh.emit( '' ) }
	_onPrev( ) { this.onPrev.emit( '' ) }
	_onNext( ) { this.onNext.emit( '' ) }
	_onDelete( ) { this.onDelete.emit( this.selected ) }

	// CREATE
	@Output( ) onCreate: EventEmitter < any > = new EventEmitter()
	@ViewChildren( 'inputcreate' ) inputcreate: InputComponent[]=[];
	
	_onCreate( ) {
		this.onCreate.emit( this.create )
		this.create = {}
		setTimeout( ( ) => { this.resetCreate = false }, 300 ) 
	}

	
	goCreate( ) {
		this.create = {}
		this.resetCreate = true
	}
	
	create: any = {}
	resetCreate: boolean = false
	onChangeCreate( label: any, value: any ) { this.create[ label ] = value.target.value }

	// UPDATE
	@ViewChildren( 'inputupdate' ) inputupdate: InputComponent[]=[];
	@Output( ) onUpdate: EventEmitter < any > = new EventEmitter()
	_onUpdate( ) { this.onUpdate.emit( this.selected ) }
	onChangeUpdate( label: any, value: any ) {
		this.selected[label] = value.target.value
		console.log( label, value.target.value )
	}

	imageCheck( value: any ) {
		let v = true
		if ( typeof value == 'string' ) {
			if ( value.length > 5000 ) { v = false } 
			else { v = true	}
		}
		return v
	}

	test( { label, value }: any ) {
		this.selected[label] = value
	}

}