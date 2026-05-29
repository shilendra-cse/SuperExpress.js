import { createApp } from "./server.js";

const app = createApp();

app.get("/", (res) => {
  res.send("<h1>home route hit</h1>");
});

app.get("/about", () => {
  console.log("about route hit");
});

app.get("/contact", () => {
  console.log("contact route hit");
});

app.listen(3000);
