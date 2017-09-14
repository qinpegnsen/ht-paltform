import { Component, OnInit } from '@angular/core';
import {OrdersComponent} from "../orders.component";

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  constructor(private parentComp:OrdersComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 1
  }

}
