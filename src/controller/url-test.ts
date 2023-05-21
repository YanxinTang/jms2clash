import { stringify } from "yaml";
import {
  downloadJmsSubscriptionFile,
  splitJmsSubscriptionFile,
} from "../utils";
import converter from "../lib/converter";
import { IRequest } from "itty-router";

export default async function (request: IRequest) {
  const url = new URL(request.url);
  const file = await downloadJmsSubscriptionFile(url.search);

  try {
    const protocols = splitJmsSubscriptionFile(file);

    const proxies = protocols.map((p) => converter.parse(p)).filter(Boolean);
    const respData = { proxies };

    return new Response(stringify(respData));
  } catch (error) {
    return new Response("invalid file", { status: 400 });
  }
}
