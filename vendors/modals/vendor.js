const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
        username     : String,
        role : {
            type: String,
            default: "vendor"
        }
    }
});

userSchema.methods.generateHash = function (password) {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

};

userSchema.methods.validatePassword = function (password) {

    return bcrypt.compareSync(password, this.local.password);

};

module.exports = mongoose.model("VendorUser", userSchema);