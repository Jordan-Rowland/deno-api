import { Router } from "https://deno.land/x/oak@v5.0.0/mod.ts";

const api_router = new Router();

api_router.get("/", (ctx) => {
  ctx.response.body = "Hello Nasa!(From routes)";
});

api_router.get("/planets", (ctx) => {
  ctx.response.body = {
    success: true,
    message: "Successfully fetched planets",
  };
});

api_router.get("/launches", (ctx) => {
  ctx.response.body = {
    success: true,
    message: "Successfully fetched launches",
  };
});

api_router.get("/launches/:id", (ctx) => {
  ctx.response.body = {
    success: true,
    message: `Successfully fetched launch #${ctx.params.id}`,
  };
});

api_router.post("/postendpoint", async (ctx) => {
  const req = await ctx.request.body();
  const body = await req.value;
  console.log(body);
  if (body.message.includes("word")) {
    console.log("got here");
    ctx.response.body = {
      success: true,
      message: `Successfully posted body`,
      body: body,
    };
  }
});

export default api_router;
