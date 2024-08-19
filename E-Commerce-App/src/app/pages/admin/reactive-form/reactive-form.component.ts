import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminProductsComponent } from '../admin-products/admin-products.component';
import { CustomValidators } from '../../../shared/custom-validation-reactiveForm';
import { CustomValidationType } from '../../../core/enums/custom-validation-type';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent {

  public reactiveForm!:FormGroup;

  public CustomValidationType = CustomValidationType

  readonly _staticValue:string='ABCD/'

  @ViewChild(AdminProductsComponent)AdminProductsComponent!:AdminProductsComponent



constructor(private formbuilder:FormBuilder){
  this.reactiveForm=this.formbuilder.group({
    SKU: [this._staticValue, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    name:['', [CustomValidators.required(),CustomValidators.minLength(3),CustomValidators.maxLength(10),CustomValidators.englishOnly()]],
    shortname:['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    price:['',[CustomValidators.required(),CustomValidators.minValue(1),CustomValidators.maxValue(1000)]],
    category:[''],
    description:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    image:['',[CustomValidators.required(),CustomValidators.englishOnly()]],
    deleverytime:['',[Validators.required]],
    mobileNumber:['',[CustomValidators.required(),CustomValidators.mobileNumberValidation()]]
  })

}

public onSKUInput(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const userInput = inputElement.value.slice(this._staticValue.length);
  this.reactiveForm.get('SKU')!.setValue(this._staticValue + userInput, { emitEvent: false });
}

preventNonNumericInput(event: KeyboardEvent): void {
  const input = String.fromCharCode(event.keyCode);
  const inputt = event.target as HTMLInputElement;
  const maxLength = 11;
    if (!/^[0-9]$/.test(input)) {
      event.preventDefault();
    }
    if (inputt.value.length >= maxLength && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
}

get SKU() {
  return this.reactiveForm.get('SKU');
}


get name() {
  return this.reactiveForm.get('name');
}

get shortname() {
  return this.reactiveForm.get('shortname');
}

get price() {
  return this.reactiveForm.get('price')
}

get category() {
  return this.reactiveForm.get('category')
}

get description() {
  return this.reactiveForm.get('description')
}

get image() {
  return this.reactiveForm.get('image')
}

get deleverytime() {
  return this.reactiveForm.get('deleverytime')
}

get mobileNumber(){
  return this.reactiveForm.get('mobileNumber')
}


public submitForm(){
  console.log(this.reactiveForm.value)
}

public clearForm(){
  this.reactiveForm.reset();
}


public handleInput(event: any, fieldName: string): void {
    const input = event.target;
    let value = input.value;

    switch (fieldName) {
      case 'price':
        value = parseFloat(value);
        if (isNaN(value)) {
          value = 0;
        } else if (value > 1000) {
          value = 1000;
        } else if (value < 0) {
          value = 0;
        }
        input.value = value.toString();
        this.price!.setValue(value);
        break;
      case 'SKU':
        if (value.length > 10) {
          value = value.slice(0, 10);
        }
        input.value = value;
        this.SKU!.setValue(value);
        break;
      default:
        break;
    }
  }


  // public checkInputValidity(control: any, validations: { type: string, value: any }[]): void {
  //   const value = control.value;
  //   const errors: { [key: string]: boolean } = {};

  //   validations.forEach(validation => {
  //     switch (validation.type) {
  //       case 'required':
  //         if (!value || value === '0') {
  //           errors['required'] = true;
  //         }
  //         break;
  //       case 'minlength':
  //         if (value.length < validation.value) {
  //           errors['minlength'] = true;
  //         }
  //         break;
  //       case 'maxlength':
  //         if (value.length >= validation.value) {
  //           errors['maxlength'] = true;
  //           control.setValue(value.substring(0, validation.value));
  //         }
  //         break;
  //       case 'min':
  //         if (value < validation.value) {
  //           errors['min'] = true;
  //         }
  //         break;
  //         case 'max':
  //         if (value > validation.value) {
  //           errors['max'] = true;
  //           // Optional: Reset the value to the max limit if exceeded
  //           control.control.setValue(validation.value);
  //         }
  //         break;
  //       // Add more cases for other types of validations as needed
  //     }
  //   });

  //   control.control.setErrors(Object.keys(errors).length > 0 ? errors : null);
  // }

  // public checkInputValidity(control: any, validations: { type: string, value: any }[]): void {
  //   let value = control.value;
  //   let errors: { [key: string]: boolean } = {};

  //   validations.forEach(validation => {
  //     switch (validation.type) {
  //       case 'required':
  //         if (!value || value === '0') {
  //           errors['required'] = true;
  //         }
  //         break;
  //       case 'minlength':
  //         if (value.length < validation.value) {
  //           errors['minlength'] = true;
  //         }
  //         break;
  //       case 'maxlength':
  //         if (value.length >= validation.value) {
  //           errors['maxlength'] = true;
  //           control.control.setValue(value.substring(0, validation.value));
  //         }
  //         break;
  //       case 'min':
  //         if (value < validation.value) {
  //           errors['min'] = true;
  //         }
  //         break;
  //       case 'max':
  //         if (value > validation.value) {
  //           errors['max'] = true;
  //           control.control.setValue(validation.value);
  //         }
  //         break;
  //       // Add more cases for other types of validations as needed
  //     }
  //   });

  //   control.control.setErrors(Object.keys(errors).length > 0 ? errors : null);
  //   // Mark control as touched to display validation messages immediately
  //   control.control.markAsTouched();
  //   control.control.markAsDirty();
  // }

  public onInput(event: any, control: AbstractControl, validations: { type: string, value: any }[]): void {
    let value = event.target.value;

    validations.forEach(validation => {
      switch (validation.type) {
        case 'maxlength':
          if (value.length > validation.value) {
            value = value.substring(0, validation.value);
          }
          break;
        case 'min':
          if (parseFloat(value) < validation.value) {
            value = validation.value.toString();
          }
          break;
        case 'max':
          if (parseFloat(value) > validation.value) {
            value = validation.value.toString();
          }
          break;
        // Add more cases for other types of validations as needed
      }
    });

    event.target.value = value;
    control.setValue(value);
    this.checkInputValidity(control, validations);
  }

  public checkInputValidity(control: AbstractControl, validations: { type: string, value: any }[]): void {
    const value = control.value;
    const errors: { [key: string]: boolean } = {};

    validations.forEach(validation => {
      switch (validation.type) {
        case 'required':
          if (!value || value === '0') {
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
        // case 'max':
        //   if (value > validation.value) {
        //     errors['max'] = true;
        //   }
        //   break;
        case 'max':
          if (value >= validation.value) {
            errors['max'] = true;
        }
        break;
        // Add more cases for other types of validations as needed
      }
    });

    control.setErrors(Object.keys(errors).length > 0 ? errors : null);
    // Mark control as touched to display validation messages immediately
    control.markAsTouched();
    control.markAsDirty();
  }



}
