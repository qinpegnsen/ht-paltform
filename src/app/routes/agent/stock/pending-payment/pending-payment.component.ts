import { Component, OnInit } from '@angular/core';
import {StockComponent} from '../stock.component';

@Component({
  selector: 'app-pending-payment',
  templateUrl: './pending-payment.component.html',
  styleUrls: ['./pending-payment.component.scss']
})
export class PendingPaymentComponent implements OnInit {

  constructor(private StockComponent:StockComponent) { }

  ngOnInit() {
    let _this = this;
    _this.StockComponent.orderType = 2;
  }

}
