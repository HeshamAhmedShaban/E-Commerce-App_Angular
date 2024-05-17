import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';

export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent,title:'Login'},
  {path:'',component:LayoutComponent,children:[
    {path:'products',component:AdminProductsComponent,title:'Products'}
  ]}
];
