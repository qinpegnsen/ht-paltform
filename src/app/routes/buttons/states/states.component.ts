import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
  private icon:string;
  private btnClass:string;

  @Input() state:string;
  @Input() size:string;
  @Input() hidden:boolean;
  @Output() callback = new EventEmitter<any>(); //点击事件回调

  constructor() { }

  public getSize(){
    switch (this.size) {
      case "lg":
        return "btn-lg";
      case "sm":
        return "btn-sm";
      case "xs":
        return "btn-xs";
      case "md":
        return "";
      default :
        return "btn-sm";
    }
  }

  ngOnInit() {
    this.btnClass = this.getInput().classes;
    console.log(this.btnClass)
  }

  getInput(){
    let me = this;
    switch (this.state) {
      case "OPEN":
        return {
          classes:'btn btn-info fa fa-play '+ me.getSize(),
          callback: function(){

          }
        };
      case "PAUSE":
        return {
          classes:'btn btn-primary fa fa-pause '+ me.getSize(),
          callback: function(){

          }
        }
      case "CLOSE":
        return {
          classes:'btn btn-danger fa fa-pause '+ me.getSize(),
          callback: function(){

          }
        }
      case "DEL":
        return {
          classes:'btn bg-gray-dark fa fa-pause '+ me.getSize(),
          callback: function(){

          }
        }
    }
  }

}
