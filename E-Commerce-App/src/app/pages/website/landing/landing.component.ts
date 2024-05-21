import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Icategory } from '../../../core/models/icategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {


  public categoriesNameList: string[] = [];

  public categoryList!:Icategory[]

  private _categoryService=inject(CategoryService)
  private router=inject(Router)

  ngOnInit(): void {
    this.getAllCategories()
    
  }

  public getAllCategories(){
    this._categoryService.getCategory()
    .subscribe((data: Icategory[]) => {
      this.categoryList = data;
      this.categoriesNameList = data.map((category: Icategory) => category.categoryName);
      // console.log(this.categoriesNameList); 
    });
  }


  public getProductsByCategory(id:number){
    this.router.navigate(['/products',id])
  }

  public regisetPage(){
    this.router.navigateByUrl('/register_user')
  }
  public loginPage(){
    this.router.navigateByUrl('/login_user')
  }
  }


