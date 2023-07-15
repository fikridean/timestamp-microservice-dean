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

app.get('/api/:time', function(req, res) {
  let time = req.params.time;

  if (!time) {
    return res.send('Request was invalid');
  }
  
  let pattern = /^\d{4}-\d{2}-\d{2}$/;
  let pattern2 = /^\d+$/;
  
  if (time.match(pattern)) {
    let date = new Date(time);
    let unix = date.getTime();
    let utc = date.toUTCString();
  
    return res.json({
      unix: Number(unix),
      utc: utc,
    })
    
  }

  if (time.match(pattern2)) {
    time = Number(time);
    let dateObj = new Date(time);
    let date = dateObj.toUTCString();   
    
    let unix = time;
    let utc = date;
  
    return res.json({
      unix: Number(unix),
      utc: utc,
    })
  }

  return res.json({
    'error': 'Invalid Date',
  })
  
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});