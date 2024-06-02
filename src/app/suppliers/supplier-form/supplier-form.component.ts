import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Message } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SuppliersService } from '../../shared/services/suppliers.service';
import { Isupplier } from '../../shared/models/isupplier';
import { config } from 'process';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    CommonModule,
    MessagesModule,
    ToastModule,
    InputTextModule,
  ],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.scss',
})
export class SupplierFormComponent implements OnInit {
  public supplierForm!: FormGroup;
  public action: string = '';
  public isLoading: boolean = false;
  public messages!: Message[];

  constructor(
    private supplierService: SuppliersService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.initSupplierForm();
    this.action = this.config.data?.action;
    if (this.action != 'Add') {
      this.supplierForm.patchValue(this.config.data?.supplier);
    }
    if (this.action === 'Delete') {
      this.messages = [
        { severity: 'error', detail: 'Are you sure Delete Supplier' },
      ];
      this.supplierForm.disable();
    }
  }

  initSupplierForm() {
    this.supplierForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  onSupplierFormControls() {
    if (this.action === 'Add') {
      this.onAddSupplier();
    }
    if (this.action === 'Edit') {
      this.onEditSupplier();
    }
    if (this.action === 'Delete') {
      this.onDeleteSupplier();
    }
  }

  // delete supplier
  onDeleteSupplier() {
    this.isLoading = true;
    this.supplierService
      .deleteSupplier(this.config.data.supplier)
      .subscribe((result) => {
        this.isLoading = false;
        this.ref.close({ success: true, action: 'Delete' });
      });
  }

  // Edit Supplier
  onEditSupplier() {
    this.isLoading = true;
    this.supplierService
      .updateSupplier(this.supplierForm.value)
      .subscribe((result) => {
        this.isLoading = false;
        this.ref.close({ success: true, action: 'Edit' });
      });
  }

  // add supplier
  onAddSupplier() {
    console.log(this.supplierForm.value);
    if (this.supplierForm.valid) {
      this.isLoading = true;
      this.supplierService
        .addNewSupplier(this.supplierForm.value)
        .subscribe((result) => {
          this.isLoading = false;
          this.ref.close({ success: true, action: 'Add' });
        });
    }
  }
}
