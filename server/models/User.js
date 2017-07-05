var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
        firstName: {type:String, required:'{PATH} is required!'},
        lastName: {type:String, required:'{PATH} is required!'},
        username: {
            type: String,
            required: '{PATH} is required!',
            unique: true
        },
        salt: {type:String, required:'{PATH} is required!'},
        hashed_pwd: {type:String, required:'{PATH} is required!'}, 
        roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role){
        return this.role.indexOf(role) > -1;
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