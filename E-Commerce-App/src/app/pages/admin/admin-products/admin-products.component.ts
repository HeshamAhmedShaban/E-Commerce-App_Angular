import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Icategory } from '../../../core/models/icategory';
import { Iproduct } from '../../../core/models/iproduct';
import { CategoryService } from '../../../core/services/category.service';
import { ShareModule } from '../../../shared/modules/share/share.module';
import { Subject, takeUntil } from 'rxjs';
import zxcvbn from 'zxcvbn';
@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [FormsModule,CommonModule,ShareModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit,OnDestroy {

public isSidePanelVisable: boolean = false

public updateMode:boolean=false

private _subject$:Subject<boolean>=new Subject<boolean>()


public $signal = signal<boolean>(false);


  public productObj:Iproduct={
    productSku:'',
    productName:'',
    productPrice:0,
    productShortName:'',
    productDescription:'',
    createdDate:new Date(),
    deliveryTimeSpan:'',
    categoryId:0,
    productImageUrl:'',
    password:''
  }


  // 
  passwordStrength: any = {};
  passwordScore: number = 0;
  feedback: string[] = [];
  // 
  public categoryList!:Icategory[]
  public productList!:Iproduct[]
  private _productService=inject(ProductService)
  private _categoryService=inject(CategoryService)

  ngOnInit(): void {
      this.getAllProducts();
      this.getAllCategories();
      this.$signal.set(true);
      this.$signal.update((value) => !value);

      effect(() => {
        console.log(this.$signal());
      });

      const $newSignal = computed(() => {
        return this.$signal();
      });

      console.log($newSignal());
      
  }


  onPasswordInput() {
    if (this.productObj.password) {
      const result = zxcvbn(this.productObj.password);
      this.passwordStrength = result;
      this.passwordScore = result.score;
      this.feedback = result.feedback.suggestions;
      result
    } else {
      this.passwordStrength = {};
      this.passwordScore = 0;
      this.feedback = [];
    }
  }








  public getAllCategories(){
    this._categoryService.getCategory().pipe(
      takeUntil(this._subject$)
    ).subscribe({
      next:(data:any)=>{
        this.categoryList=data
      }
    })
  }

  public getAllProducts(){
    this._productService.getAllProducts().pipe(takeUntil(this._subject$)).subscribe({
      next:(data:any)=>{
        this.productList=data
      }
    })
  }

  public createProduct(){
    this._productService.addProduct(this.productObj).pipe(takeUntil(this._subject$)).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.getAllProducts();
        this.clearForm();
        alert('Product Added Successfully')
      },
      error:(err:any)=>{
        alert('Something went wrong')
      }
    })
  }

  public deleteProduct(id:string){
    this._productService.deleteProductt(id).pipe(takeUntil(this._subject$)).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.getAllProducts()
      }
    })
  }

  public updateProduct(){
    this._productService.updateProductt(this.productObj).pipe(takeUntil(this._subject$)).subscribe({
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
      password:''
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

  ngOnDestroy(): void {
    this._subject$.next(true);
    this._subject$.complete();
  }

  }


