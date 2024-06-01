import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SuppliersService } from '../../shared/services/suppliers.service';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { Isupplier } from '../../shared/models/isupplier';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [
    ListboxModule,
    CommonModule,
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    ToastModule,
  ],
  providers: [DialogService, MessageService],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.scss',
})
export class SupplierListComponent implements OnInit {
  supplierList!: Isupplier[];
  private ref: DynamicDialogRef | undefined;

  constructor(
    private supplierService: SuppliersService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getSuppliersList();
  }

  // dynamic dialog
  supplierFormOpen(action: string, supplier?: Isupplier): void {
    this.ref = this.dialogService.open(SupplierFormComponent, {
      header: `${action} Supplier`,
      width: '50%',
      data: { supplier: supplier, action: action },
    });

    this.ref.onClose.subscribe((result) => {
      if (result?.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${result.action} Category successfully`,
        });
        this.getSuppliersList();
      }
    });
  }

  getSuppliersList() {
    this.supplierService.getAllSuppliers().subscribe((res) => {
      if (res) {
        this.supplierList = res;
      }
    });
  }
}
