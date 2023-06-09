import { Router } from "itty-router";
import auth from "./auth";
import search from "./search";
import * as controllers from "../controller";

// Create a new router
const router = Router();

router
  .get("/raw", auth, search, controllers.raw)
  .get("/fallback.yaml", auth, search, controllers.fallback)
  .get("/url-test.yaml", auth, search, controllers.urlTest)
  .all("*", () => new Response("404, not found!", { status: 404 }));

export default router;
