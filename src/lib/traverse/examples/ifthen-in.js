var app = require('express')();
var cond = true;

app.get("/", function reply(req, res){
    if (cond) {
      var _rep = "42";
      res.send(_rep);
    }
});

if (!module.parent) {
    app.listen(8080);
    console.log(">> listening 8080");
}

exports.app = app;
