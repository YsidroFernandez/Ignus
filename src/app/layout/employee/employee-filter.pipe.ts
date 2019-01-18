import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class EmployeeFilterPipe implements PipeTransform {
    transform(items: any[], emplIdentificacion: string, emplName: string, emplLastName: string, emplSex: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (emplIdentificacion && item.person.identification.toLowerCase().indexOf(emplIdentificacion.toLowerCase()) === -1){
                return false;
            }
            if (emplName && item.person.firstName.toLowerCase().indexOf(emplName.toLowerCase()) === -1){
                return false;
            }
            if (emplLastName && item.person.lastName.toLowerCase().indexOf(emplLastName.toLowerCase()) === -1){
                return false;
            }
            if (emplSex && item.person.gender.toLowerCase().indexOf(emplSex.toLowerCase()) === -1){
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