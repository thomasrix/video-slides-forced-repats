const request = require('request')
const fs = require('fs-extra');

const sheetID = '1zHtoW9RRJFL3K-4tYee7Saa6Ut-9jTMaOvKsj-dqneM';
const publishBase = 'https://uhdi8ydrv4.execute-api.eu-west-1.amazonaws.com/prod/build/data?spreadsheet=';

// console.log(publishBase + sheetID);

function publishTroughLink() {
    request(`${publishBase}${sheetID}`, (error, response, body)=> {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body)
            console.log('url:' , data.url);
            saveLocal(data.url);
            // const formattedJson = reformatData(data.feed.entry);
            // const filename = buildFilename(data.feed)
            
            // writeFile(filename, formattedJson)
        } else {
            console.log("Got an error: ", error, ", status code: ", response.statusCode)
        }
    })
}
function saveLocal(url){
    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            console.log('loaded' , data.filename);
            fs.writeFile('./src/assets/'+data.filename, JSON.stringify(data), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("Generated file");
            });
        } else {
            console.log("Got an second error: ", error, ", status code: ", response.statusCode, ", url: ", url)
        }
    })
}
publishTroughLink();
