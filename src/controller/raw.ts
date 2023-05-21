import { downloadJmsSubscriptionFile } from "../utils";
import { IRequest } from "itty-router";

export default async function (request: IRequest) {
  const url = new URL(request.url);
  const file = await downloadJmsSubscriptionFile(url.search);
  return new Response(file);
}
