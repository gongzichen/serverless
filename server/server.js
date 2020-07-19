// @ts-nocheck
let express = require("express");
let qs = require("qs");
let session = require("express-session");
let { readFile, writeFile } = require("./promiseFs");
let app = express();

app.listen(3000, function () {
  console.log("后端接口服务 起于 3000");
});

// 解决跨域
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,X-Agent,X-Token,X-Legacy-Token,X-Legacy-Uid,X-Legacy-Device-Id,X-Legacy-New-Token,X-Request-Id"
  );
  req.method == "OPTIONS" ? res.send("OK") : next();
});

app.use((req, res, next) => {
  let str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });
  req.on("end", () => {
    let obj = {};
    try {
      obj = JSON.parse(str);
    } catch (error) {
      obj = qs.parse(str);
    }
    req.body = obj;
    next();
  });
});

function setData(url, key, req, res, next) {
  readFile(url)
    .then((data) => {
      req[key] = JSON.parse(data);
      next();
    })
    .catch((err) => {
      res.status(505);
      res.send("505");
    });
}

//轮播图
app.use((req, res, next) => {
  setData("./json/banner.json", "banner", req, res, next);
});

app.use(
  session({
    //在这个中间件之后 会在 req上多了一个 session的属性
    name: "qqq", // 默认  connect.sid
    secret: "myqqq", // session会根据 这个属性 和后端种在session的属性名 来生成对应的字段
    saveUninitialized: false, //无论有没有session cookie，每次请求都设置个session cookie  默认标识为 connect.sid
    resave: false, //是否每次请求都重新设置session cookie
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, //cookie从创建到过期所能存在的时间，以秒为单位
    },
  })
);

app.get("/banner", (req, res) => {
  //发送的数据
  res.send({
    code: 0,
    data: req.banner.list,
  });
});

//首页四张图和文字描述
app.use((req, res, next) => {
  setData("./json/publicClassList.json", "publicList", req, res, next);
});
app.get("/publicList", (req, res) => {
  res.send({
    code: 0,
    data: req.publicList,
  });
});

//多个课程数据
app.use((req, res, next) => {
  setData("./json/classList.json", "classList", req, res, next);
});
app.get("/classList", (req, res) => {
  res.send({
    code: 0,
    data: req.classList,
  });
});
