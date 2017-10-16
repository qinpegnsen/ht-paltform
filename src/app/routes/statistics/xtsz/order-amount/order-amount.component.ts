import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../../core/forms/submit.service";
import {PatternService} from "../../../../core/forms/pattern.service";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";

@Component({
  selector: 'app-order-amount',
  templateUrl: './order-amount.component.html',
  styleUrls: ['./order-amount.component.scss']
})
export class OrderAmountComponent implements OnInit {
  private data:any;
  public code: any = '';
  public info: string;
  public updata: any;
  private remark:any;
  constructor(private submit: SubmitService,private patterns:PatternService,private rzhtools:RzhtoolsService) { }

  ngOnInit() {
    this.qeuryAll();
  }

    twoNum(target,type?){
      this.rzhtools.auditInputValueForNum(target,type);
    }
  /*
  * 查询订单金额
  * */
  qeuryAll(){
    let me = this;
    let url = "/datadict/queryAllByTypeCode";
    let data={
      typeCode:'orders_range',
    }
    let result = this.submit.getData(url,data);
    me.data = result;
  }
  /*
  * 修改
  * */
  submitt(code,data1,info,remark){
    data1.isShow = !data1.isShow;
    let url = '/datadict/updateDatadict';
    let data = {
      typeCode: 'orders_range',
      code: code,
      info:info,
      remark:remark,
    }
    let result=this.submit.putRequest(url, data,false);
    this.qeuryAll();
    console.log("█ result ►►►",  result);
  }
  showDetail(data:any,code,i){
    for(let j=0;j<data.length;j++){
      data[j].isShow =false;
    }
    data[i].isShow = !data[i].isShow;
    this.updata = this.submit.getData("/datadict/loadDatadictByCode", {code:code});
    console.log("█ this.updata  ►►►",  this.updata );
  }

  cancel(data2){
    data2.isShow = !data2.isShow;
  }
}
