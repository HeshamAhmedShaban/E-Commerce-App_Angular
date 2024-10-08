import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"


export class ValidationMethods {


    static required(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return control.value ? null : { required: true };
        }
    }


    static minMaxLengthValidation(min: number, max: number): (control: AbstractControl) => ValidationErrors | null {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value || '';
            const actualLength = value.length;
            const isValid = actualLength >= min && actualLength <= max;

            return isValid ? null : { patternValidator: { actualLength } };
        };
    }
    
    static minMaxValueValidation(min: number, max: number): (control: AbstractControl) => ValidationErrors | null {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            
            // If the control is empty or null, we return null (no error) because required validation should handle this case
            if (value === null || value === undefined || value === '') {
                return null;
            }
    
            const numericValue = Number(value);
    
            // Ensure that we don't replace valid "0" with "0" due to falsy check
            if (numericValue > max) {
                control.setValue(max);
            }
    
            const isValid = numericValue >= min && numericValue <= max;
    
            return isValid ? null : { patternValidator: { actualLength: numericValue } };
        };
    }


    static patternValidation(pattern: RegExp): (control: AbstractControl) => ValidationErrors | null {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value || '';
            const isValid = pattern.test(value);
            return isValid ? null : { patternValidator: true };
        };
    }


    static englishOrArabicOnly(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value || '';
            
            const arabicRegex = /^[\u0621-\u064A\u0660-\u0669]+$/;
            const englishRegex = /^[a-zA-Z]+$/;
            const hasNumbers = /\d/.test(value);
            if (hasNumbers) {
                return { containsNumbers: true };
            }

            if (arabicRegex.test(value)) {
                return arabicRegex.test(value) ? null : { languageMismatch: true };
            }

            if (englishRegex.test(value)) {
                return englishRegex.test(value) ? null : { languageMismatch: true };
            }

            return { languageMismatch: true };
        };
    
    }


    

}