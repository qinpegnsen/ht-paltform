import { Component, OnInit } from '@angular/core';
import {OrdersComponent} from "../orders.component";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  constructor(private parentComp:OrdersComponent) { }
  public orderStep = 0;

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 100;
  }

  showTimeList(target){
    target.style.display = 'block';
  }
  hideTimesList(target){
    target.style.display = 'none';
  }
}


