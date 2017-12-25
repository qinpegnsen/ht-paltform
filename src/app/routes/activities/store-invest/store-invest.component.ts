import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined} from "util";
import {PatternService} from "../../../core/forms/pattern.service";
import {ActivitiesService} from "../activities.service";
import {AppComponent} from "../../../app.component";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
declare var $: any;

@Component({
  selector: 'app-store-invest',
  templateUrl: './store-invest.component.html',
  styleUrls: ['./store-invest.component.scss']
})
export class StoreInvestComponent implements OnInit,OnDestroy,OnChanges {
  public showDeliverWindow: boolean = false;
  public rpStoreList: any;   //红包企业列表
  public amount: string;        //投资金额
  public item: any={
    storeName:'',
    storeCode:'',
    epCode:'',
    payWay:'',
  };         //企业编码
  public storeCode: any;      //店铺编码
  public storeName: any;     //企业名字
  public payWayList: any;   //支付方式的枚举列表
  @Input() flag: string;
  @Output() deliverGoods = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flag']) {
      if(this.flag){
        this.showDeliverWindow = true;
      }
      let url='/rpStore/queryAll';
      let data={};
      this.rpStoreList = this.service.queryAllRpStore(url,data);   //红包企业列表
      this.amount = '';      //每次出来把上次填的金额清除
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(private service: ActivitiesService,
              public patterns: PatternService,
              public tools: RzhtoolsService) {
  }

  ngOnInit() {
    this.payWayList=this.tools.getEnumDataList('1017');
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
   * 核查输入的金额的值
   */
  checkVal(val){
    if(val==0||isNullOrUndefined(val)||val<0){//输入-号，或者是0,因为是input type是number,所以返回null
      AppComponent.rzhAlt("info", '请输入大于0的金额');
      setTimeout(()=>{
        this.amount='';
      })
    }else if(val=='-'){
      AppComponent.rzhAlt("info", '请输入大于0的金额');
    }else if(String(val).indexOf('.')>-1){
      let index=String(val).indexOf('.');
      let finalVal=String(val).slice(0,index+3);
      setTimeout(()=>{
        this.amount=finalVal;
      },0)
    }
  }

  /**
   * 确认投资
   */
  delivery() {
    let url = '/rpAccountRec/addRpAccountRecAdmin';
    let data = {
      storeCode: this.item.storeCode,
      amount: this.amount,
      payWay: this.item.payWay,
    };
    let result = this.service.addRpAccountRec(url, data);
    if (isNullOrUndefined(result)) this.hideWindow();
  }
}
