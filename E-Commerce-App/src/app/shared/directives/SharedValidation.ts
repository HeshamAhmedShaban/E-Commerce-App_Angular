import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"


export class ValidationMethods {


    static required(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return control.value ? null : { required: true };
        }
    }


    static textNumberValidation(min: number, max: number): (control: AbstractControl) => ValidationErrors | null {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value || '';
            const actualLength = value.length;
            const isValid = actualLength >= min && actualLength <= max;

            return isValid ? null : { patternValidator: { actualLength } };
        };
    }


    static patternValidation(pattern: RegExp): (control: AbstractControl) => ValidationErrors | null {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value || '';
            const isValid = pattern.test(value);
            return isValid ? null : { patternValidator: true };
        };
    }


    

}