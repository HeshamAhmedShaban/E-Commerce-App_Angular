import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputNumbersLanguages]',
  standalone: true
})
export class InputNumbersLanguagesDirective {

  @Input('appInputNumbersLanguages') allowType!: 'arabic' | 'english' | 'numbers'| 'arabicWithNumbers' | 'englishWithNumbers';

  private _el = inject(ElementRef);
  private _renderer = inject(Renderer2);

  private _regexPatterns = {
    arabic: /^[\u0621-\u064A0-9\s]*$/,
    english: /^[A-Za-z\s]*$/,
    numbers: /^[0-9]*$/,
    arabicWithNumbers: /^[ء-ي0-9\s]*$/,
    englishWithNumbers: /^[a-zA-Z0-9\s]*$/
  };
  

  @HostListener('input', ['$event']) onInputChange() {
    const inputElement = this._el.nativeElement as HTMLInputElement;
    const initialValue = inputElement.value;

    const pattern = this._regexPatterns[this.allowType];
    inputElement.value = initialValue.split('').filter(char => pattern.test(char)).join('');

    if (initialValue !== inputElement.value) {
      this._showErrorMessage(`Only ${this._getAllowedTypeMessage()} characters are allowed.`);
    } else {
      this._removeErrorMessage();
    }
  }

  private _getAllowedTypeMessage(): string {
    switch (this.allowType) {
      case 'arabic':
        return 'Arabic letters';
      case 'english':
        return 'English letters';
      case 'numbers':
        return 'numbers';
      case 'arabicWithNumbers':
        return 'Arabic letters and numbers';
      case 'englishWithNumbers':
        return 'English letters and numbers';
      default:
        return '';
    }
  }

  private _showErrorMessage(message: string) {
    let errorElement = this._el.nativeElement.parentNode.querySelector('.error-message');

    if (!errorElement) {
      errorElement = this._renderer.createElement('span');
      this._renderer.addClass(errorElement, 'error-message');
      this._renderer.setStyle(errorElement, 'color', 'red');
      this._renderer.setStyle(errorElement, 'font-size', '12px');
      this._renderer.appendChild(this._el.nativeElement.parentNode, errorElement);
    }

    this._renderer.setProperty(errorElement, 'innerText', message);
  }

  private _removeErrorMessage() {
    const errorElement = this._el.nativeElement.parentNode.querySelector('.error-message');

    if (errorElement) {
      this._renderer.removeChild(this._el.nativeElement.parentNode, errorElement);
    }
  }
}
