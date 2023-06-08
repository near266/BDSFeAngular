import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [8, 9, 13, 27, 46]; // Backspace, Tab, Enter, Escape, Delete
    if (allowedKeys.indexOf(event.keyCode) !== -1) {
      // Allow the key
      return;
    }

    const isMacVN = (event.keyCode === 229 || event.which === 229) && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isNumber = /^[0-9]+$/.test(event.key);

    if (!isNumber || isMacVN) {
      // Prevent the key press
      event.preventDefault();
    }
  }
}
