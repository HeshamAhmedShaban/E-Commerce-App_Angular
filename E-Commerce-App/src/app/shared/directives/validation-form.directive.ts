import { Directive, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appValidateInput]'
})
export class ValidateInputDirective {
  @Input('appValidateInput') validations: { type: string, value: any }[] = [];

  constructor(private ngControl: NgControl) {}

  @HostListener('input') onInputChange() {
    this.checkInputValidity();
  }

  private checkInputValidity() {
    const control = this.ngControl.control;
    if (!control) return;

    const value = control.value;
    const errors: { [key: string]: boolean } = {};

    this.validations.forEach(validation => {
      switch (validation.type) {
        case 'required':
          if (!value) {
            errors['required'] = true;
          }
          break;
        case 'minlength':
          if (value.length < validation.value) {
            errors['minlength'] = true;
          }
          break;
        case 'maxlength':
          if (value.length >= validation.value) {
            errors['maxlength'] = true;
          }
          break;
        case 'min':
          if (value < validation.value) {
            errors['min'] = true;
          }
          break;
        case 'max':
          if (value > validation.value) {
            errors['max'] = true;
            control.setValue(validation.value);
          }
          break;
      }
    });

    control.setErrors(Object.keys(errors).length > 0 ? errors : null);
  }
}
