  const bb = 'http://192.168.10.178:';  //伯白
  const br = 'http://192.168.10.110:';  //伯融
  const sz = 'http://192.168.10.112:';  //尚泽
  const sg = 'http://192.168.10.111:';  //善谷
  const zyg = 'http://192.168.10.167:'; //张阳光
  const gh = 'http://192.168.10.109:';  //高辉
  const wp = 'http://192.168.10.182:';  //万鹏

const PROXY_CONFIG = [
  {
    context: [
      "/login",
      "/admin",
      "/article",
      "/goodsKind",
      "/goodsEdit",
      "/goodsBrand",
      "/agentArea",
      "/agent",
      "/articleClass",
      "/articleComment",
      "/articleSyd",
      "/custAddr",
      "/cust",
      "/custFavorites",
      "/custInvoice",
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
      "/store",
      "/storeExpressTpl",
      "/expressTpl",
      "/storeExpressTpl",
      "/helpKind",
      "/helpQuestions",
      "/basicExpress"
    ],
    target: zyg + "8081",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/upload"
    ],
    target: zyg + "8900",   //拦截 context配置路径，经过此地址
    secure: false
  }
  ,
  {
    context: [
      "/res"
    ],
    target: zyg + "8900",   //拦截 context配置路径，经过此地址
    secure: false
  }
];

module.exports = PROXY_CONFIG;
