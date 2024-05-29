import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private getProductsBaseUrl =
    'https://fir-realtime-db-sample-6856c.firebaseio.com/products.json?orderBy="$key"&sort=desc&limitToLast=10';

  private updateProductsBaseUrl =
    'https://fir-realtime-db-sample-6856c.firebaseio.com/products';

  private deleteProductBAseUrl =
    'https://fir-realtime-db-sample-6856c.firebaseio.com/products';

  private addProductBaseUrl =
    'https://fir-realtime-db-sample-6856c.firebaseio.com/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<{ [key: string]: Product }>(this.getProductsBaseUrl)
      .pipe(
        map((responseData) => {
          const productsArray: Product[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              productsArray.push({ ...responseData[key], categoryId: key });
            }
          }
          return productsArray;
        })
      );
  }

  updateProducts(updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.updateProductsBaseUrl}/${updatedProduct.categoryId}.json`,
      updatedProduct
    );
  }

  deleteProduct(selectedProduct: Product) {
    return this.http.delete<Product>(
      `${this.deleteProductBAseUrl}/${selectedProduct.categoryId}.json`
    );
  }

  addProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.addProductBaseUrl, newProduct);
  }
}
