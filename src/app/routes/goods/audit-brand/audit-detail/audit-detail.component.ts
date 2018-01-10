import {Component, OnInit} from '@angular/core';
import {SubmitService} from "../../../../core/forms/submit.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
@Component({
  selector: 'app-audit-detail',
  templateUrl: './audit-detail.component.html',
  styleUrls: ['./audit-detail.component.scss']
})
export class AuditDetailComponent implements OnInit {
  public applyCode: any;//品牌code
  public result: any;//品牌信息

  constructor(public submit: SubmitService,
              public location:Location,
              public routeInfo: ActivatedRoute) {
  }

  ngOnInit() {
    this.applyCode = this.routeInfo.snapshot.queryParams['applyCode'];//获取品牌code
    this.qeuryDand();//查询品牌信息
  }

  /**
   * 查询品牌信息
   */
  qeuryDand() {
    let me = this, activePage = 1;
    let url = "/goodsBrandApply/loadByApplyCode";
    let data = {
      applyCode: me.applyCode
    }
    me.result = this.submit.getData(url, data);
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

  /**
   * 返回
   */
  back(){
    this.location.back();
  }

}
