import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEnglishOnly]',
  standalone: true
})
export class EnglishOnlyDirective {

  constructor(private _element:ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this._element.nativeElement.value;
    const englishOnlyRegex = /^[A-Za-z\s]+$/;
    if(!englishOnlyRegex.test(initialValue)){
      const newValue = initialValue.replace(/[^A-Za-z\s]/g, "");
      this._element.nativeElement.value = newValue;
      event.preventDefault();
    }
  }
}
