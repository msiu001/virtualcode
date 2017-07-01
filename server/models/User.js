var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String, 
        roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};
var User = mongoose.model('User', userSchema);
function createDefaultUsers(){
    User.find({}).exec(function(err, collection){
        if(collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'mario');
            User.create({firstName:'Mario', lastName:'Siu', username:'mario', salt: salt, hashed_pwd:hash, roles:['admin'] });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'yisel');
            User.create({firstName:'Yisel', lastName:'Garcia', username:'yisel', salt: salt, hashed_pwd:hash, roles:[]});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'enzo');
            User.create({firstName:'Enzo', lastName:'Siu', username:'enzo', salt: salt, hashed_pwd:hash});
        }
    })
};

exports.createDefaultUsers = createDefaultUsers;