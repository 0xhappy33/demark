
import React from 'react';
import ReactDOM from 'react-dom';

var TICK = 17;
var endEvents = [];

/**
 * EVENT_NAME_MAP is used to determine which event fired when a
 * transition/animation ends, based on the style property used to
 * define that event.
 */
var EVENT_NAME_MAP = {
    transitionend: {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'mozTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd'
    },

    animationend: {
        'animation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd',
        'MozAnimation': 'mozAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd'
    }
};

(function detectEvents() {
    if (typeof window === "undefined") {
        return;
    }

    var testEl = document.createElement('div');
    var style = testEl.style;

    // On some platforms, in particular some releases of Android 4.x, the
    // un-prefixed "animation" and "transition" properties are defined on the
    // style object but the events that fire will still be prefixed, so we need
    // to check if the un-prefixed events are useable, and if not remove them
    // from the map
    if (!('AnimationEvent' in window)) {
        delete EVENT_NAME_MAP.animationend.animation;
    }

    if (!('TransitionEvent' in window)) {
        delete EVENT_NAME_MAP.transitionend.transition;
    }

    for (var baseEventName in EVENT_NAME_MAP) {
        if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
            var baseEvents = EVENT_NAME_MAP[baseEventName];
            for (var styleName in baseEvents) {
                if (styleName in style) {
                    endEvents.push(baseEvents[styleName]);
                    break;
                }
            }

        }
    }
})();

function animationSupported() {
    return endEvents.length !== 0;
}

/**
 * Functions for element class management to replace dependency on jQuery
 * addClass, removeClass and hasClass
 */
 var hasClass = function (element, className) {
     if (element.classList) {
         return element.classList.contains(className);
     } else {
         return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
     }
 };

var addClass = function (element, className) {
    if (element.classList) {
        element.classList.add(className);
    } else if (!hasClass(element, className)) {
        element.className = element.className + ' ' + className;
    }
    return element;
};

var removeClass = function (element, className) {
    if (hasClass(className)) {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = (' ' + element.className + ' ')
                .replace(' ' + className + ' ', ' ').trim();
        }
    }
    return element;
};

let TransitionGroupChild = React.createClass({
    componentWillMount: function() {
        this.classNameQueue = [];
    },

    componentWillUnmount: function() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }
    },

    transition: function(animationType, finishCallback) {
        var node = ReactDOM.findDOMNode(this);
        var className = this.props.name + '-' + animationType;
        var activeClassName = className + '-active';

        var endListener = function() {
            removeClass(node, className);
            removeClass(node, activeClassName);

            // Usually this optional callback is used for informing an owner of
            // a leave animation and telling it to remove the child.
            if (finishCallback)
                finishCallback();
        };

        if (!animationSupported()) {
            endListener();
        } else {
            if (animationType === "enter") {
                this.animationTimeout = setTimeout(endListener,
                                                   this.props.enterTimeout);
            } else if (animationType === "leave") {
                this.animationTimeout = setTimeout(endListener,
                                                   this.props.leaveTimeout);
            }
        }

        addClass(node, className);

        // Need to do this to actually trigger a transition.
        this.queueClass(activeClassName);
    },

    queueClass: function(className) {
        this.classNameQueue.push(className);

        if (!this.timeout) {
            this.timeout = setTimeout(this.flushClassNameQueue, TICK);
        }
    },

    flushClassNameQueue: function() {
        this.classNameQueue.forEach(function(name) {
            addClass(ReactDOM.findDOMNode(this), name);
        }.bind(this));
        this.classNameQueue.length = 0;
        this.timeout = null;
    },

    componentWillEnter: function(done) {
        if (this.props.enter) {
            this.transition('enter', done);
        } else {
            done();
        }
    },

    componentWillLeave: function(done) {
        if (this.props.leave) {
            this.transition('leave', done);
        } else {
            done();
        }
    },

    render: function() {
        return React.Children.only(this.props.children);
    }
});

module.exports = TransitionGroupChild;
