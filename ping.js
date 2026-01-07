const https = require('https');

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
