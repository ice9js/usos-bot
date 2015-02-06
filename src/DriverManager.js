var WebDriver = require('webdriverio');

/**
 * A manager object that creates, manages, and destroys browser sessions
 *
 * @param {[Object]} config Configuration array
 */
module.exports = function (config) {

    this.config = config;

    this.browsers = {};

    this.init = function(id) {
        this.browsers[id] = WebDriver.remote({
            host: config.host,
            port: config.port,
            desiredCapabilities: {
                browserName: config.browser
            }
        }).init();

        return this.browsers[id];
    }

    this.getDriver = function(id) {
        return this.browsers[id] || this.init(id);
    }

    this.getDrivers = function() {
        return this.browsers;
    }

    this.stop = function(id) {
        this.browsers[id].close();
        this.browsers[id] = null;
    }

    this.stopDrivers = function() {
        for (var i in this.browsers) {
            if (this.browsers[i]) {
                this.browsers[i].close();
            }
        }
    }
}
