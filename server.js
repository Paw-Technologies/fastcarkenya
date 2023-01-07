const mongoose = require("mongoose");
// import secket io


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
mongoose.set('strictQuery', true);
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


const socketIO = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})


socketIO.on('connection', (socket) => {
    console.log('connected')
    socket.on('message', (data)=>{
        console.log("this ", data)
    })
})



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
