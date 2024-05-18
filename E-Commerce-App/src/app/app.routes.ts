import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './pages/admin/admin-categories/admin-categories.component';
import { Routing } from './core/enums/routing';
import { LandingComponent } from './pages/website/landing/landing.component';

export const routes: Routes = [
  {path:Routing.Default,redirectTo:'shop',pathMatch:'full'},
  {path:Routing.Login,component:LoginComponent,title:'Login'},
  {path:'shop',component:LandingComponent,title:'Shop'},
  {path:Routing.Default,component:LayoutComponent,children:[
    {path:Routing.Products,component:AdminProductsComponent,title:'Products'},
    {path:Routing.Categories,component:AdminCategoriesComponent,title:'Categories'},
  ]}
];
