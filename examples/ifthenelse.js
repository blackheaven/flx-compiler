var app = require('express')();
var cond = false;

if (cond)
    app.get("/", function reply1(req, res){
      var _rep = "42";
      res.send(_rep);
    });
else
    // FIX : Fail with the same name / src/pruner/constructors.js:52
    app.get("/", function reply2(req, res){
      var _rep = "101010";
      res.send(_rep);
    });

if (!module.parent) {
    app.listen(8080);
    console.log(">> listening 8080");
}

exports.app = app;
