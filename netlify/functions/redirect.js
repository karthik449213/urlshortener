const fetch = require('node-fetch');

// Load from Netlify environment or use fallback
let urlStorage = {};
if (process.env.URL_STORAGE) {
  try {
    urlStorage = JSON.parse(process.env.URL_STORAGE);
  } catch (e) {
    console.log('Failed to parse URL_STORAGE, using empty object');
  }
}

exports.handler = async (event, context) => {
  const shortCode = event.path.split('/').pop();

  if (urlStorage[shortCode]) {
    return {
      statusCode: 302,
      headers: {
        Location: urlStorage[shortCode],
        'Cache-Control': 'no-cache'
      },
      body: ''
    };
  } else {
    return {
      statusCode: 404,
      body: '<h1>404 Not Found</h1><p>The URL does not exist.</p>'
    };
  }
};

