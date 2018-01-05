import {Component, OnInit} from '@angular/core';
import {PublishComponent} from "../publish/publish.component";
import {Router} from "@angular/router";
import {Setting} from "../../../core/settings/setting";

@Component({
  selector: 'app-published',
  templateUrl: './published.component.html',
  styleUrls: ['./published.component.scss']
})
export class PublishedComponent implements OnInit {

  constructor(public publishComponent: PublishComponent, public router: Router) {
  }

  ngOnInit() {
    let me = this;
    me.publishComponent.step = 3
  }

  public lookDetail() {
    this.router.navigate([Setting.URLS.goods.detail], {preserveQueryParams: true})
  }

  public editGoods() {
    this.router.navigate([Setting.URLS.goods.edit], {preserveQueryParams: true})
  }

  public publishNew() {
    this.router.navigate([Setting.URLS.goods.chooseKind])
  }

  public goodsList() {
    this.router.navigate([Setting.URLS.goods.manage])
  }

}
