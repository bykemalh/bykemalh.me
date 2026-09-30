import { createRequestHandler, RouterContextProvider } from "react-router";
import { cloudflareContext } from "../app/lib/cloudflare-context";

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  fetch(request, env, ctx) {
    // www → non-www 301 (canonical: https://bykemalh.me)
    const url = new URL(request.url);
    if (url.hostname === "www.bykemalh.me") {
      url.hostname = "bykemalh.me";
      return Response.redirect(url.toString(), 301);
    }
    const loadContext = new RouterContextProvider();
    loadContext.set(cloudflareContext, { env, ctx });
    return requestHandler(request, loadContext);
  },
} satisfies ExportedHandler<Env>;
