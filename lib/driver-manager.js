const WebDriver = require('webdriverio');

class DriverManager {

    constructor( browserConfig ) {
        this.browsers = {};
        this.browserConfig = browserConfig;
    }

    initBrowser( id ) {
        const { browser, host, port } = this.browserConfig;

        this.browsers[ id ] = WebDriver.remote( {
            host: host,
            port: port,
            desiredCapabilities: {
                browserName: browser
            }
        } ).init();

        return this.browsers[ id ];
    }

    stopBrowser( id ) {
        if ( ! this.browsers[ id ] ) {
            return;
        }

        this.browsers[ id ].close();
        this.browsers[ id ] = null;
    }

    killAll( id ) {
        for ( let id in this.browsers ) {
            this.stopBrowser( id );
        }
    }

    getBrowser( id ) {
        return this.browsers[ id ] || this.initBrowser( id );
    }
}

module.exports = DriverManager;
