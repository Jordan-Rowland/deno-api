import { Router } from "https://deno.land/x/oak@v5.0.0/mod.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Hello Nasa!(From routes)";
});

router.get("/planets", (ctx) => {
  ctx.response.body = JSON.stringify({
    success: true,
    message: "Successfully fetched planets",
  });
});

export default router;
