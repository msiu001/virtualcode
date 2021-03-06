var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
    development: {
        db: 'mongodb://localhost/virtualcode',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://mario:virtualcode@ds137760.mlab.com:37760/virtualcode',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}