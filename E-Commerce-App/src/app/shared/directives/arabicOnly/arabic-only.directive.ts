import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appArabicOnly]',
  standalone: true
})
export class ArabicOnlyDirective {

  constructor(private _element:ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this._element.nativeElement.value;
    const arabicOnlyRegex = /^[\u0621-\u064A0-9\s]*$/;
    if(!arabicOnlyRegex.test(initialValue)){
      const newValue = initialValue.replace(/[^\u0621-\u064A0-9\s]/g, "");
			this._element.nativeElement.value = newValue;
			event.preventDefault();
  }
  }
}
