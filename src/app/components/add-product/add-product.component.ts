import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  public addNewProductForm!: FormGroup;
  ngOnInit(): void {
    this.initiateForm();
  }

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  formFields = [
    { id: 'name', label: 'Name', name: 'name' },
    { id: 'imgUrl', label: 'Image URL', name: 'imgUrl' },
    { id: 'price', label: 'Price', name: 'price' },
    { id: 'orderAmount', label: 'Order Amount', name: 'orderAmount' },
    { id: 'stockAmount', label: 'Stock', name: 'stockAmount' },
    { id: 'categoryId', label: 'Category', name: 'categoryId' },
    { id: 'supplierId', label: 'Supplier', name: 'supplierId' },
  ];

  initiateForm() {
    this.addNewProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      orderAmount: new FormControl('', Validators.required),
      stockAmount: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      supplierId: new FormControl('', Validators.required),
    });
  }

  onAddProduct() {
    console.log(this.addNewProductForm.value);
    this.productService.addProduct(this.addNewProductForm.value).subscribe({
      next: () => {
        console.log('Product added successfully');
        this.addNewProductForm.reset();
        this.router.navigate(['/']);
      },
      error: () => {
        console.log('Error while adding product');
      },
    });
  }
}
