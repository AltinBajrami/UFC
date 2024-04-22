const mongose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    minlength: 3,
    maxlength: 50,
  },
  country: {
    type: String,
    required: [true, 'Please provide country'],
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: ' Please provide email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  image: {
    type: String,
    default: '/uploads/users/no-profile-image.png',
  },
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongose.model('User', UserSchema);
