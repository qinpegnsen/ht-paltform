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
      "/after",
      "/agentOrd",
      "/articleClass",
      "/articleComment",
      "/articleSyd",
      "/custAddr",
      "/cust",
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
      "/store",
      "/storeExpressTpl",
      "/expressTpl",
      "/helpKind",
      "/helpQuestions",
      "/wo",
      "/ord",
      "/statistical"
    ],
    target: gh + "8085",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/upload"
    ],
    target: gh + "8085",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/phone"
    ],
    target: bb + "8094",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/basicExpress",
      "/res"
    ],
    target: sz + "8082",   //拦截 context配置路径，经过此地址
    secure: false
  }
];

module.exports = PROXY_CONFIG;
