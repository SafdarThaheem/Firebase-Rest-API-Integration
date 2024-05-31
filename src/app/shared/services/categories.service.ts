import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icategory } from '../models/icategory';
import { map, Observable } from 'rxjs';
import { firebaseApi } from '../firebase-api/firebase-api';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient, private firebaseApi: firebaseApi) {}

  // Get All Categories
  getAllCategories(): Observable<Icategory[]> {
    return this.http
      .get<{ [key: string]: Icategory }>(
        `${this.firebaseApi.apiBaseUrl}/${this.firebaseApi.apiEndPoints.categoryObject}?orderBy="$key"&limitToFirst=10`
      )
      .pipe(
        map((responseData) => {
          const productsArray: Icategory[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              productsArray.push({ ...responseData[key], categoryId: key });
            }
          }
          return productsArray;
        })
      );
  }
}
