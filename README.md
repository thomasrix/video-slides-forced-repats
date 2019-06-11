# Video Slides Forced Repatriation
### Fullscreen video slides with silent loops and autoplay sequences
### Version 2 - for story on forced reaptratied families

The aim is to incoporate adaptive progress and timers and video subtitles
Another feature is differentiated styles for the text overlays


Bundles with Parceljs both for development and deploy.
Javascript (ES6) and css (SASS) bundled separately.
Distributes with pure Nodejs. (node -v 10.11.0)

### Scripts:
```ruby
npm run dev
# Bundles to dev directory and starts watching for changes, 
# serving the index.html via http://localhost:1234

npm run stage
# Bundles to stage directory and copies unminified bundles to mounted folder 
# defined in config.js -> config.stage.DEPLOY_FOLDER

npm run deploy
# Bundles to dist directory and copies minified and logging-stripped bundles to mounted folder 
# defined in config.js -> config.deploy.DEPLOY_FOLDER

npm run publish
# Runs the publish.js script that grabs content from the corresponding Google Sheet and hosts a JSON version on AWS as well as downloading a local copy for debugging.

```
#### Settings:
The "config" object in config.js controls where the 3 different scripts output their files and wether you want a warning when overwriting existing folders (OVERWRITE_CONFIRM). 

You can also choose to minify the staging and deploy bundles or not.

Each script type (dev/stage/deploy) has a "global" object where you can set global variables. These are added to "process.env" in the bundling process meaning they can be accessed in all js files in the project. In the boilerplate example you can this way set different values in "ASSET_PATH" which is then available differently in dev, stage and deploy as process.env.ASSETS_PATH.
