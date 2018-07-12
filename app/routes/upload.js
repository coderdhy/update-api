var fs = require('fs');
var path = require('path');
var multer = require('multer');
var fileconfig = require('../../fileconfig')
var uploadFolder = './upload'

if(process.env.NODE_ENV === 'production') {
    uploadFolder = fileconfig.dist
}

var createFolder = function(dirpath) {
    try {
        if (!fs.existsSync(dirpath)) {
            let pathtmp;
            dirpath.split(/[/\\]/).forEach(function (dirname) {  //这里指用/ 或\ 都可以分隔目录  如  linux的/usr/local/services   和windows的 d:\temp\aaaa
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                }
                else {
                    pathtmp = dirname;
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp)) {
                        return false;
                    }
                }
            });
        }
        return true;
    } catch (e) {
        log.error("create director fail! path=" + dirpath + " errorMsg:" + e);
        return false;
    }
};

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var folder = req.query.path
        var dst = uploadFolder
        if(folder) {
            dst = path.join(uploadFolder, folder);
            createFolder(dst)
        }
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