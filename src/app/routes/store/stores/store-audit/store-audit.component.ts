import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {StoreService} from "../../store.service";
import {isNullOrUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";
import {MaskService} from "../../../../core/services/mask.service";
declare var $: any;

@Component({
  selector: 'app-store-audit',
  templateUrl: './store-audit.component.html',
  styleUrls: ['./store-audit.component.scss']
})
export class StoreAuditComponent implements OnInit {
  public isAudit: boolean = true;//是否是审核，父组件监听用
  public refresh: boolean = false;//是否审核，以此判断父页面是否需要刷新
  public epCode: string = '';//企业编码
  public epInfo: any;//企业信息
  public epAudits: any;//审核结果枚举
  public audit: any = {};//审核结果

  constructor(public location: Location,
              public storeService: StoreService,
              public submitService: SubmitService) {
  }

  ngOnInit() {
    let me = this, epInfo;
    me.epCode = me.submitService.getParams('epCode');
    if (me.epCode) epInfo = me.storeService.getEpInfo(me.epCode);
    if (!isNullOrUndefined(epInfo)) me.epInfo = epInfo;
    me.epAudits = [{key: 'PASS', val: '通过'}, {key: 'UNPASS', val: '不通过'}];
    me.audit.auditResult = 'UNPASS';//默认不通过
  }

  /**
   * 审核
   */
  auditEnterprise(){
    let me = this;
    MaskService.showMask();//显示遮罩层
    let data = {
      epCode: me.epCode,
      auditResult: me.audit.auditResult,
      opinion: me.audit.opinion
    }
    me.submitService.putRequest('/enterprise/auditEnterprise', data, true);
    me.refresh = true;
  }

  //返回
  back() {
    this.location.back();
  }

}
