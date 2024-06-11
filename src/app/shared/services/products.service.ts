import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { map, Observable } from 'rxjs';
import { firebaseApi } from '../firebase-api/firebase-api';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private firebaseApi: firebaseApi) {}

  // Fetch Products List
  getProducts(): Observable<Product[]> {
    return this.http
      .get<{ [key: string]: Product }>(
        `${this.firebaseApi.apiBaseUrl}/${this.firebaseApi.apiEndPoints.productObjects}?orderBy="$key"&limitToLast=20`
      )
      .pipe(
        map((responseData) => {
          // console.log(Object.keys(responseData));
          // const productsArray = Object.keys(responseData).map((key) => {
          //   return responseData[key];
          // });
          const productsArray: Product[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              productsArray.push({ ...responseData[key], id: key });
            }
          }
          return productsArray.reverse();
        })
      );
  }

  // Update Selected Product
  updateProducts(updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.firebaseApi.apiBaseUrl}/${this.firebaseApi.apiEndPoints.products}/${updatedProduct.id}.json`,
      updatedProduct
    );
  }

  // Delete Selected Product
  deleteProduct(selectedProduct: Product) {
    return this.http.delete<Product>(
      `${this.firebaseApi.apiBaseUrl}/${this.firebaseApi.apiEndPoints.products}/${selectedProduct.id}.json`
    );
  }

  // Add New Product
  addProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this.firebaseApi.apiBaseUrl}/${this.firebaseApi.apiEndPoints.productObjects}`,
      newProduct
    );
  }
}
