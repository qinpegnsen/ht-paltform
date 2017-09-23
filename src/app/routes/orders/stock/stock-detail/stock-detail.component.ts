import { Component, OnInit } from '@angular/core';
import {StockComponent} from '../stock.component';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  constructor(private StockComponent:StockComponent) { }
  public orderStep = 0;
  ngOnInit() {
    let _this = this;
    _this.StockComponent.orderType = 100;
  }

}
