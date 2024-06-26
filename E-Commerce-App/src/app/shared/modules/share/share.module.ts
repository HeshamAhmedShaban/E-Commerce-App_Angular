import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateInputDirective } from '../../directives/validation-form.directive';



@NgModule({
  declarations: [ValidateInputDirective],
  imports: [
    CommonModule
  ],
  exports:[ValidateInputDirective]
})
export class ShareModule { }
