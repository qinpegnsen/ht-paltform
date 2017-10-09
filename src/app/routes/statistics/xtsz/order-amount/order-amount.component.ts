import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../../core/forms/submit.service";

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
  constructor(private submit: SubmitService) { }

  ngOnInit() {
    this.qeuryAll();
  }
  qeuryAll(){
    let me = this;
    let url = "/datadict/queryAllByTypeCode";
    let data={
      typeCode:'orders_range',
    }
    let result = this.submit.getData(url,data);
    me.data = result;
    console.log("█ result. ►►►",me.data);
  }
  submitt(code,data1,info,remark){
    data1.isShow = !data1.isShow;
    let url = '/datadict/updateDatadict';
    let data = {
      typeCode: 'goods_price_range',
      code: code,
      info:info,
      remark:remark,
    }
    let result=this.submit.putRequest(url, data,false);
    this.qeuryAll();
    console.log("█ result ►►►",  result);
  }
  showDetail(data:any,code){
    data.isShow = !data.isShow;
    this.updata = this.submit.getData("/datadict/loadDatadictByCode", {code:code});
    console.log("█ this.updata  ►►►",  this.updata );
  }

  cancel(data2){
    data2.isShow = !data2.isShow;
  }
}
