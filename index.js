const path = require('path');

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const helmet = require('helmet');

const session = require('express-session');

const PORT = process.env.PORT || 3100;
const routes = require('./routes');

const auth = require('./auth');
const redis = require('./helpers/redis');

const { trident, encodingCheck, setHeaders } = require('./helpers/headerMiddleware');

app.use(helmet());

app.use(bodyParser.json({ limit: '256kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '256kb' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/assets', encodingCheck, express.static('assets', {
  redirect: false,
  setHeaders,
}));

app.use(trident);

app.use(session(redis.redis));
app.use(auth.initialize());
app.use(auth.session());

routes.bind(app);

app.get('*', (req, res) => {
  res.render('index');
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', PORT, PORT);
  }
});
