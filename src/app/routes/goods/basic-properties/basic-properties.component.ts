import {Component, Input, OnInit} from "@angular/core";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {GoodsService} from "../goods.service";
import {cli} from "webdriver-manager/built/lib/webdriver";
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');
@Component({
  selector: 'app-basic-properties',
  templateUrl: './basic-properties.component.html',
  styleUrls: ['./basic-properties.component.scss']
})
export class BasicPropertiesComponent implements OnInit {

  @Input() selType: any; //选中的商品分类
  private addbuttons;//添加按钮
  private updatebuttons: Object;//修改按钮
  private deletebuttons: Object;//删除按钮
  private selectGoodsType:any; //选择的分类信息

  private kindList;// 分类列表
  private kindId:string;
  public data: Page = new Page();
  private showAddWindow:boolean = false;
  private showUpdateWindow:boolean = false;

  private name1:any;
  private val1:any;
  private id1:any;
  constructor( private submit: SubmitService,private goods: GoodsService) { }

  ngOnInit() {

    let me = this;
    me.kindList = me.goods.getKindList(); //获取分类列表
    //按钮配置
    me.addbuttons = {
      type: "add",
      title: '添加',
      text:'添加基本属性'
    };
    me.updatebuttons = {
      title: "编辑",
      type: "update"
    };
    me.deletebuttons = {
      title: "删除",
      type: "delete"
    };
    this.queryBaseEnumList();
  }
  /**
   * 选择分类
   * @param data  选择分类组件输出数据
   */
  getKind(data) {
    let _this = this;
    _this.selectGoodsType = data;
    _this.kindId = data.kindId;
    _this.queryBaseEnumList();
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  queryBaseEnumList(kindId?) {
    let _this = this,sel= _this.selType;
    if ((isNullOrUndefined(this.kindId) || this.kindId == "") && sel) _this.getKind(sel);
    let requestUrl = '/goodsEnum/queryBaseEnumList';
    let requestData = {
      kindId:kindId?kindId:_this.kindId,
    };
    let result=_this.submit.getData(requestUrl, requestData);
    console.log("█ result ►►►",  result);
    console.log("█ result.baseTypeList  ►►►",  result.baseTypeList);
    _this.data = result;
  }

  //删除
  delete(delid) {
    let me=this;
    let url = "/goodsEnum/deleteGoodsEnum";
    let data={
      id:delid
    }
    swal({
        title: '确认删除此信息？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        me.submit.delRequest(url, data); //删除数据
        me.queryBaseEnumList(); //更新
      }
    );
  }
  /*
  * 添加弹窗
  * */
  addNewData() {
    this.showAddWindow = true;
  }
  /*
  * 修改弹窗
  * */
  updateNewData(name,val) {
    this.name1=name,
    this.val1=val,
    this.showUpdateWindow = true;
  }
  /**
   * 发货回调函数
   * @param data
   */
  getAddDataResult(data) {
    this.showAddWindow = false;
    if(data == 'success') this.queryBaseEnumList()
  }
  getUpdateResult(data) {
    this.showUpdateWindow = false;
    if(data == 'success') this.queryBaseEnumList()
  }


}
