import { Component, OnInit } from '@angular/core';
import {WoManageComponent} from "../wo-manage/wo-manage.component";

@Component({
  selector: 'app-wo-disposed',
  templateUrl: './wo-disposed.component.html',
  styleUrls: ['./wo-disposed.component.scss']
})
export class WoDisposedComponent implements OnInit {

  constructor(private parentComp: WoManageComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.woType = 5
  }

}
