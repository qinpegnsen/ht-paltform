/**
 * 系统管理
 * @type {{text: string; link: string; icon: string; submenu: [{text: string; link: string},{text: string; link: string}]}}
 */
const system = {
  text: '图表2',
  icon: 'fa fa-gears text-center',
  // link: '/main/echarts',
  alert: 'child',
  submenu: [
    {
      text: '图表',
      link: '/main/echarts'
    },
    {
      text: '消息通知',
      link: '/main/msg'
    },
    {
      text: '按钮',
      link: '/main/buttons'
    }
  ]
}

const SystemMain = {
  text: '测试菜单',
  heading: true
};
const datatables = {
  text: '列表',
  // link: '/main/datatables',
  icon: 'icon-chart',
  submenu: [
    {
      text: 'datatables',
      link: '/main/datatables/datatable'
    },
    {
      text: 'ng2-datatable',
      link: '/main/datatables/ng2-datatable'
    }
  ]
};
const msg = {
  text: '弹框',
  // link: '/main/msg',
  icon: 'icon-volume-2',
  submenu: [
    {
      text: '消息通知',
      link: '/main/msg'
    },
    {
      text: '按钮',
      link: '/main/buttons'
    }
  ]
};
const echarts = {
  text: 'echarts',
  // link: '/main/echarts',
  icon: 'fa fa-bar-chart',
  submenu: [
    {
      text: '图表',
      link: '/main/echarts'
    },
    {
      text: '消息通知',
      link: '/main/msg'
    },
    {
      text: '按钮',
      link: '/main/buttons'
    }
  ]
};
const operationpage = {
  text: '页面',
  // link: '/main/operationpage',
  icon: 'icon-doc',
  submenu: [
    {
      text: '弹窗',
      link: '/main/msg'
    },
    {
      text: '按钮',
      link: '/main/buttons'
    },
    {
      text: '图表',
      link: '/main/echarts'
    }
  ]
};
const navtree = {
  text: '树',
  link: '/main/navtree',
  icon: 'fa fa-code-fork'
};
const buttons = {
  text: '按钮',
  // link: '/main/buttons',
  icon: 'fa fa-toggle-off',
  submenu: [
    {
      text: '按钮',
      link: '/main/buttons'
    },
    {
      text: '弹窗',
      link: '/main/msg'
    },
    {
      text: '图表',
      link: '/main/echarts'
    }
  ]
};

/**
 * 菜单配置
 */
export let menu = [
  buttons,
  echarts,
  msg,
  system
];
