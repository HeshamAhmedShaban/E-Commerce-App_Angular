import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ContactUs } from '../../../core/models/contact-us.model';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from '../../../../../environment';
@Component({
  selector: 'app-contuctus',
  standalone: true,
  imports: [CommonModule,FormsModule,ConfirmPopupModule,ConfirmDialogModule,ToastModule,ButtonModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './contuctus.component.html',
  styleUrl: './contuctus.component.css'
})
export class ContuctusComponent {


  constructor(private confirmationService: ConfirmationService, private messageService: MessageService){}


  public contactFormModel:ContactUs = {
    from_name:'',
    to_name: "E-Commerce App",
    from_email:'heshamshaban0098@gmail.com',
    hobby:'',
    message:''
  };


async send(){
    console.log(this.contactFormModel)
    emailjs.init(environment.public_key) //Email/Your_PUBLIC_KEY__
    let message = await emailjs.send(environment.service_id, environment.template_id,{
        from_name: this.contactFormModel.from_name,
        to_name: "E-Commerce App",
        from_email: this.contactFormModel.from_email,
        hobby: this.contactFormModel.hobby,
        message: this.contactFormModel.message,
    });
};

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

public clearForm(){
  this.contactFormModel = {
    from_name:'',
    to_name: "E-Commerce APP",
    from_email:'',
    hobby:'',
    message:''
  }
}

public checkInputValidity(control: any, validations: { type: string, value: any }[]): void {
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
    }
  });

  control.control.setErrors(Object.keys(errors).length > 0 ? errors : null);
}


}
