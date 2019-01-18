import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class ClientFilterPipe implements PipeTransform {
    transform(items: any[], cliIdentificacion: string, cliName: string, cliLastName: string, cliSex: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (cliIdentificacion && item.person.identification.toLowerCase().indexOf(cliIdentificacion.toLowerCase()) === -1){
                return false;
            }
            if (cliName && item.person.firstName.toLowerCase().indexOf(cliName.toLowerCase()) === -1){
                return false;
            }
            if (cliLastName && item.person.lastName.toLowerCase().indexOf(cliLastName.toLowerCase()) === -1){
                return false;
            }
            if (cliSex && item.person.gender.toLowerCase().indexOf(cliSex.toLowerCase()) === -1){
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