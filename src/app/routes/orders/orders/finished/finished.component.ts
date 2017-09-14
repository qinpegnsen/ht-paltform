import { Component, OnInit } from '@angular/core';
import {OrdersComponent} from "../orders.component";

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent implements OnInit {

  constructor(private parentComp:OrdersComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 5
  }

}
