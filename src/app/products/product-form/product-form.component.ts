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
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { SuppliersService } from '../../shared/services/suppliers.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { Isupplier } from '../../shared/models/isupplier';
import { Icategory } from '../../shared/models/icategory';
import { DropdownModule } from 'primeng/dropdown';
import { actions } from '../../shared/enum/actions.enum';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MessagesModule,
    ProgressSpinnerModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  public ProductForm!: FormGroup;
  public action: string = '';
  public actionState = actions;
  public messages!: Message[];
  public isLoading: boolean = false;
  public suppliersList: Isupplier[] = [];
  public categoriesList: Icategory[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private categoryService: CategoriesService,
    private supplierService: SuppliersService
  ) {}

  ngOnInit(): void {
    this.getSuppliers();
    this.getCategories();
    this.initiateForm();
    this.action = this.config.data?.action;
    if (this.action != this.actionState.add) {
      this.ProductForm.patchValue(this.config.data?.product);
    }
    if (this.action === this.actionState.delete) {
      this.messages = [
        { severity: 'error', detail: 'Are you sure Delete this Product' },
      ];
      this.ProductForm.disable();
    }
  }

  // Reactive form data
  formFields = [
    { id: 'name', label: 'Name', name: 'name' },
    { id: 'imgUrl', label: 'Image URL', name: 'imgUrl' },
    { id: 'price', label: 'Price', name: 'price' },
    { id: 'orderAmount', label: 'Order Amount', name: 'orderAmount' },
    { id: 'stockAmount', label: 'Stock', name: 'stockAmount' },
    { id: 'categories', label: 'Category', name: 'categoryId' },
    { id: 'suppliers', label: 'Supplier', name: 'supplierId' },
  ];

  //  Initiate Reactive Form Group and controls
  initiateForm() {
    this.ProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imgUrl: new FormControl(''),
      price: new FormControl('', Validators.required),
      orderAmount: new FormControl('', Validators.required),
      stockAmount: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      supplierId: new FormControl('', Validators.required),
    });
  }

  // Product Form controls
  onProductFormControls() {
    if (this.action === this.actionState.add) {
      this.onAddProduct();
    }
    if (this.action === this.actionState.edit) {
      this.onUpdate();
    }
    if (this.action === this.actionState.delete) {
      this.onDelete();
    }
  }

  // Add New Product
  onAddProduct() {
    if (this.ProductForm.valid) {
      this.isLoading = true;
      this.productService.addProduct(this.ProductForm.value).subscribe({
        next: () => {
          this.ProductForm.reset();
          this.ref.close({ success: true, action: this.actionState.add });
        },
        error: () => {
          this.isLoading = false;
          this.ref.close({ success: false });
        },
      });
    }
  }

  // Update Product
  onUpdate(): void {
    this.isLoading = true;
    this.productService.updateProducts(this.ProductForm.value).subscribe({
      next: () => {
        this.ProductForm.reset();
        this.ref.close({ success: true, action: this.actionState.edit });
      },
      error: () => {
        this.isLoading = false;
        this.ref.close({ success: false });
      },
    });
  }

  // Delete Product
  onDelete(): void {
    this.isLoading = true;
    this.productService.deleteProduct(this.ProductForm.value).subscribe({
      next: () => {
        this.ref.close({ success: true, action: this.actionState.delete });
      },
      error: () => {
        // handle error
        this.isLoading = false;
        this.ref.close({ success: false });
      },
    });
  }

  // Get Categories
  getCategories(): void {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categoriesList = res;
    });
  }

  // Get Suppliers
  getSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe((res) => {
      this.suppliersList = res;
    });
  }
}
