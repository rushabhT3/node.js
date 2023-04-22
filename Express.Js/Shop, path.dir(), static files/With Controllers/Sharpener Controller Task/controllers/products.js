const path = require('path');
// rootDir variable को define करने के लिए require('../util/path') का use किया गया है. 
const rootDir = require('../util/path');

// rootDir variable project root directory को represent करता है.
// इसलिए path.join(rootDir, 'views', 'contact-us.html') में '..' का use नहीं किया गया है.
exports.getContact = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contact-us.html'));
};

exports.postContact = (req, res, next) => {
    console.log(req.body);
    res.redirect('/success');
};