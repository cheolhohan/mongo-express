const mongo = require("mongodb");
const mongoURI = require("../config/keys.js").mongoURI;
const mongoDatabase = require("../config/keys.js").databaseName;

const MongoClient = mongo.MongoClient;

module.exports = function(app) {
  if (typeof mongoURI !== "string") {
    throw new TypeError("Error: Unexpected mongodb connection url");
  }

  opts = { useNewUrlParser: true };
  var property = opts.property || "db";

  return function expressMongoDb(req, res, next) {
    var connection = MongoClient.connect(mongoURI, opts);
    connection
      .then(function(db) {
        req[property] = db.db(mongoDatabase);
        app.set("mongodb", db);
        next();
      })
      .catch(function(err) {
        connection = undefined;
        next(err);
      });
  };
};
