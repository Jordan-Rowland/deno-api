import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test({
  name: "example test",
  fn() {
    const deno = "deno";
    assertEquals(deno, "deno");
  },
});

// Alternate shorthand syntax
Deno.test("example test 2", () => {
  assertEquals("test", "test");
});
