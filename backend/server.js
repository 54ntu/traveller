import app from "./app";
import { envConfig } from "./src/config/config";
import connectdb from "./src/dbconfig/db";

connectdb()
  .then(() => {
    app.listen(envConfig.port, () => {
      console.log(`server is running at port ${envConfig.port}`);
    });
  })
  .catch((error) => {
    console.log("database connection failed!!!!!");
  });
