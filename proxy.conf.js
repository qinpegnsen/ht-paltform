const bb = 'http://192.168.10.178:';  //伯白
const br = 'http://192.168.10.110:';  //伯融
const sz = 'http://192.168.10.112:';  //尚泽
const sg = 'http://192.168.10.111:';  //善谷
const zyg = 'http://192.168.10.167:'; //张阳光
const gh = 'http://192.168.10.109:';  //高辉
const wp = 'http://192.168.10.182:';  //万鹏
const csj = 'http://192.168.10.221:';  //测试机
const ly = 'http://192.168.10.101:';  //柳阳

const PROXY_CONFIG = [
  {
    context: [
      "/login",
      "/admin",
      "/goodsKind",
      "/goodsEdit",
      "/goodsBrand",
      "/agentArea",
      "/agent",
      "/after",
      "/agentOrd",
      "/articleComment",
      "/articleSyd",
      "/articleClass",
      "/article",
      "/cust",
      "/custAddr",
      "/custFavorites",
      "/custInvoice",
      "/custAuthInfo",
      "/datadict",
      "/goodsAudit",
      "/goodsBrand",
      "/goodsChangeRec",
      "/goodsEnum",
      "/goodsQuery",
      "/goodsStorage",
      "/goodsSyd",
      "/goodsUnit",
      "/adminLogin",
      "/agentLogin",
      "/custLogin",
      "/seller",
      "/storeExpressTpl",
      "/expressTpl",
      "/helpKind",
      "/helpQuestions",
      "/wo",
      "/statistical",
      "/notifyAdminTpl",
      "/notifyAgentTpl",
      "/notifyAdmin",
      "/announce",
      "/ord",
      "/phone",
      "/finaceDraw",
      "/commentGoods",
      "/rpStatistics",
      "/rpSetting",
      "/rpCustAcctRec",
      "/rpAccount",
      "/rpStore",
      "/rpCustWithdraw",
      "/enterprise",//企业入驻
      "/enterpriseAuditRec",//企业入驻审核记录
      "/stores",//店铺
      "/storeAuditRec",//店铺审核记录
      "/rpCustWithdraw",
      "/goodsBrandApply",
      "/finaceStoreDraw"
    ],
    target: ly + "8084",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/basicExpress",
      "/upload",
      "/res"
    ],
    target: ly + "8082",   //拦截 context配置路径，经过此地址
    secure: false
  }
];

module.exports = PROXY_CONFIG;
