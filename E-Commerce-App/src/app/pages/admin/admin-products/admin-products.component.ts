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

  }


