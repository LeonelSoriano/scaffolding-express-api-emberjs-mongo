var path = require('path');

//esto es ttest
var Example = require('./models/Example');

var global = {
    path_loggeer : path.join(__dirname, './logs/all-logs.log')  
}


console.log( path.join(__dirname, './logs/all-logs.log'));

module.exports = global;
