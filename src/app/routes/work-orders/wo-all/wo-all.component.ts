import { Component, OnInit } from '@angular/core';
import {WoManageComponent} from "../wo-manage/wo-manage.component";

@Component({
  selector: 'app-wo-all',
  templateUrl: './wo-all.component.html',
  styleUrls: ['./wo-all.component.scss']
})
export class WoAllComponent implements OnInit {

  constructor(private parentComp: WoManageComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.woType = 1
  }

}
