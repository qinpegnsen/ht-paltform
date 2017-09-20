import { Component, OnInit } from '@angular/core';
import {StockComponent} from '../stock.component';

@Component({
  selector: 'app-awaiting-delivery',
  templateUrl: './awaiting-delivery.component.html',
  styleUrls: ['./awaiting-delivery.component.scss']
})
export class AwaitingDeliveryComponent implements OnInit {

  constructor(private StockComponent:StockComponent) { }

  ngOnInit() {
    let _this = this;
    _this.StockComponent.orderType = 4;
  }

}
