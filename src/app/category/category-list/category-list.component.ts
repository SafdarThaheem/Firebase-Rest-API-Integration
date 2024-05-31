import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { Icategory } from '../../shared/models/icategory';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    ListboxModule,
    FormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    ToastModule,
  ],
  providers: [DialogService, MessageService],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  categoryList!: Icategory[];
  private ref: DynamicDialogRef | undefined;

  constructor(
    private categoryService: CategoriesService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchCategoryList();
  }

  // Dynamic Dialog
  categoryFormOpen(action: string, selectedCategory?: Icategory): void {
    this.ref = this.dialogService.open(CategoryFormComponent, {
      header: `${action} Category`,
      width: '50%',
      data: { category: selectedCategory, action: action },
    });

    this.ref.onClose.subscribe((result) => {
      if (result?.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${result.action} Category successfully`,
        });
        this.fetchCategoryList();
      }
    });
  }

  fetchCategoryList() {
    this.categoryService.getAllCategories().subscribe((res) => {
      if (res) {
        this.categoryList = res;
      }
    });
  }
}
