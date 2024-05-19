import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { Icategory } from '../../../core/models/icategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {


  categoriesNameList: string[] = [];

  categoryList!:Icategory[]


  _productService=inject(ProductService)
  _categoryService=inject(CategoryService)
  router=inject(Router)

  ngOnInit(): void {
    this.getAllCategories()
    
  }

  public getAllCategories(){
    this._categoryService.getCategory()
    .subscribe((data: Icategory[]) => {
      this.categoryList = data;
      this.categoriesNameList = data.map((category: Icategory) => category.categoryName);
      console.log(this.categoriesNameList); // Logging to verify the data
    });
  }


  public getProductsByCategory(id:number){
    this.router.navigate(['/products',id])
  }
  }


