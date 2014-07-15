var errors = require('./errors');

module.exports = function iteratorFactory(types) {
    return function iterator(c) {
        function handlerFactory(type) {
            return function handler(node, previousNode) {
                if (!node.type)
                    throw errors.missingType(node);
                if (!!types[node.type] && types[node.type][type])
                    return types[node.type][type](c, node, previousNode);
            };
        }

        return {
            enter: handlerFactory('enter'),
            leave: handlerFactory('leave')
        };
    };
};
