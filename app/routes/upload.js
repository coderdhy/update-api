var fs = require('fs');
var path = require('path');
var multer = require('multer');
var fileconfig = require('../../fileconfig');
var uploadFolder = './upload';

if(process.env.NODE_ENV.indexOf('production') >= 0) {
    uploadFolder = fileconfig.dist;
}

console.log('env', process.env.NODE_ENV)
var createFolder = function(dirname) {
    console.log(dirname)
    if (fs.existsSync(dirname)) {
        return true;
    } 
    if (createFolder(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
    }
    return true;
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var folder = req.query.path
        var dst = uploadFolder
        if(folder) {
            dst = path.join(uploadFolder, folder);
            createFolder(dst)
        }
	    console.log(dst);
        cb(null, dst);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

createFolder(uploadFolder);

var upload = multer({ storage: storage }).single('file');
var func = {};
func.upload = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.end("upload success");
        }
    });
};

module.exports = func;
