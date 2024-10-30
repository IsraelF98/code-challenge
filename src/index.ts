import { app } from "./server.js";
const PORT: number = 3000;

app.listen(PORT, () => {
  console.log("App running on ", PORT);
});
