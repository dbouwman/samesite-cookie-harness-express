var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(`oAuth Request - redirect_uri: ${req.query.redirect_uri}`);
  console.log(`oAuth Request - sameSite: ${req.query.sameSite}`);
  console.log(`oAuth Request - sameSite: ${req.query.sameSite}`);

  var uri = req.query.redirect_uri || 'redirect.html';
  // attach in a hash of values
  uri = `${uri}#username=joeuser&token=bz43ac`;
  // completely fake session object...
  var sess = {
    username: 'joeuser',
    token: 'bz43ac'
  };
  // is sameSite is not passed, assume None
  var sameSiteValue = req.query.sameSite || 'None';

  var expiresAt = new Date(Date.now() + 900000);
  var cookies = [
    {
      name: 'platformCookie',
      options: {
        domain: 'fakegis.com', 
        expires:expiresAt,
        sameSite: sameSiteValue.toLowerCase()
      }
    }
  ];

  // if we are authing w/ the org url, also set the org cookie
  if (req.hostname === 'org.fakemaps.fakegis.com') {
    console.log('Adding orgCookie');
    cookies.push(
      {
        name: 'orgCookie',
        options: {
          domain: 'org.fakemaps.fakegis.com', 
          expires:expiresAt,
          sameSite: sameSiteValue.toLowerCase()
        }
      }
    )
  };

  // send the cookies.,, 
  cookies.map((c) => {
    res.cookie(c.name, JSON.stringify(sess), c.options);
  })
  // 302 to the redirect url
  res.redirect(302, uri);
});

module.exports = router;
