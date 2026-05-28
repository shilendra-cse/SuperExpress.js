import { createApp } from "./server.js";

const app = createApp();

app.get("/", () => {
  console.log("home route hit");
});

app.get("/about", () => {
  console.log("about route hit");
});

app.get("/contact", () => {
  console.log("contact route hit");
});

app.listen(3000);
