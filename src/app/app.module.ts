import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DealsListComponent } from './deals-list/deals-list.component';
import { DealComponent } from './deal/deal.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DealInfoComponent } from './deal/deal-info/deal-info.component';
import { PointerDirective } from './shared/pointer.directive';

@NgModule({
  declarations: [
    AppComponent,
    DealsListComponent,
    DealComponent,
    SpinnerComponent,
    DealInfoComponent,
    PointerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DealInfoComponent]
})
export class AppModule { }
