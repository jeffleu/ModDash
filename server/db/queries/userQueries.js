const User = require('../models').User;
const uuid = require('node-uuid');
// const { User } = require('../models');

const findOrCreateUser = (profile, tokens) => {
  return User.findOrCreate({
    where: { googleid: profile.id },
    defaults: {
      lastName: profile.name.familyName,
      firstName: profile.name.givenName,
      email: profile.emails[0].value,
      refreshToken: tokens.refresh_token,
      accessToken: tokens.access_token,
      transitmode: 'driving',
      pubnubid: uuid.v4()
    }
  });
};

const authUser = (profile) => {
  return User.findOne({
    where: { googleid: profile.id }
  });
};

const getUserInfo = (id) => {
  return User.findOne({
    where: { id: id },
    attributes: ['id', 'geolocation', 'transitmode', 'phone']
  });
};

const updateUserGeolocation = (id, geolocation) => {
  return User.update(
    { geolocation: geolocation },
    { where: { id: id } })
      .then((result) => result)
      .catch((err) => err);
};

const updateUserSettings = (id, transit, phoneNumber) => {
  return User.update(
    {
      transitmode: transit,
      phone: phoneNumber
    }, 
    { where: { id: id } }
  )
  .then((result) => result)
  .catch((err) => err);
};

module.exports = {
  findOrCreateUser,
  authUser,
  getUserInfo,
  updateUserSettings,
  updateUserGeolocation
};