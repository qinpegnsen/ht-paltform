import { Component, OnInit } from '@angular/core';
import {OrdersComponent} from "../orders.component";

@Component({
  selector: 'app-wait-for-pay',
  templateUrl: './wait-for-pay.component.html',
  styleUrls: ['./wait-for-pay.component.scss']
})
export class WaitForPayComponent implements OnInit {

  constructor(private parentComp:OrdersComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 2
  }

}
