import { stringify } from "yaml";
import {
  downloadJmsSubscriptionFile,
  getName,
  splitJmsSubscriptionFile,
} from "../utils";
import converter from "../lib/converter";
import { IRequest } from "itty-router";

const FALLBACK_SERVERS_ORDER = [
  "c10s3",
  "c10s4",
  "c10s5",
  "c10s1",
  "c10s2",
  "c10s801",
];

export default async function (request: IRequest) {
  const url = new URL(request.url);
  const file = await downloadJmsSubscriptionFile(url.search);

  try {
    const protocols = splitJmsSubscriptionFile(file);
    const proxies = protocols.map((p) => converter.parse(p)).filter(Boolean);

    const fallbackProxies = [];
    for (const proxy of proxies) {
      const serverID = getName(proxy!.name);
      const idx = FALLBACK_SERVERS_ORDER.indexOf(serverID);
      fallbackProxies[idx] = proxy;
    }

    const respData = { proxies: fallbackProxies };

    return new Response(stringify(respData));
  } catch (error) {
    return new Response("invalid file", { status: 400 });
  }
}
