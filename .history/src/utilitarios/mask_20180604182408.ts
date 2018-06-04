import {Injectable} from '@angular/core';

@Injectable()
export class MaskUtil {

  maskCpfConvert(v) {
    v=v.replace(/\D/g,'');
    v=v.replace(/(\d{1,2})$/, '-$1');  
    v=v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); 
    return v;
  }

  // removeMaskCpf(c) {
  //   c = c.replace("-", "");
  //   for(let cpf of c) {
  //     c = c.replace(".", "");
  //   }
  //   return c;
  // }

}