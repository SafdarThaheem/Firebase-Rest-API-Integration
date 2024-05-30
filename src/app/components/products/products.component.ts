import { Component } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../shared/models/product';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    MenuModule,
    CommonModule,
    ToastModule,
  ],
  providers: [DialogService, MessageService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  public productList: Product[] = [];
  public productForm!: FormGroup;
  public selectedProduct!: Product;

  private ref: DynamicDialogRef | undefined;

  constructor(
    private productsService: ProductsService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  // Dynamic Dialog
  productFormOpen(action: string, selectedProduct?: Product) {
    this.ref = this.dialogService.open(ProductFormComponent, {
      header: `${action} Product`,
      width: '50%',
      data: { product: selectedProduct, action: action },
    });

    this.ref.onClose.subscribe((result) => {
      if (result?.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${result.action} product successfully`,
        });
        this.getAllProducts();
      }
    });
  }

  // table header
  tableHeader = [
    { field: 'name', title: 'Name' },
    { field: 'imgUrl', title: 'Image' },
    { field: 'orderAmount', title: 'Order Amount' },
    { field: 'price', title: 'Price' },
    { field: 'stockAmount', title: 'Stock' },
    { field: 'action', title: 'Action' },
  ];

  // Fetch All Products
  getAllProducts() {
    this.productsService.getProducts().subscribe((response: Product[]) => {
      if (response) {
        this.productList = response;
      }
    });
  }
}
