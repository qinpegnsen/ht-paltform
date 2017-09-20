import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "app/core/page/page";
import {isNullOrUndefined, isUndefined} from "util";
import {PageEvent} from "angular2-datatable";
import {GoodsService} from "../goods.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {ManageService} from "./manage.service";
const swal = require('sweetalert');
declare var $: any;

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  private addButton;
  private buttons;
  public goodsList: Page = new Page();
  private query = {
    kindId: '',
    goodsName: '',
    brandName: '',
    state: '',
    isOwnPlat: '',
    goodsAudit: '',
  }; // 查询条件
  private kindList;// 分类列表
  private goodsAudits: any;  // 商品审核状态列表
  private goodsState: any;  // 商品状态列表
  private isOwnPlats: any;  //是否自营列表
  private skuTemplete: any;  // sku商品列表

  constructor(private router: Router,
              private tools: RzhtoolsService,
              private submit: SubmitService,
              public manage: ManageService,
              private goodsService: GoodsService) {
  }

  ngOnInit() {
    let me = this;
    me.queryDatas(1); //查询商品列表
    me.kindList = this.goodsService.getKindList(); //获取分类列表
    me.goodsAudits = this.tools.getEnumDataList('1014');  // 商品审核状态列表
    me.goodsState = this.tools.getEnumDataList('1006');  // 商品状态列表
    me.isOwnPlats = this.tools.getEnumDataList('1001');  // 店铺是否自营
    me.domActions()

    me.addButton = {
      type: 'add',
      text: '发布商品',
    };
    me.buttons = [
      {
        title: "修改/编辑",
        type: "update",
        size: "xs",
        callback: function (baseCode, curPage) {
          me.router.navigate(['/main/goods/publish/edit'], {queryParams: {page: curPage, baseCode: baseCode}});
        }
      }
    ];
  }

  /**
   * 选择分类
   * @param data  选择分类组件输出数据
   */
  getKind(data) {
    this.query.kindId = data.kindId;
    this.queryDatas(1)
  }

  /**
   * 修改商品状态
   * @param type  状态类型
   * @param baseCode   商品基本编码
   * @param pPage  当前页码
   */
  changeState(type, baseCode, pPage) {
    let me = this;
    if (isUndefined(pPage)) pPage = 1;
    switch (type) {
      case 'DOWN':    // 下架
        swal({
          title: "操作警示",
          text: "下架后，所有sku商品都将下架<br>代理商将不能批发该商品",
          type: "warning",
          html: true,
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          cancelButtonText: "取消",
          confirmButtonText: "确认下架",
          closeOnConfirm: false
        },
        function(){
          swal.close();
          me.submit.putRequest('/goodsEdit/updateStateToDown', {goodsBaseCode: baseCode});
          me.queryDatas(pPage);// 刷新当前页
        });
        break;
      case 'STOP':    // 禁售
        swal({
            title: "操作警示",
            text: "禁售后，所有sku商品都将禁售<br>代理商将不能批发该商品",
            type: "warning",
            html: true,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            cancelButtonText: "取消",
            confirmButtonText: "确认禁售",
            closeOnConfirm: false
          },
          function(){
            swal.close();
            me.submit.putRequest('/goodsEdit/updateStateToStop', {goodsBaseCode: baseCode});
            me.queryDatas(pPage);// 刷新当前页
          });
        break;
      case 'NORMAL':  // 申请上架
        me.submit.putRequest('/goodsEdit/appleToNormal', {goodsBaseCode: baseCode});
        me.queryDatas(pPage);// 刷新当前页
        break;
      case 'BAN':     // 解除禁售
        me.submit.putRequest('/goodsEdit/updateStateToNomal', {goodsBaseCode: baseCode});
        me.queryDatas(pPage);// 刷新当前页
        break;
    }
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let requestUrl = '/goodsQuery/query';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      sortColumns: '',
      kindId: _this.query.kindId,
      goodsName: _this.query.goodsName,
      brandName: _this.query.brandName,
      state: _this.query.state,
      isOwnPlat: _this.query.isOwnPlat,
      goodsAudit: _this.query.goodsAudit,
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
  }

  /**
   * 显示窗口组件，加载sku列表
   */
  showSkuList(baseCode, name) {
    let list = this.submit.getData('/goodsQuery/load', {goodsBaseCode: baseCode});// 获取需要展示的数据
    this.skuTemplete = this.manage.skuTemplate(list,name);
    $('body').append(this.skuTemplete);
  }

  private domActions() {
    setTimeout(function(){
      $('body').on('click', '.popup-colse', function () {
        $('body .sku-box').fadeOut(200);
        setTimeout(function(){
          $('body .sku-box').remove()
        },300)
      })
    },0)
  }
}
