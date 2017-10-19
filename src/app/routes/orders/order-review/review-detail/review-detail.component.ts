import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {isNullOrUndefined} from "util";
import {OrderService} from "../../order.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {OrderReviewComponent} from '../order-review.component';
const swal = require('sweetalert');

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent implements OnInit {


  public orderData: any;                                  //订单的数据
  public logisticsData;                                   //获取物流的信息
  public deliveryData;                                    //快递公司的信息
  public ordno;                                           //订单号
  public atime:Array<string> = new Array();             //存储状态时间的数组
  public PayRecData;                                     //支付记录数据
  constructor(
    private parentComp:OrderReviewComponent,
    private routeInfo:ActivatedRoute,
    public orderService: OrderService,
    private router: Router,
    private submit: SubmitService
  ) { }

  /**
   * 1.获取页面传递的数据
   * 2.获取订单的信息
   * 3.获取物流追踪的信息
   */
  ngOnInit() {
    let me = this;
    this.ordno = me.routeInfo.snapshot.queryParams['ordno'];//获取进货记录未付款页面跳转过来的参数
    me.parentComp.orderType = 100;

    this.getOrderData();
    this.showLogistics();
    this.getDelivery();
    this.getPayRec(); //获取订单的支付记录
  }

  /**
   * 获取订单的数据
   */
  getOrderData(){
    let url = '/agentOrd/loadByOrdno';
    let data={
      ordno:this.ordno
    }
    this.orderData=this.orderService.getShopList(url,data);
    if(isNullOrUndefined(this.orderData)){
      this.orderData='';//避免报错
    }
  }

  /**
   * 获取支付记录的信息
   */
  getPayRec() {
    let url='/agentOrd/loadAgentOrdPayRec';
    let data={
      ordno:this.ordno
    }
    this.PayRecData=this.submit.getData(url, data);
    console.log("█ this.PayRecData ►►►",  this.PayRecData);
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event,i){
    i.style.display = 'block';
    i.style.top = (event.clientY+10) + 'px';
    i.style.left = (event.clientX+10)+ 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
  }

  /**
   * 获取快递公司的信息
   */
  getDelivery(){
    let url = '/ord/tail/loadByDelivery';
    let data={
      ordno:this.ordno
    }
    this.deliveryData=this.orderService.getShopList(url,data);
    console.log("█ this.deliveryData ►►►",  this.deliveryData);
  }

  /**
   * 展示时间列表
   * @param target
   */
  showTimeList(target){
    target.style.display = 'block';
  }

  /**
   * 隐藏时间列表
   * @param target
   */
  hideTimesList(target){
    target.style.display = 'none';
  }

  /**
   * 去付款
   */
  goPay(ordno){
    this.router.navigate(['/main/stockMan/pay'],{ queryParams: {'ordno':ordno} })
  }

  /**
   * json 转 object
   * @param val
   */
  jsonToObject(val:string){
    return RzhtoolsService.jsonToObject(val);
  }

  /**
   * 取消的订单或者成功的商品再次进行购买
   */
  againBuy(goodsCode, num){
    let url = '/agent/agentCart/addCustCart';
    let data = {
      strData: `${goodsCode},${num};`
    }
    this.orderService.sendCar(url, data)
  }




  /**
   *显示物流信息
   * @param orderId
   */
  showLogistics(){
    let url='/ord/tail/queryList';
    let data={
      ordno:this.ordno
    };
    this.logisticsData=this.orderService.getShopList(url,data);
    for (let item of this.logisticsData){
      if (item.state == 'SUCCESS') {
        this.atime[5] = item.acceptTime;
      } else if (item.state == 'DELIVERY') {
        this.atime[4] = item.acceptTime;
      } else if (item.state == 'PREPARE') {
        this.atime[3] = item.acceptTime;
      } else if (item.state == 'PAID') {
        this.atime[2] = item.acceptTime;
      } else if (item.state == 'CR') {
        this.atime[1] = item.acceptTime;
      }
    }
  }


  /**
   *  取消订单
   *  1.取消完刷新页面
   * @param orderId
   */
  cancelOrder(ordno){
    let url='/agentOrd/cancelAgentOrd';
    let data={
      ordno:ordno
    }
    this.orderService.delAgentOrd(url,data);
    this.getOrderData();
  }

  /**
   * 确认收货
   */
  confirmRecive(ordno) {
    let that=this;
    swal({
        title: '您确认收到货了吗？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        let url = '/agentOrd/updateStateToSuccess';
        let data = {
          ordno: ordno
        }
        that.orderService.delAgentOrd(url, data);
      }
    );
  }

}
