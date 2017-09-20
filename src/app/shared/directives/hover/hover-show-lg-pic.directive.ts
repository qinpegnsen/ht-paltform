import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {isNullOrUndefined} from "util";
declare var $: any;

@Directive({
  selector: '[appHoverShowLgPic]'
})
export class HoverShowLgPicDirective {
  @Input('myConfig') config: any;

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    let me = this, target = me.el.nativeElement;
    if(isNullOrUndefined(me.config)){
      $(target).next().stop().fadeIn(200)
    }else{
      $(target).next().css({
        width: me.config.width,
        height: me.config.height,
      }).stop().fadeIn(200)
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    let me = this, target = me.el.nativeElement;
    $(target).next().stop().fadeOut(200)
  }
}
