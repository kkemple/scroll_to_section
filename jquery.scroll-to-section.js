/**
 * @scrollToSection - jQuery Plugin
 * Author: Kurtis Kemple
 * Date: Feb 11th, 2013
 * Desc: set element as a link that will make page scroll
 * to designated section on click
 * Website: http:kurtiskemple.com
 * Email: kurtiskemple@gmail.com
 */

;(function( $, window, document, undefined ) {
	'use strict';

	var ScrollToSection = function( opts ) {

		// call our init function and pass in our options
		this.init.call( this, opts );

		// return our scroll object
		return this;
	};

	ScrollToSection.prototype = {

		init: function( opts ) {

			// set our defaults
			this.defaults = {
				anchor: '',
				section: 'body',
				offset: 0,
				duration: 400,
				beforeScroll: function() {},
				complete: function() {}
			};

			// extend our defaults with end user options
			this.options = $.extend( {}, this.defaults, opts || {} );

			// cache the element we set our click event on
			this.anchorElement = $( this.options.anchor );

			// once we have all necassary options cache the element will be scrolling to
			this.element = $( this.options.section );

			// check to see if the element we want to scroll to exists
			// if it does set up our events
			if( this.exists( this.element ) ) {
				this.events();
			} else {
				// if not log it so the end use is aware and return false
				window.console.log( 'Invalid Selector, function: ScrollToSection' );
				return false;
			}
		},

		scroll: function() {

			// get the top position of the element to scroll to
			this.topPos = this.element.offset().top;

			// add on any offset that has been set
			var finalPos = this.topPos + this.options.offset;

			// cache this
			var self = this;

			// animate the page to desired offset
			$( 'html, body' ).animate({
				scrollTop: finalPos
			}, self.options.duration, function() {
				// call our complete callback function
				self.options.complete.call( self );
			});

			// return our scroll object
			return this;
		},

		exists: function( el ) {
			// if our element exists return true
			if ( el.length > 0 ) {
				return true;
			} else {
				return false;
			}

			// return our scroll object
			return this;
		},

		events: function() {
			// cache this
			var self = this;

			// set our click event for our anchor element
			this.anchorElement.on( 'click', function( e ) {
				// call our scroll function
				self.options.beforeScroll.call( self );
				self.scroll();

				// prevent the default action
				if ( e.preventDefault ) {
					e.preventDefault();
				} else {
					e.returnValue = false;
				}
			});

			// return our scroll object
			return this;
		},

		anchor: function( anchor ) {
			// if param is passed set the anchor option and update the element var,
			// else return the anchor option
			if ( typeof anchor === 'undefined' ) {
				return this.options.anchor;
			} else {
				this.options.anchor = anchor;
				this.anchorElement = $( anchor );
				this.events();
			}

			// return the scroll object
			return this;
		},

		section: function( section ) {
			// if param is passed set the section option and update the element var,
			// else return the section option
			if ( typeof section === 'undefined' ) {
				return this.options.section;
			} else {
				this.options.section = section;
				this.element = $( section );
			}

			// return the scroll object
			return this;
		},

		offset: function( offset ) {
			// if param is passed set the offset option, else return the offset option
			if ( typeof offset === 'undefined' ) {
				return this.options.offset;
			} else {
				this.options.offset = offset;
			}

			// return the scroll object
			return this;
		},

		duration: function( duration ) {
			// if param is passed set the duration option, else return the duration option
			if ( typeof duration === 'undefined' ) {
				return this.options.duration;
			} else {
				this.options.duration = duration;
			}

			// return the scroll object
			return this;
		},

		callback: function( fn ) {
			// if param is passed set the callback option, else return the callback option
			if ( typeof fn === 'undefined' ) {
				return this.options.complete;
			} else {
				this.options.complete = fn;
			}

			// return the scroll object
			return this;
		}
	};

	// since our scroll function is protected from the window object we must attach
	// it to the window
	window.ScrollToSection = ScrollToSection;

})( jQuery, this, this.document );