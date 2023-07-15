// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date_string?', function(req, res) {
  // Mengambil parameter
  let date_string = req.params.date_string;

  // Mengambil data tanggal sekarang
  let now = new Date();

  // Pengecekan bila parameter tidak dicantumkan
  if (!date_string) {
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    })
  }

  // Regex
  let pattern1 = /^\d{4}-\d{2}-\d{2}$/; // 2015-12-25
  let pattern2 = /^\d+$/; // 1451001600000
  let pattern3 = /^\d{2}\s(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}?/; // 05 October 2015

  // Inisiasi unix dan utc
  let unix;
  let utc;

  // Jika cocok dengan regex pertama atau ketiga
  if (date_string.match(pattern1) || date_string.match(pattern3)) {
    // mendapatkan waktu sesuai dengan input
    let date = new Date(date_string);

    // Mendapatkan nilai unix (detik sampai saat itu)
    unix = date.getTime();

    // Mendapatkan nilai string utc
    utc = date.toUTCString();

    // Mengembalikan json berisi unix dan utc
    return res.json({
      unix: Number(unix),
      utc: utc,
    })
  }

  // Jika cocok dengan regex kedua
  if (date_string.match(pattern2)) {
    // mendapatkan waktu sesuai dengan input yang di konversi ke number dahulu
    let dateObj = new Date(Number(date_string));

    // Mendapatkan nilai unix dari input
    unix = Number(date_string);

    // Mendapatkan nilai utc
    let utc = dateObj.toUTCString();

    // Mengembalikan json berisi unix dan utc
    return res.json({
      unix: unix,
      utc: utc,
    })
  }

  // Jika parameter tidak sesuai
  return res.json({
    'error': 'Invalid Date',
  })

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});