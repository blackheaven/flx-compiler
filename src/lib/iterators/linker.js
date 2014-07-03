var bld = require('../../linker/builders');

module.exports = { 
  Identifier : {
    enter: function(n) {

      if (n.modifier) {
        if (n.modifier.target === "signature") {
          return bld.signatureModifier(n.name);
        }

        if (n.modifier.target === "scope") {
          return bld.scopeModifier(n.name);
        }
      }

      if (n.kind === "start"){
        return bld.start(n.name.substring(1), n.signature);
      }

      if (n.kind === "post"){
        return bld.post(n.name.substring(1), n.signature);
      }
    }
  }
}