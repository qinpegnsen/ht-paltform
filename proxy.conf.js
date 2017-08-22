const PROXY_CONFIG = [
  {
    context: [
      "/article",
      "/goodskind",
      "/goodsBrand"
    ],
    target: "http://192.168.10.101:8089",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/login2",
      "/elder"
    ],
    target: "http://192.168.10.110:8086",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/upload"
    ],
    target: "http://192.168.10.110:8083",   //拦截 context配置路径，经过此地址
    secure: false
  }
  ,
  {
    context: [
      "/agent_area"
    ],
    target: "http://192.168.10.182:8081",   //拦截 context配置路径，经过此地址
    secure: false
  }
];

module.exports = PROXY_CONFIG;
