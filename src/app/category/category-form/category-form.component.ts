import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnInit {
  categoryTable!: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  initCategoryForm() {
    this.categoryTable = new FormGroup({
      name: new FormControl(''),
    });
  }
}
