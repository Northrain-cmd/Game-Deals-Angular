import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DealsService } from 'src/app/services/deals.service';
import { DealLookup } from 'src/app/models/deal-lookup.model';
import { Subscription } from 'rxjs';
import { concat } from 'rxjs/operators';


@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './deal-info.component.html'
})
export class DealInfoComponent implements OnInit, OnDestroy {
  deal!: DealLookup;
  sub!: Subscription;
  @Input() dealID!: string;
  constructor(public activeModal: NgbActiveModal, private dealsService: DealsService) {}

  ngOnInit(): void {
   this.dealsService.dealOpened.subscribe(data => {
     this.dealID = data;
   })
   this.sub = this.dealsService.getDeal(this.dealID).subscribe(data => this.deal = data );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
