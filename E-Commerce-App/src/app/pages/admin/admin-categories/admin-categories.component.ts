import { Component, inject, OnInit } from '@angular/core';
import { Icategory } from '../../../core/models/icategory';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { Observable } from 'rxjs';
import { Iproduct } from '../../../core/models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
}) 
export class AdminCategoriesComponent implements OnInit {


  categoryList:Icategory[]=[]

  categorys$!:Observable<any>

  _productService=inject(ProductService)
  _categorySerice=inject(CategoryService)

  ngOnInit(): void {
    this.categorys$=this._categorySerice.getCategory()
  }


  public deleteCategory(id:string){
    this._categorySerice.deleteCategoryy(id).subscribe(()=>{
      this.categorys$=this._categorySerice.getCategory();
    })
  }


}
