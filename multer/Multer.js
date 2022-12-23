const multer = require('multer');
const multerStorage = multer.memoryStorage();

let upload = multer({storage: multerStorage});


module.exports = upload;
