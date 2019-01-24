import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class InmuebleFilterPipe implements PipeTransform {
    transform(items: any[], inmPro: string, inmUbi: string, inmDes: string, inmFecha: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (inmPro && item.owner.firstName.toLowerCase().indexOf(inmPro.toLowerCase()) === -1){
                return false;
            }
            if (inmUbi && item.ubication.toLowerCase().indexOf(inmUbi.toLowerCase()) === -1){
                return false;
            }
            if (inmDes && item.nameDisplay.toLowerCase().indexOf(inmDes.toLowerCase()) === -1){
                return false;
            }
            if (inmFecha && item.buildDate.toLowerCase().indexOf(inmFecha.toLowerCase()) === -1){
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