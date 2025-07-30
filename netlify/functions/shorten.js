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

async function saveUrlStorage(storage) {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (JSONBIN_KEY) {
      headers['X-Master-Key'] = JSONBIN_KEY;
    }
    
    await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers,
      body: JSON.stringify(storage)
    });
  } catch (error) {
    console.error('Error saving storage:', error);
  }
}

function generateShortCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const originalUrl = data.url;

    if (!originalUrl || !isValidUrl(originalUrl)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid URL' })
      };
    }

    const urlStorage = await getUrlStorage();

    // Check if URL already exists
    for (const [code, url] of Object.entries(urlStorage)) {
      if (url === originalUrl) {
        const shortUrl = `https://${event.headers.host}/${code}`;
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ short_url: shortUrl })
        };
      }
    }

    // Generate new short code
    let shortCode;
    do {
      shortCode = generateShortCode();
    } while (urlStorage[shortCode]);

    // Store the mapping
    urlStorage[shortCode] = originalUrl;
    await saveUrlStorage(urlStorage);

    const shortUrl = `https://${event.headers.host}/${shortCode}`;
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ short_url: shortUrl })
    };
  } catch (error) {
    console.error('Error in shorten function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

