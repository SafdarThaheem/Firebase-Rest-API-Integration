import { Component } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../shared/models/product';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    MenuModule,
    CommonModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  visible: boolean = false;
  productList: Product[] = [];
  productForm!: FormGroup;
  selectedProduct!: Product;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.initProductForm();
    this.getAllProducts();
    // console.log(this.productList);
  }

  columns = [
    { field: 'name', header: 'Name' },
    { field: 'imgUrl', header: 'Image' },
    { field: 'orderAmount', header: 'Order Amount' },
    { field: 'price', header: 'Price' },
    { field: 'stockAmount', header: 'Stock' },
  ];

  editFormFields = [
    { id: 'name', label: 'Name', name: 'name' },
    { id: 'orderAmount', label: 'Order Amount', name: 'orderAmount' },
    { id: 'price', label: 'Price', name: 'price' },
    { id: 'stock', label: 'Stock', name: 'stock' },
  ];

  initProductForm() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      orderAmount: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
    });
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe((response: Product[]) => {
      this.productList = response;
    });
  }

  onUpdate() {
    let updatedProductObject: Product;
    updatedProductObject = {
      ...this.selectedProduct,
      ...this.productForm.value,
    };
    this.productsService.updateProducts(updatedProductObject).subscribe({
      next: () => {
        this.visible = false;
        this.getAllProducts();
      },
      error: () => {
        this.visible = true;
      },
    });
  }

  onDelete(product: Product): void {
    this.productsService.deleteProduct(product).subscribe({
      next: () => {
        this.visible = false;
        this.getAllProducts();
      },
      error: () => {
        this.visible = true;
      },
    });
  }

  showDialog(selectedProduct: Product) {
    this.visible = true;
    this.selectedProduct = selectedProduct; // Store the selected product
    console.log(selectedProduct);
    this.productForm.patchValue({
      name: selectedProduct.name,
      orderAmount: selectedProduct.orderAmount,
      price: selectedProduct.price,
      stock: selectedProduct.stockAmount,
    });
  }

  reload() {
    console.log('reload');
    this.getAllProducts();
  }
}
