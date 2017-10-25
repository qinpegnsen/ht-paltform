import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../../core/forms/submit.service";
import {PatternService} from "../../../../core/forms/pattern.service";
import {isNullOrUndefined} from "util";
import {ActivatedRoute} from "@angular/router";
import {IntegrationChangeService} from "./integration-change.service";


@Component({
  selector: 'app-integration-change',
  templateUrl: './integration-change.component.html',
  styleUrls: ['./integration-change.component.scss'],
  providers:[IntegrationChangeService]
})
export class IntegrationChangeComponent implements OnInit {
  private sum:any;
  private data: any = {
    phone: null,
    custCoin: null,
    logType: 'RECHARGE'
  };
  constructor(private submitt: SubmitService, private patterns: PatternService,private route: ActivatedRoute,
  private integrationChangeService:IntegrationChangeService) {
  }

  ngOnInit() {
  }

  testPhone(phone){
    if(/^1[0-9]{10}$/.test(phone)) return true;
  }

  /**
   * 查询重消币
   */
  queryCoin(){
    let _this=this;
    let url = '/custCoin/selectCoin';
    let data = {
      phone:this.data.phone
    }
   _this.sum=this.integrationChangeService.getData(url, data);
  }

  /**
   * 提交
   */
  submit() {
    let url = '/custCoin/addCustCoin';
    let res = this.submitt.postRequest(url, this.data);
    if (isNullOrUndefined(res)) {
      this.data.phone = '';
      this.data.custCoin = '';
      this.sum.coin='';
      this.sum.recharge=''
    }
  }
}
