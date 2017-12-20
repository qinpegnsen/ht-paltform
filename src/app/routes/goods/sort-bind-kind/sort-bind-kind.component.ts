import {
  Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {SelectComponent} from "ng2-select";
import {GoodsService} from "../goods.service";
import {KindManageComponent} from "../kind-manage/kind-manage.component";
declare var $: any;

@Component({
  selector: 'app-sort-bind-kind',
  templateUrl: './sort-bind-kind.component.html',
  styleUrls: ['./sort-bind-kind.component.scss']
})
export class SortBindKindComponent implements OnInit {
  public showDeliverWindow: boolean = false;
  public expressList: any;   //物流公司列表
  public expressNo: any;     //快递公司快递号
  public expressCode: any;   //快递公司唯一代码
  public curValue: any=new Array();   //快递公司唯一代码
  @Input('orderId') orderId: string;
  @Input('page') page: string;
  @Output() deliverGoods = new EventEmitter();
  @ViewChild('putValue') public putValue: SelectComponent;//设置默认选中的角色


  // ng2Select
  public items: any = new Array();//所有的数据
  public value: any=new Array() ;
  public ids :any;
  public disabled: boolean = false;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderId'] && !isNullOrUndefined(this.orderId)) {
      $('.wrapper > section').css('z-index', 200);
      this.showDeliverWindow = true;
      let data=this.GoodsService.getBrandList(),obj;
      for(let i=0;i<data.length;i++){
          obj={
          id:data[i].id,
          text:data[i].brandName
        };
        this.items.push(obj);
      }
      let curData=this.KindManageComponent.curSortKinds(),curObj;
      console.log("█ curData ►►►",  curData);
      if(curData){
        for(let i=0;i<curData.length;i++){
          curObj={
            id:curData[i].id,
            text:curData[i].brandName
          };
          setTimeout(()=>{
            this.putValue.active.push(curObj);
          })
        }
      }
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(public GoodsService:GoodsService,public KindManageComponent:KindManageComponent) {
  }

  ngOnInit() {

  }

  /**
   * 选择框增加品牌
   * @param value
   */
  public selected(value: any): void {
    console.log('Selected value is: ', value);
    this.addDate(value.text);
  }

  public removed(value: any): void {
    this.items.push(value);
    console.log('Removed value is: ', value);
  }

  public itemsToString(value:Array<any> = []):string {
    return value
      .map((item:any) => {
        return item.id;
      }).join(',');
  }

  public refreshValue(value: any): void {
    console.log("█ value ►►►",  value);
    this.ids = this.itemsToString(value);
    console.log("█ this.ids ►►►",  this.ids);
    this.value = value;
  }

  /**
   * +号增加品牌
   */
  linkKind(value){
    console.log("█ value ►►►",  value);
    let SelectIte={text:value,id:value};
    this.putValue.active.push(SelectIte.text);
    console.log("█ this.putValue.active ►►►",  this.putValue.active);
    // this.curValue.push(SelectIte);
    this.addDate(value);
  }

  /**
   * 增加数据 要从原数组里面减少
   * @param value
   */
  addDate(value){
    for(let i=0;i<this.items.length;i++){
      if(this.items[i]==value){
        this.items.splice(i, 1);
        break;
      }
    }
  }

  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: boolean) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showDeliverWindow = false;
    if (isUndefined(type)) type = false;
    this.deliverGoods.emit({
      type: type,
      page: me.page
    })// 向外传值
  }

  /**
   * 已选区域
   * @param data
   */
  getSelectArea(data) {
    console.log("█ data ►►►", data);
  }

  /**
   * 显示编辑框
   * @param target
   */
  showEditBox(target) {
    $(target).removeClass('hide')
  }

  /**
   * 显示编辑框
   * @param target
   */
  hideEditBox(target) {
    $(target).addClass('hide')
  }

  /**
   * 确认发货
   */
  delivery() {
    let url = '/goodsKind/addRelateBrandAndKind';
    let data = {
      goodsKindId: this.orderId,
      goodsBrandIdStrings: this.ids,
    }
    let result=this.GoodsService.sortLinkKind(url,data);
    if(result.success){
      this.hideWindow(true);
    }
    console.log("█ result ►►►",  result);
  }

}
