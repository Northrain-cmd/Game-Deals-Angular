import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './deal-info.component.html'
})
export class DealInfoComponent {

  constructor(public activeModal: NgbActiveModal) {}
}
