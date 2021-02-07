const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.query);

  res.send('sensors');
});

router.get('/esp', (req, res) => {
  console.log('esp', req.query);
  res.send('ESP');
})


module.exports = router;