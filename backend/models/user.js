const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const productSchema = require('./products');

const userValidation = [/^\w{4,}$/, 'Username must contain only alphanumberic characters'];
const roleValidation = [/(?=^vendor$)|(?=^customer$)/, 'Role must be a teacher or a student'];
const vendorValidation = [/(?=^The Slice$)|(?=^1871 Grille$)/, 'Vendor must be The Slice or 1871 Grille'];

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        // match: userValidation,
        trim: true
    },
    password: {
        type: String,
        minlength: 8,
        trim: true
    },
    firstName: {
        type: String,
        minlength: 2,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        minlength: 2,
        required: true,
        trim: true
    },
    role: {
        type: String,
        // match: roleValidation


    },
    // for the user, their sectionnumber on their ticket
    // for the vendor, their location number
    sectionNumber: {
        type: Number,
        required: true
    },


    currentOrder: {
        vendorName: {
            type: String,
            // match: vendorValidation,
        },
        order: {
            type: [productSchema],
        },
        orderNumber: {
            type: String,
            // default: this.methods.stringGenerator(20)
        },
        orderTaken: {
            type: Date,
            default: Date()
        },
        completed: {
            type: Boolean,
            default: false
        },
        comments: {
            type: String
        },
        locationNumber: {
            type: Number

        }
    },


});

// userSchema.pre('save', function (next) {
//
//     if (this.role === 'vendor' && !this.password) {
//         return next(new Error('The password is required when the role is vendor'));
//     }
// });



// assigns the user order to the right location
userSchema.methods.locationFinder = function () {
    let userSection = this.sectionNumber;
    let locationNumber = this.currentOrder.locationNumber;
    let vendorName = this.currentOrder.vendorName;


    const theSlicerangeArray = [
        [327, 347, 343],
        [426, 444, 343],
        [1, 4, 107],
        [100, 125, 107],
        [152, 160, 107],
        [5, 9, 150],
        [26, 42, 150],
        [126, 151, 150],
        [210, 225, 215],
        [226, 246, 239],
        [301, 304, 313],
        [312, 326, 313],
        [410, 425, 313],
        [327, 347, 343],
    ];

    const grilleRangeArray = [
        [337, 347, 343],
        [226, 246, 239],
        [5, 9, 141],
        [26, 42, 141],
        [126, 151, 141],
        [1, 4, 113],
        [10, 25, 113],
        [100, 125, 113],
        [152, 160, 113],
        [210, 225, 311]
    ];

    const grilleSingleArray = [
        [250, 141],
        [259, 113],
        [311, 215]
    ];

    const theSliceSingleArray = [
        [259, 107],
        [250, 150],
        [311, 215]
    ];

    // Location Assignment strategy:
    // 1. If the location number is assigned, return and exit the function
    // 2. Check if the user selected 1871 Grille and run a loop through the ranges and assign the location number if it matches the section the user selected (userSection)
    // 3. Return from the function if the location has already been assigned
    // 4. Check if location has been assigned from the ranges and if it has exit the function
    // 5. Loop through the single elements to see if one of those matches the location
    if (locationNumber) {
        return;
    } else if (vendorName === "1871 Grille") {

        for (let i = 0; i < grilleRangeArray.length; i++) {

            if (userSection >= grilleRangeArray[i][0] && userSection <= grilleRangeArray[i][1]) {
                this.currentOrder.locationNumber = grilleRangeArray[i][2];
                return;

            }
        }


        for (let j = 0; j < grilleSingleArray.length; j++) {

            if (userSection === grilleSingleArray[j][0]) {
                this.currentOrder.locationNumber = grilleSingleArray[j][1];
                return;
            }



        }

    } else if (vendorName === "The Slice") {

        for (let k = 0; k < theSlicerangeArray.length; k++) {

            if (userSection >= theSlicerangeArray[k][0] && userSection <= theSlicerangeArray[k][1]) {
                this.currentOrder.locationNumber = theSlicerangeArray[k][2];
                return;
            }

        }

        for (let m = 0; m < theSliceSingleArray.length; m++) {

            if (userSection === theSliceSingleArray[m][0]) {
                this.currentOrder.locationNumber = theSliceSingleArray[m][1];
                return;
            }

        }


    } else {
        this.sectionError = "The supplied section number was invalid.";
    }

};

userSchema.methods.stringGenerator = function(length) {
    var str = '';
    var chars ='0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split(
        '');
    var charsLen = chars.length;
    if (!length) {
        length = ~~(Math.random() * charsLen);
    }
    for (var i = 0; i < length; i++) {
        str += chars[~~(Math.random() * charsLen)];
    }
    return str;
};

userSchema.methods.showUser = function () {
    return {
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        id: this._id
    };
};

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;