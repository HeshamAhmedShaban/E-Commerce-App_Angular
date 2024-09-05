import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputNumbersLanguages]',
  standalone: true
})
export class InputNumbersLanguagesDirective {

  @Input('appInputNumbersLanguages') allowType!: 'arabic' | 'english' | 'numbers' | 'arabicWithNumbers' | 'englishWithNumbers' | 'arabicOrEnglish';

  private _el = inject(ElementRef);
  private _renderer = inject(Renderer2);

  private _regexPatterns = {
    arabic: /^[\u0621-\u064A0-9\s]*$/, // Arabic letters and numbers
    english: /^[A-Za-z\s]*$/, // English letters only
    numbers: /^[0-9]*$/, // Numbers only
    arabicWithNumbers: /^[ء-ي0-9\s]*$/, // Arabic letters and numbers
    englishWithNumbers: /^[a-zA-Z0-9\s]*$/, // English letters and numbers
    arabicOrEnglish: /^[\u0621-\u064AA-Za-z\s]*$/ // Arabic or English letters (but not mixed)
  };

  @HostListener('input', ['$event']) onInputChange() {
    const inputElement = this._el.nativeElement as HTMLInputElement;
    const initialValue = inputElement.value;

    // Get the regular expression based on the allowed type
    const pattern = this._regexPatterns[this.allowType];

    // Clean the input value by filtering characters based on the regex pattern
    inputElement.value = initialValue.split('').filter(char => pattern.test(char)).join('');

    if (initialValue !== inputElement.value) {
      this._showErrorMessage(`Only ${this._getAllowedTypeMessage()} characters are allowed.`);
    } else if (this.allowType === 'arabicOrEnglish' && !this._isSingleLanguage(inputElement.value)) {
      // Check if the input contains mixed languages for 'arabicOrEnglish'
      this._showErrorMessage('Please enter either Arabic or English, not both.');
    } else {
      this._removeErrorMessage();
    }
  }

  // Determine if the input contains either only Arabic or only English letters
  private _isSingleLanguage(value: string): boolean {
    const arabicRegex = /[\u0621-\u064A]/; // Arabic letters regex
    const englishRegex = /[A-Za-z]/; // English letters regex

    const containsArabic = arabicRegex.test(value);
    const containsEnglish = englishRegex.test(value);

    // Input is valid if it contains either only Arabic or only English, but not both
    return !(containsArabic && containsEnglish);
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
      case 'arabicOrEnglish':
        return 'Arabic or English letters';
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
