import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./component/product/product.component').then(m => m.ProductComponent), },

    { path: 'product', loadComponent: () => import('./component/product/product.component').then(m => m.ProductComponent),},
    
    { path: 'product/add', loadComponent: () => import('./component/addproduct/addproduct.component').then(m => m.AddproductComponent), },
   
    {  path: 'product/edit/:id', loadComponent: () => import('./component/addproduct/addproduct.component').then(m => m.AddproductComponent), },
];
