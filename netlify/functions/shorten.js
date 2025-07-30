// Simple in-memory storage for demo purposes
// In production, you'd want to use a database like FaunaDB, Supabase, or Airtable
const urlStorage = new Map();

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

    for (const [code, url] of Object.entries(urlStorage)) {
      if (url === originalUrl) {
        const shortUrl = `${event.headers.origin || 'https://your-site.netlify.app'}/${code}`;
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ short_url: shortUrl })
        };
      }
    }

    let shortCode;
    do {
      shortCode = generateShortCode();
    } while (urlStorage[shortCode]);

    await saveUrlMapping(shortCode, originalUrl);

    const shortUrl = `${event.headers.origin || 'https://your-site.netlify.app'}/${shortCode}`;
    
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

