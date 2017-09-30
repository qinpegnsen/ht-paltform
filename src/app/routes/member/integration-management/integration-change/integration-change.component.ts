import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../../core/forms/submit.service";
import {PatternService} from "../../../../core/forms/pattern.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-integration-change',
  templateUrl: './integration-change.component.html',
  styleUrls: ['./integration-change.component.scss']
})
export class IntegrationChangeComponent implements OnInit {
  constructor(private submitt: SubmitService,private patterns: PatternService,private router:Router) { }
  private logType:any='RECHARGE';
  private count;
  private custtel;
  ngOnInit() {
    this.count="";
    this.custtel="";
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
   this.router.navigate(['/main/member/integration-management/integration-change']);
  }
}
