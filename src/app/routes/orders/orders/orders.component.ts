import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orderType: string = '';
  public parentPath: string = '';

  constructor(private location: Location, private router: Router, private submit: SubmitService) {
  }

  ngOnInit() {
  }


  routeBack() {
    let me = this, backRouter;
    let parentPath = me.submit.getParams('parentPath');
    if(!isNullOrUndefined(parentPath)) me.parentPath = parentPath;
    backRouter = '/main/orders/cust/' + this.parentPath
    if(me.parentPath == 'prepare'){
      backRouter = '/main/orders/prepare';
    };
    this.router.navigate([backRouter], {replaceUrl: true, preserveQueryParams: true});
  }

}
