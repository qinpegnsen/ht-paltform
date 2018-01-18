import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import set = Reflect.set;
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    $('body').css('overflow', 'auto');
    $('.wrapper > section').css('z-index', 114);
  }

  public showWindow: boolean = false;
  private data: Array<any> = new Array();
  public searchText: string = '';
  public checkedItem: Array<any> = new Array();

  @Input('data') nativeData: Array<any> = new Array();
  @Input('width') width: number;    //设置宽度
  @Input('maxHeight') maxHeight: number;  //设置结果显示区的最大高，溢出则显示滚动条
  @Input('idKey') idKey: string = 'id';    //指定编码字段的key
  @Input('textKey') textKey: string = 'text';    //设置显示文本的字段的key
  @Input('placeholder') placeholder: string = '';    //默认显示文本
  @Input('defaultId') defaultId: Array<any> = new Array();    //设置选中项的id（或其他），字符串数组
  @Input('multiple') multiple: boolean = false;    //设置多选
  @Input('disabled') disabled: boolean = false;    //设置是否可编辑
  @Input('allowClear') allowClear: boolean = false;    //单选时，设置是否允许清空
  @Output() selected = new EventEmitter();   //向外输出选中的结果
  @Output() removed = new EventEmitter();   //向外输出取消选中的项

  constructor() {
  }

  ngOnInit() {
    let me = this;
    me.setDeafultVal();//默认选项
    if (me.allowClear) {
      setTimeout(_ => {
        $('.single-show').hover(_ => $('.clear').show(), _ => $('.clear').hide())
      })
    }
  }

  /**
   * 找到与搜索条件匹配的项
   */
  matchResult(): void {
    let me = this;
    if (me.searchText) {
      me.data = me.data.filter(val => {
        return val[me.textKey].indexOf(me.searchText) >= 0;
      })
    } else this.refreshData();
  }

  /**
   * 设置默认选项
   */
  setDeafultVal(): void {
    let me = this, checked: Array<any> = new Array();
    /*当没有选中项*/
    if (me.defaultId && me.defaultId.length > 0) {
      me.checkedItem = me.nativeData.filter(item => {
        let selected: boolean = me.defaultId.some(it => {
          return it === item[me.idKey]
        })
        if (selected) return item;
      })
    }
  }

  /**
   * 显示搜索框
   */
  showSearchBox(): void {
    this.showWindow = true;
    this.setStyle();  //设置样式
    this.refreshData();
  }

  /**
   * 隐藏搜索框
   */
  hideSearchBox(): void {
    this.showWindow = false;
    $('body').css('overflow', 'auto');
    $('.wrapper > section').css('z-index', 114);
  }

  /**
   * 从选中的数组中移除当前项
   * @param idx
   */
  removeItem(idx) {
    this.removed.emit(this.checkedItem[idx]);
    this.checkedItem.splice(idx, 1);//从选中的数组中移除当前项
    if (this.checkedItem.length == 0) this.defaultId = new Array();//如果全部移除，默认选中项也置为空
    this.refreshData();
  }

  clearChecked() {
    if (this.allowClear) this.checkedItem = new Array(), this.defaultId = new Array();
    this.refreshData();
  }

  /**
   * 向外传值
   * @param item（eg：{id: 12345, text: '心心相印'}）
   */
  emitResult(item ?: any) {
    if (!item) {// 当res不存在时，说明点击了确认
      if (!this.multiple) this.selected.emit(this.checkedItem[0]);// 单选向外传值，结果是一个对象，包含编码和值
      else this.selected.emit(this.checkedItem);// 多选向外传值，结果是一个对象数组，包含编码和值
      this.hideSearchBox();
    } else {
      if (!this.multiple) {
        this.checkedItem[0] = item;
        this.hideSearchBox();
        this.selected.emit(item);
      }// 单选向外传值，结果是一个对象，包含编码和值
      else {
        let hadItem: boolean = this.checkedItem.some(it => {
          return it[this.idKey] === item[this.idKey]
        })
        if (!hadItem) this.checkedItem.push(item);
      }
      this.refreshData();
    }
  }

  /**
   * 更新结果区展示的未选中数据
   */
  refreshData() {
    let me = this;
    me.data = me.nativeData.filter(item => {
      let selected: boolean = me.checkedItem.some(it => {
        return it[me.idKey] === item[me.idKey]
      })
      if (!selected) return item;
    })
  }

  /**
   * 设置样式
   */
  setStyle() {
    let me = this;
    setTimeout(_ => {
      $('body').css('overflow', 'hidden');
      $('.wrapper > section').css('z-index', 200);
      if (me.width) $('.search-body').css({
        'width': me.width,
        'margin-left': -me.width / 2
      });
      if (me.maxHeight) $('.search-result').css('max-height', me.maxHeight);
      $('.search-input input').focus();
    })
  }

}
