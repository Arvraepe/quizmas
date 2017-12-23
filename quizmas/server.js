/**
 * Created by Arne on 19-11-2016.
 */

require('app-module-path').addPath(__dirname + '/api');

const path = require('path');

global.R = require('ramda');
global.dir = path.resolve(__dirname);

const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');

App.use(Express.static('views'));
App.use(BodyParser.json());

require('routes/QuizRoutes')(App);
require('routes/TeamRoutes')(App);
require('routes/RoundRoutes')(App);

App.listen(8080, () => console.log('Quizmas App Launched'));
