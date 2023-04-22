const path = require('path');

// __dirname से current directory का path मिलता है
// '..' से एक level ऊपर चले जाते हैं
// 'views' और 'success.html' से final path मिलता है
exports.getSuccess = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'success.html'));
};