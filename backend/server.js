import app from "./app.js";
import { envConfig } from "./src/config/config.js";
import connectdb from "./src/dbconfig/db.js";

connectdb()
  .then(() => {
    app.listen(envConfig.port, () => {
      console.log(`server is running at port ${envConfig.port}`);
    });
  })
  .catch((error) => {
    console.log("database connection failed!!!!!");
  });
