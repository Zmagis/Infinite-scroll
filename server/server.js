const express = require('express');
const Flickr = require('flickr-sdk');
const { response } = require('express');
require('dotenv').config();

const app = express();
const API_KEY = process.env.FLICKR_API_KEY;

const flickr = new Flickr(API_KEY);

app.get('/data', (req, res) => {
  const page = req.query['0'];

  // search method was chosen in order to avoid inappropriate images
  flickr.photos
    .search({
      tags: 'forest',
      per_page: 10,
      page: page,
    })
    .then((r) => {
      res.json(r);
    })
    .catch(function (err) {
      console.error('bonk', err);
    });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
