import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class ReservaFilterPipe implements PipeTransform {
    transform(items: any[], resDate: string, resInmueble: string, resCliente: string, resEstatus: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (resDate && item.status.toLowerCase().indexOf(resDate.toLowerCase()) === -1){
                return false;
            }
            if (resInmueble && item.nameForClient.toLowerCase().indexOf(resInmueble.toLowerCase()) === -1){
                return false;
            }
            if (resCliente && item.nameForEmployee.toLowerCase().indexOf(resCliente.toLowerCase()) === -1){
                return false;
            }
            if (resEstatus && item.Status.toLowerCase().indexOf(resEstatus.toLowerCase()) === -1){
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
