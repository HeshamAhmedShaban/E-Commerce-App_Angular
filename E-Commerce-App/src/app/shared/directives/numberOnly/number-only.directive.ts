import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
  standalone: true
})
export class NumberOnlyDirective {

  private _el = inject(ElementRef);
  private _renderer = inject(Renderer2);


  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = this._el.nativeElement as HTMLInputElement;
    const initialValue = inputElement.value;

    // Replace any character that is not a digit
    inputElement.value = initialValue.replace(/[^0-9]*/g, '');

    if (initialValue !== inputElement.value) {
      this.showErrorMessage('Only numbers are allowed.');
    } else {
      this.removeErrorMessage();
    }
  }

  private showErrorMessage(message: string) {
    let errorElement = this._el.nativeElement.nextSibling;
    
    if (!errorElement || errorElement.className !== 'error-message') {
      errorElement = this._renderer.createElement('span');
      this._renderer.addClass(errorElement, 'error-message');
      this._renderer.setStyle(errorElement, 'color', 'red');
      this._renderer.setStyle(errorElement, 'font-size', '12px');
      this._renderer.appendChild(this._el.nativeElement.parentNode, errorElement);
    }

    this._renderer.setProperty(errorElement, 'innerText', message);
  }

  private removeErrorMessage() {
    const errorElement = this._el.nativeElement.nextSibling;

    if (errorElement && errorElement.className === 'error-message') {
      this._renderer.removeChild(this._el.nativeElement.parentNode, errorElement);
    }
  }

}
