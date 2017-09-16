import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  private queryParams:string;
  constructor( private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    let me=this;
    me.queryParams = me.routeInfo.snapshot.queryParams['queryParams'];
  }

}
