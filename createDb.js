var mongoose =  require('libs/mongoose');
var async = require('async');


async.series([
open,
dropDatdbase,
requireModels,
createUsers

], function(err, results){
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});


function open(callback){
    mongoose.connection.on('open', callback);
}

function dropDatdbase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}
function requireModels(callback){
    require('models/user');

    async.each(Object.keys(mongoose.models), function(modelName, callback){
      mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback){
  require('models/user');
    var users = [
        {username: 'Vasa', password: 'supervasya'},
        {username: 'Petro', password: '123434'},
        {username: 'admin', password: 'tretuta'}
    ];
    async.each(users, function(userData, callback){
        var user = new mongoose.models.User(userData);
        user.save(callback)
    }, callback);

}


