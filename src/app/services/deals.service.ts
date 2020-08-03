import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Deal } from '../models/deal.model';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(private http: HttpClient) { 

  }

  getDeals(pageNumber: number): Observable<Deal[]> {
    const params = new HttpParams()
      .set('sortBy', 'Deal Rating')
      .set('pageSize', '21')
      .set('pageNumber', `${pageNumber}`);

    return this.http.get<Deal[]>(
            'https://www.cheapshark.com/api/1.0/deals',
            {params}
      )
  }
}
