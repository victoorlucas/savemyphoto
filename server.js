const Crawler = require('crawler');
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({
        });
    }

    next();
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    const returnImage = new Crawler({
        maxConnections : 1000,
        callback : function (error, resp, done) {
            if(error){
                return res.status(200).json({
                    url: url.split('","display_resources"')[0],
                    code: 200
                })
            }else{
                var $ = resp.$;
                const url = $('script').text().split("window._sharedData = ")[1].split('display_url":"')[1];
                console.log(url.split('","display_resources"')[0])

                if(url){
                    return res.status(200).json({
                        url: url.split('","display_resources"')[0],
                        code: 200
                    })
                }

                return res.status(500).json({
                    code: 500
                })
            }
            done();
        }
    });

    returnImage.queue('https://www.instagram.com/p/'+id);
})

app.listen(3000, () => console.log("listening"))