var fs = require('fs');
var path = require('path');
var multer = require('multer');
var fileconfig = require('../../fileconfig')
var uploadFolder = fileconfig.dist

if(process.env.NODE_ENV === 'dev') {
    uploadFolder = './upload'
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
                console.log(dirname, "     ", pathtmp);
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp)) {
                        return false;
                    }
                }
            });
        }
        return true;
    } catch (e) {
        console.error("create director fail! path=" + dirpath + " errorMsg:" + e);
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
