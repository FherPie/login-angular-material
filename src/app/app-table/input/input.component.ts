import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core'

@Component( {
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: [ './input.component.scss' ]
} )

export class InputComponent implements AfterViewInit {

	ngAfterViewInit( ): void {
		this.value = this.val
	}

	@Input( ) type: string="";
	@Input( ) label: string="";
	@Input( ) val: any = ''
	@Output( ) setValue: EventEmitter < any > = new EventEmitter()

	value: any = ''
	show: boolean = true

	async changeImage( event: any ) {
		const value = await this.base64( event.target.files[ 0 ] )
		this.value = value
		if ( this.show ) this.show = false
	}

	async change( event: any ) {
		this.value = event.target.value
	}

	async onChangeImage( event: any ): Promise < void > {
		let input: any = document.createElement( 'input' )
		input.type = 'file'
		input.accept = 'image/*'
		input.onchange = async () => {
			this.val = undefined
			this.value = await this.base64( input.files[ 0 ] )
			this.setValue.emit( { label: this.label, value: this.value } )
		}
		input.click( )
	}

	onChangeBoolean( event: any ): void {
		this.value = event.target.value ? true : false
	}

	base64( file: any ): Promise < any > {
		return new Promise( ( resolve, reject ) => {
		  const reader: FileReader = new FileReader()
		  reader.readAsDataURL( file )
		  reader.onload = ( ) => resolve( reader.result )
		  reader.onerror = error => reject( error )
		} )
	}

}