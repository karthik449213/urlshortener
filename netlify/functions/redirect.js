const fetch = require('node-fetch');

// JSONBin.io storage functions
const JSONBIN_URL = process.env.JSONBIN_URL || 'https://api.jsonbin.io/v3/b/67a1f4f7ad19ca34f8dc3456'; // You'll need to create your own bin
const JSONBIN_KEY = process.env.JSONBIN_KEY; // Optional: for private bins

async function getUrlStorage() {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (JSONBIN_KEY) {
      headers['X-Master-Key'] = JSONBIN_KEY;
    }
    
    const response = await fetch(JSONBIN_URL, { headers });
    if (response.ok) {
      const data = await response.json();
      return data.record || {};
    }
    return {};
  } catch (error) {
    console.error('Error fetching storage:', error);
    return {};
  }
}

exports.handler = async (event, context) => {
  // Get the short code from the path parameter
  const shortCode = event.path.split('/').pop();
  console.log('Redirect requested for code:', shortCode);
  
  const urlStorage = await getUrlStorage();
  console.log('Available URLs:', Object.keys(urlStorage));

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
      headers: {
        'Content-Type': 'text/html'
      },
      body: '<h1>404 Not Found</h1><p>The short URL does not exist.</p>'
    };
  }
};

