import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.scss',
})
export class TopnavComponent implements OnInit {
  public navItems!: MenuItem[];

  constructor() {}
  ngOnInit(): void {
    this.navItems = [
      {
        label: 'Products',
        icon: 'pi pi-home',
        routerLink: ['/'],
      },
      {
        label: 'Category',
        icon: 'pi pi-star',
        routerLink: ['/category'],
      },
      {
        label: 'Suppliers',
        icon: 'pi pi-envelope',
        routerLink: ['/supplier'],
      },
    ];
  }
}
