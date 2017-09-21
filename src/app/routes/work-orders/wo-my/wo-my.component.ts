import { Component, OnInit } from '@angular/core';
import {WoManageComponent} from "../wo-manage/wo-manage.component";

@Component({
  selector: 'app-wo-my',
  templateUrl: './wo-my.component.html',
  styleUrls: ['./wo-my.component.scss']
})
export class WoMyComponent implements OnInit {

  constructor(private parentComp: WoManageComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.woType = 4
  }

}
