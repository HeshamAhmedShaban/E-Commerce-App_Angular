import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ContactUs } from '../../../core/models/contact-us.model';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from '../../../../../environment';
import { inject } from '@angular/core/testing';
@Component({
  selector: 'app-contuctus',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,ConfirmPopupModule,ConfirmDialogModule,ToastModule,ButtonModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './contuctus.component.html',
  styleUrl: './contuctus.component.css'
})
export class ContuctusComponent {


  public contactForm!:FormGroup;

  constructor(private formbuilder:FormBuilder,private confirmationService: ConfirmationService, private messageService: MessageService){
    this.contactForm=this.formbuilder.group({
      from_name:['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      from_email:['heshamshaban0098@gmail.com', [Validators.required]],
      hobby:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      message:['',[Validators.required,Validators.minLength(10),Validators.maxLength(50)]]

    })
  }

  public contactFormModel:ContactUs = {
    from_name:'',
    to_name: "E-Commerce App",
    from_email:'heshamshaban0098@gmail.com',
    hobby:'',
    message:''
  };



// SendTemplate DrivenForm
// async send(){
//     console.log(this.contactFormModel)
//     emailjs.init(environment.public_key) //Email/Your_PUBLIC_KEY__
//     let message = await emailjs.send(environment.service_id, environment.template_id,{
//         from_name: this.contactFormModel.from_name,
//         to_name: "E-Commerce App",
//         from_email: this.contactFormModel.from_email,
//         hobby: this.contactFormModel.hobby,
//         message: this.contactFormModel.message,
//     });
// };

async send(){
console.log(this.contactForm.value);
emailjs.init(environment.public_key) //Email/Your_PUBLIC_KEY__
let message = await emailjs.send(environment.service_id, environment.template_id,{
  from_name: this.contactForm.value.from_name,
  to_name: "E-Commerce App",
  from_email: this.contactForm.value.from_email,
  hobby: this.contactForm.value.hobby,
  message: this.contactForm.value.message,
});
}

public confirm() {
  this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed Your Feedback.',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Your Description has been submitted', life: 3000 });
          console.log(this.contactFormModel);
          this.send();
          this.clearForm();

      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });
}
// Clear Template Driven Form
// public clearForm(){
//   this.contactFormModel = {
//     from_name:'',
//     to_name: "E-Commerce APP",
//     from_email:'',
//     hobby:'',
//     message:''
//   }
// }


public clearForm(){
  this.contactForm.reset();
}


// Validations in Template DrivenForm
// public checkInputValidity(control: any, validations: { type: string, value: any }[]): void {
//   const value = control.value;
//   const errors: { [key: string]: boolean } = {};

//   validations.forEach(validation => {
//     switch (validation.type) {
//       case 'required':
//       if (!value || value === '0') {
//         errors['required'] = true;
//       }
//       break;
//       case 'minlength':
//       if (value.length < validation.value) {
//         errors['minlength'] = true;
//       }
//       break;
//       case 'maxlength':
//       if (value.length >= validation.value) {
//         errors['maxlength'] = true;
//       }
//       break;
//     }
//   });

//   control.control.setErrors(Object.keys(errors).length > 0 ? errors : null);
// }


onInput(event: any, control: AbstractControl, validations: { type: string, value: any }[]): void {
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
