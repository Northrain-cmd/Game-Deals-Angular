import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPointer]'
})
export class PointerDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.cursor = 'pointer';
   }

}
