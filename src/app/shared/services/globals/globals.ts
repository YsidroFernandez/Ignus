import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalsProvider {
    public isDebugMode = true;
    public validarEmail = '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})';
    public validarTelefono = '^(0|[1-9][0-9]*)$';
    public numPage = 10;
    constructor(
        private toastr: ToastrService
        ) {

    }
    public alertInfo(message, title ) {
        this.toastr.info(message, title, {
            timeOut: 5000
          });
    }

    public alertSuccess(message, title ) {
        this.toastr.success(message, title, {
            timeOut: 5000
          });
    }

    public alertError(message, title ) {
        this.toastr.error(message, title, {
            timeOut: 5000
          });
    }

}