import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../../core/forms/submit.service";
import {PatternService} from "../../../../core/forms/pattern.service";
import {isNullOrUndefined} from "util";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-integration-change',
  templateUrl: './integration-change.component.html',
  styleUrls: ['./integration-change.component.scss']
})
export class IntegrationChangeComponent implements OnInit {
  private coin:any;
  private data: any = {
    phone: null,
    custCoin: null,
    logType: 'RECHARGE'
  };
  constructor(private submitt: SubmitService, private patterns: PatternService,private route: ActivatedRoute) {
  }

  ngOnInit() {
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
   _this.coin=this.submitt.getData(url, data);
  }

  /**
   * 提交
   */
  submit() {
    let url = '/custCoin/addCustCoin';
    let res = this.submitt.postRequest(url, this.data);
    if (isNullOrUndefined(res)) {
      this.data.phone = '';
      this.data.custCoin = ''
    }
  }
}
