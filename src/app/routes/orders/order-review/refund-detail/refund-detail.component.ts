import { Component, OnInit } from '@angular/core';
import {OrderReviewComponent} from "../order-review.component";

@Component({
  selector: 'app-refund-detail',
  templateUrl: './refund-detail.component.html',
  styleUrls: ['./refund-detail.component.scss']
})
export class RefundDetailComponent implements OnInit {

  constructor(private orderReviewComponent:OrderReviewComponent) { }

  ngOnInit() {
    let me=this;
    me.orderReviewComponent.orderType = 111;
  }

}
