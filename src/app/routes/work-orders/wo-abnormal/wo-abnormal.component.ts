import { Component, OnInit } from '@angular/core';
import {WoManageComponent} from "../wo-manage/wo-manage.component";

@Component({
  selector: 'app-wo-abnormal',
  templateUrl: './wo-abnormal.component.html',
  styleUrls: ['./wo-abnormal.component.scss']
})
export class WoAbnormalComponent implements OnInit {

  constructor(private parentComp: WoManageComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.woType = 7
  }

}
