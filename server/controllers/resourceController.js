/**
 * Created by Denis on 12.03.2018.
 */
'use strict';

function ResourceController() {
    let _self = this;
    const fs = require('fs');

    _self.loadResource = (req, res, next) => {

        let url = req.path().replace("/server/", "");

        fs.readFile(url, (err, data) => {
            if (err) {
                console.log(err);
                next(err);
            }
            let fileType = url.substring(url.indexOf("."), url.length);
            switch (fileType) {
                case ('.css') : {
                    res.setHeader('Content-Type', 'text/css');
                    break;
                }
                case ('.min.css'): {
                    res.setHeader('Content-Type', 'text/css');
                    break;
                }
                case ('.html') : {
                    res.setHeader('Content-Type', 'text/html');
                    break;
                }
                case('.js'): {
                    res.setHeader('Content-Type', 'text/javascript');
                    break;
                }
                case('.png') : {
                    res.setHeader('Content-Type', 'image/png');
                    break;
                }
            }

            res.write(data);
            res.end();
            next();
        });
    };
}

module.exports = new ResourceController();
