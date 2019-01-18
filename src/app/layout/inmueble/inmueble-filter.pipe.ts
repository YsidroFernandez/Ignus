import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class InmuebleFilterPipe implements PipeTransform {
    transform(items: any[], inmTransaccion: string, inmTipo: string, inmName: string, inmDescription: string, inmUbicacion: string, inmPrecio: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (inmTransaccion && item.transaccion.toLowerCase().indexOf(inmTransaccion.toLowerCase()) === -1){
                return false;
            }
            if (inmTipo && item.tipo.toLowerCase().indexOf(inmTipo.toLowerCase()) === -1){
                return false;
            }
            if (inmName && item.nombre.toLowerCase().indexOf(inmName.toLowerCase()) === -1){
                return false;
            }
            if (inmDescription && item.descripcion.toLowerCase().indexOf(inmDescription.toLowerCase()) === -1){
                return false;
            }
            if (inmUbicacion && item.ubicacion.toLowerCase().indexOf(inmUbicacion.toLowerCase()) === -1){
                return false;
            }
            if (inmPrecio && item.precio.toLowerCase().indexOf(inmPrecio.toLowerCase()) === -1){
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