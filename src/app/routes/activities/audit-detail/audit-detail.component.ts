import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {Location} from "@angular/common";
import {ActivitiesService} from "../activities.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-audit-detail',
  templateUrl: './audit-detail.component.html',
  styleUrls: ['./audit-detail.component.scss']
})
export class AuditDetailComponent implements OnInit {

  public id: string;              //当前的id
  public refresh: boolean;          //父组件是否需要刷新
  public loadWDData: any;          //load当前的数据


  constructor(public router: Router,
              public submit: SubmitService,
              public location: Location,
              public activitiesService: ActivitiesService) {
  }

  ngOnInit() {
    let me = this;
    let url='/rpCustWithdraw/load';
    let data={
      id:me.submit.getParams('id')
    };
    me.loadWDData=me.activitiesService.loadeWidthDraw(url,data);
    if(isNullOrUndefined(me.loadWDData)){
      this.location.back();
    }
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 15) + 'px';
    target.style.left = (event.clientX + 20) + 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }

  back(){
    this.location.back();
  }
}
