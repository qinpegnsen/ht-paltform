import {Directive, ElementRef, HostListener, Input, Renderer} from '@angular/core';
import {isUndefined} from "util";

@Directive({
  selector: '[myHoverColor]'
})
export class HoverDirective {
  public defaultColor: string = '#666';
  @Input('myHover') hoveredColor: string

  constructor(public el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    let color = this.defaultColor;
    if(!isUndefined(this.hoveredColor)) color = this.hoveredColor;
    this.hoverColor(color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hoverColor(null);
  }

  public hoverColor(color: string) {
    this.el.nativeElement.style.color = color;
  }

}
