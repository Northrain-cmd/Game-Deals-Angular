import { Component, OnInit, OnDestroy } from '@angular/core';
import {DealsService} from '../services/deals.service'
import {Deal} from '../models/deal.model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deals-list',
  templateUrl: './deals-list.component.html',
  styleUrls: ['./deals-list.component.scss']
})
export class DealsListComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  deals: Deal[] = [];
  pageNumber: number = 0;

  constructor(private dealsService: DealsService) {
   }

   loadMore() {
     this.pageNumber += 1;
     this.sub.unsubscribe();
     this.sub = this.dealsService.getDeals(this.pageNumber).subscribe(data => {
      this.deals = [...this.deals, ...data];
      console.log(this.deals)
     })
   }

  ngOnInit(): void {
    this.sub = this.dealsService.getDeals(this.pageNumber).subscribe(data => {
      this.deals = data;
      console.log(this.deals);
    } );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
