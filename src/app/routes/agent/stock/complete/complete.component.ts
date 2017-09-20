import { Component, OnInit } from '@angular/core';
import {StockComponent} from '../stock.component';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

  constructor(private StockComponent:StockComponent) { }

  ngOnInit() {
    let _this = this;
    _this.StockComponent.orderType = 5;
  }

}
