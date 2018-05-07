import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask'
})
export class MaskPipe implements PipeTransform {
  transform(number: string): string {
    console.log(number.length);

    const visibleDigits = 4;
    let maskedSection = number.slice(0, -visibleDigits);
    let visibleSection = number.slice(-visibleDigits);
    console.log(visibleSection);
    return maskedSection.replace(/./g, '*') + visibleSection;
  }
}