import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class LissegerenciasFilterPipe implements PipeTransform {
    transform(items: any[], lissugFecha: string, lissugNombre: string, lissugTipo: string, lissugTema: string, lissugEstatus: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (lissugFecha && item.contactDate.toLowerCase().indexOf(lissugFecha.toLowerCase()) === -1){
                return false;
            }
            if (lissugNombre && item.name.toLowerCase().indexOf(lissugNombre.toLowerCase()) === -1){
                return false;
            }
            if (lissugTipo && item.typeContact.name.toLowerCase().indexOf(lissugTipo.toLowerCase()) === -1){
                return false;
            }
            if (lissugTema && item.subject.name.toLowerCase().indexOf(lissugTema.toLowerCase()) === -1){
                return false;
            }
            if (lissugEstatus && item.status.toLowerCase().indexOf(lissugEstatus.toLowerCase()) === -1){
                return false;
            }
            return true;
       })
    }
    else{
        return items;
    }
}
}