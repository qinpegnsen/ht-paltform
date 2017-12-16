import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {
  public epCode: string = '';//企业编码

  constructor() { }

  ngOnInit() {
  }

}
