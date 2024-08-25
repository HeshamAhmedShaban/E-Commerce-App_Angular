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

    static descriptionValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value || '';
        const minLength =3 ;
        const maxLength = 500;

        if(value.length < minLength){
          return { minLength: { requiredLength: minLength, actualLength: value.length } };
        } else if(value.length > maxLength){
          return { maxLength: { requiredLength: maxLength, actualLength: value.length } };
        }
        return null;
      }
    }


    static slugValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value || '';
        // const slugPattern = /^[a-zA-Z0-9_.-]*$/;
        const slugPattern = /^[a-z0-9]+$/;
        return slugPattern.test(value) ? null : { patternValidator: true };
      }
    }

    static nameValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value || '';
        const minLength =2 ;
        const maxLength = 50; 

        if(value.length < minLength){
          return { minLength: { requiredLength: minLength, actualLength: value.length } };
        } else if(value.length > maxLength){
          return { maxLength: { requiredLength: maxLength, actualLength: value.length } };
        }
        return null;
      }
    }

    static heightValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value || '';
        const min = 50;
        const max = 210;
        if (value > max) {
          control.setValue(max);
        }
        if(value < min){
          return   {negativeValue: true}
        }
        const isValid = (value >= min && value <= max);
        return isValid ? null : { patternValidator: true };
      }
    }

    static weightValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value || '';
        const min = 20;
        const max = 250;
        if (value > max) {
          control.setValue(max);
        };
        if(value < min){
          return   {negativeValue: true}
        }
        const isValid = (value >= min && value <= max);
        return isValid ? null : { patternValidator: true };
      }
    }









































    // this code last in sportyanoWebCode
  //   // Validator for checking the required
  //   static required(): ValidatorFn {
  //     return (control:AbstractControl):ValidationErrors | null => {
  //         return control.value ? null : { required: true }
  //     }
  // }


  // // Validator for checking the arabicOnly
  // static arabicOnly(): ValidatorFn {
  //     return (control:AbstractControl):ValidationErrors | null => {
  //         const arabicRegex = /^[\u0600-\u06FF\s]+$/;
  //         if(control.value && !arabicRegex.test(control.value)){
  //             return { arabicOnly: true };
  //         }
  //         return null
  //     }
  // }


  // // Validator for checking the englishOnly
  // static englishOnly(): ValidatorFn {
  //     return (control: AbstractControl): ValidationErrors | null => {
  //       const value = control.value || '';
  //       const englishPattern = /^[A-Za-z\s]*$/;
    
  //       return !englishPattern.test(value) ? { englishOnly: true } : null;
  //     };
  //   }


  // // Validator for checking the minimum length
  //     static minLength(min: number): ValidatorFn {
  //     return (control: AbstractControl): ValidationErrors | null => {
  //     const value = control.value || '';
  //     return value.length < min ? { minLength: { requiredLength: min, actualLength: value.length } } : null;
  //     };
  // }

  //     // Validator for checking the maximum length
  //     static maxLength(max: number): ValidatorFn {
  //         return (control: AbstractControl): ValidationErrors | null => {
  //         const value = control.value || '';
  //         return value.length > max ? { maxLength: { requiredLength: max, actualLength: value.length } } : null;
  //         };
  //     }



  //   // Validator for checking the minimum value
  //   static minValue(min: number): ValidatorFn {
  //     return (control: AbstractControl): ValidationErrors | null => {
  //       const value = control.value;
  //       if (value === null || value === '') return null; // Don't validate if the field is empty
  //       return value < min ? { minValue: true } : null;
  //     };
  //   }


  //   // Validator for checking the maximum value
  //   static maxValue(max: number): ValidatorFn {
  //     return (control: AbstractControl): ValidationErrors | null => {
  //       const value = control.value;
  //       if (value === null || value === '') return null; // Don't validate if the field is empty
  //       return value > max ? { maxValue: true } : null;
  //     };
  //   }


  //     // Validator for checking the mobile number
  //     static egyptianMobileNumberValidation():ValidatorFn{
  //         return (control:AbstractControl):ValidationErrors | null => {
  //             const mobileRegex = /^(010|011|012|015)\d{8}$/;
  //             return control.value && mobileRegex.test(control.value) ? null : { mobileNumberValidation: true }
  //         }
  //     }

  //     static elevenDigitNumber(): ValidatorFn {
  //       return (control: AbstractControl): ValidationErrors | null => {
  //         const value = control.value || '';
  //         const isValid = /^\d{11}$/.test(value); 
  //         return isValid ? null : { elevenDigitNumber: true };
  //       };
  //     }

  //     // Validator for checking any pattern
  //     static patternValidator(pattern: RegExp, errorType: CustomValidationType): ValidatorFn {
  //         return (control: AbstractControl): ValidationErrors | null => {
  //           if (!control.value) {
  //             return null;
  //           }
  //           const isValid = pattern.test(control.value);
  //           return isValid ? null : {  customError: errorType };
  //         };
  //       }

  //       // Validator for checking the description
  //       static descriptionValidator(): ValidatorFn {
  //         return (control: AbstractControl): ValidationErrors | null => {
  //           const value = control.value || '';
  //           const minLength =3 ;
  //           const maxLength = 500;
    
  //           if(value.length < minLength){
  //             return { minLength: { requiredLength: minLength, actualLength: value.length } };
  //           } else if(value.length > maxLength){
  //             return { maxLength: { requiredLength: maxLength, actualLength: value.length } };
  //           }
  //           return null;
  //         }
  //       }
    
  //       // Validator for checking the slug
  //       static slugValidator(): ValidatorFn {
  //         return (control: AbstractControl): ValidationErrors | null => {
  //           const value = control.value || '';
  //           const slugPattern = /^[a-zA-Z0-9_.-]*$/;
  //           return slugPattern.test(value) ? null : { patternValidator: true };
  //         }
  //       }
        
  //       // Validator for checking the name
  //       static nameValidator(): ValidatorFn {
  //         return (control: AbstractControl): ValidationErrors | null => {
  //           const value = control.value || '';
  //           const minLength =2 ;
  //           const maxLength = 50; 
    
  //           if(value.length < minLength){
  //             return { minLength: { requiredLength: minLength, actualLength: value.length } };
  //           } else if(value.length > maxLength){
  //             return { maxLength: { requiredLength: maxLength, actualLength: value.length } };
  //           }
  //           return null;
  //         }
  //       }
        
  //       // Validator for checking the height
  //       static heightValidator(): ValidatorFn {
  //         return (control: AbstractControl): ValidationErrors | null => {
  //           const value = control.value || '';
  //           const min = 0;
  //           const max = 210;
  //           if (value > max) {
  //             control.setValue(max);
  //           }
  //           if(value < min){
  //             return   {negativeValue: true}
  //           }
  //           const isValid = (value >= min && value <= max);
  //           return isValid ? null : { patternValidator: true };
  //         }
  //       }

  //       // Validator for checking the weight
  //       static weightValidator(): ValidatorFn {
  //         return (control: AbstractControl): ValidationErrors | null => {
  //           const value = control.value || '';
  //           const min = 0;
  //           const max = 250;
  //           if (value > max) {
  //             control.setValue(max);
  //           };
  //           if(value < min){
  //             return   {negativeValue: true}
  //           }
  //           const isValid = (value >= min && value <= max);
  //           return isValid ? null : { patternValidator: true };
  //         }
  //       }


  }













