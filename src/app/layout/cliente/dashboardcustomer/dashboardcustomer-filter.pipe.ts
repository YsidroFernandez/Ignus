import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class DashboardCustomerFilterPipe implements PipeTransform {
    transform(items: any[], transTipo: string, transDescription: string, transEstado: string, soliDate: string, soliTipo: string, soliDescription: string, soliEstado: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (transTipo && item.typeService.name.toLowerCase().indexOf(transTipo.toLowerCase()) === -1){
                return false;
            }
            if (transDescription && item.typeService.description.toLowerCase().indexOf(transDescription.toLowerCase()) === -1){
                return false;
            }
            if (transEstado && item.status.toLowerCase().indexOf(transEstado.toLowerCase()) === -1){
                return false;
            }
            if (soliDate && item.wishDate.toLowerCase().indexOf(soliDate.toLowerCase()) === -1){
                return false;
            }
            if (soliTipo && item.typeRequest.name.toLowerCase().indexOf(soliTipo.toLowerCase()) === -1){
                return false;
            }
            if (soliDescription && item.typeRequest.description.toLowerCase().indexOf(soliDescription.toLowerCase()) === -1){
                return false;
            }
            if (soliEstado && item.status.toLowerCase().indexOf(soliEstado.toLowerCase()) === -1){
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
