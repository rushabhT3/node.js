const path = require('path');
// यह लाइन path मॉड्यूल को current file में इम्पोर्ट कर रही है। 
// path मॉड्यूल file और directory paths के साथ काम करने के लिए utilities प्रदान करता है। 
// इसका उपयोग file paths को join, normalize, और resolve करने के लिए किया जाता है।
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

router.get('/contact-us', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'contact-us.html'));
});

router.post('/contact-us', (req, res, next) => {
  console.log(req.body);
  res.redirect('/success');
});

module.exports = router;
