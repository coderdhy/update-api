var condition = require('../../config.json')
var check = {}

check.check = function(req, res) {
    console.log(req.query)
    let params = req.query
    
    for(let i=0; i<condition.length; i++) {
        var element = condition[i]
        if(params.app !== element.app) {
            continue
        }
        var array = element.baseAppVersion
        if(array.length > 0 && array.indexOf(params.version) < 0 ) {
            continue
        }
        array = element.baseOs
        if(array.length > 0 && array.indexOf(params.os) < 0) {
            continue
        }
        array = element.baseChannel
        if(array.length > 0 && array.indexOf(params.channel) < 0) {
            continue
        }
        let bfind = false
        array = element.baseOsversion
        if(array.length > 0) {
            for(let j=0; j<array.length; j++) {
                if (0 < params.osversion.indexOf(array[j]))
                {
                    bfind = true
                }
            }
            if(!bfind) {
                continue
            }
        }
        res.json({
            "code": 200,
            "msg": "OK",
            "data": {
                "url": element.targetAppUrl,
                "urlBack": element.targetAppUrlBackUp,
                "name": element.targetAppVersion,
                "notes": element.targetNotes,
                "pubDate": element.targetPubDate,
                "strategy": element.targetStrategy
            }
        })
        return
    }
    res.json({
        "code": 204,
        "msg": "没有更新版本啦！",
        "data": ""
    })
}

module.exports = check