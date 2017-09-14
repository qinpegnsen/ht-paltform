import { Component, OnInit } from '@angular/core';
import {OrdersComponent} from "../orders.component";

@Component({
  selector: 'app-wait-for-take',
  templateUrl: './wait-for-take.component.html',
  styleUrls: ['./wait-for-take.component.scss']
})
export class WaitForTakeComponent implements OnInit {

  constructor(private parentComp:OrdersComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 3
  }

}
