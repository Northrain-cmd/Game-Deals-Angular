import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DealsService } from 'src/app/services/deals.service';
import { DealLookup } from 'src/app/models/deal-lookup.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './deal-info.component.html',
  styleUrls: ['./deal-info.component.scss']
})
export class DealInfoComponent implements OnInit, OnDestroy {
  @Input() dealID!: string;
  @Input() storeName: string = 'Unknown store';
  deal!: DealLookup;
  sub!: Subscription;
  releaseDate!: number | string;
  userEmail: string = '';
  alertPrice!: number;
  showLoader = false;
  subscribed = false;
  constructor(public activeModal: NgbActiveModal, private dealsService: DealsService) {}

  ngOnInit(): void {
    this.showLoader = true;
    this.dealsService.getDeal(this.dealID).then(data => {
      this.showLoader = false;
      this.deal = data ;
      this.releaseDate = this.deal.gameInfo.releaseDate !== 0 
        ?  new Date(this.deal.gameInfo.releaseDate*1000).getFullYear()
        : 'Unknown'
   })
  }

  emailSubscribe() {
    console.log(this.userEmail, this.alertPrice);
    this.sub = this.dealsService.emailSubscribe(this.userEmail,this.deal.gameInfo.gameID, this.alertPrice)
                .subscribe(data => {
                  console.log('Subscribed Successfully', data);
                  this.subscribed = true;
                });
   }


  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
}
