import parsePath from "parse-path";

export type ClashSS  = {
  name: string;
  type: 'ss';
  server: string;
  port: number;
  cipher: string;
  password: string;
}

function ss(base64Address: string): ClashSS {
  const base64URL = parsePath(base64Address);

  const name = base64URL.hash;
  const base64Hostname = base64URL.resource;

  const address = base64URL.protocol + '://' + atob(base64Hostname);
  const url = parsePath(address);

  return {
    name: name,
    type: "ss",
    server: url.resource,
    port: parseInt(url.port ?? '1080'),
    cipher: url.user,
    password: url.password,
  };
}

export default ss;
