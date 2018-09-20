var util = require( 'util' );

const DriverManager = require( './driver-manager' );
const selectors = require( './selectors' );

class Crawler {

	constructor( config ) {
		this.config = config;
		this.sessions = new DriverManager( config.browser );
	}

	run() {
		for ( let subjectId in this.config.subjects ) {
			this.__prepareSessionForSubject( subjectId );
		}
	}

	__prepareSessionForSubject( subjectId ) {
		const browser = this.sessions.getBrowser( subjectId );

		browser
			.url( 'http://usosweb.uj.edu.pl' )
            .click( selectors.home.login )
            .waitForVisible( selectors.login.username, 5000 )
            .setValue( selectors.login.username, this.config.user.login )
            .setValue( selectors.login.password, this.config.user.pass )
            .click( selectors.login.login )
            .waitForVisible( selectors.home.logo, 5000 )
            .click( selectors.home.student_page )
            .waitForVisible( selectors.student_page.registration, 5000 )
            .click( selectors.student_page.registration )
            .waitForVisible( util.format(
                selectors.registration.select_registration,
                this.config.subjects[ subjectId ].registration
            ), 5000 )
            .click( util.format(
                selectors.registration.select_registration,
                this.config.subjects[ subjectId ].registration
            ) )
            .waitForVisible( util.format(
                selectors.registration.course,
                this.config.subjects[ subjectId ].id
            ), 5000 )
            .call( () => this.__waitForRegistration( subjectId ) );
	}

	__waitForRegistration( subjectId ) {
		const timeout = setInterval( () => {
			const time = new Date().getTime();
			const start = parseInt( new Date( this.config.start ).getTime() );

			if ( start <= time ) {
				try {
					this.__register( subjectId, () => {
                        clearInterval( timeout );
                        console.log( `Registration ${ subjectId } successful!` );
                    } );
				} catch ( err ) {
					console.error( `Registration ${ subjectId } failed! Retrying.` );
				}
			}
		}, this.config.intervals.check_time );
	}

	__register( subjectId, callback ) {
		const browser = this.sessions.getBrowser( subjectId );

		browser
            .click( util.format(
                selectors.registration.course,
                this.config.subjects[ subjectId ].id
            ) )
            .waitForVisible( util.format(
                selectors.registration.course_group,
                this.config.subjects[ subjectId ].group
            ), 5000 )
            .click( util.format(
                selectors.registration.course_group,
                this.config.subjects[ subjectId ].group
            ) )
            .waitForSelected( util.format(
                selectors.registration.course_group,
                this.config.subjects[ subjectId ].group
            ), 1000 )
            .click( selectors.registration.confirm )
            .call( callback );
	}
}

module.exports = Crawler;
