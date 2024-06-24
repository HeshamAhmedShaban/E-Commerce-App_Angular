import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Icategory } from '../../../core/models/icategory';
import { Iproduct } from '../../../core/models/iproduct';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {

isSidePanelVisable: boolean = false

updateMode:boolean=false

  productObj:Iproduct={
    productSku:'',
    productName:'',
    productPrice:0,
    productShortName:'',
    productDescription:'',
    createdDate:new Date(),
    deliveryTimeSpan:'',
    categoryId:0,
    productImageUrl:'',
  }
  categoryList!:Icategory[]
  productList!:Iproduct[]
  _productService=inject(ProductService)
  _categoryService=inject(CategoryService)

  ngOnInit(): void {
      this.getAllProducts()
      this.getAllCategories()
  }


  public getAllCategories(){
    this._categoryService.getCategory().subscribe({
      next:(data:any)=>{
        this.categoryList=data
      }
    })
  }

  public getAllProducts(){
    this._productService.getAllProducts().subscribe({
      next:(data:any)=>{
        this.productList=data
      }
    })
  }

  public createProduct(){
    this._productService.addProduct(this.productObj).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.getAllProducts();
        this.clearForm();
        alert('Product Added Successfully')
      },
      error:(err:any)=>{
        console.log(err);
        alert('Something went wrong')
      }
    })
  }

  public deleteProduct(id:string){
    this._productService.deleteProductt(id).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.getAllProducts()
      }
    })
  }

  public updateProduct(){
    this._productService.updateProductt(this.productObj).subscribe({
      next:()=>{
        this.updateMode=false;
        this.getAllProducts();
        this.clearForm();
        this.isSidePanelVisable=false;
      }
    })
  }


  public updateButton(id:string){
    this.isSidePanelVisable=true;
    const selectProduct=this.productList.filter(product=>product.id === id)
    this.updateMode=true
    this.productObj.id=selectProduct[0].id;
    this.productObj.productSku=selectProduct[0].productSku;
    this.productObj.productName=selectProduct[0].productName;
    this.productObj.productPrice=selectProduct[0].productPrice;
    this.productObj.productShortName=selectProduct[0].productShortName;
    this.productObj.productDescription=selectProduct[0].productDescription;
    this.productObj.createdDate=selectProduct[0].createdDate;
    this.productObj.deliveryTimeSpan=selectProduct[0].deliveryTimeSpan;
    this.productObj.categoryId=selectProduct[0].categoryId;
    this.productObj.productImageUrl=selectProduct[0].productImageUrl;
  }


  public clearForm(){
    this.productObj={
      productSku:'',
      productName:'',
      productPrice:0,
      productShortName:'',
      productDescription:'',
      createdDate:new Date(),
      deliveryTimeSpan:'',
      categoryId:0,
      productImageUrl:'',
    }
  }

  // public checkInputValidity(control: any): void {
  //   const value = control.value;
  //   const errors: { [key: string]: boolean } = {}; // Explicitly define the keys as strings

  //   if (!value || value.trim().length === 0) {
  //     errors['required'] = true;
  //   }
  //   if (value.length < 10) {
  //     errors['minlength'] = true;
  //   }
  //   if (value.length >=20) {
  //     errors['maxlength'] = true;
  //   }
  //   control.control.setErrors(Object.keys(errors).length > 0 ? errors : null);
  // }

  // checkInputValidity(control: any): void {
  //   const value = control.value;
  //   const validations = [
  //     { field: 'required', length: 0 },
  //     { field: 'minlength', length: 10 },
  //     { field: 'maxlength', length: 20 }
  //     // Add more validations as needed
  //   ];
  //   const errors: { [key: string]: boolean } = {};

  //   validations.forEach(validation => {
  //     if (validation.field === 'required' && (!value || value.trim().length === 0)) {
  //       errors['required'] = true;
  //     } else if (validation.field === 'minlength' && value.length <= validation.length) {
  //       errors['minlength'] = true;
  //     } else if (validation.field === 'maxlength' && value.length >= validation.length) {
  //       errors['maxlength'] = true;
  //     }
  //   });

  //   control.control.setErrors(Object.keys(errors).length > 0 ? errors : null);
  // }

  // checkInputValidity(control: any, validations: { type: string, value: any }[]): void {
  //   const value = control.value;
  //   const errors: { [key: string]: boolean } = {};

  //   validations.forEach(validation => {
  //     switch (validation.type) {
  //       case 'required':
  //         if (!value || value.trim().length === 0) {
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
  //         }
  //         break;
  //       case 'min':
  //         if (value < validation.value) {
  //           errors['min'] = true;
  //         }
  //         break;
  //       case 'max':
  //         if(value > validation.value) {
  //           errors['max'] = true;
  //         }
  //         break;
  //       // Add more cases for other types of validations as needed
  //     }
  //   });

  //   control.control.setErrors(Object.keys(errors).length > 0 ? errors : null);
  // }

  checkInputValidity(control: any, validations: { type: string, value: any }[]): void {
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
          case 'max':
          if (value > validation.value) {
            errors['max'] = true;
            // Optional: Reset the value to the max limit if exceeded
            control.control.setValue(validation.value);
          }
          break;
        // Add more cases for other types of validations as needed
      }
    });

    control.control.setErrors(Object.keys(errors).length > 0 ? errors : null);
  }



  }


