import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
  public storeState: string = '';//店铺状态

  constructor() {
  }

  ngOnInit() {
  }

}
