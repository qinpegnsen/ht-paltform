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
  public data:any;
  public code: any = '';
  public info: string;
  public updata: any;
  public remark:any;
  constructor(public submit: SubmitService,public patterns:PatternService,public rzhtools:RzhtoolsService) { }

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
  }

  /**
   * 修改按钮隐藏，确认取消按钮展示
   * @param data
   * @param code
   * @param i
   */
  showDetail(data:any,code,i){
    for(let j=0;j<data.length;j++){
      data[j].isShow =false;
    }
    data[i].isShow = !data[i].isShow;
    this.updata = this.submit.getData("/datadict/loadDatadictByCode", {code:code});
  }

  /**
   * 取消
   * @param data2
   */
  cancel(data2){
    data2.isShow = !data2.isShow;
  }
}
