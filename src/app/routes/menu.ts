/**
 * 菜单管理
 * @type {{text: string; link: string; icon: string; submenu: [{text: string; link: string},{text: string; link: string}]}}
 */
const website = {
  text: '站点设置',
  icon: 'fa fa-gears text-center',
  submenu: [
    {
      text: '快递公司',
      icon: 'fa fa-bar-chart',
      link: '/main/echarts'
    },
    {
      text: '文章管理',
      icon: 'fa fa-bar-chart',
      link: '/main/msg'
    },
    {
      text: '计量单位',
      icon: 'fa fa-bar-chart',
      link: '/main/msg'
    }
  ]
};
const operation = {
  text: '运营管理',
  link: '/main/navtree',
  icon: 'fa fa-code-fork'
};
const goods = {
  text: '商品管理',
  icon: 'icon-chart',
  submenu: [
    {
      text: '商品管理',
      icon: 'fa fa-bar-chart',
      link: '/main/datatables/datatable'
    },
    {
      text: '分类管理',
      icon: 'fa fa-bar-chart',
      link: '/main/datatables/ng2-datatable'
    },
    {
      text: '品牌管理',
      icon: 'fa fa-bar-chart',
      link: '/main/datatables/ng2-datatable'
    }
  ]
};
const shop = {
  text: '店铺管理',
  icon: 'icon-volume-2',
  submenu: [
    {
      text: '店铺管理',
      icon: 'fa fa-bar-chart',
      link: '/main/msg'
    },
    {
      text: '店铺账号管理',
      icon: 'fa fa-bar-chart',
      link: '/main/buttons'
    }
  ]
};
const member = {
  text: '会员管理',
  icon: 'fa fa-bar-chart',
  submenu: [
    {
      text: '会员管理',
      icon: 'fa fa-bar-chart',
      link: '/main/echarts'
    },
    {
      text: '积分管理',
      icon: 'fa fa-bar-chart',
      alert: '▼',
      submenu: [
        {
          text: '积分增减',
          link: '/main/echarts'
        }
      ]
    }
  ]
};
const orders = {
  text: '订单管理',
  icon: 'icon-doc',
  submenu: [
    {
      text: '商品订单',
      icon: 'fa fa-bar-chart',
      link: '/main/msg'
    },
    {
      text: '评价管理',
      icon: 'fa fa-bar-chart',
      alert: '▼',
      submenu: [
        {
          text: '店铺评价',
          link: '/main/msg'
        },
        {
          text: '买家评价',
          link: '/main/buttons'
        }
      ]
    }
  ]
};
const sale = {
  text: '售前售后',
  link: '/main/navtree',
  icon: 'fa fa-code-fork',
  submenu: [
    {
      text: '退款',
      icon: 'fa fa-bar-chart',
      link: '/main/buttons'
    },
    {
      text: '退货',
      icon: 'fa fa-bar-chart',
      link: '/main/msg'
    }
  ]
};
const statistics = {
  text: '统计管理',
  icon: 'fa fa-toggle-off',
  submenu: [
    {
      text: '统计设置',
      icon: 'fa fa-bar-chart',
      alert: '▼',
      submenu: [
        {
          text: '统计缓存重置',
          link: '/main/msg'
        }
      ]
    },
    {
      text: '会员统计',
      icon: 'fa fa-bar-chart',
      alert: '▼',
      submenu: [
        {
          text: '新增会员',
          link: '/main/msg'
        },
        {
          text: '会员分析',
          link: '/main/buttons'
        },
        {
          text: '区域分析',
          link: '/main/msg'
        },
        {
          text: '购买分析',
          link: '/main/buttons'
        }
      ]
    },
    {
      text: '销量分析',
      icon: 'fa fa-bar-chart',
      alert: '▼',
      submenu: [
        {
          text: '结算统计',
          link: '/main/msg'
        },
        {
          text: '订单统计',
          link: '/main/buttons'
        }
      ]
    },
    {
      text: '商品分析',
      icon: 'fa fa-bar-chart',
      alert: '▼',
      submenu: [
        {
          text: '热卖商品',
          link: '/main/msg'
        },
        {
          text: '商品销售明细',
          link: '/main/buttons'
        }
      ]
    },
    {
      text: '售后分析',
      icon: 'fa fa-bar-chart',
      alert: '▼',
      submenu: [
        {
          text: '退款统计',
          link: '/main/msg'
        },
        {
          text: '退货统计',
          link: '/main/buttons'
        }
      ]
    }
  ]
};
const agent = {
  text: '代理商管理',
  link: '/main/navtree',
  icon: 'fa fa-code-fork',
  submenu: [
    {
      text: '代理商管理',
      icon: 'fa fa-bar-chart',
      link: '/main/msg'
    },
    {
      text: '代理区域管理',
      icon: 'fa fa-bar-chart',
      link: '/main/msg'
    },
    {
      text: '进货管理',
      icon: 'fa fa-bar-chart',
      link: '/main/buttons'
    }
  ]
};
const app = {
  text: 'APP管理',
  link: '/main/navtree',
  icon: 'fa fa-code-fork',
  submenu: [
    {
      text: '应用设置',
      icon: 'fa fa-bar-chart',
      link: '/main/msg'
    },
    {
      text: '消息推送',
      icon: 'fa fa-bar-chart',
      link: '/main/buttons'
    }
  ]
};


/**
 * 菜单配置
 */
export let menu = [
  website,
  operation,
  goods,
  shop,
  member,
  orders,
  sale,
  statistics,
  agent,
  app
];
