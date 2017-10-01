import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sys-message',
  templateUrl: './sys-message.component.html',
  styleUrls: ['./sys-message.component.scss']
})
export class SysMessageComponent implements OnInit {
  public orderType: string = '';
  constructor() { }

  ngOnInit() {
  }

}
