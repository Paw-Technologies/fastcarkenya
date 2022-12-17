const mongoose = require("mongoose");

// config.env
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message, err);
  console.log("UNCAUGHT EXCEPTION!💥 Shutting down...");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

// Database Configurations
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
  })
  .then(() => console.log("DB connections successful!"));

// Express server connection
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App Running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION!💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated");
  });
});
