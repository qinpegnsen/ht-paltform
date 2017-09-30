import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../../core/forms/submit.service";
import {cli} from "webdriver-manager/built/lib/webdriver";

@Component({
  selector: 'app-commodity-price',
  templateUrl: './commodity-price.component.html',
  styleUrls: ['./commodity-price.component.scss']
})
export class CommodityPriceComponent implements OnInit {
  private data:any;
  public code: any = '';
  public info: string;
  public updata: any;
  private remark:any;
  constructor(private submit: SubmitService) { }

  ngOnInit() {
   let _this=this;
    _this.updata = _this.submit.getData("/datadict/loadInfoByCode", {code: _this.code});
    _this.qeuryAll();
  }
  qeuryAll(){
    let me = this;
    let url = "/datadict/queryAllByTypeCode";
    let data={
      typeCode:'goods_price_range',
    }
    let result = this.submit.getData(url,data);
    me.data = result;
  }
  submitt(code,data1){
    data1.isShow = !data1.isShow;
   let url = '/datadict/updateDatadict';
   let data = {
     typeCode: 'goods_price_range',
     code: code,
     info:this.updata,
     remark:this.remark
   }
   let result=this.submit.putRequest(url, data,false);
   this.qeuryAll();
   console.log("█ result ►►►",  result);
 }
  showDetail(data:any,code){
    data.isShow = !data.isShow;
    this.updata = this.submit.getData("/datadict/loadInfoByCode", {code:code});
    console.log("█ this.updata  ►►►",  this.updata );
  }
  cancel(data2){
    data2.isShow = !data2.isShow;
  }
}
