import { Component, OnInit, Input } from '@angular/core';
import { Deal } from '../models/deal.model';
import { DealsService } from '../services/deals.service';
import { Store } from '../models/store.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DealInfoComponent } from './deal-info/deal-info.component';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {
  @Input() deal!: Deal;
  @Input() store!: Store;
  classes: {} = {};
  storeName: string = 'Unknown store';

  constructor(private dealsService: DealsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.storeName = this.dealsService.getStore(this.deal.storeID);
    this.classes = {
      green: +this.deal.metacriticScore > 74,
      yellow: +this.deal.metacriticScore <= 74 && +this.deal.metacriticScore > 49,
      red: +this.deal.metacriticScore <= 49 && +this.deal.metacriticScore < 0,
      grey: +this.deal.metacriticScore === 0
    }
  }

  open() {
    const modalRef = this.modalService.open(DealInfoComponent, {centered: true, size: 'lg'});
    this.dealsService.dealOpened.next(this.deal.dealID);
  }

}