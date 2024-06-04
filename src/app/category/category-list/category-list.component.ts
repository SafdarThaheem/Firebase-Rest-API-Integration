import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Icategory } from '../../shared/models/icategory';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { SearchComponent } from '../../search/search.component';
import { Subscription } from 'rxjs';

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
    SearchComponent,
  ],
  providers: [DialogService, MessageService],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit, OnDestroy {
  public categoryList!: Icategory[];
  private ref: DynamicDialogRef | undefined;
  public categorySubscriptions!: Subscription;

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
    this.categorySubscriptions = this.categoryService
      .getAllCategories()
      .subscribe((res) => {
        if (res) {
          this.categoryList = res;
        }
      });
  }

  onSearch(searchValue: string) {
    if (searchValue === '') {
      this.fetchCategoryList();
      return;
    } else {
      this.categoryList = this.categoryList.filter((category) =>
        category.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }

  ngOnDestroy(): void {
    this.categorySubscriptions.unsubscribe();
  }
}
