import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mask' })
export class MaskPipe implements PipeTransform {
    transform(phrase: string) {    
        let toBeReplaced = phrase.slice(0, 7);
        console.log(toBeReplaced);
        return phrase.replace(toBeReplaced, "xxxx-xxxx");
    }
}