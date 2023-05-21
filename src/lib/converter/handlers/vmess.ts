import parsePath from "parse-path";

type Vmess = {
  /** 配置文件版本号,主要用来识别当前配置 */
  v: string;

  /** 备注或别名 */
  ps: string;

  /** 地址IP或域名 */
  add: string;

  /** 端口号 */
  port: string;

  /** UUID */
  id: string;

  /** alterId */
  aid: number;

  /** 加密方式(security),没有时值默认auto */
  scy?: string;

  /** 传输协议(tcp\kcp\ws\h2\quic) */
  net: string;

  /** 伪装类型(none\http\srtp\utp\wechat-video) *tcp or kcp or QUIC */
  type: string;

  /** 伪装的域名 */
  host: string;

  /** path */
  path: string;

  /** 传输层安全(tls) */
  tls: string;

  /** serverName */
  sni: string;

  /** h2,http/1.1 */
  alpn: string;

  /** fingerprint */
  fp: string;
};

export type ClashVmess = {
  name: string;
  type: "vmess";
  server: string;
  port: number;
  uuid: string;
  alterId: number;
  cipher: string;
};

function ss(base64Address: string): ClashVmess {
  const base64URL = parsePath(base64Address);
  const base64EncodedVmess = base64URL.resource;
  const vmess: Vmess = JSON.parse(atob(base64EncodedVmess));

  return {
    name: vmess.ps,
    type: "vmess",
    server: vmess.add,
    port: parseInt(vmess.port),
    uuid: vmess.id,
    alterId: vmess.aid,
    cipher: vmess.scy ?? 'auto',
  };
}
export default ss;
