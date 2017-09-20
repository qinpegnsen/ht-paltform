import { Component, OnInit } from '@angular/core';
import {StockComponent} from '../stock.component';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {

  constructor(private StockComponent:StockComponent) { }

  ngOnInit() {
    let _this = this;
    _this.StockComponent.orderType = 6;
  }

}
