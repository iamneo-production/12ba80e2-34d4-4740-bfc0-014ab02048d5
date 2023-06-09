import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentFilter'
})
export class StudentFilterPipe implements PipeTransform {

  transform(value: any, sName:string): any {
    if(sName=="") return value;
    const array:any[]=[];
    for(let i=0;i<value.length;i++){
      let name:string=value[i].firstname;
      name=name.toLowerCase();
      if(name.startsWith(sName)){
       array.push(value[i]);
      }
    }
    return array;
}

}
