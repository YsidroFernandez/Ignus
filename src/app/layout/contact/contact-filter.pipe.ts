import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class ContactFilterPipe implements PipeTransform {
    transform(items: any[], contDescripcion: string, contTema: string, contEstatus: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (contDescripcion && item.name.toLowerCase().indexOf(contDescripcion.toLowerCase()) === -1){
                return false;
            }
            if (contTema && item.description.toLowerCase().indexOf(contTema.toLowerCase()) === -1){
                return false;
            }
            if (contEstatus && item.status.toLowerCase().indexOf(contEstatus.toLowerCase()) === -1){
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