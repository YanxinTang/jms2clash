import { IRequest } from "itty-router";

export default function (request: IRequest) {
  const query = request.query;
  if (!query.service || !query.id) {
    return new Response('invalid search', { status: 400 })
  }
}