import { Component, OnInit } from '@angular/core';
import {Page} from 'app/core/page/page';
import {isUndefined} from 'ngx-bootstrap/bs-moment/utils/type-checks';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';
import {SubmitService} from '../../../core/forms/submit.service';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {PlatformOrderService} from '../platform-order.service';

@Component({
  selector: 'app-platform-received',
  templateUrl: './platform-received.component.html',
  styleUrls: ['./platform-received.component.scss']
})
export class PlatformReceivedComponent implements OnInit {
  public path: string;       //路由
  public ordState: string;    //订单类型
  public curCancelOrderId: string;
  public curDeliverOrderId: string;
  public lookLogisticsOrderId: string;
  public goodsList: Page = new Page();
  public phone: string;
  public ordno: string;
  public isPlatCarry: string='';//查询店铺编码
  public agentList: string='';//查询店铺编码
  public agentCode: string='';//查询店铺编码
  public LogisticsData: any;//物流信息
  public showList: boolean = true;     //是否显示列表页
  public bsConfig: Partial<BsDatepickerConfig>;
  public agentsCode:string;              //获取选择的企业的编码
  private value:any = {};
  public agentsList:any=new Array;        //获取正常状态企业列表
  public items:Array<string> = new Array();

  constructor(public platformOrderService: PlatformOrderService, public submit: SubmitService) {

  }

  ngOnInit() {
    let me = this;
    me.queryDatas(1);
    me.querySoterLists();
    this.getAgentList();//获取代理商的列表
  }

  /**
   * 获取选择的企业的信息
   * @param value
   */
  public selected(value:any):void {
    this.agentsCode=value.id;
  }

  /**
   * 输入框的值
   * @param value
   */
  public typed(value:any):void {
  }

  /**
   * 删除信息
   * @param value
   */
  public removed(value:any):void {
    this.agentsCode='';
  }

  /**
   * 刷新的值
   * @param value
   */
  public refreshValue(value:any):void {
    this.value = value;
  }

  /**
   * 获取代理商的列表
   */
  getAgentList(){
    let url = "/agent/queryAll";
    let data = {};
    let result = this.submit.getData(url, data);
    if (result) {
      for(let i=0;i<result.length;i++){
        let obj;
        obj={
          id:result[i].agentCode,
          text:result[i].agentName
        };
        this.agentsList.push(obj);
      };
      this.items=this.agentsList
    }
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
    event.single = true;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    if(event.refresh) this.queryDatas(1);//在详情页面发货返回需要刷新页面数据
  }

  /**
   *显示物流信息
   * @param orderId
   */
  showLogistics(Logistics,ordno) {
    Logistics.style.display = 'block';
    if(isUndefined(ordno)) ordno = ordno;
    this.LogisticsData = this.platformOrderService.getOrderLogisticsData(ordno);
  }

  /**
   *隐藏物流信息
   * @param orderId
   */
  hideLogistics(Logistics) {
    Logistics.style.display = 'none';
  }


  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage,event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      sortColumns: '',
      phone: _this.phone,
      ordno: _this.ordno,
      ordState:'DELIVERY',
      agentCode: _this.agentsCode,
      isPlatCarry:_this.isPlatCarry
    };
    let requestUrl = '/ord/queryPlantOrd';
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
  }

  querySoterLists(){
    let _this = this, activePage = 1;
    let requestUrl = '/agent/queryAll';
    let requestData = {};
    _this.agentList = _this.submit.getData(requestUrl, requestData);
  }

  /**
   * 显示买家信息
   * @param event
   * @param i
   */
  showUserInfo(i) {
    i.style.display = 'block';
  }

  /**
   * 隐藏买家信息
   * @param i
   */
  hideBuyerInfo(i) {
    i.style.display = 'none';
  }

  deliverOrder(orderId) {
    this.curDeliverOrderId = orderId;
  }

  /**
   * 发货回调函数
   * @param data
   */
  getDeliverOrderData(data) {
    this.curDeliverOrderId = null;
    if(data.type) this.queryDatas(1)//在当前页面发货之后需要刷新页面数据
  }

}

