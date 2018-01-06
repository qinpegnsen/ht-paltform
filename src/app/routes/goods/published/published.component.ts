import {Component, OnInit} from '@angular/core';
import {PublishComponent} from "../publish/publish.component";
import {Router} from "@angular/router";
import {Setting} from "../../../core/settings/setting";
import {SubmitService} from "../../../core/forms/submit.service";

@Component({
  selector: 'app-published',
  templateUrl: './published.component.html',
  styleUrls: ['./published.component.scss']
})
export class PublishedComponent implements OnInit {
  public isOwnPlat: string = 'Y';

  constructor(public publishComponent: PublishComponent,
              public submit: SubmitService,
              public router: Router) {
  }

  ngOnInit() {
    let me = this;
    me.publishComponent.step = 3;
    me.isOwnPlat = me.submit.getParams('isOwnPlat');
  }

  public lookDetail() {
    this.isOwnPlat == 'Y' ?
      this.router.navigate([Setting.URLS.goods.detail], {preserveQueryParams: true}) :
      this.router.navigate([Setting.URLS.goods.storeDetail], {preserveQueryParams: true})
  }

  public editGoods() {
    this.isOwnPlat == 'Y' ?
      this.router.navigate([Setting.URLS.goods.edit], {preserveQueryParams: true}) :
      this.router.navigate([Setting.URLS.goods.storeEdit], {preserveQueryParams: true})
  }

  public publishNew() {
    this.router.navigate([Setting.URLS.goods.chooseKind])
  }

  public goodsList() {
    this.isOwnPlat == 'Y' ?
      this.router.navigate([Setting.URLS.goods.manage]) :
      this.router.navigate([Setting.URLS.goods.storeManage])
  }

}
