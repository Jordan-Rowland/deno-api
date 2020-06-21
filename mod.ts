import * as log from "https://deno.land/std/log/mod.ts";
import { Application, send } from "https://deno.land/x/oak@v5.0.0/mod.ts";

import api_router from "./api.ts";

const app = new Application();
const PORT = 8000;

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("INFO"),
  },
  loggers: {
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

app.addEventListener("error", (event) => {
  log.error(event.error);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.body = JSON.stringify({
      success: false,
      message: "encountered an error",
      error: err,
    });
    // throw err;
  }
});

app.use(async (ctx, next) => {
  log.info("Before AWAIT NEXT 1");
  await next(); // Rest of this function pauses until next middleware returns
  log.info("Middleware 1");
  const time = ctx.response.headers.get("X-Response-Time");
  log.info(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  log.info("Before AWAIT NEXT 2");
  await next();
  log.info("Middleware 2");
  const delta = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${delta}ms`);
});

app.use(api_router.routes());
app.use(api_router.allowedMethods());

// // Serving static files
// app.use(async (ctx) => {
//   const filePath = ctx.request.url.pathname;
//   const fileWhiteList = [
//     "/index.html",
//     "/js/app.js",
//   ];
//   if (fileWhiteList.includes(filePath)) {
//     await send(ctx, filePath, {
//       root: `${Deno.cwd()}/public`,
//     });
//   }
// });

if (import.meta.main) {
  log.info(`Starting server on port: ${PORT}....`);
  await app.listen({
    port: PORT,
  });
}
