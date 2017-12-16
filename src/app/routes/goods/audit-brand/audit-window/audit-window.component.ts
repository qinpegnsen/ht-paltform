import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {PatternService} from "../../../../core/forms/pattern.service";
declare var $: any;

@Component({
  selector: 'app-audit-window',
  templateUrl: './audit-window.component.html',
  styleUrls: ['./audit-window.component.scss']
})
export class AuditWindowComponent implements OnInit, OnDestroy {
  public isAudit: boolean = true;//是否是审核，父组件监听用
  public brandId: string;//品牌id
  public brandInfo: any = {};

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
    $('body').css("overflow-y", 'scroll');
  }

  constructor(public location: Location,
              public patterns: PatternService) {
    $('.wrapper > section').css('z-index', 200);
    $('body').css("overflow-y", 'hidden');
  }

  ngOnInit() {
  }

  hideWindow() {
    this.location.back();
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
