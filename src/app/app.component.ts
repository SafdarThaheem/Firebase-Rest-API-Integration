import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProductsComponent } from './components/products/products.component';
import { firebaseApi } from './shared/firebase-api/firebase-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ProductsComponent],
  providers: [firebaseApi],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'firebase-rest-api-integration';
}
