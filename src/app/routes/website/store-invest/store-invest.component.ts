import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
import {WebstiteService} from "../webstite.service";
declare var $: any;

@Component({
  selector: 'app-store-invest',
  templateUrl: './store-invest.component.html',
  styleUrls: ['./store-invest.component.scss']
})
export class StoreInvestComponent implements OnInit,OnDestroy,OnChanges {
  public showDeliverWindow: boolean = false;
  public rpStoreList: any;   //红包企业列表
  public amount: any;        //投资金额
  public item: any={
    storeName:'',
    storeCode:'',
    epCode:'',
  };         //企业编码
  public storeCode: any;      //店铺编码
  public storeName: any;     //企业名字
  public expressCode: any;   //快递公司唯一代码
  @Input() flag: string;
  @Output() deliverGoods = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flag']) {
      if(this.flag){
        this.showDeliverWindow = true;
      }
      let url='/rpStore/queryAll';
      let data={};
      this.rpStoreList = this.webstiteService.queryAllRpStore(url,data);   //红包企业列表
      this.amount = null;      //每次出来把上次填的订单号清除，快递公司就算了，留着吧
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(private webstiteService: WebstiteService,
              public submit: SubmitService) {
  }

  ngOnInit() {

  }


  /**
   * 关闭组件
   *
   */
  hideWindow() {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    me.showDeliverWindow = false;
    me.deliverGoods.emit({
    })// 向外传值
  }

  /**
   * 确认发货
   */
  delivery() {
    let url = '/rpAccountRec/addRpAccountRec';
    let data = {
      epCode: this.item.epCode,
      amount: this.amount,
    };
    let result = this.webstiteService.addRpAccountRec(url, data);
    if (isNullOrUndefined(result)) this.hideWindow();
  }
}
