const https = require('https');

const express = require('express');

const app = express();

function pingGoogle() {
  const start = Date.now();

  https.get('https://www.google.com', (res) => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] Google responded with status ${
        res.statusCode
      } in ${duration}ms`
    );

    res.resume();
  }).on('error', (err) => {
    console.error(
      `[${new Date().toISOString()}] Error pinging Google:`,
      err.message
    );
  });
}

// Ping immediately, then every 10 seconds
pingGoogle();
setInterval(pingGoogle, 10_000);

app.get('/', (req, res) => {
  console.log('Received request. Request headers: ', req.headers);
  res.send(200);
});

app.listen(8080, () => {
  console.log('app listening on port 8080');
});