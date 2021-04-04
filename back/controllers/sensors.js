const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.query);

  res.send('sensors');
});

router.get('/esp', (req, res) => {
  console.log('esp', req.query);
  res.send('ESP');
});

router.post('/esp', (req, res) => {
  console.log(req.body);
  res.end();
});


module.exports = router;
