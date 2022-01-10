const express = require('express');

const app = express();
module.exports = { path: '/api', handler: app };
const rendertron = require('rendertron-middleware');

const BOTS = rendertron.botUserAgents.concat('googlebot');
const BOT_UA_PATTERN = new RegExp(BOTS.join('|'), 'i');

app.use(
  rendertron.makeMiddleware({
    proxyUrl: 'https://garden-manager-20781.uc.r.appspot.com/render',
    userAgentPattern: BOT_UA_PATTERN,
  })
);

app.use(express.static('files'));
app.listen(8080);

// app.get('*.*', express.static('public'));
// app.get('*', (req, res) => {
//   res.set('Vary', 'User-Agent');
//   res.sendFile(process.cwd() + '/dist/index.html');
// });

// app.listen(process.env.PORT || 8080, () => {
//   console.log('node express server listening...');
// });
