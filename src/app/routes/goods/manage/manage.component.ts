import {Component, ComponentFactoryResolver, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "app/core/page/page";
import {isUndefined} from "util";
import {PageEvent} from "angular2-datatable";
import {GoodsService} from "../goods.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
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
  private query: any; // 查询条件
  private kindList;// 分类列表
  private goodsAudits: any;  // 商品审核状态列表
  private goodsState: any;  // 商品状态列表
  private isOwnPlats: any;  //是否自营列表
  private skuTemplete: any;  // sku商品列表

  constructor(private router: Router,
              private tools: RzhtoolsService,
              private submit: SubmitService,
              private goodsService: GoodsService) {
  }

  ngOnInit() {
    let me = this;
    me.query = {
      kindId: '',
      goodsName: '',
      brandName: '',
      state: '',
      isOwnPlat: '',
      goodsAudit: '',
    }
    me.queryDatas(1); //查询第一页商品列表
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
        me.submit.putRequest('/goodsEdit/updateStateToDown', {goodsBaseCode: baseCode});
        me.queryDatas(pPage);// 刷新当前页
        break;
      case 'STOP':    // 禁售
        me.submit.putRequest('/goodsEdit/updateStateToStop', {goodsBaseCode: baseCode});
        me.queryDatas(pPage);// 刷新当前页
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
    }
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
    let _this = this,_item = '';
    let list = _this.submit.getData('/goodsQuery/load', {goodsBaseCode: baseCode});// 获取需要展示的数据
    for(let item of list){
      _item += `<tr class="item-bottom-border"><td class="position-relative p"><img class="goods-xs-img" src="`+item.goodsImage+` alt="">
      <div class="mb0 goods-xs-info"><a class="goods-name" href="javascript:;">`+item.goodsName+`</a></div></td>
      <td class="text-center">`+item.goodsPrice.price+`</td>
      <td class="text-center">`+item.storageNum+`</td>
      </tr>`
    }
    _this.skuTemplete = `<div class="mask fadeIn sku-box">
  <div class="popup animated fadeIn">

    <div class="pop popup-hd font14">
      查看商品<span class="font16">“`+name+`”</span>的规格
      <div class="popup-colse unselectable">×</div>
    </div>
    <div class="pop popup-bd p">
      <table class="w100" style="max-height: 500px">
        <thead class="bg-gray-lighter">
          <tr>
            <td class="col-xs-8 p">商品规格</td>
            <td class="col-xs-2 p text-center">价格</td>
            <td class="col-xs-2 p text-center">库存</td>
          </tr>
        </thead>
        <tbody>`+_item+`</tbody>
      </table>
    </div>
    <div class="pop popup-ft"></div>
    </div>
    </div>
    `
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
