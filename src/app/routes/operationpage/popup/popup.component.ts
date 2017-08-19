import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AppComponent} from "../../../app.component";
declare var $: any;

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  providers: []
})
export class PopupComponent implements OnInit {
  @Input() val: any;// 输入值
  @Output() output = new EventEmitter();// 输出值

  constructor(private app: AppComponent) {
  }

  ngOnInit() {
    console.log("█ 传入值this.argument ►►►",  this.val);
  }

  closePopup() {
    $('.popup').slideUp(300, this.app.container.clear());
  }

  makeSure() {
    this.output.emit('传出值：hello world!')// 向外传值
  }
}
