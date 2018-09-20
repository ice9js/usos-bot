var fs = require( 'fs' );

const Crawler = require('./crawler.js');

const config = JSON.parse( fs.readFileSync( 'config/config.json', 'utf8' ) );
const bot = new Crawler( config );
bot.run();
