const mongoose = require("mongoose");
const config = require("../config/key");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(
    config.mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (error) => {
      if (error) {
        console.log(`몽고디비 연결 에러`, error);
      } else {
        console.log("몽고디비 연결 성공");
      }
    }
  );
  mongoose.connection.on("error", (error) => {
    console.log("몽고디비 연결 에러", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("몽고디비 연결이 끊겼습니다 연결을 재시도 합니다.");
    // connect();
  });
};

module.exports = connect;
