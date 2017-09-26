import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orderType: string = '';

  constructor(private location: Location) {
  }

  ngOnInit() {
  }


  routeBack() {
    this.location.back()
  }

}
