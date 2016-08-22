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

const authUser = function(profile) {
  return User.findOne({
    where: {googleid: profile.id}
  })
}

const getUserInfo = (id) => {
  console.log('============== [userController - getGeolocation]: userId =', id);
  return User.findOne({
    where: {id: id},
    attributes: ['id', 'geolocation', 'transitmode']
  });
};

const updateUserGeolocation = (id, geolocation) => {
  return User.update(
    { geolocation: geolocation },
    { where: {id : id} })
      .then((result) => result)
      .catch((err) => err);
};

const updateUserTransitMode = (id, transit) => {
  return User.update (
    {transitmode: transit},
    {where: {id: id}}
  )
  .then((result) => {
    // need to clean this up, network is still pending on client side
    res.send(result);
  })
  .catch((err) => err);
}


const getUser = (id) => {
  return User.findOne(
    { where: { id: id } }
  );
};

module.exports = {
  findOrCreateUser,
  authUser,
  getUserInfo,
  updateUserTransitMode,
  updateUserGeolocation,
  getUser
};
