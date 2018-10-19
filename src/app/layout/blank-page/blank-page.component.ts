import { Component, OnInit } from '@angular/core';

import { Inmueble } from './modelo/inmueble';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    titulo = 'prueba';

    msg = '';

    Inmuebles:Inmueble[] = [
    { id:1, tipo:"casa", nombre:"blanca", descripcion:"tiene 3 cuartos, 2 baños,cocina  empotrada... ",ubicacion:"caracas",precio:1000},
    { id:2, tipo:"Edificio", nombre:'gemelo', descripcion:"tiene 30 pisos, 15 habitaciones,2 acensores...",ubicacion:"barquisimeto",precio:2000},
    { id:3, tipo:"terreno", nombre:"rocafelex", descripcion:"tiene 900 mts2... ",ubicacion:"zulia",precio:3000},
    ];

    selectedInmueble: Inmueble = new Inmueble();

    OpenForEdit(inmueble: Inmueble) {
    	this.selectedInmueble = inmueble;
    }


    addOrEdit() {

    	if(this.selectedInmueble.id === 0){

    	this.selectedInmueble.id = this.Inmuebles.length + 1;
    	this.Inmuebles.push(this.selectedInmueble);
        this.msg = 'Campo Agregado Exitosamente';

    	}

    	this.selectedInmueble = new Inmueble();

    	}

    	 deletes(i) {
    	 if(confirm('Estas seguro que quieres Eliminarlo?')){
    	this.Inmuebles.splice(i, 1);
        this.msg = 'Campo Eliminado Exitosamente';
    	}
    }
}
   
