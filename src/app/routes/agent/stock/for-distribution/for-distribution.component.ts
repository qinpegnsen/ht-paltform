import { Component, OnInit } from '@angular/core';
import {StockComponent} from '../stock.component';

@Component({
  selector: 'app-for-distribution',
  templateUrl: './for-distribution.component.html',
  styleUrls: ['./for-distribution.component.scss']
})
export class ForDistributionComponent implements OnInit {

  constructor(private StockComponent:StockComponent) { }

  ngOnInit() {
    let _this = this;
    _this.StockComponent.orderType = 3;
  }

}
