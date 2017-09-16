import {Component, OnInit} from "@angular/core";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orderType:number = 1;
  minDate: Date;
  maxDate: Date;
  locale = 'en';
  bsConfig: Partial<BsDatepickerConfig>;

  constructor() {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsConfig = Object.assign({}, {locale: this.locale});
  }

  ngOnInit() {
  }

}
