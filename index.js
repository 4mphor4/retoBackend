import mongoose from "mongoose";
import app from "./config/express";
import config from "./config/env";
// import cors from "cors";

mongoose.connect(config.db, { useNewUrlParser: true });

mongoose.connection.on("error", function() {
  throw new Error(`unable to connect to database ${config.db}`);
});
mongoose.connection.on("disconnected", function() {
  console.log(`Disconnected from ${config.db}`);
});
mongoose.connection.on("connected", function() {
  console.log(`Connected to database ${config.db}`);
});
// app.use(cors());
if (config.env === "development") {
  mongoose.set("debug", true);
}

app.listen(process.env.PORT || config.port, "0.0.0.0", () => {
  console.log(
    `app runnning on ${process.env.PORT || config.port} (${config.env})`
  );
});

export default app;
