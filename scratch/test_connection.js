
const https = require('https');

const KEY = 'ck_0dfe17d0453d7bf64d7a09d45b43defd80690672';
const SECRET = 'cs_168e41d74c96c8f782def050212527ecf9deac6a';
const hostname = 'springgreen-magpie-852762.hostingersite.com';
const path = `/wp-json/wc/v3/products?consumer_key=${KEY}&consumer_secret=${SECRET}`;

const options = {
  hostname,
  port: 443,
  path,
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0',
    'Accept': 'application/json'
  }
};

console.log(`Connecting to ${hostname}${path}...`);

const req = https.get(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Response received');
    try {
        const json = JSON.parse(data);
        console.log(`Received ${Array.isArray(json) ? json.length : 'non-array'} items`);
    } catch (e) {
        console.log('Error parsing JSON');
    }
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
  console.error(e);
});

req.on('timeout', () => {
  console.error("Timeout");
  req.destroy();
});
