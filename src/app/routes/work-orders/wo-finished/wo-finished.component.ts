import { Component, OnInit } from '@angular/core';
import {WoManageComponent} from "../wo-manage/wo-manage.component";

@Component({
  selector: 'app-wo-finished',
  templateUrl: './wo-finished.component.html',
  styleUrls: ['./wo-finished.component.scss']
})
export class WoFinishedComponent implements OnInit {

  constructor(private parentComp: WoManageComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.woType = 6
  }

}
