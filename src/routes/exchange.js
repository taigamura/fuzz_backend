const router = require('express').Router();
const axios = require('axios');
const querystring = require('querystring');
const dotenv = require('dotenv');
dotenv.config();


const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const redirectUri = process.env.SPOTIFY_REDIRECT_URI

// token endpoint
router.route('/').post( async (req, res) => {
  const { code } = req.body;
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }), {
        headers: {
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64')), 
        'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    const { data } = response;
    res.json({
      access_token: data.access_token,
      token_type: data.token_type,
      scope: data.scope, 
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to exchange authorization code for access token' });
  }
});


module.exports = router;