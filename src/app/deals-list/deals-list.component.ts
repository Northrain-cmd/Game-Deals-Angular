import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {DealsService} from '../services/deals.service';
import {Deal} from '../models/deal.model';



import { Subscription } from 'rxjs';


@Component({
  selector: 'app-deals-list',
  templateUrl: './deals-list.component.html',
  styleUrls: ['./deals-list.component.scss']
})
export class DealsListComponent implements OnInit, OnDestroy {
  @ViewChild('container')  row!: ElementRef<HTMLDivElement>;
  sub!: Subscription;
  deals: Deal[] = [];
  pageNumber: number = 0;
  sortingOrder: string = '0';
  sortBy: string = 'Deal Rating';
  userEmail: string = '';
  showLoader = false;

  constructor(private dealsService: DealsService) {
   }

   loadMore() {
     this.showLoader = true;
     this.pageNumber += 1;
     this.sub.unsubscribe();
     this.sub = this.dealsService.getDeals(this.pageNumber, this.sortBy, this.sortingOrder).subscribe(data => {
     this.deals = [...this.deals, ...data];
     this.showLoader = false
     })
   }

   changeOrder() {
     this.showLoader = true;
    this.sortingOrder = this.sortingOrder === '0' ? '1' : '0';
    this.pageNumber = 0;
    this.sub.unsubscribe();
    this.sub = this.dealsService.getDeals(this.pageNumber,this.sortBy,this.sortingOrder)
      .subscribe(data => {
        this.deals = data;
        this.showLoader = false
      })
   }

   changeSorting(e: any) {
    this.showLoader = true;
    this.sortingOrder = '0';
    this.pageNumber = 0;
    this.sub.unsubscribe();
    this.sub = this.dealsService.getDeals(this.pageNumber, (<HTMLSelectElement>e.target).value)
      .subscribe(data => {
        this.deals = data;
        this.showLoader = false;
      })
   }


  ngOnInit(): void {
    this.showLoader = true;
    this.sub = this.dealsService.getDeals(this.pageNumber).subscribe(data => {
      this.deals = data;
      this.showLoader = false;
    } );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
