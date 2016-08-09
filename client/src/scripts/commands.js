/********************************************************
  HELPER FUNCTIONS
********************************************************/

// Start listening for voice commands
var artyomStart = () => {
  artyom.initialize({
    lang: 'en-GB', // More languages are documented in the library
    continuous: true, //if you have https connection, you can activate continuous mode
    debug: true, //Show everything in the console
    listen: true // Start listening when this function is triggered
  });

  artyom.say('What can I do for you today?');
};

// Stop listening for voice commands
var artyomStop = () => {
  artyom.fatality();
  artyom.say('Goodbye.');
};

// Get current time
var getTime = () => {
  var date = Date().slice(16, Date().length - 15);
  var hours = date.slice(0, 2);
  var minutes = date.slice(3, 5);
  var amPm;

  if (hours >= 12) {
    amPm = 'PM';
    hours = hours - 12;
  } else {
    amPm = 'AM';
  }

  return `${hours} ${minutes} ${amPm}`;
};

// Get current date
var getDate = () => {
  var date = Date().slice(0, 15);
  var day = date.slice(0, 3);
  var month = date.slice(4, 7);
  var dateNum = Number(date.slice(8, 10));

  var months = {
    'Jan': 'January',
    'Feb': 'February',
    'Mar': 'March',
    'Apr': 'April',
    'May': 'May',
    'Jun': 'June',
    'Jul': 'July',
    'Aug': 'August',
    'Sept': 'September',
    'Oct': 'October',
    'Nov': 'Novermber',
    'Dec': 'December'
  };

  var days = {
    'Mon': 'Monday',
    'Tue': 'Tuesday',
    'Wed': 'Wednesday',
    'Thu': 'Thursday',
    'Fri': 'Friday',
    'Sat': 'Saturday',
    'Sun': 'Sunday'
  };

  day = days[day];
  month = months[month];

  return `${day} ${month} ${dateNum}`;
};

/********************************************************
  ARTYOM COMMANDS
********************************************************/

artyom.addCommands([
  {
    indexes: ['hello', 'what\'s up'],
    action: (i) => {
      artyom.say('Hi there. I hope your day is going well.');
    }
  },
  {
    indexes: ['stop listening'],
    action: (i) => { artyomStop() }
  },
  {
    indexes: ['render spotify playlist'],
    action: (i) => {
      artyom.say('Rendering Spotify playlist.');

      $playlist = $('<iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3Ababybluejeff%3Aplaylist%3A6toivxuv2M1tBLjLWZwf3d" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
      $playlist.appendTo($('#main1'));
    }
  },
  {
    indexes: ['stop the music'],
    action: (i) => {
      $('#main1').empty();

      artyom.say('Removing Spotify playlist.');
    }
  },
  {
    indexes: ['what time is it'],
    action: (i) => {
      artyom.say(`It is currently ${getTime()}.`);
    }
  },
  {
    indexes: ['what\'s the date today'],
    action: (i) => {
      artyom.say(`Today is ${getDate()}.`);
    }
  },
  {
    indexes: ['* I choose you'],
    smart: true,
    action: (i, wildcard) => {
      wildcard = wildcard.toLowerCase();

      artyom.say(`Looking for ${wildcard} in the database. One moment please.`);

      $.ajax({
        url: `http://pokeapi.co/api/v2/pokemon/${wildcard}`,
        method: 'GET',
        success: (data) => {
          artyom.say(`Here is all the data on ${wildcard}`);
          console.log('Pokemon data:', data);
        },
        error: (error) => {
          artyom.say('Error retrieving Pokemon.');
          console.log('Error retrieving Pokemon', error);
        }
      });
    }
  },
  {
    indexes: ['open *'],
    smart: true,
    action: (i, wildcard) => {
      window.open(`http://${wildcard}`);
    }
  },
  {
    indexes: ['search YouTube for *'],
    smart: true,
    action: (i, wildcard) => {
      window.open(`https://www.youtube.com/results?search_query=${wildcard}`);
    }
  }
]);

artyomStart();
