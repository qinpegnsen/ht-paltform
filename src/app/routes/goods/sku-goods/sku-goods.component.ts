import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
declare var $: any;

@Component({
  selector: 'app-sku-goods',
  templateUrl: './sku-goods.component.html',
  styleUrls: ['./sku-goods.component.scss']
})
export class SkuGoodsComponent implements OnInit {
  showWindow: boolean = false;
  skuData: any;
  @Input('curCode') curCode: string;
  @Input('curName') curName: string;
  @Input('page') page: string;
  @Output() looked = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['curCode'] && !isNullOrUndefined(this.curCode)) {
      $('.wrapper > section').css('z-index', 200);
      this.getSkuDataByCode();
      this.showWindow = true;
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  /**
   * 通过基本编码获取sku数据
   */
  getSkuDataByCode(){
    let list = this.submit.getData('/goodsQuery/load', {goodsBaseCode: this.curCode});// 获取需要展示的数据
    if(!isNullOrUndefined(list)) this.skuData = list;
  }

  constructor(private submit:SubmitService) { }

  ngOnInit() {
  }
  /**
   * 关闭当前窗口，向父页面传递信息
   */
  hideWindow(type?: boolean) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showWindow = false;
    if (isUndefined(type)) type = false;
    this.looked.emit({
      type: type,
      page: me.page
    })// 向外传值
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
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }

}
