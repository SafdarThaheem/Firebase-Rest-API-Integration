import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public inputValue: string = '';
  public showDefaultNavbar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateNavbarContent(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    this.updateNavbarContent(this.router.url);
  }
  onAddProduct() {
    this.router.navigate(['/addProduct']);
  }

  updateNavbarContent(url: string) {
    if (url.includes('/addProduct')) {
      this.showDefaultNavbar = false;
    } else {
      this.showDefaultNavbar = true;
    }
  }
}
