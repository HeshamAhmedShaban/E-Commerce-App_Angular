import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export class CustomValidators  {


    static required(): ValidatorFn {
        return (control:AbstractControl):ValidationErrors | null => {
            return control.value ? null : { required: true }
        }
    }

    static arabicOnly(): ValidatorFn {
        return (control:AbstractControl):ValidationErrors | null => {
            const arabicRegex = /^[\u0600-\u06FF\s]+$/;
            if(control.value && !arabicRegex.test(control.value)){
                return { arabicOnly: true };
            }
            return null
        }
    }

    // static englishOnly(): ValidatorFn {
    //     return (control: AbstractControl): ValidationErrors | null => {
    //       const englishRegex = /^[A-Za-z0-9\s]*$/;
    //       if (control.value && !englishRegex.test(control.value)) {
    //         return { englishOnly: true };
    //       }
    //       return null;
    //     };
    //   }
    static englishOnly(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value || '';
          const englishPattern = /^[A-Za-z\s]*$/;
      
          return !englishPattern.test(value) ? { englishOnly: true } : null;
        };
      }

    static _numberMessage():string {
        return "Only numbers allowed"
    }

    static numberOnly():ValidatorFn {
        return (control:AbstractControl):ValidationErrors | null => {
            const numberRegex = /^[0-9]*$/;
            if(control.value === String){
                this._numberMessage()
            }
            return numberRegex.test(control.value) ? null : { numberOnly: true }
    }
}

    // static maxLength(max: number): ValidatorFn {
    //     return (control: AbstractControl): ValidationErrors | null => {
    //       return control.value && control.value.length > max ? { maxLength: { requiredLength: max, actualLength: control.value.length } } : null;
    //     };
    // }

    // static minLength(min: number): ValidatorFn {
    //     return (control: AbstractControl): ValidationErrors | null => {
    //       return control.value && control.value.length < min ? { minLength: { requiredLength: min, actualLength: control.value.length } } : null;
    //     };
    // }

    static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      return value.length < min ? { minLength: { requiredLength: min, actualLength: value.length } } : null;
    };
  }

  // Validator for checking the maximum length
  static maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      return value.length > max ? { maxLength: { requiredLength: max, actualLength: value.length } } : null;
    };
  }


      static minValue(min: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          if (value === null || value === '') return null; // Don't validate if the field is empty
          return value < min ? { minValue: true } : null;
        //   return value !== null && value < min ? { minValue: true } : null;
        };
      }
    
      static maxValue(max: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          if (value === null || value === '') return null; // Don't validate if the field is empty
          return value > max ? { maxValue: true } : null;
        //   return value !== null && value > max ? { maxValue: true } : null;
        };
      }

    static mobileNumberValidation():ValidatorFn{
        return (control:AbstractControl):ValidationErrors | null => {
            const mobileRegex = /^(010|011|012|015)\d{8}$/;
            return control.value && mobileRegex.test(control.value) ? null : { mobileNumberValidation: true }
        }
    }

    // Validator for checking any pattern
    static patternValidator(pattern: RegExp, errorKey: string): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
          return null;
        }
        const isValid = pattern.test(control.value);
        return isValid ? null : { [errorKey]: true };
      };
    }


  }













