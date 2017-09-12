import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../../core/forms/submit.service";
import {PatternService} from "../../../../core/forms/pattern.service";

@Component({
  selector: 'app-integration-change',
  templateUrl: './integration-change.component.html',
  styleUrls: ['./integration-change.component.scss']
})
export class IntegrationChangeComponent implements OnInit {
  public logType='RECHARGE'
  constructor(private submitt: SubmitService,private patterns: PatternService) { }

  ngOnInit() {
  }

  //提交
  submit(res){
    let url = '/custCoin/addCustCoin';
    let data = {
      phone: res.tel,
      custCoin:res.custCoin,
      logType:res.logType,
    }
    this.submitt.postRequest(url, data);
  }
}
