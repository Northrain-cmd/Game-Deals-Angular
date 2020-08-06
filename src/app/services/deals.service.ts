import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Deal } from '../models/deal.model';
import { Store } from '../models/store.model';
import {stores} from '../utils/stores-data';
import { DealLookup } from '../models/deal-lookup.model';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  dealOpened = new Subject<string>();
  storesInfo: Store[] = stores;

  constructor(private http: HttpClient) { 
   
  }

  getStore(id: string): string {
    return this.storesInfo.find(store => store.storeID === id)!.storeName;
  }

  getDeal(dealID: string) {
    return this.http.get<DealLookup>(`https://www.cheapshark.com/api/1.0/deals`,
                        {params: new HttpParams().set('id', dealID)})
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
      )
  }

  emailSubscribe(email: string, gameID: string, price: number) {
    
  }
}
