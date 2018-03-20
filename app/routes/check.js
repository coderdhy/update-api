var msg = require('../../config.json')

var check = {}

check.check = function(req, res) {
    console.log(req.query)
    let params = req.query
    if(params.os === 'win32') {
        res.json(msg.winnew)
    } else if(params.os === 'darwin') {
        res.json(msg.macnew)
    } else {
        res.json(msg.error)
    }
}

module.exports = check