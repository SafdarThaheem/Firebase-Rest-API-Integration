import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Message } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    CommonModule,
    MessagesModule,
    ToastModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnInit {
  public categoryForm!: FormGroup;
  public action: string = '';
  public isLoading: boolean = false;
  public messages!: Message[];

  constructor(
    private categoryService: CategoriesService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.initCategoryForm();
    this.action = this.config.data?.action;
    console.log(this.config.data?.category);
    if (this.action != 'Add') {
      this.categoryForm.patchValue(this.config.data?.category);
    }
    if (this.action === 'Delete') {
      this.messages = [
        { severity: 'error', detail: 'Are you sure Delete Category' },
      ];
      this.categoryForm.disable();
    }
  }

  initCategoryForm() {
    this.categoryForm = new FormGroup({
      // categoryId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  }

  onCategoryFormControls() {
    if (this.action === 'Add') {
      this.onAddCategory();
    }
    if (this.action === 'Edit') {
      this.onUpdateCategory();
    }
    if (this.action === 'Delete') {
      this.onDeleteCategory();
    }
  }

  // add new category
  onAddCategory() {
    console.log(this.categoryForm.value);
    if (this.categoryForm.valid) {
      this.isLoading = true;
      this.categoryService
        .addNewCategory(this.categoryForm.value)
        .subscribe((result) => {
          this.isLoading = false;
          this.ref.close({ success: true, action: 'Add' });
        });
    }
  }

  // update category
  onUpdateCategory() {
    console.log(this.categoryForm.value);
    if (this.categoryForm.valid) {
      this.isLoading = true;
      this.categoryService
        .updateCategory(this.categoryForm.value)
        .subscribe((result) => {
          this.isLoading = false;
          this.ref.close({ success: true, action: 'Edit' });
        });
    }
  }

  // delete category
  onDeleteCategory() {
    console.log(this.categoryForm.value);
    this.isLoading = true;
    this.categoryService
      .deleteCategory(this.config.data?.category)
      .subscribe((result) => {
        this.isLoading = false;
        this.ref.close({ success: true, action: 'Delete' });
      });
  }
}
