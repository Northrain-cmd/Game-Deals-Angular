import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http'
import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Deal } from '../models/deal.model';
import { Store } from '../models/store.model';
import {stores} from '../utils/stores-data';
import { DealLookup } from '../models/deal-lookup.model';

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  storesInfo: Store[] = stores;

  constructor(private http: HttpClient) { 
   
  }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was ${error.error}`
      )
    }
    return throwError('Something unexpcected happened, please try again later')
  }

  getStore(id: string): string {
    return this.storesInfo.find(store => store.storeID === id)!.storeName;
  }

  getDeal(dealID: string): Promise<DealLookup> {
      return fetch(`https://www.cheapshark.com/api/1.0/deals?id=${dealID}`)
        .then(
          (response) => response.json()
        )
        .catch(error => console.error('An error occured: ',error))
  }

    

  getDeals(pageNumber: number, sortBy: string = 'Deal Rating', order: string = '0'): Observable<Deal[]> {
    const params = new HttpParams()
      .set('sortBy', sortBy)
      .set('pageSize', '21')
      .set('pageNumber', `${pageNumber}`)
      .set('onSale', `1`)
      .set('desc', order);
      ;

    return this.http.get<Deal[]>(
            'https://www.cheapshark.com/api/1.0/deals',
            {params}
      ).pipe(
        catchError(this.handleError)
      )
  }

  emailSubscribe(email: string, gameID: string, price: number): Observable<boolean> {
    const params = new HttpParams()
    .set('action', 'set')
    .set('email', email)
    .set('gameID', gameID)
    .set('onSale', `1`)
    .set('price', '' + price)
   return this.http.get<boolean>('https://www.cheapshark.com/api/1.0/alerts', {params});
  }
}
