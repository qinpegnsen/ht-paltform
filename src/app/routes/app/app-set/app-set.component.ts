import { Component, OnInit } from '@angular/core';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';
import {SubmitService} from '../../../core/forms/submit.service';

@Component({
  selector: 'app-app-set',
  templateUrl: './app-set.component.html',
  styleUrls: ['./app-set.component.scss']
})
export class AppSetComponent implements OnInit {
  public items;
  private moduleList = [];
  private item;
  private curItem;

  constructor(private submit: SubmitService) { }

  ngOnInit() {
    let _this = this;
    _this.queryDatas(_this.item);
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    }
    let requestUrl = '/phone/indexTpl/list';
    let requestData = {};
    _this.items = _this.submit.getData(requestUrl, requestData);
    console.log("█ _this.items  ►►►",  _this.items );

  }

  public addTpl(item){
    this.moduleList.push({reslut: '../../../assets/img/bg1.jpg', index: this.moduleList.length + 1,data:item});
  }

  public addTplCont(item){
    let _this = this;
    _this.curItem=item;
    console.log("█ item ►►►",  item);
    console.log("█ curItem ►►►",  _this.curItem);
    console.log("█ curItem.tplName ►►►",  _this.curItem.tplName);

  }
}
