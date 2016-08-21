const url = 'https://maps.googleapis.com/maps/api/distancematrix/json';

const mapTraffic = (data, event) => {
  console.log('inside map traffic', data.dataValues);
  var options = {
    url,
    qs: {
      key: process.env.GOOGLE_MAPS_API_KEY,
      origins: data.dataValues.geolocation,
      destinations: event.dataValues.location,
      mode: data.dataValues.transitmode,
      departure_time: 'now',
      units: 'imperial',
      traffic_model: 'best_guess'
    }
  };  
  return options;
};

const mapTravel = (data, event) => {
  console.log('inside map travel', data.dataValues);
  var options = {
    url,
    qs: {
      key: process.env.GOOGLE_MAPS_API_KEY,
      origins: data.dataValues.geolocation,
      destinations: event.dataValues.location,
      mode: data.dataValues.transitmode,
      // USING ARRIVAL TIME GETS US THE ESTIMATED TIME TO GET THERE
      arrival_time: event.dataValues.startdatetime,
      // departure_time: 'now',
      units: 'imperial'
    }
  };
  return options;
};

module.exports = {
  mapTraffic,
  mapTravel
};