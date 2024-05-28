const { StatusCodes } = require('http-status-codes');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require('../errors');
const path = require('path');
const User = require('../models/User');
const fs = require('fs');
const {
  checkPermissions,
  createTokenUser,
  attachCookiesToResponse,
} = require('../utils');

const getAllUsers = async (req, res) => {
  const users = await User.find().select(
    '-password -verificationToken -passwordToken -passwordTokenExpirationDate'
  );

  res.json({ users, count: users.length });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select(
    '-password -verificationToken -passwordToken -passwordTokenExpirationDate'
  );
  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};
const showMe = async (req, res) => {
  const id = req.user.userId;
  const user = await User.findById(id).select(
    '-password -verificationToken -passwordToken -passwordTokenExpirationDate'
  );
  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { email, firstName, lastName, country } = req.body;

  if (!email || !firstName || !lastName || !country) {
    throw new BadRequestError(
      'Please provide all values:email,firsName,lastName,country'
    );
  }
  const user = await User.findById(req.user.userId);

  if (req.files && Object.keys(req.files).length !== 0) {
    const profileImageTemp = req.files.profileImage;
    const maxSize = 1024 * 1024;
    if (profileImageTemp.size > maxSize) {
      throw new BadRequestError('Please upload  image smaller 1MB');
    }

    const imagePath1 = path.join(
      __dirname,
      `../public/uploads/users/` + `${profileImageTemp.name}`
    );

    if (user.image !== '/uploads/users/no-profile-image.png') {
      const imagePath = path.join(__dirname, '../public', user.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await profileImageTemp.mv(imagePath1);
    user.image = `/uploads/users/${profileImageTemp.name}`;
  }

  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  user.country = country;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Please provide old and new password');
  }

  const user = await User.findById(req.user.userId);
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials!');
  }

  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError('Please provide id');
  }

  const user = await User.findById(id);

  if (user.image !== '/uploads/users/no-profile-image.png') {
    const imagePath = path.join(__dirname, '../public', user.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await user.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: 'User deleted' });
};
const changeUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!id) {
    throw new BadRequestError('Please provide id');
  }
  if (!role) {
    throw new BadRequestError('Please provide role');
  }
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`);
  }

  user.role = role;
  await user.save();

  return res.status(StatusCodes.OK).json({ msg: 'User role updated!' });
};

module.exports = {
  getAllUsers,
  getUser,
  showMe,
  updateUser,
  updatePassword,
  deleteUser,
  changeUserRole,
};
