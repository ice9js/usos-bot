var DriverManager = require('./DriverManager');

var selectors = require('./Selectors.js');

var fs = require('fs');

var util = require('util');

module.exports = function() {

    this.config = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));

    this.manager = new DriverManager(this.config.browser);

    this.browsers = [];

    this.intervals = [];

    this.run = function() {
        for (var i=0; i<this.config.subjects.length; ++i) {
            this.prepare(i);
        }
    }

    this.prepare = function(id) {
        this.browsers[id] = this.manager.getDriver(id);
        this.browsers[id]
            .url('http://usosweb.uj.edu.pl')
            .click(selectors.home.login)
            .waitFor(selectors.login.username, 5000)
            .setValue(selectors.login.username, this.config.user.login)
            .setValue(selectors.login.password, this.config.user.pass)
            .click(selectors.login.login)
            .waitFor(selectors.home.logo, 5000)
            .click(selectors.home.student_page)
            .waitFor(selectors.student_page.registration, 5000)
            .click(selectors.student_page.registration)
            .waitFor(selectors.registration.select_registration, 5000)
            .click(selectors.registration.select_registration)
            .waitFor(util.format(selectors.registration.course, id+4), 5000)
            .click(util.format(selectors.registration.course, id+4))
            .waitFor(util.format(
                selectors.registration.course_group,
                this.config.subjects[id].group
            ), 5000)
            .click(util.format(
                selectors.registration.course_group,
                this.config.subjects[id].group
            ))
            .call(function() {this.bot.wait(this.id+1)}.bind({
                id: this.id,
                bot: this
            }));
    }

    this.wait = function(id) {
        if (this.config.subjects.length > parseInt(id)) {
            return;
        }

        var timeout = setInterval(function() {
            var time = new Date().getTime();
            var start = parseInt(new Date(this.bot.config.start).getTime());

            if (start <= time) {
                clearInterval(timeout);

                for (var i in this.bot.browsers) {
                    this.bot.confirmRegistration(this.bot.browsers[i]);

                    this.bot.intervals[i] = setInterval(function() {
                        try {
                            this.bot.confirmRegistration(this.browser);
                        } catch (err) {
                            clearInterval(this.bot.intervals[this.interval]);
                        }
                    }).bind({
                        bot: this.bot,
                        interval: i,
                        browser: browsers[i]
                    }, this.clickInterval);
                }
            }
        }.bind({
            bot: this,
            clickInterval: this.config.intervals.click
        }), this.config.intervals.check_time);
    }

    this.confirmRegistration = function(browser) {
        browser
            .click(selectors.registration.confirm)
            .waitForVisible(selectors.registration.error);
    }
}
