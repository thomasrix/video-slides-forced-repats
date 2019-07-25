let config = {
    dev: {
        global:{
            TYPE:'Local development',
            DEBUGGING:true,
            DATA_ASSETS_PATH:'assets/',
            DATA_FILE:'208c1239ec5650a18ae1a1befc633f70-videoslidestvangshjemsendelse-slides.json',
            EXTERNAL_ASSETS_PATH:'http://localhost:8888/local-assets/download/video-slides-forced-repats-external-assets/'
            // EXTERNAL_ASSETS_PATH:'https://downol.dr.dk/download/nyheder/2019/video-slides-forced-repats/'
        }
    },
    stage: {
        global:{
            TYPE:'Staging',
            DEBUGGING:true,
            DATA_ASSETS_PATH:'https://dr-json-data.s3.eu-west-1.amazonaws.com/',
            DATA_FILE:'208c1239ec5650a18ae1a1befc633f70-videoslidestvangshjemsendelse-slides.json',
            EXTERNAL_ASSETS_PATH:'https://downol.dr.dk/download/nyheder/2019/video-slides-forced-repats-external-assets/'
        },
        DEPLOY_FOLDER:'/Volumes/staging/',
        OVERWRITE_CONFIRM:true,
        MINIFY:false,
        TEST_URL:'http://www.dr.dk/tjenester/visuel/staging/',
    },
    deploy: {
        global:{
            TYPE:'Production',
            DEBUGGING:false,
            DATA_ASSETS_PATH:'https://dr-json-data.s3.eu-west-1.amazonaws.com/',
            DATA_FILE:'208c1239ec5650a18ae1a1befc633f70-videoslidestvangshjemsendelse-slides.json',
            EXTERNAL_ASSETS_PATH:'https://downol.dr.dk/download/nyheder/2019/video-slides-forced-repats-external-assets/'
        },
        DEPLOY_FOLDER:'/Volumes/2019/',
        OVERWRITE_CONFIRM:true,
        MINIFY:true,
        TEST_URL:'http://www.dr.dk/nyheder/htm/grafik/2019/',
    }
}
module.exports = config;