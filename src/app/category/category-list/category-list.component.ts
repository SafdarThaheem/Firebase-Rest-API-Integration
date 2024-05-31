import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { Icategory } from '../../shared/models/icategory';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    ListboxModule,
    FormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  categoryList!: Icategory[];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.fetchCategoryList();
  }

  fetchCategoryList() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categoryList = res;
    });
  }
}
