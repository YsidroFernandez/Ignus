import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class SolicitudFilterPipe implements PipeTransform {
    transform(items: any[], solicName: string, solicApellido: string, solicIdent: string, solicTipo: string, solicFecha: string, solicHora: string, solicEstatus: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (solicName && item.client.firstName.toLowerCase().indexOf(solicName.toLowerCase()) === -1){
                return false;
            }
            if (solicApellido && item.client.lastName.toLowerCase().indexOf(solicApellido.toLowerCase()) === -1){
                return false;
            }
            if (solicIdent && item.client.identification.toLowerCase().indexOf(solicIdent.toLowerCase()) === -1){
                return false;
            }
            if (solicTipo && item.typeService.name.toLowerCase().indexOf(solicTipo.toLowerCase()) === -1){
                return false;
            }
            if (solicFecha && item.requestDate.toLowerCase().indexOf(solicFecha.toLowerCase()) === -1){
                return false;
            }
            if (solicHora && item.Opcional.toLowerCase().indexOf(solicHora.toLowerCase()) === -1){
                return false;
            }
            if (solicEstatus && item.Pendiente.toLowerCase().indexOf(solicEstatus.toLowerCase()) === -1){
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