import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orderType: string = '';

  constructor(public location: Location, public router: Router) {
  }

  ngOnInit() {
  }


  routeBack() {
    this.location.back()
  }

}
