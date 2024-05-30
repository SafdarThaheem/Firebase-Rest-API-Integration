import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products/products.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },
  {
    path: 'category',
    loadComponent: () =>
      import('./category/category-list/category-list.component').then(
        (m) => m.CategoryListComponent
      ),
  },
  {
    path: 'supplier',
    loadComponent: () =>
      import('./suppliers/supplier-list/supplier-list.component').then(
        (m) => m.SupplierListComponent
      ),
  },
];
