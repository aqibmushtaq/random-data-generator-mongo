require("nodefly-v8-profiler");

var log4js = require("log4js");
var fs = require("fs");
var MongoClient = require("mongodb").MongoClient;

var Generator = require("./generator");

// Setup logger
log4js.configure({
  "appenders": [
    {
      type: "file",
      filename: "log.log",
      maxLogSize: 10000000,
      backups: 10
    }
  ]
});
var log = log4js.getLogger("app")
log.setLevel("ERROR");

var config = fs.readFileSync("./config.json", "utf8", function(err, data) {
  if (err) {
    log.error("Could not open config file");
    throw err;
  }
});
config = JSON.parse(config);

var connStr = "mongodb://" + config.db.host + ":" + config.db.port + "/" + config.db.db;
console.log("conn string: " + connStr);
MongoClient.connect(connStr, function(err, db) {
  if (err) {
    log.error("Cannot connect to database");
    throw err;
  }

  db.authenticate(config.db.user, config.db.pass, function (err, res) {
    if (err) {
      log.error("Cannot authenticate into database");
      throw err;
    }
    log.debug(res);

    var collection = db.collection("stress_test");

    var gen = new Generator();
    var size = 100;
    for (var i = 0; i < 10000; i++) {
      var data = gen.getData(size);
      collection.insert(data, function(err, docs) {
        if (err)
          log.error("Failed to insert document: " + JSON.stringify(docs))
      });
    }


    db.close();
    

  });

});
