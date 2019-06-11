let config = {
    dev: {
        global:{
            TYPE:'Local development',
            DEBUGGING:true,
            LOCAL_ASSETS_PATH:'assets/',
            // EXTERNAL_ASSETS_PATH:'http://localhost:8888/boiler-test/stage/video-slides-external-assets/'
            EXTERNAL_ASSETS_PATH:'https://downol.dr.dk/download/nyheder/2019/video-slides-sjaelsmark/'
            // EXTERNAL_ASSETS_PATH:'http://82213d49.ngrok.io/boiler-test/stage/video-slides-external-assets/'
        }
    },
    stage: {
        global:{
            TYPE:'Staging',
            DEBUGGING:true,
            LOCAL_ASSETS_PATH:'https://dr-json-data.s3.eu-west-1.amazonaws.com/',
            // EXTERNAL_ASSETS_PATH:'https://d84060d8.ngrok.io/boiler-test/stage/video-slides-external-assets/'
            EXTERNAL_ASSETS_PATH:'https://downol.dr.dk/download/nyheder/2019/video-slides-sjaelsmark/'
            // EXTERNAL_ASSETS_PATH:'http://localhost:8888/boiler-test/stage/video-slides-external-assets/'
        },
        // DEPLOY_FOLDER:'/Users/trix/Documents/udvikling/boiler-test/stage/',
        DEPLOY_FOLDER:'/Volumes/staging/',
        OVERWRITE_CONFIRM:true,
        MINIFY:false,
        TEST_URL:'http://www.dr.dk/tjenester/visuel/staging/',
    },
    deploy: {
        global:{
            TYPE:'Production',
            DEBUGGING:false,
            LOCAL_ASSETS_PATH:'https://dr-json-data.s3.eu-west-1.amazonaws.com/',
            // LOCAL_ASSETS_PATH:'http://localhost:8888/boiler-test/deploy/dr-faq-list/assets/',
            EXTERNAL_ASSETS_PATH:'https://downol.dr.dk/download/nyheder/2019/video-slides-sjaelsmark/'
            // EXTERNAL_ASSETS_PATH:'http://localhost:8888/boiler-test/deploy/dr-faq-list/assets/'
        },
        DEPLOY_FOLDER:'/Volumes/2019/',
        OVERWRITE_CONFIRM:true,
        MINIFY:true,
        TEST_URL:'http://www.dr.dk/nyheder/htm/grafik/2019/',
    }
}
module.exports = config;