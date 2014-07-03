var fs = require('fs')
,   request = require('supertest')
,   t = require('../src/lib/tools')
,   compile = require('../src/compile');

module.exports = {
    compile: compile
,   load: load
,   compileAndMock: compileAndMock
}

function load(filename) {
    return fs.readFileSync('./examples/' + filename).toString();
}

function compileAndMock(filename) {
    t.writeFile(filename, compile(load(filename)), './results/');
    return request.agent(require('../results/' + filename).app);
}
