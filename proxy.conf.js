const PROXY_CONFIG = [
  {
    context: [
      "/dept",
      "/limit",
      "/limitFile",
      "/limitMenu",
      "/limitOpt",
      "/limitPage",
      "/login",
      "/orgManager",
      "/organ",
      "/role",
      "/roleGroup",
      "/staff",
      "/role",
      "/sys",
      "/res"
    ],
    target: "http://192.168.10.110:8082",   //拦截 context配置路径，经过此地址
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
];

module.exports = PROXY_CONFIG;
