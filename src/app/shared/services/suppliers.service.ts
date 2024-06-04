import { Injectable } from '@angular/core';
import { firebaseApi } from '../firebase-api/firebase-api';
import { Isupplier } from '../models/isupplier';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient, private firebaseApi: firebaseApi) {}

  // get all suppliers
  getAllSuppliers(): Observable<Isupplier[]> {
    return this.http
      .get<{ [key: string]: Isupplier }>(
        `${this.firebaseApi.apiBaseUrl}/${this.firebaseApi.apiEndPoints.supplierObject}?orderBy="$key"&limitToLast=10`
      )
      .pipe(
        map((responseData) => {
          const suppliersArray: Isupplier[] = [];
          for (const key in responseData) {
            suppliersArray.push({ ...responseData[key], supplierId: key });
          }
          return suppliersArray.reverse();
        })
      );
  }

  // add new supplier
  addNewSupplier(supplier: Isupplier): Observable<Isupplier> {
    return this.http.post<Isupplier>(
      `${this.firebaseApi.apiBaseUrl}/${this.firebaseApi.apiEndPoints.supplierObject}`,
      supplier
    );
  }

  // update selected supplier
  updateSupplier(supplier: Isupplier): Observable<Isupplier> {
    return this.http.put<Isupplier>(
      `${this.firebaseApi.apiBaseUrl}/${this.firebaseApi.apiEndPoints.suppliers}/${supplier.supplierId}.json`,
      supplier
    );
  }

  // delete selected supplier
  deleteSupplier(supplier: Isupplier): Observable<Isupplier> {
    return this.http.delete<Isupplier>(
      `${this.firebaseApi.apiBaseUrl}/${this.firebaseApi.apiEndPoints.suppliers}/${supplier.supplierId}.json`
    );
  }
}
