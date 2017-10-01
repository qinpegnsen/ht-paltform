import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../../core/forms/submit.service";
import {PatternService} from "../../../../core/forms/pattern.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-integration-change',
  templateUrl: './integration-change.component.html',
  styleUrls: ['./integration-change.component.scss']
})
export class IntegrationChangeComponent implements OnInit {
  private data: any = {
    phone: null,
    custCoin: null,
    logType: 'RECHARGE'
  };
  public tel: string;
  public custCoin: string;

  constructor(private submitt: SubmitService, private patterns: PatternService) {
  }

  ngOnInit() {
  }

  //提交
  submit() {
    let url = '/custCoin/addCustCoin';
    let res = this.submitt.postRequest(url, this.data);
    if (isNullOrUndefined(res)) {
      this.data.phone = '';
      this.data.custCoin = ''
    }
  }
}
