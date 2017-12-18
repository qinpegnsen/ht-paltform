import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {StoreService} from "../../store.service";
import {isNullOrUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";
import {StoresComponent} from "../stores.component";
declare var $: any;

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {
  public isAudit: boolean = true;//是否是审核，父组件监听用
  public refresh: boolean = false;//是否审核，以此判断父页面是否需要刷新
  public epCode: string = '';//企业编码
  public epInfo: any;//企业信息

  constructor(public location: Location,
              public storeService: StoreService,
              public parentComp: StoresComponent,
              public submitService: SubmitService) {
    this.parentComp.enterPriseState = 'detail';
  }

  ngOnInit() {
    let me = this, epInfo;
    me.epCode = me.submitService.getParams('epCode');
    if (me.epCode) epInfo = me.storeService.getEpInfo(me.epCode);
    if (!isNullOrUndefined(epInfo)) me.epInfo = epInfo;
  }

  //返回
  back() {
    this.location.back();
  }

}
