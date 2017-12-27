import {Component, OnInit} from "@angular/core";
import {SubmitService} from "../../../../core/forms/submit.service";
import {Page} from "app/core/page/page";
import {isUndefined} from "util";
import {PageEvent} from "angular2-datatable";
import {GoodsService} from "../../goods.service";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
const swal = require('sweetalert');
declare var $: any;

@Component({
  selector: 'app-un-audit',
  templateUrl: './un-audit.component.html',
  styleUrls: ['./un-audit.component.scss']
})
export class UnAuditComponent implements OnInit {
  public goodsList: Page = new Page();
  public auditQuery = {
    kindId: '',
    goodsName: '',
    brandName: '',
    state: '',
    isOwnPlat: 'Y',
    curPage: 1,
    pageSize: 10,
    sortColumns: 'create_time DESC',//倒序排列
    goodsAudit: 'AUDIT',
  }; // 查询条件
  public kindList;// 分类列表
  public goodsState: any;  // 商品状态列表
  public curBaseCode: string;  // 当前商品基本编号
  public curName: string;    // 当前商品名称
  public showList: boolean = true;     //是否显示列表页

  constructor(public tools: RzhtoolsService,
              public submit: SubmitService,
              public goodsService: GoodsService) {
  }

  ngOnInit() {
    let me = this;
    me.queryDatas(); //查询商品列表
    me.kindList = this.goodsService.getKindList(); //获取分类列表
    me.goodsState = this.tools.getEnumDataList('1006');  // 商品状态列表
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    if(event.refresh) this.queryDatas(this.auditQuery.curPage)
  }

  /**
   * 选择分类
   * @param data  选择分类组件输出数据
   */
  getKind(data) {
    this.auditQuery.kindId = data.kindId;
    this.queryDatas()
  }

  /**
   *更改商品是否可用重消币
   * @param type
   * @param baseCode
   * @param curPage
   */
  changeIsUseCoin(type, baseCode, curPage) {
    let isUseCoin, requestData, requestUrl;
    isUseCoin = type ? 'N' : 'Y';
    requestUrl = '/goodsEdit/updateIsUseCoin';
    requestData = {
      goodsBaseCode: baseCode,
      isUseCoin: isUseCoin
    };
    this.submit.putRequest(requestUrl, requestData);
    this.queryDatas(curPage);
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 20) + 'px';
    target.style.left = (event.clientX + 30) + 'px';
  }

  /**
   * 隐藏大图
   * @param event
   */
  hideImg(event){
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage?, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    _this.auditQuery.curPage = activePage;
    let requestUrl = '/goodsQuery/query';
    _this.goodsList = new Page(_this.submit.getData(requestUrl, _this.auditQuery));
  }

  /**
   * 显示窗口组件，加载sku列表
   */
  showSkuList(baseCode, name) {
    this.curBaseCode = baseCode;
    this.curName = name;
  }

  /**
   * 查看sku商品的回调函数
   * @param data
   */
  getSkuData(data) {
    this.curBaseCode = null;
    if(data.type) this.queryDatas(data.page)
  }
}

