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
            return arabicRegex.test(control.value) ? null : { arabicOnly: true }
        }
    }

    static englishOnly(): ValidatorFn {
        return (control:AbstractControl):ValidationErrors | null => {
            const englishRegex = /^[A-Za-z\s]+$/;
            return englishRegex.test(control.value) ? null : { englishOnly: true }
        }

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

    static maxLength(max: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const length = control.value ? control.value.length : 0;
          return length > max ? { maxLength: { requiredLength: max, actualLength: length } } : null;
        };
      }
    
      static minLength(min: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const length = control.value ? control.value.length : 0;
          return length < min ? { minLength: { requiredLength: min, actualLength: length } } : null;
        };
      }

    static mobileNumberValidation():ValidatorFn{
        return (control:AbstractControl):ValidationErrors | null => {
            const mobileRegex = /^(010|011|012|015)\d{8}$/;
            return control.value && mobileRegex.test(control.value) ? null : { mobileNumberValidation: true }
        }
    }


    }













