import { Component, OnInit } from '@angular/core';
import {OrderReviewComponent} from '../order-review.component';

@Component({
  selector: 'app-to-audit',
  templateUrl: './to-audit.component.html',
  styleUrls: ['./to-audit.component.scss']
})
export class ToAuditComponent implements OnInit {

  constructor(private OrderReviewComponent:OrderReviewComponent) { }

  ngOnInit() {
    let _this = this;
    _this.OrderReviewComponent.orderType = 2;
  }

}
