import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './pages/admin/admin-categories/admin-categories.component';
import { Routing } from './core/enums/routing';
import { LandingComponent } from './pages/website/landing/landing.component';
import { CategoryProductsComponent } from './pages/website/category-products/category-products.component';
import { ProductsComponent } from './pages/website/products/products.component';
import { LoginUserComponent } from './pages/website/login-user/login-user.component';
import { RegisterUserComponent } from './pages/website/register-user/register-user.component';
import { UserCheckoutComponent } from './pages/website/user-checkout/user-checkout.component';
import { ReactiveFormComponent } from './pages/admin/reactive-form/reactive-form.component';
import { ContuctusComponent } from './pages/admin/contuctus/contuctus.component';

export const routes: Routes = [
  {path:Routing.Default,redirectTo:'allProducts',pathMatch:'full'},
  {path:Routing.adminLogin,component:LoginComponent,title:'Login'},
  {path:'',component:LandingComponent,title:'Shop',children:[
    {path:Routing.allProducts,component:ProductsComponent,title:'All Products'}  ,
    {path:'products/:id',component:CategoryProductsComponent,title:'Products Same Category'},
    {path:Routing.userLogin,component:LoginUserComponent,title:'Login'},
    {path:Routing.userRegister,component:RegisterUserComponent,title:'Register'},
    {path:Routing.checkOut,component:UserCheckoutComponent,title:'Checkout Your Order'},
  ]},
  {path:Routing.Default,component:LayoutComponent,children:[
    {path:Routing.adminProducts,component:AdminProductsComponent,title:'Products'},
    {path:Routing.adminCategories,component:AdminCategoriesComponent,title:'Categories'},
    {path:'reactive',component:ReactiveFormComponent,title:'Reactive Form'},
    {path:'contactus',component:ContuctusComponent,title:'Contact Us'},
  ]}
];
