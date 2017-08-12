import {Component, OnInit, Injector} from '@angular/core';
import {Router} from '@angular/router';
declare var $: any;

import {MenuService} from '../../core/menu/menu.service';
import {SettingsService} from '../../core/settings/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: Array<any>;
  router: Router;

  constructor(public menu: MenuService, public settings: SettingsService, public injector: Injector) {
    this.menuItems = menu.getMenu(); //设置导航栏目
  }

  ngOnInit() {
    this.router = this.injector.get(Router);
    this.router.events.subscribe((val) => {
      // 路由发生变化时，改变子菜单
      this.removeFloatingNav();
      // 去页面顶部
      window.scrollTo(0, 0);
    });

  }

  // 点击导航菜单时，处理
  toggleSubmenuClick(event) {
    if (!this.isSidebarCollapsed() && !this.isSidebarCollapsedText() && !this.isEnabledHover()) {
      event.preventDefault();

      let target = $(event.target || event.srcElement || event.currentTarget);
      let ul, anchor = target;

      // find the UL
      if (!target.is('a')) {
        anchor = target.parent('a').first();
      }
      ul = anchor.next();

      // hide other submenus
      let parentNav = ul.parents('.sidebar-subnav');
      $('.sidebar-subnav').each((idx, el) => {
        let $el = $(el);
        // if element is not a parent or self ul
        if (!$el.is(parentNav) && !$el.is(ul)) {
          this.closeMenu($el);
        }
      });

      // abort if not UL to process
      if (!ul.length) {
        return;
      }

      // any child menu should start closed
      ul.find('.sidebar-subnav').each((idx, el) => {
        this.closeMenu($(el));
      });

      // toggle UL height
      if (parseInt(ul.height(), 0)) {
        this.closeMenu(ul);
      }
      else {
        // expand menu
        ul.on('transitionend', () => {
          ul.height('auto').off('transitionend');
        }).height(ul[0].scrollHeight);
        // add class to manage animation
        ul.addClass('opening');
      }

    }

  }

  // 菜单崩溃时，关闭对应高度
  closeMenu(elem) {
    elem.height(elem[0].scrollHeight); // 设置高度
    elem.height(0); // 剔除高度
    elem.removeClass('opening');
  }

  // 光标临近导航菜单
  toggleSubmenuHover(event) {
    let self = this;
    if (this.isSidebarCollapsed() || this.isSidebarCollapsedText() || this.isEnabledHover()) {
      event.preventDefault();

      this.removeFloatingNav();

      let target = $(event.target || event.srcElement || event.currentTarget);
      let ul, anchor = target;
      // find the UL
      if (!target.is('a')) {
        anchor = target.parent('a');
      }
      ul = anchor.next();

      if (!ul.length) {
        return; // if not submenu return
      }

      let $aside = $('.aside');
      let $asideInner = $aside.children('.aside-inner'); // for top offset calculation
      let $sidebar = $asideInner.children('.sidebar');
      let mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);
      let itemTop = ((anchor.parent().position().top) + mar) - $sidebar.scrollTop();

      let floatingNav = ul.clone().appendTo($aside);
      let vwHeight = $(window).height();

      // let itemTop = anchor.position().top || anchor.offset().top;

      floatingNav
        .removeClass('opening') // necesary for demo if switched between normal//collapsed mode
        .addClass('nav-floating')
        .css({
          position: this.settings.layout.isFixed ? 'fixed' : 'absolute',
          top: itemTop,
          bottom: (floatingNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
        });

      floatingNav
        .on('mouseleave', () => {
          floatingNav.remove();
        })
        .find('a').on('click', function (e) {
        e.preventDefault(); // prevents page reload on click
        // get the exact route path to navigate
        self.router.navigate([$(this).attr('route')]);
      });

      this.listenForExternalClicks();

    }

  }

  // 监听点击
  listenForExternalClicks() {
    let $doc = $(document).on('click.sidebar', (e) => {
      if (!$(e.target).parents('.aside').length) {
        this.removeFloatingNav();
        $doc.off('click.sidebar');
      }
    });
  }

  // 删除浮动菜单
  removeFloatingNav() {
    $('.nav-floating').remove();
  }

  isSidebarCollapsed() {
    return this.settings.layout.isCollapsed;
  }

  isSidebarCollapsedText() {
    return this.settings.layout.isCollapsedText;
  }

  isEnabledHover() {
    return this.settings.layout.asideHover;
  }
}
