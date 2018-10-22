import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
    animations: [routerTransition()]
})
export class UsuarioComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;
}
