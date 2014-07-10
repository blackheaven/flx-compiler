var bld = require('../../linker/builders');

module.exports = iterator;

function iterator(c) { // TODO refactor to extract this function from the defeinition of _types, and then dynamically generate iterator modules.
    function handlerFactory(type) {
        return function handler(n, p) {
            if (!n.type)
                throw errors.missingType(n);
            if (!!_types[n.type] && _types[n.type][type])
                return _types[n.type][type](n, p, c);
        };
    }

    return {
        enter: handlerFactory('enter'),
        leave: handlerFactory('leave')
    };
};

var _types = {};

_types.Identifier = {
  enter: function(n, p) {

    if (n.modifier) {
      if (n.modifier.target === 'signature') {
        var mod = bld.signatureModifier(n.name);
        return mod;
      }

      if (n.modifier.target === 'scope') {
        var mod = bld.scopeModifier(n.name);
        // console.log("SCOPE MOD ", mod);
        return mod;
      }
    }

    if (n.kind === 'start'){
      return bld.start(n.name.substring(1), n.signature);
    }

    if (n.kind === 'post'){
      return bld.post(n.name.substring(1), n.signature);
    }
  },
  leave: function(n, p) {
    if (n.modified) {
      console.log("MODIFIED", n);
    }
  }
};