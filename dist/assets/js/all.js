"use strict";

console.log('Hello!');
$(document).ready(function () {
  // 產品 panel
  $('.product-menu li').click(function () {
    var id = $(this).attr('data-id');

    if (id == 3) {
      return false;
    } else {
      $('.product-menu li').removeClass('active');
      $(this).addClass('active');
      productsPage(id);
    }
  }); // 據點

  $('.btn-card-info').click(function () {
    $('.section-location').removeClass('active');
    $('.section-location.__location-detail').addClass('active');
  }); // 部落格最新消息清單

  $('.btn-more, .item-news, .btn-more-small').click(function () {
    console.log('click');
    $('.section-news').removeClass('active');
    $('.section-news.__news-detail').addClass('active');
  });
}); // 產品 panel

function productsPage(page) {
  console.log(page);
  $('.section-products').removeClass('active');
  $('.section-products').eq(page - 1).addClass('active');
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap v5.0.0-alpha2 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory());
})(void 0, function () {
  'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000;
  var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  var toType = function toType(obj) {
    if (obj === null || obj === undefined) {
      return "" + obj;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var getUID = function getUID(prefix) {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));

    return prefix;
  };

  var getSelector = function getSelector(element) {
    var selector = element.getAttribute('data-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href');
      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  var getSelectorFromElement = function getSelectorFromElement(element) {
    var selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  var getElementFromSelector = function getElementFromSelector(element) {
    var selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    var _window$getComputedSt = window.getComputedStyle(element),
        transitionDuration = _window$getComputedSt.transitionDuration,
        transitionDelay = _window$getComputedSt.transitionDelay;

    var floatTransitionDuration = parseFloat(transitionDuration);
    var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  var triggerTransitionEnd = function triggerTransitionEnd(element) {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  var isElement = function isElement(obj) {
    return (obj[0] || obj).nodeType;
  };

  var emulateTransitionEnd = function emulateTransitionEnd(element, duration) {
    var called = false;
    var durationPadding = 5;
    var emulatedDuration = duration + durationPadding;

    function listener() {
      called = true;
      element.removeEventListener(TRANSITION_END, listener);
    }

    element.addEventListener(TRANSITION_END, listener);
    setTimeout(function () {
      if (!called) {
        triggerTransitionEnd(element);
      }
    }, emulatedDuration);
  };

  var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
    Object.keys(configTypes).forEach(function (property) {
      var expectedTypes = configTypes[property];
      var value = config[property];
      var valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
      }
    });
  };

  var isVisible = function isVisible(element) {
    if (!element) {
      return false;
    }

    if (element.style && element.parentNode && element.parentNode.style) {
      var elementStyle = getComputedStyle(element);
      var parentNodeStyle = getComputedStyle(element.parentNode);
      return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden';
    }

    return false;
  };

  var findShadowRoot = function findShadowRoot(element) {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      var root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  };

  var noop = function noop() {
    return function () {};
  };

  var reflow = function reflow(element) {
    return element.offsetHeight;
  };

  var getjQuery = function getjQuery() {
    var _window = window,
        jQuery = _window.jQuery;

    if (jQuery && !document.body.hasAttribute('data-no-jquery')) {
      return jQuery;
    }

    return null;
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var mapData = function () {
    var storeData = {};
    var id = 1;
    return {
      set: function set(element, key, data) {
        if (typeof element.bsKey === 'undefined') {
          element.bsKey = {
            key: key,
            id: id
          };
          id++;
        }

        storeData[element.bsKey.id] = data;
      },
      get: function get(element, key) {
        if (!element || typeof element.bsKey === 'undefined') {
          return null;
        }

        var keyProperties = element.bsKey;

        if (keyProperties.key === key) {
          return storeData[keyProperties.id];
        }

        return null;
      },
      "delete": function _delete(element, key) {
        if (typeof element.bsKey === 'undefined') {
          return;
        }

        var keyProperties = element.bsKey;

        if (keyProperties.key === key) {
          delete storeData[keyProperties.id];
          delete element.bsKey;
        }
      }
    };
  }();

  var Data = {
    setData: function setData(instance, key, data) {
      mapData.set(instance, key, data);
    },
    getData: function getData(instance, key) {
      return mapData.get(instance, key);
    },
    removeData: function removeData(instance, key) {
      mapData["delete"](instance, key);
    }
  };
  /* istanbul ignore file */

  var find = Element.prototype.querySelectorAll;
  var findOne = Element.prototype.querySelector; // MSEdge resets defaultPrevented flag upon dispatchEvent call if at least one listener is attached

  var defaultPreventedPreservedOnDispatch = function () {
    var e = new CustomEvent('Bootstrap', {
      cancelable: true
    });
    var element = document.createElement('div');
    element.addEventListener('Bootstrap', function () {
      return null;
    });
    e.preventDefault();
    element.dispatchEvent(e);
    return e.defaultPrevented;
  }();

  var scopeSelectorRegex = /:scope\b/;

  var supportScopeQuery = function () {
    var element = document.createElement('div');

    try {
      element.querySelectorAll(':scope *');
    } catch (_) {
      return false;
    }

    return true;
  }();

  if (!supportScopeQuery) {
    find = function find(selector) {
      if (!scopeSelectorRegex.test(selector)) {
        return this.querySelectorAll(selector);
      }

      var hasId = Boolean(this.id);

      if (!hasId) {
        this.id = getUID('scope');
      }

      var nodeList = null;

      try {
        selector = selector.replace(scopeSelectorRegex, "#" + this.id);
        nodeList = this.querySelectorAll(selector);
      } finally {
        if (!hasId) {
          this.removeAttribute('id');
        }
      }

      return nodeList;
    };

    findOne = function findOne(selector) {
      if (!scopeSelectorRegex.test(selector)) {
        return this.querySelector(selector);
      }

      var matches = find.call(this, selector);

      if (typeof matches[0] !== 'undefined') {
        return matches[0];
      }

      return null;
    };
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var $ = getjQuery();
  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {}; // Events storage

  var uidEvent = 1;
  var customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  var nativeEvents = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll'];
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
  }

  function getEvent(element) {
    var uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      var domElements = element.querySelectorAll(selector);

      for (var target = event.target; target && target !== this; target = target.parentNode) {
        for (var i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target;

            if (handler.oneOff) {
              EventHandler.off(element, event.type, fn);
            }

            return fn.apply(target, [event]);
          }
        }
      } // To please ESLint


      return null;
    };
  }

  function findHandler(events, handler, delegationSelector) {
    if (delegationSelector === void 0) {
      delegationSelector = null;
    }

    var uidEventList = Object.keys(events);

    for (var i = 0, len = uidEventList.length; i < len; i++) {
      var event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }

    return null;
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    var delegation = typeof handler === 'string';
    var originalHandler = delegation ? delegationFn : handler; // allow to get the native events from namespaced events ('click.bs.button' --> 'click')

    var typeEvent = originalTypeEvent.replace(stripNameRegex, '');
    var custom = customEvents[typeEvent];

    if (custom) {
      typeEvent = custom;
    }

    var isNative = nativeEvents.indexOf(typeEvent) > -1;

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    }

    var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
        delegation = _normalizeParams[0],
        originalHandler = _normalizeParams[1],
        typeEvent = _normalizeParams[2];

    var events = getEvent(element);
    var handlers = events[typeEvent] || (events[typeEvent] = {});
    var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }

    var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    var fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (handlerKey) {
      if (handlerKey.indexOf(namespace) > -1) {
        var event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  var EventHandler = {
    on: function on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },
    one: function one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },
    off: function off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      var _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn),
          delegation = _normalizeParams2[0],
          originalHandler = _normalizeParams2[1],
          typeEvent = _normalizeParams2[2];

      var inNamespace = typeEvent !== originalTypeEvent;
      var events = getEvent(element);
      var isNamespace = originalTypeEvent.charAt(0) === '.';

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return;
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }

      if (isNamespace) {
        Object.keys(events).forEach(function (elementEvent) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }

      var storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(function (keyHandlers) {
        var handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.indexOf(handlerKey) > -1) {
          var event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },
    trigger: function trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      var typeEvent = event.replace(stripNameRegex, '');
      var inNamespace = event !== typeEvent;
      var isNative = nativeEvents.indexOf(typeEvent) > -1;
      var jQueryEvent;
      var bubbles = true;
      var nativeDispatch = true;
      var defaultPrevented = false;
      var evt = null;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles: bubbles,
          cancelable: true
        });
      } // merge custom information in our event


      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(function (key) {
          Object.defineProperty(evt, key, {
            get: function get() {
              return args[key];
            }
          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();

        if (!defaultPreventedPreservedOnDispatch) {
          Object.defineProperty(evt, 'defaultPrevented', {
            get: function get() {
              return true;
            }
          });
        }
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt;
    }
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '5.0.0-alpha2';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var SELECTOR_DISMISS = '[data-dismiss="alert"]';
  var EVENT_CLOSE = "close" + EVENT_KEY;
  var EVENT_CLOSED = "closed" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASSNAME_ALERT = 'alert';
  var CLASSNAME_FADE = 'fade';
  var CLASSNAME_SHOW = 'show';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = /*#__PURE__*/function () {
    function Alert(element) {
      this._element = element;

      if (this._element) {
        Data.setData(element, DATA_KEY, this);
      }
    } // Getters


    var _proto = Alert.prototype; // Public

    _proto.close = function close(element) {
      var rootElement = element ? this._getRootElement(element) : this._element;

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent === null || customEvent.defaultPrevented) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      return getElementFromSelector(element) || element.closest("." + CLASSNAME_ALERT);
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      return EventHandler.trigger(element, EVENT_CLOSE);
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      element.classList.remove(CLASSNAME_SHOW);

      if (!element.classList.contains(CLASSNAME_FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = getTransitionDurationFromElement(element);
      EventHandler.one(element, TRANSITION_END, function () {
        return _this._destroyElement(element);
      });
      emulateTransitionEnd(element, transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }

      EventHandler.trigger(element, EVENT_CLOSED);
    } // Static
    ;

    Alert.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY);

        if (!data) {
          data = new Alert(this);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert.handleDismiss = function handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    Alert.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY);
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
  var $$1 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .alert to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$1) {
    var JQUERY_NO_CONFLICT = $$1.fn[NAME];
    $$1.fn[NAME] = Alert.jQueryInterface;
    $$1.fn[NAME].Constructor = Alert;

    $$1.fn[NAME].noConflict = function () {
      $$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$1 = 'button';
  var VERSION$1 = '5.0.0-alpha2';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var CLASS_NAME_ACTIVE = 'active';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
  var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = /*#__PURE__*/function () {
    function Button(element) {
      this._element = element;
      Data.setData(element, DATA_KEY$1, this);
    } // Getters


    var _proto = Button.prototype; // Public

    _proto.toggle = function toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$1);

        if (!data) {
          data = new Button(this);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    Button.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$1);
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();
    var button = event.target.closest(SELECTOR_DATA_TOGGLE);
    var data = Data.getData(button, DATA_KEY$1);

    if (!data) {
      data = new Button(button);
    }

    data.toggle();
  });
  var $$2 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .button to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$2) {
    var JQUERY_NO_CONFLICT$1 = $$2.fn[NAME$1];
    $$2.fn[NAME$1] = Button.jQueryInterface;
    $$2.fn[NAME$1].Constructor = Button;

    $$2.fn[NAME$1].noConflict = function () {
      $$2.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
      return Button.jQueryInterface;
    };
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  function normalizeData(val) {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    if (val === Number(val).toString()) {
      return Number(val);
    }

    if (val === '' || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, function (chr) {
      return "-" + chr.toLowerCase();
    });
  }

  var Manipulator = {
    setDataAttribute: function setDataAttribute(element, key, value) {
      element.setAttribute("data-" + normalizeDataKey(key), value);
    },
    removeDataAttribute: function removeDataAttribute(element, key) {
      element.removeAttribute("data-" + normalizeDataKey(key));
    },
    getDataAttributes: function getDataAttributes(element) {
      if (!element) {
        return {};
      }

      var attributes = _extends({}, element.dataset);

      Object.keys(attributes).forEach(function (key) {
        attributes[key] = normalizeData(attributes[key]);
      });
      return attributes;
    },
    getDataAttribute: function getDataAttribute(element, key) {
      return normalizeData(element.getAttribute("data-" + normalizeDataKey(key)));
    },
    offset: function offset(element) {
      var rect = element.getBoundingClientRect();
      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    },
    position: function position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    },
    toggleClass: function toggleClass(element, className) {
      if (!element) {
        return;
      }

      if (element.classList.contains(className)) {
        element.classList.remove(className);
      } else {
        element.classList.add(className);
      }
    }
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NODE_TEXT = 3;
  var SelectorEngine = {
    matches: function matches(element, selector) {
      return element.matches(selector);
    },
    find: function find$1(selector, element) {
      var _ref;

      if (element === void 0) {
        element = document.documentElement;
      }

      return (_ref = []).concat.apply(_ref, find.call(element, selector));
    },
    findOne: function findOne$1(selector, element) {
      if (element === void 0) {
        element = document.documentElement;
      }

      return findOne.call(element, selector);
    },
    children: function children(element, selector) {
      var _ref2;

      var children = (_ref2 = []).concat.apply(_ref2, element.children);

      return children.filter(function (child) {
        return child.matches(selector);
      });
    },
    parents: function parents(element, selector) {
      var parents = [];
      var ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (this.matches(ancestor, selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents;
    },
    prev: function prev(element, selector) {
      var previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },
    next: function next(element, selector) {
      var next = element.nextElementSibling;

      while (next) {
        if (this.matches(next, selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    }
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '5.0.0-alpha2';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var ARROW_LEFT_KEY = 'ArrowLeft';
  var ARROW_RIGHT_KEY = 'ArrowRight';
  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var DIRECTION_NEXT = 'next';
  var DIRECTION_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var EVENT_SLIDE = "slide" + EVENT_KEY$2;
  var EVENT_SLID = "slid" + EVENT_KEY$2;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY$2;
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2;
  var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2;
  var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2;
  var EVENT_TOUCHEND = "touchend" + EVENT_KEY$2;
  var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2;
  var EVENT_POINTERUP = "pointerup" + EVENT_KEY$2;
  var EVENT_DRAG_START = "dragstart" + EVENT_KEY$2;
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$2 + DATA_API_KEY$2;
  var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2;
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE$1 = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_RIGHT = 'carousel-item-right';
  var CLASS_NAME_LEFT = 'carousel-item-left';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = /*#__PURE__*/function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent);

      this._addEventListeners();

      Data.setData(element, DATA_KEY$2, this);
    } // Getters


    var _proto = Carousel.prototype; // Public

    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
        triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config && this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      EventHandler.off(this._element, EVENT_KEY$2);
      Data.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER, function (event) {
          return _this2.pause(event);
        });
        EventHandler.on(this._element, EVENT_MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch && this._touchSupported) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.touches && event.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
        EventHandler.on(itemImg, EVENT_DRAG_START, function (e) {
          return e.preventDefault();
        });
      });

      if (this._pointerEvent) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
          return move(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.key) {
        case ARROW_LEFT_KEY:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEY:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === DIRECTION_NEXT;
      var isPrevDirection = direction === DIRECTION_PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === DIRECTION_PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

      return EventHandler.trigger(this._element, EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = SelectorEngine.find(SELECTOR_ACTIVE, this._indicatorsElement);

        for (var i = 0; i < indicators.length; i++) {
          indicators[i].classList.remove(CLASS_NAME_ACTIVE$1);
        }

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          nextIndicator.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_LEFT;
        orderClassName = CLASS_NAME_NEXT;
        eventDirectionName = DIRECTION_LEFT;
      } else {
        directionalClassName = CLASS_NAME_RIGHT;
        orderClassName = CLASS_NAME_PREV;
        eventDirectionName = DIRECTION_RIGHT;
      }

      if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$1)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.defaultPrevented) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
        nextElement.classList.add(orderClassName);
        reflow(nextElement);
        activeElement.classList.add(directionalClassName);
        nextElement.classList.add(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = getTransitionDurationFromElement(activeElement);
        EventHandler.one(activeElement, TRANSITION_END, function () {
          nextElement.classList.remove(directionalClassName, orderClassName);
          nextElement.classList.add(CLASS_NAME_ACTIVE$1);
          activeElement.classList.remove(CLASS_NAME_ACTIVE$1, orderClassName, directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            EventHandler.trigger(_this4._element, EVENT_SLID, {
              relatedTarget: nextElement,
              direction: eventDirectionName,
              from: activeElementIndex,
              to: nextElementIndex
            });
          }, 0);
        });
        emulateTransitionEnd(activeElement, transitionDuration);
      } else {
        activeElement.classList.remove(CLASS_NAME_ACTIVE$1);
        nextElement.classList.add(CLASS_NAME_ACTIVE$1);
        this._isSliding = false;
        EventHandler.trigger(this._element, EVENT_SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel.carouselInterface = function carouselInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$2);

      var _config = _extends({}, Default, Manipulator.getDataAttributes(element));

      if (_typeof(config) === 'object') {
        _config = _extends({}, _config, config);
      }

      var action = typeof config === 'string' ? config : _config.slide;

      if (!data) {
        data = new Carousel(element, _config);
      }

      if (typeof config === 'number') {
        data.to(config);
      } else if (typeof action === 'string') {
        if (typeof data[action] === 'undefined') {
          throw new TypeError("No method named \"" + action + "\"");
        }

        data[action]();
      } else if (_config.interval && _config.ride) {
        data.pause();
        data.cycle();
      }
    };

    Carousel.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Carousel.carouselInterface(this, config);
      });
    };

    Carousel.dataApiClickHandler = function dataApiClickHandler(event) {
      var target = getElementFromSelector(this);

      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
        return;
      }

      var config = _extends({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel.carouselInterface(target, config);

      if (slideIndex) {
        Data.getData(target, DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    Carousel.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$2);
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
  EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
    var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

    for (var i = 0, len = carousels.length; i < len; i++) {
      Carousel.carouselInterface(carousels[i], Data.getData(carousels[i], DATA_KEY$2));
    }
  });
  var $$3 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .carousel to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$3) {
    var JQUERY_NO_CONFLICT$2 = $$3.fn[NAME$2];
    $$3.fn[NAME$2] = Carousel.jQueryInterface;
    $$3.fn[NAME$2].Constructor = Carousel;

    $$3.fn[NAME$2].noConflict = function () {
      $$3.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
      return Carousel.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$3 = 'collapse';
  var VERSION$3 = '5.0.0-alpha2';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var EVENT_SHOW = "show" + EVENT_KEY$3;
  var EVENT_SHOWN = "shown" + EVENT_KEY$3;
  var EVENT_HIDE = "hide" + EVENT_KEY$3;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY$3;
  var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3;
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var WIDTH = 'width';
  var HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE$1 = '[data-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = /*#__PURE__*/function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1 + "[href=\"#" + element.id + "\"]," + (SELECTOR_DATA_TOGGLE$1 + "[data-target=\"#" + element.id + "\"]"));
      var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1);

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = getSelectorFromElement(elem);
        var filterElement = SelectorEngine.find(selector).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }

      Data.setData(element, DATA_KEY$3, this);
    } // Getters


    var _proto = Collapse.prototype; // Public

    _proto.toggle = function toggle() {
      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      var container = SelectorEngine.findOne(this._selector);

      if (actives) {
        var tempActiveData = actives.filter(function (elem) {
          return container !== elem;
        });
        activesData = tempActiveData[0] ? Data.getData(tempActiveData[0], DATA_KEY$3) : null;

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = EventHandler.trigger(this._element, EVENT_SHOW);

      if (startEvent.defaultPrevented) {
        return;
      }

      if (actives) {
        actives.forEach(function (elemActive) {
          if (container !== elemActive) {
            Collapse.collapseInterface(elemActive, 'hide');
          }

          if (!activesData) {
            Data.setData(elemActive, DATA_KEY$3, null);
          }
        });
      }

      var dimension = this._getDimension();

      this._element.classList.remove(CLASS_NAME_COLLAPSE);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        this._triggerArray.forEach(function (element) {
          element.classList.remove(CLASS_NAME_COLLAPSED);
          element.setAttribute('aria-expanded', true);
        });
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_COLLAPSING);

        _this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        EventHandler.trigger(_this._element, EVENT_SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }

      var startEvent = EventHandler.trigger(this._element, EVENT_HIDE);

      if (startEvent.defaultPrevented) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      reflow(this._element);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var elem = getElementFromSelector(trigger);

          if (elem && !elem.classList.contains(CLASS_NAME_SHOW)) {
            trigger.classList.add(CLASS_NAME_COLLAPSED);
            trigger.setAttribute('aria-expanded', false);
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        _this2._element.classList.remove(CLASS_NAME_COLLAPSING);

        _this2._element.classList.add(CLASS_NAME_COLLAPSE);

        EventHandler.trigger(_this2._element, EVENT_HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent = this._config.parent;

      if (isElement(parent)) {
        // it's a jQuery object
        if (typeof parent.jquery !== 'undefined' || typeof parent[0] !== 'undefined') {
          parent = parent[0];
        }
      } else {
        parent = SelectorEngine.findOne(parent);
      }

      var selector = SELECTOR_DATA_TOGGLE$1 + "[data-parent=\"" + parent + "\"]";
      SelectorEngine.find(selector, parent).forEach(function (element) {
        var selected = getElementFromSelector(element);

        _this3._addAriaAndCollapsedClass(selected, [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (!element || !triggerArray.length) {
        return;
      }

      var isOpen = element.classList.contains(CLASS_NAME_SHOW);
      triggerArray.forEach(function (elem) {
        if (isOpen) {
          elem.classList.remove(CLASS_NAME_COLLAPSED);
        } else {
          elem.classList.add(CLASS_NAME_COLLAPSED);
        }

        elem.setAttribute('aria-expanded', isOpen);
      });
    } // Static
    ;

    Collapse.collapseInterface = function collapseInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$3);

      var _config = _extends({}, Default$1, Manipulator.getDataAttributes(element), _typeof(config) === 'object' && config ? config : {});

      if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      if (!data) {
        data = new Collapse(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    Collapse.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Collapse.collapseInterface(this, config);
      });
    };

    Collapse.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$3);
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A') {
      event.preventDefault();
    }

    var triggerData = Manipulator.getDataAttributes(this);
    var selector = getSelectorFromElement(this);
    var selectorElements = SelectorEngine.find(selector);
    selectorElements.forEach(function (element) {
      var data = Data.getData(element, DATA_KEY$3);
      var config;

      if (data) {
        // update parent attribute
        if (data._parent === null && typeof triggerData.parent === 'string') {
          data._config.parent = triggerData.parent;
          data._parent = data._getParent();
        }

        config = 'toggle';
      } else {
        config = triggerData;
      }

      Collapse.collapseInterface(element, config);
    });
  });
  var $$4 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .collapse to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$4) {
    var JQUERY_NO_CONFLICT$3 = $$4.fn[NAME$3];
    $$4.fn[NAME$3] = Collapse.jQueryInterface;
    $$4.fn[NAME$3].Constructor = Collapse;

    $$4.fn[NAME$3].noConflict = function () {
      $$4.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
      return Collapse.jQueryInterface;
    };
  }
  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */


  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

  var timeoutDuration = function () {
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];

    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        return 1;
      }
    }

    return 0;
  }();

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }

      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;
  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */

  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */

  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }
  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */


  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    } // NOTE: 1 DOM access here


    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }
  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */


  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }

    return element.parentNode || element.host;
  }
  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */


  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;

      case '#document':
        return element.body;
    } // Firefox want us to check `-x` and `-y` variations as well


    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }
  /**
   * Returns the reference node of the reference object, or the reference object itself.
   * @method
   * @memberof Popper.Utils
   * @param {Element|Object} reference - the reference element (the popper will be relative to this)
   * @returns {Element} parent
   */


  function getReferenceNode(reference) {
    return reference && reference.referenceNode ? reference.referenceNode : reference;
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */

  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }

    if (version === 10) {
      return isIE10;
    }

    return isIE11 || isIE10;
  }
  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */


  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

    var offsetParent = element.offsetParent || null; // Skip hidden elements which don't have an offsetParent

    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    } // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...


    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }

    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }
  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */


  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }
  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */


  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    } // Here we make sure to give as "start" the element that comes first in the DOM


    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1; // Get common ancestor container

    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    } // one of the nodes is inside shadowDOM, find which one


    var element1root = getRoot(element1);

    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }
  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */


  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }
  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */


  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }
  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */


  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
    return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);
    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var defineProperty = function defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */


  function getClientRect(offsets) {
    return _extends$1({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }
  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */


  function getBoundingClientRect(element) {
    var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11

    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    }; // subtract scrollbar size from sizes

    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.width;
    var height = sizes.height || element.clientHeight || result.height;
    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons

    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');
      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);
    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }

    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.

    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop);
      var marginLeft = parseFloat(styles.marginLeft);
      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);
    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };
    return getClientRect(offset);
  }
  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */


  function isFixed(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }

    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }

    var parentNode = getParentNode(element);

    if (!parentNode) {
      return false;
    }

    return isFixed(parentNode);
  }
  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */


  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }

    var el = element.parentElement;

    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }

    return el || document.documentElement;
  }
  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */


  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false; // NOTE: 1 DOM access here

    var boundaries = {
      top: 0,
      left: 0
    };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference)); // Handle viewport case

    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;

      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));

        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition); // In case of HTML, we need a different computation

      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    } // Add paddings


    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;
    return width * height;
  }
  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };
    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends$1({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });
    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });
    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
    var variation = placement.split('-')[1];
    return computedPlacement + (variation ? '-' + variation : '');
  }
  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */


  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }
  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */


  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }
  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */


  function getOppositePlacement(placement) {
    var hash = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }
  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */


  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0]; // Get popper node sizes

    var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    }; // depending by the popper placement we have to compute its offsets slightly differently

    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';
    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }
  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */


  function find$1(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    } // use `filter` to obtain the same behavior of `find`


    return arr.filter(check)[0];
  }
  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */


  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    } // use `find` + `indexOf` if `findIndex` isn't supported


    var match = find$1(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }
  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */


  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }

      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);
        data = fn(data, modifier);
      }
    });
    return data;
  }
  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */


  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    }; // compute reference element offsets

    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed); // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value

    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding); // store the computed placement inside `originalPlacement`

    data.originalPlacement = data.placement;
    data.positionFixed = this.options.positionFixed; // compute the popper offsets

    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'; // run the modifiers

    data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback

    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }
  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */


  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }
  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */


  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;

      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }

    return null;
  }
  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */


  function destroy() {
    this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners(); // remove the popper if user explicitly asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it

    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }

    return this;
  }
  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */


  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, {
      passive: true
    });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }

    scrollParents.push(target);
  }
  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */


  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, {
      passive: true
    }); // Scroll event listener on scroll parents

    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;
    return state;
  }
  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */


  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }
  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */


  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    }); // Reset state

    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }
  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */


  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }
  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */


  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }
  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */


  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = ''; // add unit if the value is numeric and is one of the following

      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }

      element.style[prop] = styles[prop] + unit;
    });
  }
  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */


  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];

      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */


  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element

    setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }
  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */


  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed); // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value

    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
    popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations

    setStyles(popper, {
      position: options.positionFixed ? 'fixed' : 'absolute'
    });
    return options;
  }
  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */


  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);
    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;
    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */

  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find$1(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;

    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }

    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

    var styles = {
      position: popper.position
    };
    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed

    var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.

    var left = void 0,
        top = void 0;

    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }

    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }

    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    } // Attributes


    var attributes = {
      'x-placement': data.placement
    }; // Update `data` attributes, styles and arrowStyles

    data.attributes = _extends$1({}, attributes, data.attributes);
    data.styles = _extends$1({}, styles, data.styles);
    data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);
    return data;
  }
  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */


  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find$1(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });
    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';

      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }

    return isRequired;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function arrow(data, options) {
    var _data$offsets$arrow; // arrow depends on keepTogether in order to work


    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var isVertical = ['left', 'right'].indexOf(placement) !== -1;
    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len]; //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //
    // top/left side

    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    } // bottom/right side


    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }

    data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available

    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
    return data;
  }
  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */


  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }

    return variation;
  }
  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */


  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']; // Get rid of `auto` `auto-start` and `auto-end`

  var validPlacements = placements.slice(3);
  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */

  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */

  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';
    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;

      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;

      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;

      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);
      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom; // flip the variation if required

      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1; // flips variation if reference element overflows boundaries

      var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom); // flips variation if popper content overflows boundaries

      var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);
      var flippedVariation = flippedVariationByRef || flippedVariationByContent;

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future

        data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }

    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }
  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */


  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2]; // If it's not a number it's an operator, I guess

    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;

      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;

        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;

      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }

      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }
  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */


  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one

    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    }); // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space

    var divider = fragments.indexOf(find$1(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    } // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.


    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments]; // Convert the values with units to absolute pixels to allow our computations

    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, []) // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    }); // Loop trough the offsets arrays and execute the operations

    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */


  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var basePlacement = placement.split('-')[0];
    var offsets = void 0;

    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken

    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    } // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself


    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification

    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];
    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';
    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed); // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed

    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;
    options.boundaries = boundaries;
    var order = options.priority;
    var popper = data.offsets.popper;
    var check = {
      primary: function primary(placement) {
        var value = popper[placement];

        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }

        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];

        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }

        return defineProperty({}, mainSide, value);
      }
    };
    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends$1({}, popper, check[side](placement));
    });
    data.offsets.popper = popper;
    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;
      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';
      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };
      data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find$1(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);
    return data;
  }
  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */


  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: offset,

      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: preventOverflow,

      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],

      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,

      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: arrow,

      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: flip,

      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',

      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,

      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport',

      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: false,

      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: false
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,

      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,

      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: computeStyle,

      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,

      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',

      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: applyStyle,

      /** @prop {Function} */
      onLoad: applyStyleOnLoad,

      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };
  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */

  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };
  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */
  // Utils
  // Methods

  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {Element|referenceObject} reference - The reference element used to position the popper
     * @param {Element} popper - The HTML / XML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      }; // make update() debounced, so that it only runs at most once-per-tick


      this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

      this.options = _extends$1({}, Popper.Defaults, options); // init state

      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      }; // get reference and popper elements (allow jQuery wrappers)

      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

      this.options.modifiers = {};
      Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      }); // Refactoring modifiers' list (Object => Array)

      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends$1({
          name: name
        }, _this.options.modifiers[name]);
      }) // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      }); // fire the first update to position the popper in the right place

      this.update();
      var eventsEnabled = this.options.eventsEnabled;

      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    } // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }
      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */

      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();
  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '5.0.0-alpha2';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var ESCAPE_KEY = 'Escape';
  var SPACE_KEY = 'Space';
  var TAB_KEY = 'Tab';
  var ARROW_UP_KEY = 'ArrowUp';
  var ARROW_DOWN_KEY = 'ArrowDown';
  var RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEY + "|" + ARROW_DOWN_KEY + "|" + ESCAPE_KEY);
  var EVENT_HIDE$1 = "hide" + EVENT_KEY$4;
  var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4;
  var EVENT_SHOW$1 = "show" + EVENT_KEY$4;
  var EVENT_SHOWN$1 = "shown" + EVENT_KEY$4;
  var EVENT_CLICK = "click" + EVENT_KEY$4;
  var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4;
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_SHOW$1 = 'show';
  var CLASS_NAME_DROPUP = 'dropup';
  var CLASS_NAME_DROPRIGHT = 'dropright';
  var CLASS_NAME_DROPLEFT = 'dropleft';
  var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  var CLASS_NAME_NAVBAR = 'navbar';
  var CLASS_NAME_POSITION_STATIC = 'position-static';
  var SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
  var SELECTOR_FORM_CHILD = '.dropdown form';
  var SELECTOR_MENU = '.dropdown-menu';
  var SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  var PLACEMENT_TOP = 'top-start';
  var PLACEMENT_TOPEND = 'top-end';
  var PLACEMENT_BOTTOM = 'bottom-start';
  var PLACEMENT_BOTTOMEND = 'bottom-end';
  var PLACEMENT_RIGHT = 'right-start';
  var PLACEMENT_LEFT = 'left-start';
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = /*#__PURE__*/function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();

      Data.setData(element, DATA_KEY$4, this);
    } // Getters


    var _proto = Dropdown.prototype; // Public

    _proto.toggle = function toggle() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED)) {
        return;
      }

      var isActive = this._element.classList.contains(CLASS_NAME_SHOW$1);

      Dropdown.clearMenus();

      if (isActive) {
        return;
      }

      this.show();
    };

    _proto.show = function show() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
        return;
      }

      var parent = Dropdown.getParentFromElement(this._element);
      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, relatedTarget);

      if (showEvent.defaultPrevented) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar) {
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          parent.classList.add(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
        var _ref;

        (_ref = []).concat.apply(_ref, document.body.children).forEach(function (elem) {
          return EventHandler.on(elem, 'mouseover', null, noop());
        });
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1);
      Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1);
      EventHandler.trigger(parent, EVENT_SHOWN$1, relatedTarget);
    };

    _proto.hide = function hide() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || !this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
        return;
      }

      var parent = Dropdown.getParentFromElement(this._element);
      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1);
      Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1);
      EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$4);
      EventHandler.off(this._element, EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      EventHandler.on(this._element, EVENT_CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, this.constructor.Default, Manipulator.getDataAttributes(this._element), config);
      typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
    };

    _proto._getPlacement = function _getPlacement() {
      var parentDropdown = this._element.parentNode;
      var placement = PLACEMENT_BOTTOM; // Handle dropup

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        placement = PLACEMENT_TOP;

        if (this._menu.classList.contains(CLASS_NAME_MENURIGHT)) {
          placement = PLACEMENT_TOPEND;
        }
      } else if (parentDropdown.classList.contains(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if (parentDropdown.classList.contains(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if (this._menu.classList.contains(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return Boolean(this._element.closest("." + CLASS_NAME_NAVBAR));
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper.js if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _extends({}, popperConfig, this._config.popperConfig);
    } // Static
    ;

    Dropdown.dropdownInterface = function dropdownInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$4);

      var _config = _typeof(config) === 'object' ? config : null;

      if (!data) {
        data = new Dropdown(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    Dropdown.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Dropdown.dropdownInterface(this, config);
      });
    };

    Dropdown.clearMenus = function clearMenus(event) {
      if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
        return;
      }

      var toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$2);

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown.getParentFromElement(toggles[i]);
        var context = Data.getData(toggles[i], DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!toggles[i].classList.contains(CLASS_NAME_SHOW$1)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.key === TAB_KEY) && dropdownMenu.contains(event.target)) {
          continue;
        }

        var hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);

        if (hideEvent.defaultPrevented) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          var _ref2;

          (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (elem) {
            return EventHandler.off(elem, 'mouseover', null, noop());
          });
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        dropdownMenu.classList.remove(CLASS_NAME_SHOW$1);
        toggles[i].classList.remove(CLASS_NAME_SHOW$1);
        EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
      }
    };

    Dropdown.getParentFromElement = function getParentFromElement(element) {
      return getElementFromSelector(element) || element.parentNode;
    };

    Dropdown.dataApiKeydownHandler = function dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || this.classList.contains(CLASS_NAME_DISABLED)) {
        return;
      }

      var parent = Dropdown.getParentFromElement(this);
      var isActive = this.classList.contains(CLASS_NAME_SHOW$1);

      if (event.key === ESCAPE_KEY) {
        var button = this.matches(SELECTOR_DATA_TOGGLE$2) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$2)[0];
        button.focus();
        Dropdown.clearMenus();
        return;
      }

      if (!isActive || event.key === SPACE_KEY) {
        Dropdown.clearMenus();
        return;
      }

      var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, parent).filter(isVisible);

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.key === ARROW_UP_KEY && index > 0) {
        // Up
        index--;
      }

      if (event.key === ARROW_DOWN_KEY && index < items.length - 1) {
        // Down
        index++;
      } // index is -1 if the first keydown is an ArrowUp


      index = index === -1 ? 0 : index;
      items[index].focus();
    };

    Dropdown.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$4);
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (event) {
    event.preventDefault();
    event.stopPropagation();
    Dropdown.dropdownInterface(this, 'toggle');
  });
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
    return e.stopPropagation();
  });
  var $$5 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .dropdown to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$5) {
    var JQUERY_NO_CONFLICT$4 = $$5.fn[NAME$4];
    $$5.fn[NAME$4] = Dropdown.jQueryInterface;
    $$5.fn[NAME$4].Constructor = Dropdown;

    $$5.fn[NAME$4].noConflict = function () {
      $$5.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
      return Dropdown.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$5 = 'modal';
  var VERSION$5 = '5.0.0-alpha2';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var ESCAPE_KEY$1 = 'Escape';
  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
  var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
  var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
  var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
  var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
  var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
  var EVENT_RESIZE = "resize" + EVENT_KEY$5;
  var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5;
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
  var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5;
  var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
  var CLASS_NAME_BACKDROP = 'modal-backdrop';
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW$2 = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]';
  var SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]';
  var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  var SELECTOR_STICKY_CONTENT = '.sticky-top';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = /*#__PURE__*/function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, element);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
      Data.setData(element, DATA_KEY$5, this);
    } // Getters


    var _proto = Modal.prototype; // Public

    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if (this._element.classList.contains(CLASS_NAME_FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      });

      if (this._isShown || showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
        EventHandler.one(_this._element, EVENT_MOUSEUP_DISMISS, function (event) {
          if (event.target === _this._element) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;

      var transition = this._element.classList.contains(CLASS_NAME_FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.off(document, EVENT_FOCUSIN);

      this._element.classList.remove(CLASS_NAME_SHOW$2);

      EventHandler.off(this._element, EVENT_CLICK_DISMISS);
      EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        });
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return EventHandler.off(htmlElement, EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */

      EventHandler.off(document, EVENT_FOCUSIN);
      Data.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$3, config);
      typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = this._element.classList.contains(CLASS_NAME_FADE);

      var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.scrollTop = 0;

      if (modalBody) {
        modalBody.scrollTop = 0;
      }

      if (transition) {
        reflow(this._element);
      }

      this._element.classList.add(CLASS_NAME_SHOW$2);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        EventHandler.trigger(_this3._element, EVENT_SHOWN$2, {
          relatedTarget: relatedTarget
        });
      };

      if (transition) {
        var transitionDuration = getTransitionDurationFromElement(this._dialog);
        EventHandler.one(this._dialog, TRANSITION_END, transitionComplete);
        emulateTransitionEnd(this._dialog, transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      EventHandler.off(document, EVENT_FOCUSIN); // guard against infinite focus loop

      EventHandler.on(document, EVENT_FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && !_this4._element.contains(event.target)) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown) {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
          if (_this5._config.keyboard && event.key === ESCAPE_KEY$1) {
            event.preventDefault();

            _this5.hide();
          } else if (!_this5._config.keyboard && event.key === ESCAPE_KEY$1) {
            _this5._triggerBackdropTransition();
          }
        });
      } else {
        EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        EventHandler.on(window, EVENT_RESIZE, function () {
          return _this6._adjustDialog();
        });
      } else {
        EventHandler.off(window, EVENT_RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        document.body.classList.remove(CLASS_NAME_OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        EventHandler.trigger(_this7._element, EVENT_HIDDEN$2);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      this._backdrop.parentNode.removeChild(this._backdrop);

      this._backdrop = null;
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = this._element.classList.contains(CLASS_NAME_FADE) ? CLASS_NAME_FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = CLASS_NAME_BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        document.body.appendChild(this._backdrop);
        EventHandler.on(this._element, EVENT_CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          _this8._triggerBackdropTransition();
        });

        if (animate) {
          reflow(this._backdrop);
        }

        this._backdrop.classList.add(CLASS_NAME_SHOW$2);

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
        EventHandler.one(this._backdrop, TRANSITION_END, callback);
        emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        this._backdrop.classList.remove(CLASS_NAME_SHOW$2);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          callback();
        };

        if (this._element.classList.contains(CLASS_NAME_FADE)) {
          var _backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);

          EventHandler.one(this._backdrop, TRANSITION_END, callbackRemove);
          emulateTransitionEnd(this._backdrop, _backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else {
        callback();
      }
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this9 = this;

      if (this._config.backdrop === 'static') {
        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

        if (hideEvent.defaultPrevented) {
          return;
        }

        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!isModalOverflowing) {
          this._element.style.overflowY = 'hidden';
        }

        this._element.classList.add(CLASS_NAME_STATIC);

        var modalTransitionDuration = getTransitionDurationFromElement(this._dialog);
        EventHandler.off(this._element, TRANSITION_END);
        EventHandler.one(this._element, TRANSITION_END, function () {
          _this9._element.classList.remove(CLASS_NAME_STATIC);

          if (!isModalOverflowing) {
            EventHandler.one(_this9._element, TRANSITION_END, function () {
              _this9._element.style.overflowY = '';
            });
            emulateTransitionEnd(_this9._element, modalTransitionDuration);
          }
        });
        emulateTransitionEnd(this._element, modalTransitionDuration);

        this._element.focus();
      } else {
        this.hide();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        // Adjust fixed content padding
        SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = window.getComputedStyle(element)['padding-right'];
          Manipulator.setDataAttribute(element, 'padding-right', actualPadding);
          element.style.paddingRight = parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px";
        }); // Adjust sticky content margin

        SelectorEngine.find(SELECTOR_STICKY_CONTENT).forEach(function (element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = window.getComputedStyle(element)['margin-right'];
          Manipulator.setDataAttribute(element, 'margin-right', actualMargin);
          element.style.marginRight = parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px";
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = window.getComputedStyle(document.body)['padding-right'];
        Manipulator.setDataAttribute(document.body, 'padding-right', actualPadding);
        document.body.style.paddingRight = parseFloat(calculatedPadding) + this._scrollbarWidth + "px";
      }

      document.body.classList.add(CLASS_NAME_OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (element) {
        var padding = Manipulator.getDataAttribute(element, 'padding-right');

        if (typeof padding !== 'undefined') {
          Manipulator.removeDataAttribute(element, 'padding-right');
          element.style.paddingRight = padding;
        }
      }); // Restore sticky content and navbar-toggler margin

      SelectorEngine.find("" + SELECTOR_STICKY_CONTENT).forEach(function (element) {
        var margin = Manipulator.getDataAttribute(element, 'margin-right');

        if (typeof margin !== 'undefined') {
          Manipulator.removeDataAttribute(element, 'margin-right');
          element.style.marginRight = margin;
        }
      }); // Restore body padding

      var padding = Manipulator.getDataAttribute(document.body, 'padding-right');

      if (typeof padding === 'undefined') {
        document.body.style.paddingRight = '';
      } else {
        Manipulator.removeDataAttribute(document.body, 'padding-right');
        document.body.style.paddingRight = padding;
      }
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal.jQueryInterface = function jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$5);

        var _config = _extends({}, Default$3, Manipulator.getDataAttributes(this), _typeof(config) === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    Modal.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$5);
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (event) {
    var _this11 = this;

    var target = getElementFromSelector(this);

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    EventHandler.one(target, EVENT_SHOW$2, function (showEvent) {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler.one(target, EVENT_HIDDEN$2, function () {
        if (isVisible(_this11)) {
          _this11.focus();
        }
      });
    });
    var data = Data.getData(target, DATA_KEY$5);

    if (!data) {
      var config = _extends({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));

      data = new Modal(target, config);
    }

    data.show(this);
  });
  var $$6 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .modal to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$6) {
    var JQUERY_NO_CONFLICT$5 = $$6.fn[NAME$5];
    $$6.fn[NAME$5] = Modal.jQueryInterface;
    $$6.fn[NAME$5].Constructor = Modal;

    $$6.fn[NAME$5].noConflict = function () {
      $$6.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
      return Modal.jQueryInterface;
    };
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, len = regExp.length; i < len; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  };

  var DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };

  function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
    var _ref;

    if (!unsafeHtml.length) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var allowlistKeys = Object.keys(allowList);

    var elements = (_ref = []).concat.apply(_ref, createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var _ref2;

      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (allowlistKeys.indexOf(elName) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = (_ref2 = []).concat.apply(_ref2, el.attributes);

      var allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, allowedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$6 = 'tooltip';
  var VERSION$6 = '5.0.0-alpha2';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'allowList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    allowList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    allowList: DefaultAllowlist,
    popperConfig: null
  };
  var Event$1 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var CLASS_NAME_FADE$1 = 'fade';
  var CLASS_NAME_MODAL = 'modal';
  var CLASS_NAME_SHOW$3 = 'show';
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = /*#__PURE__*/function () {
    function Tooltip(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();

      Data.setData(element, this.constructor.DATA_KEY, this);
    } // Getters


    var _proto = Tooltip.prototype; // Public

    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = Data.getData(event.delegateTarget, dataKey);

        if (!context) {
          context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
          Data.setData(event.delegateTarget, dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      Data.removeData(this.element, this.constructor.DATA_KEY);
      EventHandler.off(this.element, this.constructor.EVENT_KEY);
      EventHandler.off(this.element.closest("." + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        this.tip.parentNode.removeChild(this.tip);
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if (this.element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }

      if (this.isWithContent() && this._isEnabled) {
        var showEvent = EventHandler.trigger(this.element, this.constructor.Event.SHOW);
        var shadowRoot = findShadowRoot(this.element);
        var isInTheDom = shadowRoot === null ? this.element.ownerDocument.documentElement.contains(this.element) : shadowRoot.contains(this.element);

        if (showEvent.defaultPrevented || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          tip.classList.add(CLASS_NAME_FADE$1);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this._addAttachmentClass(attachment);

        var container = this._getContainer();

        Data.setData(tip, this.constructor.DATA_KEY, this);

        if (!this.element.ownerDocument.documentElement.contains(this.tip)) {
          container.appendChild(tip);
        }

        EventHandler.trigger(this.element, this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment));
        tip.classList.add(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          var _ref;

          (_ref = []).concat.apply(_ref, document.body.children).forEach(function (element) {
            EventHandler.on(element, 'mouseover', noop());
          });
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          EventHandler.trigger(_this.element, _this.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            _this._leave(null, _this);
          }
        };

        if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
          var transitionDuration = getTransitionDurationFromElement(this.tip);
          EventHandler.one(this.tip, TRANSITION_END, complete);
          emulateTransitionEnd(this.tip, transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (!this._popper) {
        return;
      }

      var tip = this.getTipElement();

      var complete = function complete() {
        if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        EventHandler.trigger(_this2.element, _this2.constructor.Event.HIDDEN);

        _this2._popper.destroy();
      };

      var hideEvent = EventHandler.trigger(this.element, this.constructor.Event.HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      tip.classList.remove(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        var _ref2;

        (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (element) {
          return EventHandler.off(element, 'mouseover', noop);
        });
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;

      if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
        var transitionDuration = getTransitionDurationFromElement(tip);
        EventHandler.one(tip, TRANSITION_END, complete);
        emulateTransitionEnd(tip, transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.getTipElement = function getTipElement() {
      if (this.tip) {
        return this.tip;
      }

      var element = document.createElement('div');
      element.innerHTML = this.config.template;
      this.tip = element.children[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
      tip.classList.remove(CLASS_NAME_FADE$1, CLASS_NAME_SHOW$3);
    };

    _proto.setElementContent = function setElementContent(element, content) {
      if (element === null) {
        return;
      }

      if (_typeof(content) === 'object' && isElement(content)) {
        if (content.jquery) {
          content = content[0];
        } // content is a DOM node or a jQuery


        if (this.config.html) {
          if (content.parentNode !== element) {
            element.innerHTML = '';
            element.appendChild(content);
          }
        } else {
          element.textContent = content.textContent;
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.allowList, this.config.sanitizeFn);
        }

        element.innerHTML = content;
      } else {
        element.textContent = content;
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: "." + this.constructor.NAME + "-arrow"
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _extends({}, defaultBsConfig, this.config.popperConfig);
    };

    _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
      this.getTipElement().classList.add(CLASS_PREFIX + "-" + attachment);
    };

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this4.config.offset(data.offsets, _this4.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (isElement(this.config.container)) {
        return this.config.container;
      }

      return SelectorEngine.findOne(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          EventHandler.on(_this5.element, _this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          EventHandler.on(_this5.element, eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          });
          EventHandler.on(_this5.element, eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };

      EventHandler.on(this.element.closest("." + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _extends({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = _typeof(this.element.getAttribute('data-original-title'));

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || Data.getData(event.delegateTarget, dataKey);

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.setData(event.delegateTarget, dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || Data.getData(event.delegateTarget, dataKey);

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.setData(event.delegateTarget, dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = Manipulator.getDataAttributes(this.element);
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });

      if (config && _typeof(config.container) === 'object' && config.container.jquery) {
        config.container = config.container[0];
      }

      config = _extends({}, this.constructor.Default, dataAttributes, _typeof(config) === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      this.tip = popperData.instance.popper;

      this._cleanTipClass();

      this._addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      tip.classList.remove(CLASS_NAME_FADE$1);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$6);

        var _config = _typeof(config) === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Tooltip.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$6);
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$1;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();

  var $$7 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .tooltip to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$7) {
    var JQUERY_NO_CONFLICT$6 = $$7.fn[NAME$6];
    $$7.fn[NAME$6] = Tooltip.jQueryInterface;
    $$7.fn[NAME$6].Constructor = Tooltip;

    $$7.fn[NAME$6].noConflict = function () {
      $$7.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
      return Tooltip.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$7 = 'popover';
  var VERSION$7 = '5.0.0-alpha2';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _extends({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _extends({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var Event$2 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
  };
  var CLASS_NAME_FADE$2 = 'fade';
  var CLASS_NAME_SHOW$4 = 'show';
  var SELECTOR_TITLE = '.popover-header';
  var SELECTOR_CONTENT = '.popover-body';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = /*#__PURE__*/function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype; // Overrides

    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement(); // we use append for html objects to maintain js events

      this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$4);
    } // Private
    ;

    _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
      this.getTipElement().classList.add(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    } // Static
    ;

    Popover.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$7);

        var _config = _typeof(config) === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          Data.setData(this, DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Popover.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$7);
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$2;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);

  var $$8 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  /* istanbul ignore if */

  if ($$8) {
    var JQUERY_NO_CONFLICT$7 = $$8.fn[NAME$7];
    $$8.fn[NAME$7] = Popover.jQueryInterface;
    $$8.fn[NAME$7].Constructor = Popover;

    $$8.fn[NAME$7].noConflict = function () {
      $$8.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
      return Popover.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$8 = 'scrollspy';
  var VERSION$8 = '5.0.0-alpha2';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate" + EVENT_KEY$8;
  var EVENT_SCROLL = "scroll" + EVENT_KEY$8;
  var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$8 + DATA_API_KEY$6;
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE$2 = 'active';
  var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = /*#__PURE__*/function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + ", " + this._config.target + " " + SELECTOR_LIST_ITEMS + ", " + this._config.target + " ." + CLASS_NAME_DROPDOWN_ITEM;
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      EventHandler.on(this._scrollElement, EVENT_SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();

      Data.setData(element, DATA_KEY$8, this);
    } // Getters


    var _proto = ScrollSpy.prototype; // Public

    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = SelectorEngine.find(this._selector);
      targets.map(function (element) {
        var targetSelector = getSelectorFromElement(element);
        var target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$8);
      EventHandler.off(this._scrollElement, EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$6, _typeof(config) === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && isElement(config.target)) {
        var id = config.target.id;

        if (!id) {
          id = getUID(NAME$8);
          config.target.id = id;
        }

        config.target = "#" + id;
      }

      typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var link = SelectorEngine.findOne(queries.join(','));

      if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, link.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$2);
        link.classList.add(CLASS_NAME_ACTIVE$2);
      } else {
        // Set triggered link as active
        link.classList.add(CLASS_NAME_ACTIVE$2);
        SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP).forEach(function (listGroup) {
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          SelectorEngine.prev(listGroup, SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).forEach(function (item) {
            return item.classList.add(CLASS_NAME_ACTIVE$2);
          }); // Handle special case when .nav-link is inside .nav-item

          SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function (navItem) {
            SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function (item) {
              return item.classList.add(CLASS_NAME_ACTIVE$2);
            });
          });
        });
      }

      EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      SelectorEngine.find(this._selector).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$2);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$2);
      });
    } // Static
    ;

    ScrollSpy.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$8);

        var _config = _typeof(config) === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    ScrollSpy.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$8);
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
    SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function (spy) {
      return new ScrollSpy(spy, Manipulator.getDataAttributes(spy));
    });
  });
  var $$9 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  /* istanbul ignore if */

  if ($$9) {
    var JQUERY_NO_CONFLICT$8 = $$9.fn[NAME$8];
    $$9.fn[NAME$8] = ScrollSpy.jQueryInterface;
    $$9.fn[NAME$8].Constructor = ScrollSpy;

    $$9.fn[NAME$8].noConflict = function () {
      $$9.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
      return ScrollSpy.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$9 = 'tab';
  var VERSION$9 = '5.0.0-alpha2';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var EVENT_HIDE$3 = "hide" + EVENT_KEY$9;
  var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9;
  var EVENT_SHOW$3 = "show" + EVENT_KEY$9;
  var EVENT_SHOWN$3 = "shown" + EVENT_KEY$9;
  var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7;
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE$3 = 'active';
  var CLASS_NAME_DISABLED$1 = 'disabled';
  var CLASS_NAME_FADE$3 = 'fade';
  var CLASS_NAME_SHOW$5 = 'show';
  var SELECTOR_DROPDOWN$1 = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  var SELECTOR_ACTIVE$1 = '.active';
  var SELECTOR_ACTIVE_UL = ':scope > li > .active';
  var SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = /*#__PURE__*/function () {
    function Tab(element) {
      this._element = element;
      Data.setData(this._element, DATA_KEY$9, this);
    } // Getters


    var _proto = Tab.prototype; // Public

    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE$3) || this._element.classList.contains(CLASS_NAME_DISABLED$1)) {
        return;
      }

      var previous;
      var target = getElementFromSelector(this._element);

      var listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP$1);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$1;
        previous = SelectorEngine.find(itemSelector, listElement);
        previous = previous[previous.length - 1];
      }

      var hideEvent = null;

      if (previous) {
        hideEvent = EventHandler.trigger(previous, EVENT_HIDE$3, {
          relatedTarget: this._element
        });
      }

      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget: previous
      });

      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return;
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        EventHandler.trigger(previous, EVENT_HIDDEN$3, {
          relatedTarget: _this._element
        });
        EventHandler.trigger(_this._element, EVENT_SHOWN$3, {
          relatedTarget: previous
        });
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE$1);
      var active = activeElements[0];
      var isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$3);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = getTransitionDurationFromElement(active);
        active.classList.remove(CLASS_NAME_SHOW$5);
        EventHandler.one(active, TRANSITION_END, complete);
        emulateTransitionEnd(active, transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        active.classList.remove(CLASS_NAME_ACTIVE$3);
        var dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

        if (dropdownChild) {
          dropdownChild.classList.remove(CLASS_NAME_ACTIVE$3);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      element.classList.add(CLASS_NAME_ACTIVE$3);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$3)) {
        element.classList.add(CLASS_NAME_SHOW$5);
      }

      if (element.parentNode && element.parentNode.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = element.closest(SELECTOR_DROPDOWN$1);

        if (dropdownElement) {
          SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE$1).forEach(function (dropdown) {
            return dropdown.classList.add(CLASS_NAME_ACTIVE$3);
          });
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$9) || new Tab(this);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Tab.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$9);
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (event) {
    event.preventDefault();
    var data = Data.getData(this, DATA_KEY$9) || new Tab(this);
    data.show();
  });
  var $$a = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .tab to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$a) {
    var JQUERY_NO_CONFLICT$9 = $$a.fn[NAME$9];
    $$a.fn[NAME$9] = Tab.jQueryInterface;
    $$a.fn[NAME$9].Constructor = Tab;

    $$a.fn[NAME$9].noConflict = function () {
      $$a.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
      return Tab.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$a = 'toast';
  var VERSION$a = '5.0.0-alpha2';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a;
  var EVENT_HIDE$4 = "hide" + EVENT_KEY$a;
  var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a;
  var EVENT_SHOW$4 = "show" + EVENT_KEY$a;
  var EVENT_SHOWN$4 = "shown" + EVENT_KEY$a;
  var CLASS_NAME_FADE$4 = 'fade';
  var CLASS_NAME_HIDE = 'hide';
  var CLASS_NAME_SHOW$6 = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 5000
  };
  var SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast = /*#__PURE__*/function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();

      Data.setData(element, DATA_KEY$a, this);
    } // Getters


    var _proto = Toast.prototype; // Public

    _proto.show = function show() {
      var _this = this;

      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE$4);
      }

      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_SHOWING);

        _this._element.classList.add(CLASS_NAME_SHOW$6);

        EventHandler.trigger(_this._element, EVENT_SHOWN$4);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(CLASS_NAME_HIDE);

      reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOWING);

      if (this._config.animation) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, complete);
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (!this._element.classList.contains(CLASS_NAME_SHOW$6)) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);

      if (hideEvent.defaultPrevented) {
        return;
      }

      var complete = function complete() {
        _this2._element.classList.add(CLASS_NAME_HIDE);

        EventHandler.trigger(_this2._element, EVENT_HIDDEN$4);
      };

      this._element.classList.remove(CLASS_NAME_SHOW$6);

      if (this._config.animation) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, complete);
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW$6)) {
        this._element.classList.remove(CLASS_NAME_SHOW$6);
      }

      EventHandler.off(this._element, EVENT_CLICK_DISMISS$1);
      Data.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$7, Manipulator.getDataAttributes(this._element), _typeof(config) === 'object' && config ? config : {});
      typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this3 = this;

      EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
        return _this3.hide();
      });
    };

    _proto._clearTimeout = function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static
    ;

    Toast.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$a);

        var _config = _typeof(config) === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    Toast.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$a);
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();

  var $$b = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   *  add .toast to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$b) {
    var JQUERY_NO_CONFLICT$a = $$b.fn[NAME$a];
    $$b.fn[NAME$a] = Toast.jQueryInterface;
    $$b.fn[NAME$a].Constructor = Toast;

    $$b.fn[NAME$a].noConflict = function () {
      $$b.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
      return Toast.jQueryInterface;
    };
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  var index_umd = {
    Alert: Alert,
    Button: Button,
    Carousel: Carousel,
    Collapse: Collapse,
    Dropdown: Dropdown,
    Modal: Modal,
    Popover: Popover,
    ScrollSpy: ScrollSpy,
    Tab: Tab,
    Toast: Toast,
    Tooltip: Tooltip
  };
  return index_umd;
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap v5.0.0-alpha2 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e();
}(void 0, function () {
  "use strict";

  function t(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function e(e, n, i) {
    return n && t(e.prototype, n), i && t(e, i), e;
  }

  function n() {
    return (n = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];

        for (var i in n) {
          Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
      }

      return t;
    }).apply(this, arguments);
  }

  var i,
      o,
      r,
      s,
      a = function a(t) {
    do {
      t += Math.floor(1e6 * Math.random());
    } while (document.getElementById(t));

    return t;
  },
      l = function l(t) {
    var e = t.getAttribute("data-target");

    if (!e || "#" === e) {
      var n = t.getAttribute("href");
      e = n && "#" !== n ? n.trim() : null;
    }

    return e;
  },
      c = function c(t) {
    var e = l(t);
    return e && document.querySelector(e) ? e : null;
  },
      u = function u(t) {
    var e = l(t);
    return e ? document.querySelector(e) : null;
  },
      f = function f(t) {
    if (!t) return 0;
    var e = window.getComputedStyle(t),
        n = e.transitionDuration,
        i = e.transitionDelay,
        o = parseFloat(n),
        r = parseFloat(i);
    return o || r ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0;
  },
      h = function h(t) {
    t.dispatchEvent(new Event("transitionend"));
  },
      d = function d(t) {
    return (t[0] || t).nodeType;
  },
      p = function p(t, e) {
    var n = !1,
        i = e + 5;
    t.addEventListener("transitionend", function e() {
      n = !0, t.removeEventListener("transitionend", e);
    }), setTimeout(function () {
      n || h(t);
    }, i);
  },
      g = function g(t, e, n) {
    Object.keys(n).forEach(function (i) {
      var o,
          r = n[i],
          s = e[i],
          a = s && d(s) ? "element" : null == (o = s) ? "" + o : {}.toString.call(o).match(/\s([a-z]+)/i)[1].toLowerCase();
      if (!new RegExp(r).test(a)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + a + '" but expected type "' + r + '".');
    });
  },
      m = function m(t) {
    if (!t) return !1;

    if (t.style && t.parentNode && t.parentNode.style) {
      var e = getComputedStyle(t),
          n = getComputedStyle(t.parentNode);
      return "none" !== e.display && "none" !== n.display && "hidden" !== e.visibility;
    }

    return !1;
  },
      v = function v() {
    return function () {};
  },
      _ = function _(t) {
    return t.offsetHeight;
  },
      b = function b() {
    var t = window.jQuery;
    return t && !document.body.hasAttribute("data-no-jquery") ? t : null;
  },
      y = (i = {}, o = 1, {
    set: function set(t, e, n) {
      void 0 === t.bsKey && (t.bsKey = {
        key: e,
        id: o
      }, o++), i[t.bsKey.id] = n;
    },
    get: function get(t, e) {
      if (!t || void 0 === t.bsKey) return null;
      var n = t.bsKey;
      return n.key === e ? i[n.id] : null;
    },
    "delete": function _delete(t, e) {
      if (void 0 !== t.bsKey) {
        var n = t.bsKey;
        n.key === e && (delete i[n.id], delete t.bsKey);
      }
    }
  }),
      w = function w(t, e, n) {
    y.set(t, e, n);
  },
      E = function E(t, e) {
    return y.get(t, e);
  },
      T = function T(t, e) {
    y["delete"](t, e);
  },
      L = Element.prototype.querySelectorAll,
      k = Element.prototype.querySelector,
      C = (r = new CustomEvent("Bootstrap", {
    cancelable: !0
  }), (s = document.createElement("div")).addEventListener("Bootstrap", function () {
    return null;
  }), r.preventDefault(), s.dispatchEvent(r), r.defaultPrevented),
      A = /:scope\b/;

  (function () {
    var t = document.createElement("div");

    try {
      t.querySelectorAll(":scope *");
    } catch (t) {
      return !1;
    }

    return !0;
  })() || (L = function L(t) {
    if (!A.test(t)) return this.querySelectorAll(t);
    var e = Boolean(this.id);
    e || (this.id = a("scope"));
    var n = null;

    try {
      t = t.replace(A, "#" + this.id), n = this.querySelectorAll(t);
    } finally {
      e || this.removeAttribute("id");
    }

    return n;
  }, k = function k(t) {
    if (!A.test(t)) return this.querySelector(t);
    var e = L.call(this, t);
    return void 0 !== e[0] ? e[0] : null;
  });
  var O = b(),
      S = /[^.]*(?=\..*)\.|.*/,
      D = /\..*/,
      x = /::\d+$/,
      N = {},
      I = 1,
      j = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  },
      P = ["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"];

  function M(t, e) {
    return e && e + "::" + I++ || t.uidEvent || I++;
  }

  function H(t) {
    var e = M(t);
    return t.uidEvent = e, N[e] = N[e] || {}, N[e];
  }

  function B(t, e, n) {
    void 0 === n && (n = null);

    for (var i = Object.keys(t), o = 0, r = i.length; o < r; o++) {
      var s = t[i[o]];
      if (s.originalHandler === e && s.delegationSelector === n) return s;
    }

    return null;
  }

  function R(t, e, n) {
    var i = "string" == typeof e,
        o = i ? n : e,
        r = t.replace(D, ""),
        s = j[r];
    return s && (r = s), P.indexOf(r) > -1 || (r = t), [i, o, r];
  }

  function F(t, e, n, i, o) {
    if ("string" == typeof e && t) {
      n || (n = i, i = null);
      var r = R(e, n, i),
          s = r[0],
          a = r[1],
          l = r[2],
          c = H(t),
          u = c[l] || (c[l] = {}),
          f = B(u, a, s ? n : null);
      if (f) f.oneOff = f.oneOff && o;else {
        var h = M(a, e.replace(S, "")),
            d = s ? function (t, e, n) {
          return function i(o) {
            for (var r = t.querySelectorAll(e), s = o.target; s && s !== this; s = s.parentNode) {
              for (var a = r.length; a--;) {
                if (r[a] === s) return o.delegateTarget = s, i.oneOff && U.off(t, o.type, n), n.apply(s, [o]);
              }
            }

            return null;
          };
        }(t, n, i) : function (t, e) {
          return function n(i) {
            return i.delegateTarget = t, n.oneOff && U.off(t, i.type, e), e.apply(t, [i]);
          };
        }(t, n);
        d.delegationSelector = s ? n : null, d.originalHandler = a, d.oneOff = o, d.uidEvent = h, u[h] = d, t.addEventListener(l, d, s);
      }
    }
  }

  function W(t, e, n, i, o) {
    var r = B(e[n], i, o);
    r && (t.removeEventListener(n, r, Boolean(o)), delete e[n][r.uidEvent]);
  }

  var U = {
    on: function on(t, e, n, i) {
      F(t, e, n, i, !1);
    },
    one: function one(t, e, n, i) {
      F(t, e, n, i, !0);
    },
    off: function off(t, e, n, i) {
      if ("string" == typeof e && t) {
        var o = R(e, n, i),
            r = o[0],
            s = o[1],
            a = o[2],
            l = a !== e,
            c = H(t),
            u = "." === e.charAt(0);

        if (void 0 === s) {
          u && Object.keys(c).forEach(function (n) {
            !function (t, e, n, i) {
              var o = e[n] || {};
              Object.keys(o).forEach(function (r) {
                if (r.indexOf(i) > -1) {
                  var s = o[r];
                  W(t, e, n, s.originalHandler, s.delegationSelector);
                }
              });
            }(t, c, n, e.slice(1));
          });
          var f = c[a] || {};
          Object.keys(f).forEach(function (n) {
            var i = n.replace(x, "");

            if (!l || e.indexOf(i) > -1) {
              var o = f[n];
              W(t, c, a, o.originalHandler, o.delegationSelector);
            }
          });
        } else {
          if (!c || !c[a]) return;
          W(t, c, a, s, r ? n : null);
        }
      }
    },
    trigger: function trigger(t, e, n) {
      if ("string" != typeof e || !t) return null;
      var i,
          o = e.replace(D, ""),
          r = e !== o,
          s = P.indexOf(o) > -1,
          a = !0,
          l = !0,
          c = !1,
          u = null;
      return r && O && (i = O.Event(e, n), O(t).trigger(i), a = !i.isPropagationStopped(), l = !i.isImmediatePropagationStopped(), c = i.isDefaultPrevented()), s ? (u = document.createEvent("HTMLEvents")).initEvent(o, a, !0) : u = new CustomEvent(e, {
        bubbles: a,
        cancelable: !0
      }), void 0 !== n && Object.keys(n).forEach(function (t) {
        Object.defineProperty(u, t, {
          get: function get() {
            return n[t];
          }
        });
      }), c && (u.preventDefault(), C || Object.defineProperty(u, "defaultPrevented", {
        get: function get() {
          return !0;
        }
      })), l && t.dispatchEvent(u), u.defaultPrevented && void 0 !== i && i.preventDefault(), u;
    }
  },
      Q = "alert",
      V = function () {
    function t(t) {
      this._element = t, this._element && w(t, "bs.alert", this);
    }

    var n = t.prototype;
    return n.close = function (t) {
      var e = t ? this._getRootElement(t) : this._element,
          n = this._triggerCloseEvent(e);

      null === n || n.defaultPrevented || this._removeElement(e);
    }, n.dispose = function () {
      T(this._element, "bs.alert"), this._element = null;
    }, n._getRootElement = function (t) {
      return u(t) || t.closest(".alert");
    }, n._triggerCloseEvent = function (t) {
      return U.trigger(t, "close.bs.alert");
    }, n._removeElement = function (t) {
      var e = this;

      if (t.classList.remove("show"), t.classList.contains("fade")) {
        var n = f(t);
        U.one(t, "transitionend", function () {
          return e._destroyElement(t);
        }), p(t, n);
      } else this._destroyElement(t);
    }, n._destroyElement = function (t) {
      t.parentNode && t.parentNode.removeChild(t), U.trigger(t, "closed.bs.alert");
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        var n = E(this, "bs.alert");
        n || (n = new t(this)), "close" === e && n[e](this);
      });
    }, t.handleDismiss = function (t) {
      return function (e) {
        e && e.preventDefault(), t.close(this);
      };
    }, t.getInstance = function (t) {
      return E(t, "bs.alert");
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }]), t;
  }();

  U.on(document, "click.bs.alert.data-api", '[data-dismiss="alert"]', V.handleDismiss(new V()));
  var K = b();

  if (K) {
    var Y = K.fn[Q];
    K.fn[Q] = V.jQueryInterface, K.fn[Q].Constructor = V, K.fn[Q].noConflict = function () {
      return K.fn[Q] = Y, V.jQueryInterface;
    };
  }

  var q = function () {
    function t(t) {
      this._element = t, w(t, "bs.button", this);
    }

    var n = t.prototype;
    return n.toggle = function () {
      this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"));
    }, n.dispose = function () {
      T(this._element, "bs.button"), this._element = null;
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        var n = E(this, "bs.button");
        n || (n = new t(this)), "toggle" === e && n[e]();
      });
    }, t.getInstance = function (t) {
      return E(t, "bs.button");
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }]), t;
  }();

  U.on(document, "click.bs.button.data-api", '[data-toggle="button"]', function (t) {
    t.preventDefault();
    var e = t.target.closest('[data-toggle="button"]'),
        n = E(e, "bs.button");
    n || (n = new q(e)), n.toggle();
  });
  var z = b();

  if (z) {
    var X = z.fn.button;
    z.fn.button = q.jQueryInterface, z.fn.button.Constructor = q, z.fn.button.noConflict = function () {
      return z.fn.button = X, q.jQueryInterface;
    };
  }

  function G(t) {
    return "true" === t || "false" !== t && (t === Number(t).toString() ? Number(t) : "" === t || "null" === t ? null : t);
  }

  function $(t) {
    return t.replace(/[A-Z]/g, function (t) {
      return "-" + t.toLowerCase();
    });
  }

  var Z = {
    setDataAttribute: function setDataAttribute(t, e, n) {
      t.setAttribute("data-" + $(e), n);
    },
    removeDataAttribute: function removeDataAttribute(t, e) {
      t.removeAttribute("data-" + $(e));
    },
    getDataAttributes: function getDataAttributes(t) {
      if (!t) return {};
      var e = n({}, t.dataset);
      return Object.keys(e).forEach(function (t) {
        e[t] = G(e[t]);
      }), e;
    },
    getDataAttribute: function getDataAttribute(t, e) {
      return G(t.getAttribute("data-" + $(e)));
    },
    offset: function offset(t) {
      var e = t.getBoundingClientRect();
      return {
        top: e.top + document.body.scrollTop,
        left: e.left + document.body.scrollLeft
      };
    },
    position: function position(t) {
      return {
        top: t.offsetTop,
        left: t.offsetLeft
      };
    },
    toggleClass: function toggleClass(t, e) {
      t && (t.classList.contains(e) ? t.classList.remove(e) : t.classList.add(e));
    }
  },
      J = {
    matches: function matches(t, e) {
      return t.matches(e);
    },
    find: function find(t, e) {
      var n;
      return void 0 === e && (e = document.documentElement), (n = []).concat.apply(n, L.call(e, t));
    },
    findOne: function findOne(t, e) {
      return void 0 === e && (e = document.documentElement), k.call(e, t);
    },
    children: function children(t, e) {
      var n,
          i = (n = []).concat.apply(n, t.children);
      return i.filter(function (t) {
        return t.matches(e);
      });
    },
    parents: function parents(t, e) {
      for (var n = [], i = t.parentNode; i && i.nodeType === Node.ELEMENT_NODE && 3 !== i.nodeType;) {
        this.matches(i, e) && n.push(i), i = i.parentNode;
      }

      return n;
    },
    prev: function prev(t, e) {
      for (var n = t.previousElementSibling; n;) {
        if (n.matches(e)) return [n];
        n = n.previousElementSibling;
      }

      return [];
    },
    next: function next(t, e) {
      for (var n = t.nextElementSibling; n;) {
        if (this.matches(n, e)) return [n];
        n = n.nextElementSibling;
      }

      return [];
    }
  },
      tt = "carousel",
      et = ".bs.carousel",
      nt = {
    interval: 5e3,
    keyboard: !0,
    slide: !1,
    pause: "hover",
    wrap: !0,
    touch: !0
  },
      it = {
    interval: "(number|boolean)",
    keyboard: "boolean",
    slide: "(boolean|string)",
    pause: "(string|boolean)",
    wrap: "boolean",
    touch: "boolean"
  },
      ot = {
    TOUCH: "touch",
    PEN: "pen"
  },
      rt = function () {
    function t(t, e) {
      this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = J.findOne(".carousel-indicators", this._element), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent), this._addEventListeners(), w(t, "bs.carousel", this);
    }

    var i = t.prototype;
    return i.next = function () {
      this._isSliding || this._slide("next");
    }, i.nextWhenVisible = function () {
      !document.hidden && m(this._element) && this.next();
    }, i.prev = function () {
      this._isSliding || this._slide("prev");
    }, i.pause = function (t) {
      t || (this._isPaused = !0), J.findOne(".carousel-item-next, .carousel-item-prev", this._element) && (h(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
    }, i.cycle = function (t) {
      t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
    }, i.to = function (t) {
      var e = this;
      this._activeElement = J.findOne(".active.carousel-item", this._element);

      var n = this._getItemIndex(this._activeElement);

      if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) U.one(this._element, "slid.bs.carousel", function () {
        return e.to(t);
      });else {
        if (n === t) return this.pause(), void this.cycle();
        var i = t > n ? "next" : "prev";

        this._slide(i, this._items[t]);
      }
    }, i.dispose = function () {
      U.off(this._element, et), T(this._element, "bs.carousel"), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
    }, i._getConfig = function (t) {
      return t = n({}, nt, t), g(tt, t, it), t;
    }, i._handleSwipe = function () {
      var t = Math.abs(this.touchDeltaX);

      if (!(t <= 40)) {
        var e = t / this.touchDeltaX;
        this.touchDeltaX = 0, e > 0 && this.prev(), e < 0 && this.next();
      }
    }, i._addEventListeners = function () {
      var t = this;
      this._config.keyboard && U.on(this._element, "keydown.bs.carousel", function (e) {
        return t._keydown(e);
      }), "hover" === this._config.pause && (U.on(this._element, "mouseenter.bs.carousel", function (e) {
        return t.pause(e);
      }), U.on(this._element, "mouseleave.bs.carousel", function (e) {
        return t.cycle(e);
      })), this._config.touch && this._touchSupported && this._addTouchEventListeners();
    }, i._addTouchEventListeners = function () {
      var t = this,
          e = function e(_e2) {
        t._pointerEvent && ot[_e2.pointerType.toUpperCase()] ? t.touchStartX = _e2.clientX : t._pointerEvent || (t.touchStartX = _e2.touches[0].clientX);
      },
          n = function n(e) {
        t._pointerEvent && ot[e.pointerType.toUpperCase()] && (t.touchDeltaX = e.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function (e) {
          return t.cycle(e);
        }, 500 + t._config.interval));
      };

      J.find(".carousel-item img", this._element).forEach(function (t) {
        U.on(t, "dragstart.bs.carousel", function (t) {
          return t.preventDefault();
        });
      }), this._pointerEvent ? (U.on(this._element, "pointerdown.bs.carousel", function (t) {
        return e(t);
      }), U.on(this._element, "pointerup.bs.carousel", function (t) {
        return n(t);
      }), this._element.classList.add("pointer-event")) : (U.on(this._element, "touchstart.bs.carousel", function (t) {
        return e(t);
      }), U.on(this._element, "touchmove.bs.carousel", function (e) {
        return function (e) {
          e.touches && e.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX = e.touches[0].clientX - t.touchStartX;
        }(e);
      }), U.on(this._element, "touchend.bs.carousel", function (t) {
        return n(t);
      }));
    }, i._keydown = function (t) {
      if (!/input|textarea/i.test(t.target.tagName)) switch (t.key) {
        case "ArrowLeft":
          t.preventDefault(), this.prev();
          break;

        case "ArrowRight":
          t.preventDefault(), this.next();
      }
    }, i._getItemIndex = function (t) {
      return this._items = t && t.parentNode ? J.find(".carousel-item", t.parentNode) : [], this._items.indexOf(t);
    }, i._getItemByDirection = function (t, e) {
      var n = "next" === t,
          i = "prev" === t,
          o = this._getItemIndex(e),
          r = this._items.length - 1;

      if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
      var s = (o + ("prev" === t ? -1 : 1)) % this._items.length;
      return -1 === s ? this._items[this._items.length - 1] : this._items[s];
    }, i._triggerSlideEvent = function (t, e) {
      var n = this._getItemIndex(t),
          i = this._getItemIndex(J.findOne(".active.carousel-item", this._element));

      return U.trigger(this._element, "slide.bs.carousel", {
        relatedTarget: t,
        direction: e,
        from: i,
        to: n
      });
    }, i._setActiveIndicatorElement = function (t) {
      if (this._indicatorsElement) {
        for (var e = J.find(".active", this._indicatorsElement), n = 0; n < e.length; n++) {
          e[n].classList.remove("active");
        }

        var i = this._indicatorsElement.children[this._getItemIndex(t)];

        i && i.classList.add("active");
      }
    }, i._slide = function (t, e) {
      var n,
          i,
          o,
          r = this,
          s = J.findOne(".active.carousel-item", this._element),
          a = this._getItemIndex(s),
          l = e || s && this._getItemByDirection(t, s),
          c = this._getItemIndex(l),
          u = Boolean(this._interval);

      if ("next" === t ? (n = "carousel-item-left", i = "carousel-item-next", o = "left") : (n = "carousel-item-right", i = "carousel-item-prev", o = "right"), l && l.classList.contains("active")) this._isSliding = !1;else if (!this._triggerSlideEvent(l, o).defaultPrevented && s && l) {
        if (this._isSliding = !0, u && this.pause(), this._setActiveIndicatorElement(l), this._element.classList.contains("slide")) {
          l.classList.add(i), _(l), s.classList.add(n), l.classList.add(n);
          var h = parseInt(l.getAttribute("data-interval"), 10);
          h ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = h) : this._config.interval = this._config.defaultInterval || this._config.interval;
          var d = f(s);
          U.one(s, "transitionend", function () {
            l.classList.remove(n, i), l.classList.add("active"), s.classList.remove("active", i, n), r._isSliding = !1, setTimeout(function () {
              U.trigger(r._element, "slid.bs.carousel", {
                relatedTarget: l,
                direction: o,
                from: a,
                to: c
              });
            }, 0);
          }), p(s, d);
        } else s.classList.remove("active"), l.classList.add("active"), this._isSliding = !1, U.trigger(this._element, "slid.bs.carousel", {
          relatedTarget: l,
          direction: o,
          from: a,
          to: c
        });

        u && this.cycle();
      }
    }, t.carouselInterface = function (e, i) {
      var o = E(e, "bs.carousel"),
          r = n({}, nt, Z.getDataAttributes(e));
      "object" == _typeof(i) && (r = n({}, r, i));
      var s = "string" == typeof i ? i : r.slide;
      if (o || (o = new t(e, r)), "number" == typeof i) o.to(i);else if ("string" == typeof s) {
        if (void 0 === o[s]) throw new TypeError('No method named "' + s + '"');
        o[s]();
      } else r.interval && r.ride && (o.pause(), o.cycle());
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        t.carouselInterface(this, e);
      });
    }, t.dataApiClickHandler = function (e) {
      var i = u(this);

      if (i && i.classList.contains("carousel")) {
        var o = n({}, Z.getDataAttributes(i), Z.getDataAttributes(this)),
            r = this.getAttribute("data-slide-to");
        r && (o.interval = !1), t.carouselInterface(i, o), r && E(i, "bs.carousel").to(r), e.preventDefault();
      }
    }, t.getInstance = function (t) {
      return E(t, "bs.carousel");
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return nt;
      }
    }]), t;
  }();

  U.on(document, "click.bs.carousel.data-api", "[data-slide], [data-slide-to]", rt.dataApiClickHandler), U.on(window, "load.bs.carousel.data-api", function () {
    for (var t = J.find('[data-ride="carousel"]'), e = 0, n = t.length; e < n; e++) {
      rt.carouselInterface(t[e], E(t[e], "bs.carousel"));
    }
  });
  var st = b();

  if (st) {
    var at = st.fn[tt];
    st.fn[tt] = rt.jQueryInterface, st.fn[tt].Constructor = rt, st.fn[tt].noConflict = function () {
      return st.fn[tt] = at, rt.jQueryInterface;
    };
  }

  var lt = "collapse",
      ct = {
    toggle: !0,
    parent: ""
  },
      ut = {
    toggle: "boolean",
    parent: "(string|element)"
  },
      ft = function () {
    function t(t, e) {
      this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = J.find('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]');

      for (var n = J.find('[data-toggle="collapse"]'), i = 0, o = n.length; i < o; i++) {
        var r = n[i],
            s = c(r),
            a = J.find(s).filter(function (e) {
          return e === t;
        });
        null !== s && a.length && (this._selector = s, this._triggerArray.push(r));
      }

      this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle(), w(t, "bs.collapse", this);
    }

    var i = t.prototype;
    return i.toggle = function () {
      this._element.classList.contains("show") ? this.hide() : this.show();
    }, i.show = function () {
      var e = this;

      if (!this._isTransitioning && !this._element.classList.contains("show")) {
        var n, i;
        this._parent && 0 === (n = J.find(".show, .collapsing", this._parent).filter(function (t) {
          return "string" == typeof e._config.parent ? t.getAttribute("data-parent") === e._config.parent : t.classList.contains("collapse");
        })).length && (n = null);
        var o = J.findOne(this._selector);

        if (n) {
          var r = n.filter(function (t) {
            return o !== t;
          });
          if ((i = r[0] ? E(r[0], "bs.collapse") : null) && i._isTransitioning) return;
        }

        if (!U.trigger(this._element, "show.bs.collapse").defaultPrevented) {
          n && n.forEach(function (e) {
            o !== e && t.collapseInterface(e, "hide"), i || w(e, "bs.collapse", null);
          });

          var s = this._getDimension();

          this._element.classList.remove("collapse"), this._element.classList.add("collapsing"), this._element.style[s] = 0, this._triggerArray.length && this._triggerArray.forEach(function (t) {
            t.classList.remove("collapsed"), t.setAttribute("aria-expanded", !0);
          }), this.setTransitioning(!0);
          var a = "scroll" + (s[0].toUpperCase() + s.slice(1)),
              l = f(this._element);
          U.one(this._element, "transitionend", function () {
            e._element.classList.remove("collapsing"), e._element.classList.add("collapse", "show"), e._element.style[s] = "", e.setTransitioning(!1), U.trigger(e._element, "shown.bs.collapse");
          }), p(this._element, l), this._element.style[s] = this._element[a] + "px";
        }
      }
    }, i.hide = function () {
      var t = this;

      if (!this._isTransitioning && this._element.classList.contains("show") && !U.trigger(this._element, "hide.bs.collapse").defaultPrevented) {
        var e = this._getDimension();

        this._element.style[e] = this._element.getBoundingClientRect()[e] + "px", _(this._element), this._element.classList.add("collapsing"), this._element.classList.remove("collapse", "show");
        var n = this._triggerArray.length;
        if (n > 0) for (var i = 0; i < n; i++) {
          var o = this._triggerArray[i],
              r = u(o);
          r && !r.classList.contains("show") && (o.classList.add("collapsed"), o.setAttribute("aria-expanded", !1));
        }
        this.setTransitioning(!0);
        this._element.style[e] = "";
        var s = f(this._element);
        U.one(this._element, "transitionend", function () {
          t.setTransitioning(!1), t._element.classList.remove("collapsing"), t._element.classList.add("collapse"), U.trigger(t._element, "hidden.bs.collapse");
        }), p(this._element, s);
      }
    }, i.setTransitioning = function (t) {
      this._isTransitioning = t;
    }, i.dispose = function () {
      T(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
    }, i._getConfig = function (t) {
      return (t = n({}, ct, t)).toggle = Boolean(t.toggle), g(lt, t, ut), t;
    }, i._getDimension = function () {
      return this._element.classList.contains("width") ? "width" : "height";
    }, i._getParent = function () {
      var t = this,
          e = this._config.parent;
      d(e) ? void 0 === e.jquery && void 0 === e[0] || (e = e[0]) : e = J.findOne(e);
      var n = '[data-toggle="collapse"][data-parent="' + e + '"]';
      return J.find(n, e).forEach(function (e) {
        var n = u(e);

        t._addAriaAndCollapsedClass(n, [e]);
      }), e;
    }, i._addAriaAndCollapsedClass = function (t, e) {
      if (t && e.length) {
        var n = t.classList.contains("show");
        e.forEach(function (t) {
          n ? t.classList.remove("collapsed") : t.classList.add("collapsed"), t.setAttribute("aria-expanded", n);
        });
      }
    }, t.collapseInterface = function (e, i) {
      var o = E(e, "bs.collapse"),
          r = n({}, ct, Z.getDataAttributes(e), "object" == _typeof(i) && i ? i : {});

      if (!o && r.toggle && "string" == typeof i && /show|hide/.test(i) && (r.toggle = !1), o || (o = new t(e, r)), "string" == typeof i) {
        if (void 0 === o[i]) throw new TypeError('No method named "' + i + '"');
        o[i]();
      }
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        t.collapseInterface(this, e);
      });
    }, t.getInstance = function (t) {
      return E(t, "bs.collapse");
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return ct;
      }
    }]), t;
  }();

  U.on(document, "click.bs.collapse.data-api", '[data-toggle="collapse"]', function (t) {
    "A" === t.target.tagName && t.preventDefault();
    var e = Z.getDataAttributes(this),
        n = c(this);
    J.find(n).forEach(function (t) {
      var n,
          i = E(t, "bs.collapse");
      i ? (null === i._parent && "string" == typeof e.parent && (i._config.parent = e.parent, i._parent = i._getParent()), n = "toggle") : n = e, ft.collapseInterface(t, n);
    });
  });
  var ht = b();

  if (ht) {
    var dt = ht.fn[lt];
    ht.fn[lt] = ft.jQueryInterface, ht.fn[lt].Constructor = ft, ht.fn[lt].noConflict = function () {
      return ht.fn[lt] = dt, ft.jQueryInterface;
    };
  }

  var pt = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
      gt = function () {
    for (var t = ["Edge", "Trident", "Firefox"], e = 0; e < t.length; e += 1) {
      if (pt && navigator.userAgent.indexOf(t[e]) >= 0) return 1;
    }

    return 0;
  }();

  var mt = pt && window.Promise ? function (t) {
    var e = !1;
    return function () {
      e || (e = !0, window.Promise.resolve().then(function () {
        e = !1, t();
      }));
    };
  } : function (t) {
    var e = !1;
    return function () {
      e || (e = !0, setTimeout(function () {
        e = !1, t();
      }, gt));
    };
  };

  function vt(t) {
    return t && "[object Function]" === {}.toString.call(t);
  }

  function _t(t, e) {
    if (1 !== t.nodeType) return [];
    var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
    return e ? n[e] : n;
  }

  function bt(t) {
    return "HTML" === t.nodeName ? t : t.parentNode || t.host;
  }

  function yt(t) {
    if (!t) return document.body;

    switch (t.nodeName) {
      case "HTML":
      case "BODY":
        return t.ownerDocument.body;

      case "#document":
        return t.body;
    }

    var e = _t(t),
        n = e.overflow,
        i = e.overflowX,
        o = e.overflowY;

    return /(auto|scroll|overlay)/.test(n + o + i) ? t : yt(bt(t));
  }

  function wt(t) {
    return t && t.referenceNode ? t.referenceNode : t;
  }

  var Et = pt && !(!window.MSInputMethodContext || !document.documentMode),
      Tt = pt && /MSIE 10/.test(navigator.userAgent);

  function Lt(t) {
    return 11 === t ? Et : 10 === t ? Tt : Et || Tt;
  }

  function kt(t) {
    if (!t) return document.documentElement;

    for (var e = Lt(10) ? document.body : null, n = t.offsetParent || null; n === e && t.nextElementSibling;) {
      n = (t = t.nextElementSibling).offsetParent;
    }

    var i = n && n.nodeName;
    return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === _t(n, "position") ? kt(n) : n : t ? t.ownerDocument.documentElement : document.documentElement;
  }

  function Ct(t) {
    return null !== t.parentNode ? Ct(t.parentNode) : t;
  }

  function At(t, e) {
    if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
    var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
        i = n ? t : e,
        o = n ? e : t,
        r = document.createRange();
    r.setStart(i, 0), r.setEnd(o, 0);
    var s = r.commonAncestorContainer;
    if (t !== s && e !== s || i.contains(o)) return function (t) {
      var e = t.nodeName;
      return "BODY" !== e && ("HTML" === e || kt(t.firstElementChild) === t);
    }(s) ? s : kt(s);
    var a = Ct(t);
    return a.host ? At(a.host, e) : At(t, Ct(e).host);
  }

  function Ot(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
        n = "top" === e ? "scrollTop" : "scrollLeft",
        i = t.nodeName;

    if ("BODY" === i || "HTML" === i) {
      var o = t.ownerDocument.documentElement,
          r = t.ownerDocument.scrollingElement || o;
      return r[n];
    }

    return t[n];
  }

  function St(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        i = Ot(e, "top"),
        o = Ot(e, "left"),
        r = n ? -1 : 1;
    return t.top += i * r, t.bottom += i * r, t.left += o * r, t.right += o * r, t;
  }

  function Dt(t, e) {
    var n = "x" === e ? "Left" : "Top",
        i = "Left" === n ? "Right" : "Bottom";
    return parseFloat(t["border" + n + "Width"]) + parseFloat(t["border" + i + "Width"]);
  }

  function xt(t, e, n, i) {
    return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], Lt(10) ? parseInt(n["offset" + t]) + parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0);
  }

  function Nt(t) {
    var e = t.body,
        n = t.documentElement,
        i = Lt(10) && getComputedStyle(n);
    return {
      height: xt("Height", e, n, i),
      width: xt("Width", e, n, i)
    };
  }

  var It = function It(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  },
      jt = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }

    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
      Pt = function Pt(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n, t;
  },
      Mt = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];

      for (var i in n) {
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
      }
    }

    return t;
  };

  function Ht(t) {
    return Mt({}, t, {
      right: t.left + t.width,
      bottom: t.top + t.height
    });
  }

  function Bt(t) {
    var e = {};

    try {
      if (Lt(10)) {
        e = t.getBoundingClientRect();
        var n = Ot(t, "top"),
            i = Ot(t, "left");
        e.top += n, e.left += i, e.bottom += n, e.right += i;
      } else e = t.getBoundingClientRect();
    } catch (t) {}

    var o = {
      left: e.left,
      top: e.top,
      width: e.right - e.left,
      height: e.bottom - e.top
    },
        r = "HTML" === t.nodeName ? Nt(t.ownerDocument) : {},
        s = r.width || t.clientWidth || o.width,
        a = r.height || t.clientHeight || o.height,
        l = t.offsetWidth - s,
        c = t.offsetHeight - a;

    if (l || c) {
      var u = _t(t);

      l -= Dt(u, "x"), c -= Dt(u, "y"), o.width -= l, o.height -= c;
    }

    return Ht(o);
  }

  function Rt(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        i = Lt(10),
        o = "HTML" === e.nodeName,
        r = Bt(t),
        s = Bt(e),
        a = yt(t),
        l = _t(e),
        c = parseFloat(l.borderTopWidth),
        u = parseFloat(l.borderLeftWidth);

    n && o && (s.top = Math.max(s.top, 0), s.left = Math.max(s.left, 0));
    var f = Ht({
      top: r.top - s.top - c,
      left: r.left - s.left - u,
      width: r.width,
      height: r.height
    });

    if (f.marginTop = 0, f.marginLeft = 0, !i && o) {
      var h = parseFloat(l.marginTop),
          d = parseFloat(l.marginLeft);
      f.top -= c - h, f.bottom -= c - h, f.left -= u - d, f.right -= u - d, f.marginTop = h, f.marginLeft = d;
    }

    return (i && !n ? e.contains(a) : e === a && "BODY" !== a.nodeName) && (f = St(f, e)), f;
  }

  function Ft(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = t.ownerDocument.documentElement,
        i = Rt(t, n),
        o = Math.max(n.clientWidth, window.innerWidth || 0),
        r = Math.max(n.clientHeight, window.innerHeight || 0),
        s = e ? 0 : Ot(n),
        a = e ? 0 : Ot(n, "left"),
        l = {
      top: s - i.top + i.marginTop,
      left: a - i.left + i.marginLeft,
      width: o,
      height: r
    };
    return Ht(l);
  }

  function Wt(t) {
    var e = t.nodeName;
    if ("BODY" === e || "HTML" === e) return !1;
    if ("fixed" === _t(t, "position")) return !0;
    var n = bt(t);
    return !!n && Wt(n);
  }

  function Ut(t) {
    if (!t || !t.parentElement || Lt()) return document.documentElement;

    for (var e = t.parentElement; e && "none" === _t(e, "transform");) {
      e = e.parentElement;
    }

    return e || document.documentElement;
  }

  function Qt(t, e, n, i) {
    var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
        r = {
      top: 0,
      left: 0
    },
        s = o ? Ut(t) : At(t, wt(e));
    if ("viewport" === i) r = Ft(s, o);else {
      var a = void 0;
      "scrollParent" === i ? "BODY" === (a = yt(bt(e))).nodeName && (a = t.ownerDocument.documentElement) : a = "window" === i ? t.ownerDocument.documentElement : i;
      var l = Rt(a, s, o);
      if ("HTML" !== a.nodeName || Wt(s)) r = l;else {
        var c = Nt(t.ownerDocument),
            u = c.height,
            f = c.width;
        r.top += l.top - l.marginTop, r.bottom = u + l.top, r.left += l.left - l.marginLeft, r.right = f + l.left;
      }
    }
    var h = "number" == typeof (n = n || 0);
    return r.left += h ? n : n.left || 0, r.top += h ? n : n.top || 0, r.right -= h ? n : n.right || 0, r.bottom -= h ? n : n.bottom || 0, r;
  }

  function Vt(t) {
    return t.width * t.height;
  }

  function Kt(t, e, n, i, o) {
    var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === t.indexOf("auto")) return t;
    var s = Qt(n, i, r, o),
        a = {
      top: {
        width: s.width,
        height: e.top - s.top
      },
      right: {
        width: s.right - e.right,
        height: s.height
      },
      bottom: {
        width: s.width,
        height: s.bottom - e.bottom
      },
      left: {
        width: e.left - s.left,
        height: s.height
      }
    },
        l = Object.keys(a).map(function (t) {
      return Mt({
        key: t
      }, a[t], {
        area: Vt(a[t])
      });
    }).sort(function (t, e) {
      return e.area - t.area;
    }),
        c = l.filter(function (t) {
      var e = t.width,
          i = t.height;
      return e >= n.clientWidth && i >= n.clientHeight;
    }),
        u = c.length > 0 ? c[0].key : l[0].key,
        f = t.split("-")[1];
    return u + (f ? "-" + f : "");
  }

  function Yt(t, e, n) {
    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
        o = i ? Ut(e) : At(e, wt(n));
    return Rt(n, o, i);
  }

  function qt(t) {
    var e = t.ownerDocument.defaultView.getComputedStyle(t),
        n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
        i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
    return {
      width: t.offsetWidth + i,
      height: t.offsetHeight + n
    };
  }

  function zt(t) {
    var e = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    return t.replace(/left|right|bottom|top/g, function (t) {
      return e[t];
    });
  }

  function Xt(t, e, n) {
    n = n.split("-")[0];
    var i = qt(t),
        o = {
      width: i.width,
      height: i.height
    },
        r = -1 !== ["right", "left"].indexOf(n),
        s = r ? "top" : "left",
        a = r ? "left" : "top",
        l = r ? "height" : "width",
        c = r ? "width" : "height";
    return o[s] = e[s] + e[l] / 2 - i[l] / 2, o[a] = n === a ? e[a] - i[c] : e[zt(a)], o;
  }

  function Gt(t, e) {
    return Array.prototype.find ? t.find(e) : t.filter(e)[0];
  }

  function $t(t, e, n) {
    return (void 0 === n ? t : t.slice(0, function (t, e, n) {
      if (Array.prototype.findIndex) return t.findIndex(function (t) {
        return t[e] === n;
      });
      var i = Gt(t, function (t) {
        return t[e] === n;
      });
      return t.indexOf(i);
    }(t, "name", n))).forEach(function (t) {
      t["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
      var n = t["function"] || t.fn;
      t.enabled && vt(n) && (e.offsets.popper = Ht(e.offsets.popper), e.offsets.reference = Ht(e.offsets.reference), e = n(e, t));
    }), e;
  }

  function Zt() {
    if (!this.state.isDestroyed) {
      var t = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      t.offsets.reference = Yt(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = Kt(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = Xt(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = $t(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t));
    }
  }

  function Jt(t, e) {
    return t.some(function (t) {
      var n = t.name;
      return t.enabled && n === e;
    });
  }

  function te(t) {
    for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length; i++) {
      var o = e[i],
          r = o ? "" + o + n : t;
      if (void 0 !== document.body.style[r]) return r;
    }

    return null;
  }

  function ee() {
    return this.state.isDestroyed = !0, Jt(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[te("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }

  function ne(t) {
    var e = t.ownerDocument;
    return e ? e.defaultView : window;
  }

  function ie(t, e, n, i) {
    n.updateBound = i, ne(t).addEventListener("resize", n.updateBound, {
      passive: !0
    });
    var o = yt(t);
    return function t(e, n, i, o) {
      var r = "BODY" === e.nodeName,
          s = r ? e.ownerDocument.defaultView : e;
      s.addEventListener(n, i, {
        passive: !0
      }), r || t(yt(s.parentNode), n, i, o), o.push(s);
    }(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n;
  }

  function oe() {
    this.state.eventsEnabled || (this.state = ie(this.reference, this.options, this.state, this.scheduleUpdate));
  }

  function re() {
    var t, e;
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, ne(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function (t) {
      t.removeEventListener("scroll", e.updateBound);
    }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e));
  }

  function se(t) {
    return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
  }

  function ae(t, e) {
    Object.keys(e).forEach(function (n) {
      var i = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && se(e[n]) && (i = "px"), t.style[n] = e[n] + i;
    });
  }

  var le = pt && /Firefox/i.test(navigator.userAgent);

  function ce(t, e, n) {
    var i = Gt(t, function (t) {
      return t.name === e;
    }),
        o = !!i && t.some(function (t) {
      return t.name === n && t.enabled && t.order < i.order;
    });

    if (!o) {
      var r = "`" + e + "`",
          s = "`" + n + "`";
      console.warn(s + " modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!");
    }

    return o;
  }

  var ue = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
      fe = ue.slice(3);

  function he(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = fe.indexOf(t),
        i = fe.slice(n + 1).concat(fe.slice(0, n));
    return e ? i.reverse() : i;
  }

  var de = "flip",
      pe = "clockwise",
      ge = "counterclockwise";

  function me(t, e, n, i) {
    var o = [0, 0],
        r = -1 !== ["right", "left"].indexOf(i),
        s = t.split(/(\+|\-)/).map(function (t) {
      return t.trim();
    }),
        a = s.indexOf(Gt(s, function (t) {
      return -1 !== t.search(/,|\s/);
    }));
    s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
    var l = /\s*,\s*|\s+/,
        c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
    return (c = c.map(function (t, i) {
      var o = (1 === i ? !r : r) ? "height" : "width",
          s = !1;
      return t.reduce(function (t, e) {
        return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e, s = !1, t) : t.concat(e);
      }, []).map(function (t) {
        return function (t, e, n, i) {
          var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
              r = +o[1],
              s = o[2];
          if (!r) return t;

          if (0 === s.indexOf("%")) {
            var a = void 0;

            switch (s) {
              case "%p":
                a = n;
                break;

              case "%":
              case "%r":
              default:
                a = i;
            }

            return Ht(a)[e] / 100 * r;
          }

          if ("vh" === s || "vw" === s) return ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r;
          return r;
        }(t, o, e, n);
      });
    })).forEach(function (t, e) {
      t.forEach(function (n, i) {
        se(n) && (o[e] += n * ("-" === t[i - 1] ? -1 : 1));
      });
    }), o;
  }

  var ve = {
    placement: "bottom",
    positionFixed: !1,
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function onCreate() {},
    onUpdate: function onUpdate() {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function fn(t) {
          var e = t.placement,
              n = e.split("-")[0],
              i = e.split("-")[1];

          if (i) {
            var o = t.offsets,
                r = o.reference,
                s = o.popper,
                a = -1 !== ["bottom", "top"].indexOf(n),
                l = a ? "left" : "top",
                c = a ? "width" : "height",
                u = {
              start: Pt({}, l, r[l]),
              end: Pt({}, l, r[l] + r[c] - s[c])
            };
            t.offsets.popper = Mt({}, s, u[i]);
          }

          return t;
        }
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: function fn(t, e) {
          var n = e.offset,
              i = t.placement,
              o = t.offsets,
              r = o.popper,
              s = o.reference,
              a = i.split("-")[0],
              l = void 0;
          return l = se(+n) ? [+n, 0] : me(n, r, s, a), "left" === a ? (r.top += l[0], r.left -= l[1]) : "right" === a ? (r.top += l[0], r.left += l[1]) : "top" === a ? (r.left += l[0], r.top -= l[1]) : "bottom" === a && (r.left += l[0], r.top += l[1]), t.popper = r, t;
        },
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function fn(t, e) {
          var n = e.boundariesElement || kt(t.instance.popper);
          t.instance.reference === n && (n = kt(n));
          var i = te("transform"),
              o = t.instance.popper.style,
              r = o.top,
              s = o.left,
              a = o[i];
          o.top = "", o.left = "", o[i] = "";
          var l = Qt(t.instance.popper, t.instance.reference, e.padding, n, t.positionFixed);
          o.top = r, o.left = s, o[i] = a, e.boundaries = l;
          var c = e.priority,
              u = t.offsets.popper,
              f = {
            primary: function primary(t) {
              var n = u[t];
              return u[t] < l[t] && !e.escapeWithReference && (n = Math.max(u[t], l[t])), Pt({}, t, n);
            },
            secondary: function secondary(t) {
              var n = "right" === t ? "left" : "top",
                  i = u[n];
              return u[t] > l[t] && !e.escapeWithReference && (i = Math.min(u[n], l[t] - ("right" === t ? u.width : u.height))), Pt({}, n, i);
            }
          };
          return c.forEach(function (t) {
            var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
            u = Mt({}, u, f[e](t));
          }), t.offsets.popper = u, t;
        },
        priority: ["left", "right", "top", "bottom"],
        padding: 5,
        boundariesElement: "scrollParent"
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function fn(t) {
          var e = t.offsets,
              n = e.popper,
              i = e.reference,
              o = t.placement.split("-")[0],
              r = Math.floor,
              s = -1 !== ["top", "bottom"].indexOf(o),
              a = s ? "right" : "bottom",
              l = s ? "left" : "top",
              c = s ? "width" : "height";
          return n[a] < r(i[l]) && (t.offsets.popper[l] = r(i[l]) - n[c]), n[l] > r(i[a]) && (t.offsets.popper[l] = r(i[a])), t;
        }
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function fn(t, e) {
          var n;
          if (!ce(t.instance.modifiers, "arrow", "keepTogether")) return t;
          var i = e.element;

          if ("string" == typeof i) {
            if (!(i = t.instance.popper.querySelector(i))) return t;
          } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;

          var o = t.placement.split("-")[0],
              r = t.offsets,
              s = r.popper,
              a = r.reference,
              l = -1 !== ["left", "right"].indexOf(o),
              c = l ? "height" : "width",
              u = l ? "Top" : "Left",
              f = u.toLowerCase(),
              h = l ? "left" : "top",
              d = l ? "bottom" : "right",
              p = qt(i)[c];
          a[d] - p < s[f] && (t.offsets.popper[f] -= s[f] - (a[d] - p)), a[f] + p > s[d] && (t.offsets.popper[f] += a[f] + p - s[d]), t.offsets.popper = Ht(t.offsets.popper);

          var g = a[f] + a[c] / 2 - p / 2,
              m = _t(t.instance.popper),
              v = parseFloat(m["margin" + u]),
              _ = parseFloat(m["border" + u + "Width"]),
              b = g - t.offsets.popper[f] - v - _;

          return b = Math.max(Math.min(s[c] - p, b), 0), t.arrowElement = i, t.offsets.arrow = (Pt(n = {}, f, Math.round(b)), Pt(n, h, ""), n), t;
        },
        element: "[x-arrow]"
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function fn(t, e) {
          if (Jt(t.instance.modifiers, "inner")) return t;
          if (t.flipped && t.placement === t.originalPlacement) return t;
          var n = Qt(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
              i = t.placement.split("-")[0],
              o = zt(i),
              r = t.placement.split("-")[1] || "",
              s = [];

          switch (e.behavior) {
            case de:
              s = [i, o];
              break;

            case pe:
              s = he(i);
              break;

            case ge:
              s = he(i, !0);
              break;

            default:
              s = e.behavior;
          }

          return s.forEach(function (a, l) {
            if (i !== a || s.length === l + 1) return t;
            i = t.placement.split("-")[0], o = zt(i);

            var c = t.offsets.popper,
                u = t.offsets.reference,
                f = Math.floor,
                h = "left" === i && f(c.right) > f(u.left) || "right" === i && f(c.left) < f(u.right) || "top" === i && f(c.bottom) > f(u.top) || "bottom" === i && f(c.top) < f(u.bottom),
                d = f(c.left) < f(n.left),
                p = f(c.right) > f(n.right),
                g = f(c.top) < f(n.top),
                m = f(c.bottom) > f(n.bottom),
                v = "left" === i && d || "right" === i && p || "top" === i && g || "bottom" === i && m,
                _ = -1 !== ["top", "bottom"].indexOf(i),
                b = !!e.flipVariations && (_ && "start" === r && d || _ && "end" === r && p || !_ && "start" === r && g || !_ && "end" === r && m),
                y = !!e.flipVariationsByContent && (_ && "start" === r && p || _ && "end" === r && d || !_ && "start" === r && m || !_ && "end" === r && g),
                w = b || y;

            (h || v || w) && (t.flipped = !0, (h || v) && (i = s[l + 1]), w && (r = function (t) {
              return "end" === t ? "start" : "start" === t ? "end" : t;
            }(r)), t.placement = i + (r ? "-" + r : ""), t.offsets.popper = Mt({}, t.offsets.popper, Xt(t.instance.popper, t.offsets.reference, t.placement)), t = $t(t.instance.modifiers, t, "flip"));
          }), t;
        },
        behavior: "flip",
        padding: 5,
        boundariesElement: "viewport",
        flipVariations: !1,
        flipVariationsByContent: !1
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function fn(t) {
          var e = t.placement,
              n = e.split("-")[0],
              i = t.offsets,
              o = i.popper,
              r = i.reference,
              s = -1 !== ["left", "right"].indexOf(n),
              a = -1 === ["top", "left"].indexOf(n);
          return o[s ? "left" : "top"] = r[n] - (a ? o[s ? "width" : "height"] : 0), t.placement = zt(e), t.offsets.popper = Ht(o), t;
        }
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function fn(t) {
          if (!ce(t.instance.modifiers, "hide", "preventOverflow")) return t;
          var e = t.offsets.reference,
              n = Gt(t.instance.modifiers, function (t) {
            return "preventOverflow" === t.name;
          }).boundaries;

          if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
            if (!0 === t.hide) return t;
            t.hide = !0, t.attributes["x-out-of-boundaries"] = "";
          } else {
            if (!1 === t.hide) return t;
            t.hide = !1, t.attributes["x-out-of-boundaries"] = !1;
          }

          return t;
        }
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function fn(t, e) {
          var n = e.x,
              i = e.y,
              o = t.offsets.popper,
              r = Gt(t.instance.modifiers, function (t) {
            return "applyStyle" === t.name;
          }).gpuAcceleration;
          void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");

          var s = void 0 !== r ? r : e.gpuAcceleration,
              a = kt(t.instance.popper),
              l = Bt(a),
              c = {
            position: o.position
          },
              u = function (t, e) {
            var n = t.offsets,
                i = n.popper,
                o = n.reference,
                r = Math.round,
                s = Math.floor,
                a = function a(t) {
              return t;
            },
                l = r(o.width),
                c = r(i.width),
                u = -1 !== ["left", "right"].indexOf(t.placement),
                f = -1 !== t.placement.indexOf("-"),
                h = e ? u || f || l % 2 == c % 2 ? r : s : a,
                d = e ? r : a;

            return {
              left: h(l % 2 == 1 && c % 2 == 1 && !f && e ? i.left - 1 : i.left),
              top: d(i.top),
              bottom: d(i.bottom),
              right: h(i.right)
            };
          }(t, window.devicePixelRatio < 2 || !le),
              f = "bottom" === n ? "top" : "bottom",
              h = "right" === i ? "left" : "right",
              d = te("transform"),
              p = void 0,
              g = void 0;

          if (g = "bottom" === f ? "HTML" === a.nodeName ? -a.clientHeight + u.bottom : -l.height + u.bottom : u.top, p = "right" === h ? "HTML" === a.nodeName ? -a.clientWidth + u.right : -l.width + u.right : u.left, s && d) c[d] = "translate3d(" + p + "px, " + g + "px, 0)", c[f] = 0, c[h] = 0, c.willChange = "transform";else {
            var m = "bottom" === f ? -1 : 1,
                v = "right" === h ? -1 : 1;
            c[f] = g * m, c[h] = p * v, c.willChange = f + ", " + h;
          }
          var _ = {
            "x-placement": t.placement
          };
          return t.attributes = Mt({}, _, t.attributes), t.styles = Mt({}, c, t.styles), t.arrowStyles = Mt({}, t.offsets.arrow, t.arrowStyles), t;
        },
        gpuAcceleration: !0,
        x: "bottom",
        y: "right"
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function fn(t) {
          return ae(t.instance.popper, t.styles), function (t, e) {
            Object.keys(e).forEach(function (n) {
              !1 !== e[n] ? t.setAttribute(n, e[n]) : t.removeAttribute(n);
            });
          }(t.instance.popper, t.attributes), t.arrowElement && Object.keys(t.arrowStyles).length && ae(t.arrowElement, t.arrowStyles), t;
        },
        onLoad: function onLoad(t, e, n, i, o) {
          var r = Yt(o, e, t, n.positionFixed),
              s = Kt(n.placement, r, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
          return e.setAttribute("x-placement", s), ae(e, {
            position: n.positionFixed ? "fixed" : "absolute"
          }), n;
        },
        gpuAcceleration: void 0
      }
    }
  },
      _e = function () {
    function t(e, n) {
      var i = this,
          o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      It(this, t), this.scheduleUpdate = function () {
        return requestAnimationFrame(i.update);
      }, this.update = mt(this.update.bind(this)), this.options = Mt({}, t.Defaults, o), this.state = {
        isDestroyed: !1,
        isCreated: !1,
        scrollParents: []
      }, this.reference = e && e.jquery ? e[0] : e, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(Mt({}, t.Defaults.modifiers, o.modifiers)).forEach(function (e) {
        i.options.modifiers[e] = Mt({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {});
      }), this.modifiers = Object.keys(this.options.modifiers).map(function (t) {
        return Mt({
          name: t
        }, i.options.modifiers[t]);
      }).sort(function (t, e) {
        return t.order - e.order;
      }), this.modifiers.forEach(function (t) {
        t.enabled && vt(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state);
      }), this.update();
      var r = this.options.eventsEnabled;
      r && this.enableEventListeners(), this.state.eventsEnabled = r;
    }

    return jt(t, [{
      key: "update",
      value: function value() {
        return Zt.call(this);
      }
    }, {
      key: "destroy",
      value: function value() {
        return ee.call(this);
      }
    }, {
      key: "enableEventListeners",
      value: function value() {
        return oe.call(this);
      }
    }, {
      key: "disableEventListeners",
      value: function value() {
        return re.call(this);
      }
    }]), t;
  }();

  _e.Utils = ("undefined" != typeof window ? window : global).PopperUtils, _e.placements = ue, _e.Defaults = ve;

  var be = "dropdown",
      ye = new RegExp("ArrowUp|ArrowDown|Escape"),
      we = {
    offset: 0,
    flip: !0,
    boundary: "scrollParent",
    reference: "toggle",
    display: "dynamic",
    popperConfig: null
  },
      Ee = {
    offset: "(number|string|function)",
    flip: "boolean",
    boundary: "(string|element)",
    reference: "(string|element)",
    display: "string",
    popperConfig: "(null|object)"
  },
      Te = function () {
    function t(t, e) {
      this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners(), w(t, "bs.dropdown", this);
    }

    var i = t.prototype;
    return i.toggle = function () {
      if (!this._element.disabled && !this._element.classList.contains("disabled")) {
        var e = this._element.classList.contains("show");

        t.clearMenus(), e || this.show();
      }
    }, i.show = function () {
      if (!(this._element.disabled || this._element.classList.contains("disabled") || this._menu.classList.contains("show"))) {
        var e = t.getParentFromElement(this._element),
            n = {
          relatedTarget: this._element
        };

        if (!U.trigger(this._element, "show.bs.dropdown", n).defaultPrevented) {
          if (!this._inNavbar) {
            if (void 0 === _e) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org)");
            var i = this._element;
            "parent" === this._config.reference ? i = e : d(this._config.reference) && (i = this._config.reference, void 0 !== this._config.reference.jquery && (i = this._config.reference[0])), "scrollParent" !== this._config.boundary && e.classList.add("position-static"), this._popper = new _e(i, this._menu, this._getPopperConfig());
          }

          var o;
          if ("ontouchstart" in document.documentElement && !e.closest(".navbar-nav")) (o = []).concat.apply(o, document.body.children).forEach(function (t) {
            return U.on(t, "mouseover", null, function () {});
          });
          this._element.focus(), this._element.setAttribute("aria-expanded", !0), Z.toggleClass(this._menu, "show"), Z.toggleClass(this._element, "show"), U.trigger(e, "shown.bs.dropdown", n);
        }
      }
    }, i.hide = function () {
      if (!this._element.disabled && !this._element.classList.contains("disabled") && this._menu.classList.contains("show")) {
        var e = t.getParentFromElement(this._element),
            n = {
          relatedTarget: this._element
        };
        U.trigger(e, "hide.bs.dropdown", n).defaultPrevented || (this._popper && this._popper.destroy(), Z.toggleClass(this._menu, "show"), Z.toggleClass(this._element, "show"), U.trigger(e, "hidden.bs.dropdown", n));
      }
    }, i.dispose = function () {
      T(this._element, "bs.dropdown"), U.off(this._element, ".bs.dropdown"), this._element = null, this._menu = null, this._popper && (this._popper.destroy(), this._popper = null);
    }, i.update = function () {
      this._inNavbar = this._detectNavbar(), this._popper && this._popper.scheduleUpdate();
    }, i._addEventListeners = function () {
      var t = this;
      U.on(this._element, "click.bs.dropdown", function (e) {
        e.preventDefault(), e.stopPropagation(), t.toggle();
      });
    }, i._getConfig = function (t) {
      return t = n({}, this.constructor.Default, Z.getDataAttributes(this._element), t), g(be, t, this.constructor.DefaultType), t;
    }, i._getMenuElement = function () {
      return J.next(this._element, ".dropdown-menu")[0];
    }, i._getPlacement = function () {
      var t = this._element.parentNode,
          e = "bottom-start";
      return t.classList.contains("dropup") ? (e = "top-start", this._menu.classList.contains("dropdown-menu-right") && (e = "top-end")) : t.classList.contains("dropright") ? e = "right-start" : t.classList.contains("dropleft") ? e = "left-start" : this._menu.classList.contains("dropdown-menu-right") && (e = "bottom-end"), e;
    }, i._detectNavbar = function () {
      return Boolean(this._element.closest(".navbar"));
    }, i._getOffset = function () {
      var t = this,
          e = {};
      return "function" == typeof this._config.offset ? e.fn = function (e) {
        return e.offsets = n({}, e.offsets, t._config.offset(e.offsets, t._element) || {}), e;
      } : e.offset = this._config.offset, e;
    }, i._getPopperConfig = function () {
      var t = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      };
      return "static" === this._config.display && (t.modifiers.applyStyle = {
        enabled: !1
      }), n({}, t, this._config.popperConfig);
    }, t.dropdownInterface = function (e, n) {
      var i = E(e, "bs.dropdown");

      if (i || (i = new t(e, "object" == _typeof(n) ? n : null)), "string" == typeof n) {
        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
        i[n]();
      }
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        t.dropdownInterface(this, e);
      });
    }, t.clearMenus = function (e) {
      if (!e || 2 !== e.button && ("keyup" !== e.type || "Tab" === e.key)) for (var n = J.find('[data-toggle="dropdown"]'), i = 0, o = n.length; i < o; i++) {
        var r = t.getParentFromElement(n[i]),
            s = E(n[i], "bs.dropdown"),
            a = {
          relatedTarget: n[i]
        };

        if (e && "click" === e.type && (a.clickEvent = e), s) {
          var l = s._menu;
          if (n[i].classList.contains("show")) if (!(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && "Tab" === e.key) && l.contains(e.target))) if (!U.trigger(r, "hide.bs.dropdown", a).defaultPrevented) {
            var c;
            if ("ontouchstart" in document.documentElement) (c = []).concat.apply(c, document.body.children).forEach(function (t) {
              return U.off(t, "mouseover", null, function () {});
            });
            n[i].setAttribute("aria-expanded", "false"), s._popper && s._popper.destroy(), l.classList.remove("show"), n[i].classList.remove("show"), U.trigger(r, "hidden.bs.dropdown", a);
          }
        }
      }
    }, t.getParentFromElement = function (t) {
      return u(t) || t.parentNode;
    }, t.dataApiKeydownHandler = function (e) {
      if (!(/input|textarea/i.test(e.target.tagName) ? "Space" === e.key || "Escape" !== e.key && ("ArrowDown" !== e.key && "ArrowUp" !== e.key || e.target.closest(".dropdown-menu")) : !ye.test(e.key)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !this.classList.contains("disabled"))) {
        var n = t.getParentFromElement(this),
            i = this.classList.contains("show");
        if ("Escape" === e.key) return (this.matches('[data-toggle="dropdown"]') ? this : J.prev(this, '[data-toggle="dropdown"]')[0]).focus(), void t.clearMenus();

        if (i && "Space" !== e.key) {
          var o = J.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", n).filter(m);

          if (o.length) {
            var r = o.indexOf(e.target);
            "ArrowUp" === e.key && r > 0 && r--, "ArrowDown" === e.key && r < o.length - 1 && r++, o[r = -1 === r ? 0 : r].focus();
          }
        } else t.clearMenus();
      }
    }, t.getInstance = function (t) {
      return E(t, "bs.dropdown");
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return we;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Ee;
      }
    }]), t;
  }();

  U.on(document, "keydown.bs.dropdown.data-api", '[data-toggle="dropdown"]', Te.dataApiKeydownHandler), U.on(document, "keydown.bs.dropdown.data-api", ".dropdown-menu", Te.dataApiKeydownHandler), U.on(document, "click.bs.dropdown.data-api", Te.clearMenus), U.on(document, "keyup.bs.dropdown.data-api", Te.clearMenus), U.on(document, "click.bs.dropdown.data-api", '[data-toggle="dropdown"]', function (t) {
    t.preventDefault(), t.stopPropagation(), Te.dropdownInterface(this, "toggle");
  }), U.on(document, "click.bs.dropdown.data-api", ".dropdown form", function (t) {
    return t.stopPropagation();
  });
  var Le = b();

  if (Le) {
    var ke = Le.fn[be];
    Le.fn[be] = Te.jQueryInterface, Le.fn[be].Constructor = Te, Le.fn[be].noConflict = function () {
      return Le.fn[be] = ke, Te.jQueryInterface;
    };
  }

  var Ce = {
    backdrop: !0,
    keyboard: !0,
    focus: !0,
    show: !0
  },
      Ae = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    focus: "boolean",
    show: "boolean"
  },
      Oe = function () {
    function t(t, e) {
      this._config = this._getConfig(e), this._element = t, this._dialog = J.findOne(".modal-dialog", t), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0, w(t, "bs.modal", this);
    }

    var i = t.prototype;
    return i.toggle = function (t) {
      return this._isShown ? this.hide() : this.show(t);
    }, i.show = function (t) {
      var e = this;

      if (!this._isShown && !this._isTransitioning) {
        this._element.classList.contains("fade") && (this._isTransitioning = !0);
        var n = U.trigger(this._element, "show.bs.modal", {
          relatedTarget: t
        });
        this._isShown || n.defaultPrevented || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), U.on(this._element, "click.dismiss.bs.modal", '[data-dismiss="modal"]', function (t) {
          return e.hide(t);
        }), U.on(this._dialog, "mousedown.dismiss.bs.modal", function () {
          U.one(e._element, "mouseup.dismiss.bs.modal", function (t) {
            t.target === e._element && (e._ignoreBackdropClick = !0);
          });
        }), this._showBackdrop(function () {
          return e._showElement(t);
        }));
      }
    }, i.hide = function (t) {
      var e = this;

      if ((t && t.preventDefault(), this._isShown && !this._isTransitioning) && !U.trigger(this._element, "hide.bs.modal").defaultPrevented) {
        this._isShown = !1;

        var n = this._element.classList.contains("fade");

        if (n && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), U.off(document, "focusin.bs.modal"), this._element.classList.remove("show"), U.off(this._element, "click.dismiss.bs.modal"), U.off(this._dialog, "mousedown.dismiss.bs.modal"), n) {
          var i = f(this._element);
          U.one(this._element, "transitionend", function (t) {
            return e._hideModal(t);
          }), p(this._element, i);
        } else this._hideModal();
      }
    }, i.dispose = function () {
      [window, this._element, this._dialog].forEach(function (t) {
        return U.off(t, ".bs.modal");
      }), U.off(document, "focusin.bs.modal"), T(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null;
    }, i.handleUpdate = function () {
      this._adjustDialog();
    }, i._getConfig = function (t) {
      return t = n({}, Ce, t), g("modal", t, Ae), t;
    }, i._showElement = function (t) {
      var e = this,
          n = this._element.classList.contains("fade"),
          i = J.findOne(".modal-body", this._dialog);

      this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0, i && (i.scrollTop = 0), n && _(this._element), this._element.classList.add("show"), this._config.focus && this._enforceFocus();

      var o = function o() {
        e._config.focus && e._element.focus(), e._isTransitioning = !1, U.trigger(e._element, "shown.bs.modal", {
          relatedTarget: t
        });
      };

      if (n) {
        var r = f(this._dialog);
        U.one(this._dialog, "transitionend", o), p(this._dialog, r);
      } else o();
    }, i._enforceFocus = function () {
      var t = this;
      U.off(document, "focusin.bs.modal"), U.on(document, "focusin.bs.modal", function (e) {
        document === e.target || t._element === e.target || t._element.contains(e.target) || t._element.focus();
      });
    }, i._setEscapeEvent = function () {
      var t = this;
      this._isShown ? U.on(this._element, "keydown.dismiss.bs.modal", function (e) {
        t._config.keyboard && "Escape" === e.key ? (e.preventDefault(), t.hide()) : t._config.keyboard || "Escape" !== e.key || t._triggerBackdropTransition();
      }) : U.off(this._element, "keydown.dismiss.bs.modal");
    }, i._setResizeEvent = function () {
      var t = this;
      this._isShown ? U.on(window, "resize.bs.modal", function () {
        return t._adjustDialog();
      }) : U.off(window, "resize.bs.modal");
    }, i._hideModal = function () {
      var t = this;
      this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(function () {
        document.body.classList.remove("modal-open"), t._resetAdjustments(), t._resetScrollbar(), U.trigger(t._element, "hidden.bs.modal");
      });
    }, i._removeBackdrop = function () {
      this._backdrop.parentNode.removeChild(this._backdrop), this._backdrop = null;
    }, i._showBackdrop = function (t) {
      var e = this,
          n = this._element.classList.contains("fade") ? "fade" : "";

      if (this._isShown && this._config.backdrop) {
        if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && this._backdrop.classList.add(n), document.body.appendChild(this._backdrop), U.on(this._element, "click.dismiss.bs.modal", function (t) {
          e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && e._triggerBackdropTransition();
        }), n && _(this._backdrop), this._backdrop.classList.add("show"), !n) return void t();
        var i = f(this._backdrop);
        U.one(this._backdrop, "transitionend", t), p(this._backdrop, i);
      } else if (!this._isShown && this._backdrop) {
        this._backdrop.classList.remove("show");

        var o = function o() {
          e._removeBackdrop(), t();
        };

        if (this._element.classList.contains("fade")) {
          var r = f(this._backdrop);
          U.one(this._backdrop, "transitionend", o), p(this._backdrop, r);
        } else o();
      } else t();
    }, i._triggerBackdropTransition = function () {
      var t = this;

      if ("static" === this._config.backdrop) {
        if (U.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
        var e = this._element.scrollHeight > document.documentElement.clientHeight;
        e || (this._element.style.overflowY = "hidden"), this._element.classList.add("modal-static");
        var n = f(this._dialog);
        U.off(this._element, "transitionend"), U.one(this._element, "transitionend", function () {
          t._element.classList.remove("modal-static"), e || (U.one(t._element, "transitionend", function () {
            t._element.style.overflowY = "";
          }), p(t._element, n));
        }), p(this._element, n), this._element.focus();
      } else this.hide();
    }, i._adjustDialog = function () {
      var t = this._element.scrollHeight > document.documentElement.clientHeight;
      !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px");
    }, i._resetAdjustments = function () {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
    }, i._checkScrollbar = function () {
      var t = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(t.left + t.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
    }, i._setScrollbar = function () {
      var t = this;

      if (this._isBodyOverflowing) {
        J.find(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top").forEach(function (e) {
          var n = e.style.paddingRight,
              i = window.getComputedStyle(e)["padding-right"];
          Z.setDataAttribute(e, "padding-right", n), e.style.paddingRight = parseFloat(i) + t._scrollbarWidth + "px";
        }), J.find(".sticky-top").forEach(function (e) {
          var n = e.style.marginRight,
              i = window.getComputedStyle(e)["margin-right"];
          Z.setDataAttribute(e, "margin-right", n), e.style.marginRight = parseFloat(i) - t._scrollbarWidth + "px";
        });
        var e = document.body.style.paddingRight,
            n = window.getComputedStyle(document.body)["padding-right"];
        Z.setDataAttribute(document.body, "padding-right", e), document.body.style.paddingRight = parseFloat(n) + this._scrollbarWidth + "px";
      }

      document.body.classList.add("modal-open");
    }, i._resetScrollbar = function () {
      J.find(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top").forEach(function (t) {
        var e = Z.getDataAttribute(t, "padding-right");
        void 0 !== e && (Z.removeDataAttribute(t, "padding-right"), t.style.paddingRight = e);
      }), J.find(".sticky-top").forEach(function (t) {
        var e = Z.getDataAttribute(t, "margin-right");
        void 0 !== e && (Z.removeDataAttribute(t, "margin-right"), t.style.marginRight = e);
      });
      var t = Z.getDataAttribute(document.body, "padding-right");
      void 0 === t ? document.body.style.paddingRight = "" : (Z.removeDataAttribute(document.body, "padding-right"), document.body.style.paddingRight = t);
    }, i._getScrollbarWidth = function () {
      var t = document.createElement("div");
      t.className = "modal-scrollbar-measure", document.body.appendChild(t);
      var e = t.getBoundingClientRect().width - t.clientWidth;
      return document.body.removeChild(t), e;
    }, t.jQueryInterface = function (e, i) {
      return this.each(function () {
        var o = E(this, "bs.modal"),
            r = n({}, Ce, Z.getDataAttributes(this), "object" == _typeof(e) && e ? e : {});

        if (o || (o = new t(this, r)), "string" == typeof e) {
          if (void 0 === o[e]) throw new TypeError('No method named "' + e + '"');
          o[e](i);
        } else r.show && o.show(i);
      });
    }, t.getInstance = function (t) {
      return E(t, "bs.modal");
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return Ce;
      }
    }]), t;
  }();

  U.on(document, "click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
    var e = this,
        i = u(this);
    "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault(), U.one(i, "show.bs.modal", function (t) {
      t.defaultPrevented || U.one(i, "hidden.bs.modal", function () {
        m(e) && e.focus();
      });
    });
    var o = E(i, "bs.modal");

    if (!o) {
      var r = n({}, Z.getDataAttributes(i), Z.getDataAttributes(this));
      o = new Oe(i, r);
    }

    o.show(this);
  });
  var Se = b();

  if (Se) {
    var De = Se.fn.modal;
    Se.fn.modal = Oe.jQueryInterface, Se.fn.modal.Constructor = Oe, Se.fn.modal.noConflict = function () {
      return Se.fn.modal = De, Oe.jQueryInterface;
    };
  }

  var xe = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
      Ne = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
      Ie = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
      je = {
    "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };

  function Pe(t, e, n) {
    var i;
    if (!t.length) return t;
    if (n && "function" == typeof n) return n(t);

    for (var o = new window.DOMParser().parseFromString(t, "text/html"), r = Object.keys(e), s = (i = []).concat.apply(i, o.body.querySelectorAll("*")), a = function a(t, n) {
      var i,
          o = s[t],
          a = o.nodeName.toLowerCase();
      if (-1 === r.indexOf(a)) return o.parentNode.removeChild(o), "continue";
      var l = (i = []).concat.apply(i, o.attributes),
          c = [].concat(e["*"] || [], e[a] || []);
      l.forEach(function (t) {
        (function (t, e) {
          var n = t.nodeName.toLowerCase();
          if (-1 !== e.indexOf(n)) return -1 === xe.indexOf(n) || Boolean(t.nodeValue.match(Ne) || t.nodeValue.match(Ie));

          for (var i = e.filter(function (t) {
            return t instanceof RegExp;
          }), o = 0, r = i.length; o < r; o++) {
            if (n.match(i[o])) return !0;
          }

          return !1;
        })(t, c) || o.removeAttribute(t.nodeName);
      });
    }, l = 0, c = s.length; l < c; l++) {
      a(l);
    }

    return o.body.innerHTML;
  }

  var Me = "tooltip",
      He = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
      Be = ["sanitize", "allowList", "sanitizeFn"],
      Re = {
    animation: "boolean",
    template: "string",
    title: "(string|element|function)",
    trigger: "string",
    delay: "(number|object)",
    html: "boolean",
    selector: "(string|boolean)",
    placement: "(string|function)",
    offset: "(number|string|function)",
    container: "(string|element|boolean)",
    fallbackPlacement: "(string|array)",
    boundary: "(string|element)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    allowList: "object",
    popperConfig: "(null|object)"
  },
      Fe = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: "right",
    BOTTOM: "bottom",
    LEFT: "left"
  },
      We = {
    animation: !0,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    selector: !1,
    placement: "top",
    offset: 0,
    container: !1,
    fallbackPlacement: "flip",
    boundary: "scrollParent",
    sanitize: !0,
    sanitizeFn: null,
    allowList: je,
    popperConfig: null
  },
      Ue = {
    HIDE: "hide.bs.tooltip",
    HIDDEN: "hidden.bs.tooltip",
    SHOW: "show.bs.tooltip",
    SHOWN: "shown.bs.tooltip",
    INSERTED: "inserted.bs.tooltip",
    CLICK: "click.bs.tooltip",
    FOCUSIN: "focusin.bs.tooltip",
    FOCUSOUT: "focusout.bs.tooltip",
    MOUSEENTER: "mouseenter.bs.tooltip",
    MOUSELEAVE: "mouseleave.bs.tooltip"
  },
      Qe = function () {
    function t(t, e) {
      if (void 0 === _e) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org)");
      this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners(), w(t, this.constructor.DATA_KEY, this);
    }

    var i = t.prototype;
    return i.enable = function () {
      this._isEnabled = !0;
    }, i.disable = function () {
      this._isEnabled = !1;
    }, i.toggleEnabled = function () {
      this._isEnabled = !this._isEnabled;
    }, i.toggle = function (t) {
      if (this._isEnabled) if (t) {
        var e = this.constructor.DATA_KEY,
            n = E(t.delegateTarget, e);
        n || (n = new this.constructor(t.delegateTarget, this._getDelegateConfig()), w(t.delegateTarget, e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n);
      } else {
        if (this.getTipElement().classList.contains("show")) return void this._leave(null, this);

        this._enter(null, this);
      }
    }, i.dispose = function () {
      clearTimeout(this._timeout), T(this.element, this.constructor.DATA_KEY), U.off(this.element, this.constructor.EVENT_KEY), U.off(this.element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this.tip && this.tip.parentNode.removeChild(this.tip), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
    }, i.show = function () {
      var t = this;
      if ("none" === this.element.style.display) throw new Error("Please use show on visible elements");

      if (this.isWithContent() && this._isEnabled) {
        var e = U.trigger(this.element, this.constructor.Event.SHOW),
            n = function t(e) {
          if (!document.documentElement.attachShadow) return null;

          if ("function" == typeof e.getRootNode) {
            var n = e.getRootNode();
            return n instanceof ShadowRoot ? n : null;
          }

          return e instanceof ShadowRoot ? e : e.parentNode ? t(e.parentNode) : null;
        }(this.element),
            i = null === n ? this.element.ownerDocument.documentElement.contains(this.element) : n.contains(this.element);

        if (e.defaultPrevented || !i) return;
        var o = this.getTipElement(),
            r = a(this.constructor.NAME);
        o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && o.classList.add("fade");

        var s = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
            l = this._getAttachment(s);

        this._addAttachmentClass(l);

        var c,
            u = this._getContainer();

        if (w(o, this.constructor.DATA_KEY, this), this.element.ownerDocument.documentElement.contains(this.tip) || u.appendChild(o), U.trigger(this.element, this.constructor.Event.INSERTED), this._popper = new _e(this.element, o, this._getPopperConfig(l)), o.classList.add("show"), "ontouchstart" in document.documentElement) (c = []).concat.apply(c, document.body.children).forEach(function (t) {
          U.on(t, "mouseover", function () {});
        });

        var h = function h() {
          t.config.animation && t._fixTransition();
          var e = t._hoverState;
          t._hoverState = null, U.trigger(t.element, t.constructor.Event.SHOWN), "out" === e && t._leave(null, t);
        };

        if (this.tip.classList.contains("fade")) {
          var d = f(this.tip);
          U.one(this.tip, "transitionend", h), p(this.tip, d);
        } else h();
      }
    }, i.hide = function () {
      var t = this;

      if (this._popper) {
        var e = this.getTipElement(),
            n = function n() {
          "show" !== t._hoverState && e.parentNode && e.parentNode.removeChild(e), t._cleanTipClass(), t.element.removeAttribute("aria-describedby"), U.trigger(t.element, t.constructor.Event.HIDDEN), t._popper.destroy();
        };

        if (!U.trigger(this.element, this.constructor.Event.HIDE).defaultPrevented) {
          var i;
          if (e.classList.remove("show"), "ontouchstart" in document.documentElement) (i = []).concat.apply(i, document.body.children).forEach(function (t) {
            return U.off(t, "mouseover", v);
          });

          if (this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, this.tip.classList.contains("fade")) {
            var o = f(e);
            U.one(e, "transitionend", n), p(e, o);
          } else n();

          this._hoverState = "";
        }
      }
    }, i.update = function () {
      null !== this._popper && this._popper.scheduleUpdate();
    }, i.isWithContent = function () {
      return Boolean(this.getTitle());
    }, i.getTipElement = function () {
      if (this.tip) return this.tip;
      var t = document.createElement("div");
      return t.innerHTML = this.config.template, this.tip = t.children[0], this.tip;
    }, i.setContent = function () {
      var t = this.getTipElement();
      this.setElementContent(J.findOne(".tooltip-inner", t), this.getTitle()), t.classList.remove("fade", "show");
    }, i.setElementContent = function (t, e) {
      if (null !== t) return "object" == _typeof(e) && d(e) ? (e.jquery && (e = e[0]), void (this.config.html ? e.parentNode !== t && (t.innerHTML = "", t.appendChild(e)) : t.textContent = e.textContent)) : void (this.config.html ? (this.config.sanitize && (e = Pe(e, this.config.allowList, this.config.sanitizeFn)), t.innerHTML = e) : t.textContent = e);
    }, i.getTitle = function () {
      var t = this.element.getAttribute("data-original-title");
      return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t;
    }, i._getPopperConfig = function (t) {
      var e = this;
      return n({}, {
        placement: t,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: "." + this.constructor.NAME + "-arrow"
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(t) {
          t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t);
        },
        onUpdate: function onUpdate(t) {
          return e._handlePopperPlacementChange(t);
        }
      }, this.config.popperConfig);
    }, i._addAttachmentClass = function (t) {
      this.getTipElement().classList.add("bs-tooltip-" + t);
    }, i._getOffset = function () {
      var t = this,
          e = {};
      return "function" == typeof this.config.offset ? e.fn = function (e) {
        return e.offsets = n({}, e.offsets, t.config.offset(e.offsets, t.element) || {}), e;
      } : e.offset = this.config.offset, e;
    }, i._getContainer = function () {
      return !1 === this.config.container ? document.body : d(this.config.container) ? this.config.container : J.findOne(this.config.container);
    }, i._getAttachment = function (t) {
      return Fe[t.toUpperCase()];
    }, i._setListeners = function () {
      var t = this;
      this.config.trigger.split(" ").forEach(function (e) {
        if ("click" === e) U.on(t.element, t.constructor.Event.CLICK, t.config.selector, function (e) {
          return t.toggle(e);
        });else if ("manual" !== e) {
          var n = "hover" === e ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
              i = "hover" === e ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
          U.on(t.element, n, t.config.selector, function (e) {
            return t._enter(e);
          }), U.on(t.element, i, t.config.selector, function (e) {
            return t._leave(e);
          });
        }
      }), this._hideModalHandler = function () {
        t.element && t.hide();
      }, U.on(this.element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = n({}, this.config, {
        trigger: "manual",
        selector: ""
      }) : this._fixTitle();
    }, i._fixTitle = function () {
      var t = _typeof(this.element.getAttribute("data-original-title"));

      (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
    }, i._enter = function (t, e) {
      var n = this.constructor.DATA_KEY;
      (e = e || E(t.delegateTarget, n)) || (e = new this.constructor(t.delegateTarget, this._getDelegateConfig()), w(t.delegateTarget, n, e)), t && (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0), e.getTipElement().classList.contains("show") || "show" === e._hoverState ? e._hoverState = "show" : (clearTimeout(e._timeout), e._hoverState = "show", e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function () {
        "show" === e._hoverState && e.show();
      }, e.config.delay.show) : e.show());
    }, i._leave = function (t, e) {
      var n = this.constructor.DATA_KEY;
      (e = e || E(t.delegateTarget, n)) || (e = new this.constructor(t.delegateTarget, this._getDelegateConfig()), w(t.delegateTarget, n, e)), t && (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = "out", e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function () {
        "out" === e._hoverState && e.hide();
      }, e.config.delay.hide) : e.hide());
    }, i._isWithActiveTrigger = function () {
      for (var t in this._activeTrigger) {
        if (this._activeTrigger[t]) return !0;
      }

      return !1;
    }, i._getConfig = function (t) {
      var e = Z.getDataAttributes(this.element);
      return Object.keys(e).forEach(function (t) {
        -1 !== Be.indexOf(t) && delete e[t];
      }), t && "object" == _typeof(t.container) && t.container.jquery && (t.container = t.container[0]), "number" == typeof (t = n({}, this.constructor.Default, e, "object" == _typeof(t) && t ? t : {})).delay && (t.delay = {
        show: t.delay,
        hide: t.delay
      }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), g(Me, t, this.constructor.DefaultType), t.sanitize && (t.template = Pe(t.template, t.allowList, t.sanitizeFn)), t;
    }, i._getDelegateConfig = function () {
      var t = {};
      if (this.config) for (var e in this.config) {
        this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
      }
      return t;
    }, i._cleanTipClass = function () {
      var t = this.getTipElement(),
          e = t.getAttribute("class").match(He);
      null !== e && e.length > 0 && e.map(function (t) {
        return t.trim();
      }).forEach(function (e) {
        return t.classList.remove(e);
      });
    }, i._handlePopperPlacementChange = function (t) {
      this.tip = t.instance.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(t.placement));
    }, i._fixTransition = function () {
      var t = this.getTipElement(),
          e = this.config.animation;
      null === t.getAttribute("x-placement") && (t.classList.remove("fade"), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e);
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        var n = E(this, "bs.tooltip"),
            i = "object" == _typeof(e) && e;

        if ((n || !/dispose|hide/.test(e)) && (n || (n = new t(this, i)), "string" == typeof e)) {
          if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
          n[e]();
        }
      });
    }, t.getInstance = function (t) {
      return E(t, "bs.tooltip");
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return We;
      }
    }, {
      key: "NAME",
      get: function get() {
        return Me;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.tooltip";
      }
    }, {
      key: "Event",
      get: function get() {
        return Ue;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".bs.tooltip";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Re;
      }
    }]), t;
  }(),
      Ve = b();

  if (Ve) {
    var Ke = Ve.fn[Me];
    Ve.fn[Me] = Qe.jQueryInterface, Ve.fn[Me].Constructor = Qe, Ve.fn[Me].noConflict = function () {
      return Ve.fn[Me] = Ke, Qe.jQueryInterface;
    };
  }

  var Ye = "popover",
      qe = new RegExp("(^|\\s)bs-popover\\S+", "g"),
      ze = n({}, Qe.Default, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }),
      Xe = n({}, Qe.DefaultType, {
    content: "(string|element|function)"
  }),
      Ge = {
    HIDE: "hide.bs.popover",
    HIDDEN: "hidden.bs.popover",
    SHOW: "show.bs.popover",
    SHOWN: "shown.bs.popover",
    INSERTED: "inserted.bs.popover",
    CLICK: "click.bs.popover",
    FOCUSIN: "focusin.bs.popover",
    FOCUSOUT: "focusout.bs.popover",
    MOUSEENTER: "mouseenter.bs.popover",
    MOUSELEAVE: "mouseleave.bs.popover"
  },
      $e = function (t) {
    var n, i;

    function o() {
      return t.apply(this, arguments) || this;
    }

    i = t, (n = o).prototype = Object.create(i.prototype), n.prototype.constructor = n, n.__proto__ = i;
    var r = o.prototype;
    return r.isWithContent = function () {
      return this.getTitle() || this._getContent();
    }, r.setContent = function () {
      var t = this.getTipElement();
      this.setElementContent(J.findOne(".popover-header", t), this.getTitle());

      var e = this._getContent();

      "function" == typeof e && (e = e.call(this.element)), this.setElementContent(J.findOne(".popover-body", t), e), t.classList.remove("fade", "show");
    }, r._addAttachmentClass = function (t) {
      this.getTipElement().classList.add("bs-popover-" + t);
    }, r._getContent = function () {
      return this.element.getAttribute("data-content") || this.config.content;
    }, r._cleanTipClass = function () {
      var t = this.getTipElement(),
          e = t.getAttribute("class").match(qe);
      null !== e && e.length > 0 && e.map(function (t) {
        return t.trim();
      }).forEach(function (e) {
        return t.classList.remove(e);
      });
    }, o.jQueryInterface = function (t) {
      return this.each(function () {
        var e = E(this, "bs.popover"),
            n = "object" == _typeof(t) ? t : null;

        if ((e || !/dispose|hide/.test(t)) && (e || (e = new o(this, n), w(this, "bs.popover", e)), "string" == typeof t)) {
          if (void 0 === e[t]) throw new TypeError('No method named "' + t + '"');
          e[t]();
        }
      });
    }, o.getInstance = function (t) {
      return E(t, "bs.popover");
    }, e(o, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return ze;
      }
    }, {
      key: "NAME",
      get: function get() {
        return Ye;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.popover";
      }
    }, {
      key: "Event",
      get: function get() {
        return Ge;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".bs.popover";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Xe;
      }
    }]), o;
  }(Qe),
      Ze = b();

  if (Ze) {
    var Je = Ze.fn[Ye];
    Ze.fn[Ye] = $e.jQueryInterface, Ze.fn[Ye].Constructor = $e, Ze.fn[Ye].noConflict = function () {
      return Ze.fn[Ye] = Je, $e.jQueryInterface;
    };
  }

  var tn = "scrollspy",
      en = {
    offset: 10,
    method: "auto",
    target: ""
  },
      nn = {
    offset: "number",
    method: "string",
    target: "(string|element)"
  },
      on = function () {
    function t(t, e) {
      var n = this;
      this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " .nav-link, " + this._config.target + " .list-group-item, " + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, U.on(this._scrollElement, "scroll.bs.scrollspy", function (t) {
        return n._process(t);
      }), this.refresh(), this._process(), w(t, "bs.scrollspy", this);
    }

    var i = t.prototype;
    return i.refresh = function () {
      var t = this,
          e = this._scrollElement === this._scrollElement.window ? "offset" : "position",
          n = "auto" === this._config.method ? e : this._config.method,
          i = "position" === n ? this._getScrollTop() : 0;
      this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), J.find(this._selector).map(function (t) {
        var e = c(t),
            o = e ? J.findOne(e) : null;

        if (o) {
          var r = o.getBoundingClientRect();
          if (r.width || r.height) return [Z[n](o).top + i, e];
        }

        return null;
      }).filter(function (t) {
        return t;
      }).sort(function (t, e) {
        return t[0] - e[0];
      }).forEach(function (e) {
        t._offsets.push(e[0]), t._targets.push(e[1]);
      });
    }, i.dispose = function () {
      T(this._element, "bs.scrollspy"), U.off(this._scrollElement, ".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
    }, i._getConfig = function (t) {
      if ("string" != typeof (t = n({}, en, "object" == _typeof(t) && t ? t : {})).target && d(t.target)) {
        var e = t.target.id;
        e || (e = a(tn), t.target.id = e), t.target = "#" + e;
      }

      return g(tn, t, nn), t;
    }, i._getScrollTop = function () {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }, i._getScrollHeight = function () {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }, i._getOffsetHeight = function () {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }, i._process = function () {
      var t = this._getScrollTop() + this._config.offset,
          e = this._getScrollHeight(),
          n = this._config.offset + e - this._getOffsetHeight();

      if (this._scrollHeight !== e && this.refresh(), t >= n) {
        var i = this._targets[this._targets.length - 1];
        this._activeTarget !== i && this._activate(i);
      } else {
        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();

        for (var o = this._offsets.length; o--;) {
          this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o]);
        }
      }
    }, i._activate = function (t) {
      this._activeTarget = t, this._clear();

      var e = this._selector.split(",").map(function (e) {
        return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]';
      }),
          n = J.findOne(e.join(","));

      n.classList.contains("dropdown-item") ? (J.findOne(".dropdown-toggle", n.closest(".dropdown")).classList.add("active"), n.classList.add("active")) : (n.classList.add("active"), J.parents(n, ".nav, .list-group").forEach(function (t) {
        J.prev(t, ".nav-link, .list-group-item").forEach(function (t) {
          return t.classList.add("active");
        }), J.prev(t, ".nav-item").forEach(function (t) {
          J.children(t, ".nav-link").forEach(function (t) {
            return t.classList.add("active");
          });
        });
      })), U.trigger(this._scrollElement, "activate.bs.scrollspy", {
        relatedTarget: t
      });
    }, i._clear = function () {
      J.find(this._selector).filter(function (t) {
        return t.classList.contains("active");
      }).forEach(function (t) {
        return t.classList.remove("active");
      });
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        var n = E(this, "bs.scrollspy");

        if (n || (n = new t(this, "object" == _typeof(e) && e)), "string" == typeof e) {
          if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
          n[e]();
        }
      });
    }, t.getInstance = function (t) {
      return E(t, "bs.scrollspy");
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return en;
      }
    }]), t;
  }();

  U.on(window, "load.bs.scrollspy.data-api", function () {
    J.find('[data-spy="scroll"]').forEach(function (t) {
      return new on(t, Z.getDataAttributes(t));
    });
  });
  var rn = b();

  if (rn) {
    var sn = rn.fn[tn];
    rn.fn[tn] = on.jQueryInterface, rn.fn[tn].Constructor = on, rn.fn[tn].noConflict = function () {
      return rn.fn[tn] = sn, on.jQueryInterface;
    };
  }

  var an = function () {
    function t(t) {
      this._element = t, w(this._element, "bs.tab", this);
    }

    var n = t.prototype;
    return n.show = function () {
      var t = this;

      if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains("active") || this._element.classList.contains("disabled"))) {
        var e,
            n = u(this._element),
            i = this._element.closest(".nav, .list-group");

        if (i) {
          var o = "UL" === i.nodeName || "OL" === i.nodeName ? ":scope > li > .active" : ".active";
          e = (e = J.find(o, i))[e.length - 1];
        }

        var r = null;

        if (e && (r = U.trigger(e, "hide.bs.tab", {
          relatedTarget: this._element
        })), !(U.trigger(this._element, "show.bs.tab", {
          relatedTarget: e
        }).defaultPrevented || null !== r && r.defaultPrevented)) {
          this._activate(this._element, i);

          var s = function s() {
            U.trigger(e, "hidden.bs.tab", {
              relatedTarget: t._element
            }), U.trigger(t._element, "shown.bs.tab", {
              relatedTarget: e
            });
          };

          n ? this._activate(n, n.parentNode, s) : s();
        }
      }
    }, n.dispose = function () {
      T(this._element, "bs.tab"), this._element = null;
    }, n._activate = function (t, e, n) {
      var i = this,
          o = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? J.children(e, ".active") : J.find(":scope > li > .active", e))[0],
          r = n && o && o.classList.contains("fade"),
          s = function s() {
        return i._transitionComplete(t, o, n);
      };

      if (o && r) {
        var a = f(o);
        o.classList.remove("show"), U.one(o, "transitionend", s), p(o, a);
      } else s();
    }, n._transitionComplete = function (t, e, n) {
      if (e) {
        e.classList.remove("active");
        var i = J.findOne(":scope > .dropdown-menu .active", e.parentNode);
        i && i.classList.remove("active"), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1);
      }

      (t.classList.add("active"), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), _(t), t.classList.contains("fade") && t.classList.add("show"), t.parentNode && t.parentNode.classList.contains("dropdown-menu")) && (t.closest(".dropdown") && J.find(".dropdown-toggle").forEach(function (t) {
        return t.classList.add("active");
      }), t.setAttribute("aria-expanded", !0));
      n && n();
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        var n = E(this, "bs.tab") || new t(this);

        if ("string" == typeof e) {
          if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
          n[e]();
        }
      });
    }, t.getInstance = function (t) {
      return E(t, "bs.tab");
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }]), t;
  }();

  U.on(document, "click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (t) {
    t.preventDefault(), (E(this, "bs.tab") || new an(this)).show();
  });
  var ln = b();

  if (ln) {
    var cn = ln.fn.tab;
    ln.fn.tab = an.jQueryInterface, ln.fn.tab.Constructor = an, ln.fn.tab.noConflict = function () {
      return ln.fn.tab = cn, an.jQueryInterface;
    };
  }

  var un = {
    animation: "boolean",
    autohide: "boolean",
    delay: "number"
  },
      fn = {
    animation: !0,
    autohide: !0,
    delay: 5e3
  },
      hn = function () {
    function t(t, e) {
      this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners(), w(t, "bs.toast", this);
    }

    var i = t.prototype;
    return i.show = function () {
      var t = this;

      if (!U.trigger(this._element, "show.bs.toast").defaultPrevented) {
        this._clearTimeout(), this._config.animation && this._element.classList.add("fade");

        var e = function e() {
          t._element.classList.remove("showing"), t._element.classList.add("show"), U.trigger(t._element, "shown.bs.toast"), t._config.autohide && (t._timeout = setTimeout(function () {
            t.hide();
          }, t._config.delay));
        };

        if (this._element.classList.remove("hide"), _(this._element), this._element.classList.add("showing"), this._config.animation) {
          var n = f(this._element);
          U.one(this._element, "transitionend", e), p(this._element, n);
        } else e();
      }
    }, i.hide = function () {
      var t = this;

      if (this._element.classList.contains("show") && !U.trigger(this._element, "hide.bs.toast").defaultPrevented) {
        var e = function e() {
          t._element.classList.add("hide"), U.trigger(t._element, "hidden.bs.toast");
        };

        if (this._element.classList.remove("show"), this._config.animation) {
          var n = f(this._element);
          U.one(this._element, "transitionend", e), p(this._element, n);
        } else e();
      }
    }, i.dispose = function () {
      this._clearTimeout(), this._element.classList.contains("show") && this._element.classList.remove("show"), U.off(this._element, "click.dismiss.bs.toast"), T(this._element, "bs.toast"), this._element = null, this._config = null;
    }, i._getConfig = function (t) {
      return t = n({}, fn, Z.getDataAttributes(this._element), "object" == _typeof(t) && t ? t : {}), g("toast", t, this.constructor.DefaultType), t;
    }, i._setListeners = function () {
      var t = this;
      U.on(this._element, "click.dismiss.bs.toast", '[data-dismiss="toast"]', function () {
        return t.hide();
      });
    }, i._clearTimeout = function () {
      clearTimeout(this._timeout), this._timeout = null;
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        var n = E(this, "bs.toast");

        if (n || (n = new t(this, "object" == _typeof(e) && e)), "string" == typeof e) {
          if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
          n[e](this);
        }
      });
    }, t.getInstance = function (t) {
      return E(t, "bs.toast");
    }, e(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return un;
      }
    }, {
      key: "Default",
      get: function get() {
        return fn;
      }
    }]), t;
  }(),
      dn = b();

  if (dn) {
    var pn = dn.fn.toast;
    dn.fn.toast = hn.jQueryInterface, dn.fn.toast.Constructor = hn, dn.fn.toast.noConflict = function () {
      return dn.fn.toast = pn, hn.jQueryInterface;
    };
  }

  return {
    Alert: V,
    Button: q,
    Carousel: rt,
    Collapse: ft,
    Dropdown: Te,
    Modal: Oe,
    Popover: $e,
    ScrollSpy: on,
    Tab: an,
    Toast: hn,
    Tooltip: Qe
  };
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = exports.Toast = exports.Tab = exports.ScrollSpy = exports.Popover = exports.Modal = exports.Dropdown = exports.Collapse = exports.Carousel = exports.Button = exports.Alert = void 0;

var _popper = _interopRequireDefault(require("popper.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha2): util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


var MAX_UID = 1000000;
var MILLISECONDS_MULTIPLIER = 1000;
var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

var toType = function toType(obj) {
  if (obj === null || obj === undefined) {
    return "" + obj;
  }

  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
};
/**
 * --------------------------------------------------------------------------
 * Public Util Api
 * --------------------------------------------------------------------------
 */


var getUID = function getUID(prefix) {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));

  return prefix;
};

var getSelector = function getSelector(element) {
  var selector = element.getAttribute('data-target');

  if (!selector || selector === '#') {
    var hrefAttr = element.getAttribute('href');
    selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
  }

  return selector;
};

var getSelectorFromElement = function getSelectorFromElement(element) {
  var selector = getSelector(element);

  if (selector) {
    return document.querySelector(selector) ? selector : null;
  }

  return null;
};

var getElementFromSelector = function getElementFromSelector(element) {
  var selector = getSelector(element);
  return selector ? document.querySelector(selector) : null;
};

var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
  if (!element) {
    return 0;
  } // Get transition-duration of the element


  var _window$getComputedSt = window.getComputedStyle(element),
      transitionDuration = _window$getComputedSt.transitionDuration,
      transitionDelay = _window$getComputedSt.transitionDelay;

  var floatTransitionDuration = parseFloat(transitionDuration);
  var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  } // If multiple durations are defined, take the first


  transitionDuration = transitionDuration.split(',')[0];
  transitionDelay = transitionDelay.split(',')[0];
  return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};

var triggerTransitionEnd = function triggerTransitionEnd(element) {
  element.dispatchEvent(new Event(TRANSITION_END));
};

var isElement = function isElement(obj) {
  return (obj[0] || obj).nodeType;
};

var emulateTransitionEnd = function emulateTransitionEnd(element, duration) {
  var called = false;
  var durationPadding = 5;
  var emulatedDuration = duration + durationPadding;

  function listener() {
    called = true;
    element.removeEventListener(TRANSITION_END, listener);
  }

  element.addEventListener(TRANSITION_END, listener);
  setTimeout(function () {
    if (!called) {
      triggerTransitionEnd(element);
    }
  }, emulatedDuration);
};

var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
  Object.keys(configTypes).forEach(function (property) {
    var expectedTypes = configTypes[property];
    var value = config[property];
    var valueType = value && isElement(value) ? 'element' : toType(value);

    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
    }
  });
};

var isVisible = function isVisible(element) {
  if (!element) {
    return false;
  }

  if (element.style && element.parentNode && element.parentNode.style) {
    var elementStyle = getComputedStyle(element);
    var parentNodeStyle = getComputedStyle(element.parentNode);
    return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden';
  }

  return false;
};

var findShadowRoot = function findShadowRoot(element) {
  if (!document.documentElement.attachShadow) {
    return null;
  } // Can find the shadow root otherwise it'll return the document


  if (typeof element.getRootNode === 'function') {
    var root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }

  if (element instanceof ShadowRoot) {
    return element;
  } // when we don't find a shadow root


  if (!element.parentNode) {
    return null;
  }

  return findShadowRoot(element.parentNode);
};

var noop = function noop() {
  return function () {};
};

var reflow = function reflow(element) {
  return element.offsetHeight;
};

var getjQuery = function getjQuery() {
  var _window = window,
      jQuery = _window.jQuery;

  if (jQuery && !document.body.hasAttribute('data-no-jquery')) {
    return jQuery;
  }

  return null;
};
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha2): dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var mapData = function () {
  var storeData = {};
  var id = 1;
  return {
    set: function set(element, key, data) {
      if (typeof element.bsKey === 'undefined') {
        element.bsKey = {
          key: key,
          id: id
        };
        id++;
      }

      storeData[element.bsKey.id] = data;
    },
    get: function get(element, key) {
      if (!element || typeof element.bsKey === 'undefined') {
        return null;
      }

      var keyProperties = element.bsKey;

      if (keyProperties.key === key) {
        return storeData[keyProperties.id];
      }

      return null;
    },
    "delete": function _delete(element, key) {
      if (typeof element.bsKey === 'undefined') {
        return;
      }

      var keyProperties = element.bsKey;

      if (keyProperties.key === key) {
        delete storeData[keyProperties.id];
        delete element.bsKey;
      }
    }
  };
}();

var Data = {
  setData: function setData(instance, key, data) {
    mapData.set(instance, key, data);
  },
  getData: function getData(instance, key) {
    return mapData.get(instance, key);
  },
  removeData: function removeData(instance, key) {
    mapData["delete"](instance, key);
  }
};
/* istanbul ignore file */

var find = Element.prototype.querySelectorAll;
var findOne = Element.prototype.querySelector; // MSEdge resets defaultPrevented flag upon dispatchEvent call if at least one listener is attached

var defaultPreventedPreservedOnDispatch = function () {
  var e = new CustomEvent('Bootstrap', {
    cancelable: true
  });
  var element = document.createElement('div');
  element.addEventListener('Bootstrap', function () {
    return null;
  });
  e.preventDefault();
  element.dispatchEvent(e);
  return e.defaultPrevented;
}();

var scopeSelectorRegex = /:scope\b/;

var supportScopeQuery = function () {
  var element = document.createElement('div');

  try {
    element.querySelectorAll(':scope *');
  } catch (_) {
    return false;
  }

  return true;
}();

if (!supportScopeQuery) {
  find = function find(selector) {
    if (!scopeSelectorRegex.test(selector)) {
      return this.querySelectorAll(selector);
    }

    var hasId = Boolean(this.id);

    if (!hasId) {
      this.id = getUID('scope');
    }

    var nodeList = null;

    try {
      selector = selector.replace(scopeSelectorRegex, "#" + this.id);
      nodeList = this.querySelectorAll(selector);
    } finally {
      if (!hasId) {
        this.removeAttribute('id');
      }
    }

    return nodeList;
  };

  findOne = function findOne(selector) {
    if (!scopeSelectorRegex.test(selector)) {
      return this.querySelector(selector);
    }

    var matches = find.call(this, selector);

    if (typeof matches[0] !== 'undefined') {
      return matches[0];
    }

    return null;
  };
}
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha2): dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var $ = getjQuery();
var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
var stripNameRegex = /\..*/;
var stripUidRegex = /::\d+$/;
var eventRegistry = {}; // Events storage

var uidEvent = 1;
var customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};
var nativeEvents = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll'];
/**
 * ------------------------------------------------------------------------
 * Private methods
 * ------------------------------------------------------------------------
 */

function getUidEvent(element, uid) {
  return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
}

function getEvent(element) {
  var uid = getUidEvent(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}

function bootstrapHandler(element, fn) {
  return function handler(event) {
    event.delegateTarget = element;

    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn);
    }

    return fn.apply(element, [event]);
  };
}

function bootstrapDelegationHandler(element, selector, fn) {
  return function handler(event) {
    var domElements = element.querySelectorAll(selector);

    for (var target = event.target; target && target !== this; target = target.parentNode) {
      for (var i = domElements.length; i--;) {
        if (domElements[i] === target) {
          event.delegateTarget = target;

          if (handler.oneOff) {
            EventHandler.off(element, event.type, fn);
          }

          return fn.apply(target, [event]);
        }
      }
    } // To please ESLint


    return null;
  };
}

function findHandler(events, handler, delegationSelector) {
  if (delegationSelector === void 0) {
    delegationSelector = null;
  }

  var uidEventList = Object.keys(events);

  for (var i = 0, len = uidEventList.length; i < len; i++) {
    var event = events[uidEventList[i]];

    if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
      return event;
    }
  }

  return null;
}

function normalizeParams(originalTypeEvent, handler, delegationFn) {
  var delegation = typeof handler === 'string';
  var originalHandler = delegation ? delegationFn : handler; // allow to get the native events from namespaced events ('click.bs.button' --> 'click')

  var typeEvent = originalTypeEvent.replace(stripNameRegex, '');
  var custom = customEvents[typeEvent];

  if (custom) {
    typeEvent = custom;
  }

  var isNative = nativeEvents.indexOf(typeEvent) > -1;

  if (!isNative) {
    typeEvent = originalTypeEvent;
  }

  return [delegation, originalHandler, typeEvent];
}

function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return;
  }

  if (!handler) {
    handler = delegationFn;
    delegationFn = null;
  }

  var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
      delegation = _normalizeParams[0],
      originalHandler = _normalizeParams[1],
      typeEvent = _normalizeParams[2];

  var events = getEvent(element);
  var handlers = events[typeEvent] || (events[typeEvent] = {});
  var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

  if (previousFn) {
    previousFn.oneOff = previousFn.oneOff && oneOff;
    return;
  }

  var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
  var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
  fn.delegationSelector = delegation ? handler : null;
  fn.originalHandler = originalHandler;
  fn.oneOff = oneOff;
  fn.uidEvent = uid;
  handlers[uid] = fn;
  element.addEventListener(typeEvent, fn, delegation);
}

function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  var fn = findHandler(events[typeEvent], handler, delegationSelector);

  if (!fn) {
    return;
  }

  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
  delete events[typeEvent][fn.uidEvent];
}

function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  var storeElementEvent = events[typeEvent] || {};
  Object.keys(storeElementEvent).forEach(function (handlerKey) {
    if (handlerKey.indexOf(namespace) > -1) {
      var event = storeElementEvent[handlerKey];
      removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
    }
  });
}

var EventHandler = {
  on: function on(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, false);
  },
  one: function one(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, true);
  },
  off: function off(element, originalTypeEvent, handler, delegationFn) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    var _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn),
        delegation = _normalizeParams2[0],
        originalHandler = _normalizeParams2[1],
        typeEvent = _normalizeParams2[2];

    var inNamespace = typeEvent !== originalTypeEvent;
    var events = getEvent(element);
    var isNamespace = originalTypeEvent.charAt(0) === '.';

    if (typeof originalHandler !== 'undefined') {
      // Simplest case: handler is passed, remove that listener ONLY.
      if (!events || !events[typeEvent]) {
        return;
      }

      removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
      return;
    }

    if (isNamespace) {
      Object.keys(events).forEach(function (elementEvent) {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      });
    }

    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (keyHandlers) {
      var handlerKey = keyHandlers.replace(stripUidRegex, '');

      if (!inNamespace || originalTypeEvent.indexOf(handlerKey) > -1) {
        var event = storeElementEvent[keyHandlers];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  },
  trigger: function trigger(element, event, args) {
    if (typeof event !== 'string' || !element) {
      return null;
    }

    var typeEvent = event.replace(stripNameRegex, '');
    var inNamespace = event !== typeEvent;
    var isNative = nativeEvents.indexOf(typeEvent) > -1;
    var jQueryEvent;
    var bubbles = true;
    var nativeDispatch = true;
    var defaultPrevented = false;
    var evt = null;

    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }

    if (isNative) {
      evt = document.createEvent('HTMLEvents');
      evt.initEvent(typeEvent, bubbles, true);
    } else {
      evt = new CustomEvent(event, {
        bubbles: bubbles,
        cancelable: true
      });
    } // merge custom information in our event


    if (typeof args !== 'undefined') {
      Object.keys(args).forEach(function (key) {
        Object.defineProperty(evt, key, {
          get: function get() {
            return args[key];
          }
        });
      });
    }

    if (defaultPrevented) {
      evt.preventDefault();

      if (!defaultPreventedPreservedOnDispatch) {
        Object.defineProperty(evt, 'defaultPrevented', {
          get: function get() {
            return true;
          }
        });
      }
    }

    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }

    if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
      jQueryEvent.preventDefault();
    }

    return evt;
  }
};
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'alert';
var VERSION = '5.0.0-alpha2';
var DATA_KEY = 'bs.alert';
var EVENT_KEY = "." + DATA_KEY;
var DATA_API_KEY = '.data-api';
var SELECTOR_DISMISS = '[data-dismiss="alert"]';
var EVENT_CLOSE = "close" + EVENT_KEY;
var EVENT_CLOSED = "closed" + EVENT_KEY;
var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
var CLASSNAME_ALERT = 'alert';
var CLASSNAME_FADE = 'fade';
var CLASSNAME_SHOW = 'show';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Alert = /*#__PURE__*/function () {
  function Alert(element) {
    this._element = element;

    if (this._element) {
      Data.setData(element, DATA_KEY, this);
    }
  } // Getters


  var _proto = Alert.prototype; // Public

  _proto.close = function close(element) {
    var rootElement = element ? this._getRootElement(element) : this._element;

    var customEvent = this._triggerCloseEvent(rootElement);

    if (customEvent === null || customEvent.defaultPrevented) {
      return;
    }

    this._removeElement(rootElement);
  };

  _proto.dispose = function dispose() {
    Data.removeData(this._element, DATA_KEY);
    this._element = null;
  } // Private
  ;

  _proto._getRootElement = function _getRootElement(element) {
    return getElementFromSelector(element) || element.closest("." + CLASSNAME_ALERT);
  };

  _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
    return EventHandler.trigger(element, EVENT_CLOSE);
  };

  _proto._removeElement = function _removeElement(element) {
    var _this = this;

    element.classList.remove(CLASSNAME_SHOW);

    if (!element.classList.contains(CLASSNAME_FADE)) {
      this._destroyElement(element);

      return;
    }

    var transitionDuration = getTransitionDurationFromElement(element);
    EventHandler.one(element, TRANSITION_END, function () {
      return _this._destroyElement(element);
    });
    emulateTransitionEnd(element, transitionDuration);
  };

  _proto._destroyElement = function _destroyElement(element) {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }

    EventHandler.trigger(element, EVENT_CLOSED);
  } // Static
  ;

  Alert.jQueryInterface = function jQueryInterface(config) {
    return this.each(function () {
      var data = Data.getData(this, DATA_KEY);

      if (!data) {
        data = new Alert(this);
      }

      if (config === 'close') {
        data[config](this);
      }
    });
  };

  Alert.handleDismiss = function handleDismiss(alertInstance) {
    return function (event) {
      if (event) {
        event.preventDefault();
      }

      alertInstance.close(this);
    };
  };

  Alert.getInstance = function getInstance(element) {
    return Data.getData(element, DATA_KEY);
  };

  _createClass(Alert, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION;
    }
  }]);

  return Alert;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


exports.Alert = Alert;
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
var $$1 = getjQuery();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .alert to jQuery only if jQuery is present
 */

/* istanbul ignore if */

if ($$1) {
  var JQUERY_NO_CONFLICT = $$1.fn[NAME];
  $$1.fn[NAME] = Alert.jQueryInterface;
  $$1.fn[NAME].Constructor = Alert;

  $$1.fn[NAME].noConflict = function () {
    $$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert.jQueryInterface;
  };
}
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$1 = 'button';
var VERSION$1 = '5.0.0-alpha2';
var DATA_KEY$1 = 'bs.button';
var EVENT_KEY$1 = "." + DATA_KEY$1;
var DATA_API_KEY$1 = '.data-api';
var CLASS_NAME_ACTIVE = 'active';
var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Button = /*#__PURE__*/function () {
  function Button(element) {
    this._element = element;
    Data.setData(element, DATA_KEY$1, this);
  } // Getters


  var _proto = Button.prototype; // Public

  _proto.toggle = function toggle() {
    // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
  };

  _proto.dispose = function dispose() {
    Data.removeData(this._element, DATA_KEY$1);
    this._element = null;
  } // Static
  ;

  Button.jQueryInterface = function jQueryInterface(config) {
    return this.each(function () {
      var data = Data.getData(this, DATA_KEY$1);

      if (!data) {
        data = new Button(this);
      }

      if (config === 'toggle') {
        data[config]();
      }
    });
  };

  Button.getInstance = function getInstance(element) {
    return Data.getData(element, DATA_KEY$1);
  };

  _createClass(Button, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$1;
    }
  }]);

  return Button;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


exports.Button = Button;
EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE, function (event) {
  event.preventDefault();
  var button = event.target.closest(SELECTOR_DATA_TOGGLE);
  var data = Data.getData(button, DATA_KEY$1);

  if (!data) {
    data = new Button(button);
  }

  data.toggle();
});
var $$2 = getjQuery();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .button to jQuery only if jQuery is present
 */

/* istanbul ignore if */

if ($$2) {
  var JQUERY_NO_CONFLICT$1 = $$2.fn[NAME$1];
  $$2.fn[NAME$1] = Button.jQueryInterface;
  $$2.fn[NAME$1].Constructor = Button;

  $$2.fn[NAME$1].noConflict = function () {
    $$2.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button.jQueryInterface;
  };
}
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha2): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


function normalizeData(val) {
  if (val === 'true') {
    return true;
  }

  if (val === 'false') {
    return false;
  }

  if (val === Number(val).toString()) {
    return Number(val);
  }

  if (val === '' || val === 'null') {
    return null;
  }

  return val;
}

function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, function (chr) {
    return "-" + chr.toLowerCase();
  });
}

var Manipulator = {
  setDataAttribute: function setDataAttribute(element, key, value) {
    element.setAttribute("data-" + normalizeDataKey(key), value);
  },
  removeDataAttribute: function removeDataAttribute(element, key) {
    element.removeAttribute("data-" + normalizeDataKey(key));
  },
  getDataAttributes: function getDataAttributes(element) {
    if (!element) {
      return {};
    }

    var attributes = _extends({}, element.dataset);

    Object.keys(attributes).forEach(function (key) {
      attributes[key] = normalizeData(attributes[key]);
    });
    return attributes;
  },
  getDataAttribute: function getDataAttribute(element, key) {
    return normalizeData(element.getAttribute("data-" + normalizeDataKey(key)));
  },
  offset: function offset(element) {
    var rect = element.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  },
  position: function position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    };
  },
  toggleClass: function toggleClass(element, className) {
    if (!element) {
      return;
    }

    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }
};
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha2): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NODE_TEXT = 3;
var SelectorEngine = {
  matches: function matches(element, selector) {
    return element.matches(selector);
  },
  find: function find$1(selector, element) {
    var _ref;

    if (element === void 0) {
      element = document.documentElement;
    }

    return (_ref = []).concat.apply(_ref, find.call(element, selector));
  },
  findOne: function findOne$1(selector, element) {
    if (element === void 0) {
      element = document.documentElement;
    }

    return findOne.call(element, selector);
  },
  children: function children(element, selector) {
    var _ref2;

    var children = (_ref2 = []).concat.apply(_ref2, element.children);

    return children.filter(function (child) {
      return child.matches(selector);
    });
  },
  parents: function parents(element, selector) {
    var parents = [];
    var ancestor = element.parentNode;

    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
      if (this.matches(ancestor, selector)) {
        parents.push(ancestor);
      }

      ancestor = ancestor.parentNode;
    }

    return parents;
  },
  prev: function prev(element, selector) {
    var previous = element.previousElementSibling;

    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }

      previous = previous.previousElementSibling;
    }

    return [];
  },
  next: function next(element, selector) {
    var next = element.nextElementSibling;

    while (next) {
      if (this.matches(next, selector)) {
        return [next];
      }

      next = next.nextElementSibling;
    }

    return [];
  }
};
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$2 = 'carousel';
var VERSION$2 = '5.0.0-alpha2';
var DATA_KEY$2 = 'bs.carousel';
var EVENT_KEY$2 = "." + DATA_KEY$2;
var DATA_API_KEY$2 = '.data-api';
var ARROW_LEFT_KEY = 'ArrowLeft';
var ARROW_RIGHT_KEY = 'ArrowRight';
var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

var SWIPE_THRESHOLD = 40;
var Default = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: 'hover',
  wrap: true,
  touch: true
};
var DefaultType = {
  interval: '(number|boolean)',
  keyboard: 'boolean',
  slide: '(boolean|string)',
  pause: '(string|boolean)',
  wrap: 'boolean',
  touch: 'boolean'
};
var DIRECTION_NEXT = 'next';
var DIRECTION_PREV = 'prev';
var DIRECTION_LEFT = 'left';
var DIRECTION_RIGHT = 'right';
var EVENT_SLIDE = "slide" + EVENT_KEY$2;
var EVENT_SLID = "slid" + EVENT_KEY$2;
var EVENT_KEYDOWN = "keydown" + EVENT_KEY$2;
var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2;
var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2;
var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2;
var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2;
var EVENT_TOUCHEND = "touchend" + EVENT_KEY$2;
var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2;
var EVENT_POINTERUP = "pointerup" + EVENT_KEY$2;
var EVENT_DRAG_START = "dragstart" + EVENT_KEY$2;
var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$2 + DATA_API_KEY$2;
var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2;
var CLASS_NAME_CAROUSEL = 'carousel';
var CLASS_NAME_ACTIVE$1 = 'active';
var CLASS_NAME_SLIDE = 'slide';
var CLASS_NAME_RIGHT = 'carousel-item-right';
var CLASS_NAME_LEFT = 'carousel-item-left';
var CLASS_NAME_NEXT = 'carousel-item-next';
var CLASS_NAME_PREV = 'carousel-item-prev';
var CLASS_NAME_POINTER_EVENT = 'pointer-event';
var SELECTOR_ACTIVE = '.active';
var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
var SELECTOR_ITEM = '.carousel-item';
var SELECTOR_ITEM_IMG = '.carousel-item img';
var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
var SELECTOR_INDICATORS = '.carousel-indicators';
var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
var PointerType = {
  TOUCH: 'touch',
  PEN: 'pen'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Carousel = /*#__PURE__*/function () {
  function Carousel(element, config) {
    this._items = null;
    this._interval = null;
    this._activeElement = null;
    this._isPaused = false;
    this._isSliding = false;
    this.touchTimeout = null;
    this.touchStartX = 0;
    this.touchDeltaX = 0;
    this._config = this._getConfig(config);
    this._element = element;
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    this._pointerEvent = Boolean(window.PointerEvent);

    this._addEventListeners();

    Data.setData(element, DATA_KEY$2, this);
  } // Getters


  var _proto = Carousel.prototype; // Public

  _proto.next = function next() {
    if (!this._isSliding) {
      this._slide(DIRECTION_NEXT);
    }
  };

  _proto.nextWhenVisible = function nextWhenVisible() {
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  };

  _proto.prev = function prev() {
    if (!this._isSliding) {
      this._slide(DIRECTION_PREV);
    }
  };

  _proto.pause = function pause(event) {
    if (!event) {
      this._isPaused = true;
    }

    if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
      triggerTransitionEnd(this._element);
      this.cycle(true);
    }

    clearInterval(this._interval);
    this._interval = null;
  };

  _proto.cycle = function cycle(event) {
    if (!event) {
      this._isPaused = false;
    }

    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }

    if (this._config && this._config.interval && !this._isPaused) {
      this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
    }
  };

  _proto.to = function to(index) {
    var _this = this;

    this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

    var activeIndex = this._getItemIndex(this._activeElement);

    if (index > this._items.length - 1 || index < 0) {
      return;
    }

    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, function () {
        return _this.to(index);
      });
      return;
    }

    if (activeIndex === index) {
      this.pause();
      this.cycle();
      return;
    }

    var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

    this._slide(direction, this._items[index]);
  };

  _proto.dispose = function dispose() {
    EventHandler.off(this._element, EVENT_KEY$2);
    Data.removeData(this._element, DATA_KEY$2);
    this._items = null;
    this._config = null;
    this._element = null;
    this._interval = null;
    this._isPaused = null;
    this._isSliding = null;
    this._activeElement = null;
    this._indicatorsElement = null;
  } // Private
  ;

  _proto._getConfig = function _getConfig(config) {
    config = _extends({}, Default, config);
    typeCheckConfig(NAME$2, config, DefaultType);
    return config;
  };

  _proto._handleSwipe = function _handleSwipe() {
    var absDeltax = Math.abs(this.touchDeltaX);

    if (absDeltax <= SWIPE_THRESHOLD) {
      return;
    }

    var direction = absDeltax / this.touchDeltaX;
    this.touchDeltaX = 0; // swipe left

    if (direction > 0) {
      this.prev();
    } // swipe right


    if (direction < 0) {
      this.next();
    }
  };

  _proto._addEventListeners = function _addEventListeners() {
    var _this2 = this;

    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN, function (event) {
        return _this2._keydown(event);
      });
    }

    if (this._config.pause === 'hover') {
      EventHandler.on(this._element, EVENT_MOUSEENTER, function (event) {
        return _this2.pause(event);
      });
      EventHandler.on(this._element, EVENT_MOUSELEAVE, function (event) {
        return _this2.cycle(event);
      });
    }

    if (this._config.touch && this._touchSupported) {
      this._addTouchEventListeners();
    }
  };

  _proto._addTouchEventListeners = function _addTouchEventListeners() {
    var _this3 = this;

    var start = function start(event) {
      if (_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
        _this3.touchStartX = event.clientX;
      } else if (!_this3._pointerEvent) {
        _this3.touchStartX = event.touches[0].clientX;
      }
    };

    var move = function move(event) {
      // ensure swiping with one touch and not pinching
      if (event.touches && event.touches.length > 1) {
        _this3.touchDeltaX = 0;
      } else {
        _this3.touchDeltaX = event.touches[0].clientX - _this3.touchStartX;
      }
    };

    var end = function end(event) {
      if (_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
        _this3.touchDeltaX = event.clientX - _this3.touchStartX;
      }

      _this3._handleSwipe();

      if (_this3._config.pause === 'hover') {
        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling
        _this3.pause();

        if (_this3.touchTimeout) {
          clearTimeout(_this3.touchTimeout);
        }

        _this3.touchTimeout = setTimeout(function (event) {
          return _this3.cycle(event);
        }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
      }
    };

    SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
      EventHandler.on(itemImg, EVENT_DRAG_START, function (e) {
        return e.preventDefault();
      });
    });

    if (this._pointerEvent) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
        return start(event);
      });
      EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
        return end(event);
      });

      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
        return start(event);
      });
      EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
        return move(event);
      });
      EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
        return end(event);
      });
    }
  };

  _proto._keydown = function _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }

    switch (event.key) {
      case ARROW_LEFT_KEY:
        event.preventDefault();
        this.prev();
        break;

      case ARROW_RIGHT_KEY:
        event.preventDefault();
        this.next();
        break;
    }
  };

  _proto._getItemIndex = function _getItemIndex(element) {
    this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
    return this._items.indexOf(element);
  };

  _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
    var isNextDirection = direction === DIRECTION_NEXT;
    var isPrevDirection = direction === DIRECTION_PREV;

    var activeIndex = this._getItemIndex(activeElement);

    var lastItemIndex = this._items.length - 1;
    var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

    if (isGoingToWrap && !this._config.wrap) {
      return activeElement;
    }

    var delta = direction === DIRECTION_PREV ? -1 : 1;
    var itemIndex = (activeIndex + delta) % this._items.length;
    return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
  };

  _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
    var targetIndex = this._getItemIndex(relatedTarget);

    var fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

    return EventHandler.trigger(this._element, EVENT_SLIDE, {
      relatedTarget: relatedTarget,
      direction: eventDirectionName,
      from: fromIndex,
      to: targetIndex
    });
  };

  _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
    if (this._indicatorsElement) {
      var indicators = SelectorEngine.find(SELECTOR_ACTIVE, this._indicatorsElement);

      for (var i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove(CLASS_NAME_ACTIVE$1);
      }

      var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

      if (nextIndicator) {
        nextIndicator.classList.add(CLASS_NAME_ACTIVE$1);
      }
    }
  };

  _proto._slide = function _slide(direction, element) {
    var _this4 = this;

    var activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

    var activeElementIndex = this._getItemIndex(activeElement);

    var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

    var nextElementIndex = this._getItemIndex(nextElement);

    var isCycling = Boolean(this._interval);
    var directionalClassName;
    var orderClassName;
    var eventDirectionName;

    if (direction === DIRECTION_NEXT) {
      directionalClassName = CLASS_NAME_LEFT;
      orderClassName = CLASS_NAME_NEXT;
      eventDirectionName = DIRECTION_LEFT;
    } else {
      directionalClassName = CLASS_NAME_RIGHT;
      orderClassName = CLASS_NAME_PREV;
      eventDirectionName = DIRECTION_RIGHT;
    }

    if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$1)) {
      this._isSliding = false;
      return;
    }

    var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

    if (slideEvent.defaultPrevented) {
      return;
    }

    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      return;
    }

    this._isSliding = true;

    if (isCycling) {
      this.pause();
    }

    this._setActiveIndicatorElement(nextElement);

    if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

      if (nextElementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
        this._config.interval = nextElementInterval;
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval;
      }

      var transitionDuration = getTransitionDurationFromElement(activeElement);
      EventHandler.one(activeElement, TRANSITION_END, function () {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$1);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$1, orderClassName, directionalClassName);
        _this4._isSliding = false;
        setTimeout(function () {
          EventHandler.trigger(_this4._element, EVENT_SLID, {
            relatedTarget: nextElement,
            direction: eventDirectionName,
            from: activeElementIndex,
            to: nextElementIndex
          });
        }, 0);
      });
      emulateTransitionEnd(activeElement, transitionDuration);
    } else {
      activeElement.classList.remove(CLASS_NAME_ACTIVE$1);
      nextElement.classList.add(CLASS_NAME_ACTIVE$1);
      this._isSliding = false;
      EventHandler.trigger(this._element, EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });
    }

    if (isCycling) {
      this.cycle();
    }
  } // Static
  ;

  Carousel.carouselInterface = function carouselInterface(element, config) {
    var data = Data.getData(element, DATA_KEY$2);

    var _config = _extends({}, Default, Manipulator.getDataAttributes(element));

    if (_typeof(config) === 'object') {
      _config = _extends({}, _config, config);
    }

    var action = typeof config === 'string' ? config : _config.slide;

    if (!data) {
      data = new Carousel(element, _config);
    }

    if (typeof config === 'number') {
      data.to(config);
    } else if (typeof action === 'string') {
      if (typeof data[action] === 'undefined') {
        throw new TypeError("No method named \"" + action + "\"");
      }

      data[action]();
    } else if (_config.interval && _config.ride) {
      data.pause();
      data.cycle();
    }
  };

  Carousel.jQueryInterface = function jQueryInterface(config) {
    return this.each(function () {
      Carousel.carouselInterface(this, config);
    });
  };

  Carousel.dataApiClickHandler = function dataApiClickHandler(event) {
    var target = getElementFromSelector(this);

    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }

    var config = _extends({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));

    var slideIndex = this.getAttribute('data-slide-to');

    if (slideIndex) {
      config.interval = false;
    }

    Carousel.carouselInterface(target, config);

    if (slideIndex) {
      Data.getData(target, DATA_KEY$2).to(slideIndex);
    }

    event.preventDefault();
  };

  Carousel.getInstance = function getInstance(element) {
    return Data.getData(element, DATA_KEY$2);
  };

  _createClass(Carousel, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$2;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default;
    }
  }]);

  return Carousel;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


exports.Carousel = Carousel;
EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
  var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

  for (var i = 0, len = carousels.length; i < len; i++) {
    Carousel.carouselInterface(carousels[i], Data.getData(carousels[i], DATA_KEY$2));
  }
});
var $$3 = getjQuery();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .carousel to jQuery only if jQuery is present
 */

/* istanbul ignore if */

if ($$3) {
  var JQUERY_NO_CONFLICT$2 = $$3.fn[NAME$2];
  $$3.fn[NAME$2] = Carousel.jQueryInterface;
  $$3.fn[NAME$2].Constructor = Carousel;

  $$3.fn[NAME$2].noConflict = function () {
    $$3.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel.jQueryInterface;
  };
}
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$3 = 'collapse';
var VERSION$3 = '5.0.0-alpha2';
var DATA_KEY$3 = 'bs.collapse';
var EVENT_KEY$3 = "." + DATA_KEY$3;
var DATA_API_KEY$3 = '.data-api';
var Default$1 = {
  toggle: true,
  parent: ''
};
var DefaultType$1 = {
  toggle: 'boolean',
  parent: '(string|element)'
};
var EVENT_SHOW = "show" + EVENT_KEY$3;
var EVENT_SHOWN = "shown" + EVENT_KEY$3;
var EVENT_HIDE = "hide" + EVENT_KEY$3;
var EVENT_HIDDEN = "hidden" + EVENT_KEY$3;
var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3;
var CLASS_NAME_SHOW = 'show';
var CLASS_NAME_COLLAPSE = 'collapse';
var CLASS_NAME_COLLAPSING = 'collapsing';
var CLASS_NAME_COLLAPSED = 'collapsed';
var WIDTH = 'width';
var HEIGHT = 'height';
var SELECTOR_ACTIVES = '.show, .collapsing';
var SELECTOR_DATA_TOGGLE$1 = '[data-toggle="collapse"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Collapse = /*#__PURE__*/function () {
  function Collapse(element, config) {
    this._isTransitioning = false;
    this._element = element;
    this._config = this._getConfig(config);
    this._triggerArray = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1 + "[href=\"#" + element.id + "\"]," + (SELECTOR_DATA_TOGGLE$1 + "[data-target=\"#" + element.id + "\"]"));
    var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1);

    for (var i = 0, len = toggleList.length; i < len; i++) {
      var elem = toggleList[i];
      var selector = getSelectorFromElement(elem);
      var filterElement = SelectorEngine.find(selector).filter(function (foundElem) {
        return foundElem === element;
      });

      if (selector !== null && filterElement.length) {
        this._selector = selector;

        this._triggerArray.push(elem);
      }
    }

    this._parent = this._config.parent ? this._getParent() : null;

    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._element, this._triggerArray);
    }

    if (this._config.toggle) {
      this.toggle();
    }

    Data.setData(element, DATA_KEY$3, this);
  } // Getters


  var _proto = Collapse.prototype; // Public

  _proto.toggle = function toggle() {
    if (this._element.classList.contains(CLASS_NAME_SHOW)) {
      this.hide();
    } else {
      this.show();
    }
  };

  _proto.show = function show() {
    var _this = this;

    if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW)) {
      return;
    }

    var actives;
    var activesData;

    if (this._parent) {
      actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function (elem) {
        if (typeof _this._config.parent === 'string') {
          return elem.getAttribute('data-parent') === _this._config.parent;
        }

        return elem.classList.contains(CLASS_NAME_COLLAPSE);
      });

      if (actives.length === 0) {
        actives = null;
      }
    }

    var container = SelectorEngine.findOne(this._selector);

    if (actives) {
      var tempActiveData = actives.filter(function (elem) {
        return container !== elem;
      });
      activesData = tempActiveData[0] ? Data.getData(tempActiveData[0], DATA_KEY$3) : null;

      if (activesData && activesData._isTransitioning) {
        return;
      }
    }

    var startEvent = EventHandler.trigger(this._element, EVENT_SHOW);

    if (startEvent.defaultPrevented) {
      return;
    }

    if (actives) {
      actives.forEach(function (elemActive) {
        if (container !== elemActive) {
          Collapse.collapseInterface(elemActive, 'hide');
        }

        if (!activesData) {
          Data.setData(elemActive, DATA_KEY$3, null);
        }
      });
    }

    var dimension = this._getDimension();

    this._element.classList.remove(CLASS_NAME_COLLAPSE);

    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.style[dimension] = 0;

    if (this._triggerArray.length) {
      this._triggerArray.forEach(function (element) {
        element.classList.remove(CLASS_NAME_COLLAPSED);
        element.setAttribute('aria-expanded', true);
      });
    }

    this.setTransitioning(true);

    var complete = function complete() {
      _this._element.classList.remove(CLASS_NAME_COLLAPSING);

      _this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

      _this._element.style[dimension] = '';

      _this.setTransitioning(false);

      EventHandler.trigger(_this._element, EVENT_SHOWN);
    };

    var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    var scrollSize = "scroll" + capitalizedDimension;
    var transitionDuration = getTransitionDurationFromElement(this._element);
    EventHandler.one(this._element, TRANSITION_END, complete);
    emulateTransitionEnd(this._element, transitionDuration);
    this._element.style[dimension] = this._element[scrollSize] + "px";
  };

  _proto.hide = function hide() {
    var _this2 = this;

    if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW)) {
      return;
    }

    var startEvent = EventHandler.trigger(this._element, EVENT_HIDE);

    if (startEvent.defaultPrevented) {
      return;
    }

    var dimension = this._getDimension();

    this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
    reflow(this._element);

    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

    var triggerArrayLength = this._triggerArray.length;

    if (triggerArrayLength > 0) {
      for (var i = 0; i < triggerArrayLength; i++) {
        var trigger = this._triggerArray[i];
        var elem = getElementFromSelector(trigger);

        if (elem && !elem.classList.contains(CLASS_NAME_SHOW)) {
          trigger.classList.add(CLASS_NAME_COLLAPSED);
          trigger.setAttribute('aria-expanded', false);
        }
      }
    }

    this.setTransitioning(true);

    var complete = function complete() {
      _this2.setTransitioning(false);

      _this2._element.classList.remove(CLASS_NAME_COLLAPSING);

      _this2._element.classList.add(CLASS_NAME_COLLAPSE);

      EventHandler.trigger(_this2._element, EVENT_HIDDEN);
    };

    this._element.style[dimension] = '';
    var transitionDuration = getTransitionDurationFromElement(this._element);
    EventHandler.one(this._element, TRANSITION_END, complete);
    emulateTransitionEnd(this._element, transitionDuration);
  };

  _proto.setTransitioning = function setTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning;
  };

  _proto.dispose = function dispose() {
    Data.removeData(this._element, DATA_KEY$3);
    this._config = null;
    this._parent = null;
    this._element = null;
    this._triggerArray = null;
    this._isTransitioning = null;
  } // Private
  ;

  _proto._getConfig = function _getConfig(config) {
    config = _extends({}, Default$1, config);
    config.toggle = Boolean(config.toggle); // Coerce string values

    typeCheckConfig(NAME$3, config, DefaultType$1);
    return config;
  };

  _proto._getDimension = function _getDimension() {
    return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
  };

  _proto._getParent = function _getParent() {
    var _this3 = this;

    var parent = this._config.parent;

    if (isElement(parent)) {
      // it's a jQuery object
      if (typeof parent.jquery !== 'undefined' || typeof parent[0] !== 'undefined') {
        parent = parent[0];
      }
    } else {
      parent = SelectorEngine.findOne(parent);
    }

    var selector = SELECTOR_DATA_TOGGLE$1 + "[data-parent=\"" + parent + "\"]";
    SelectorEngine.find(selector, parent).forEach(function (element) {
      var selected = getElementFromSelector(element);

      _this3._addAriaAndCollapsedClass(selected, [element]);
    });
    return parent;
  };

  _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
    if (!element || !triggerArray.length) {
      return;
    }

    var isOpen = element.classList.contains(CLASS_NAME_SHOW);
    triggerArray.forEach(function (elem) {
      if (isOpen) {
        elem.classList.remove(CLASS_NAME_COLLAPSED);
      } else {
        elem.classList.add(CLASS_NAME_COLLAPSED);
      }

      elem.setAttribute('aria-expanded', isOpen);
    });
  } // Static
  ;

  Collapse.collapseInterface = function collapseInterface(element, config) {
    var data = Data.getData(element, DATA_KEY$3);

    var _config = _extends({}, Default$1, Manipulator.getDataAttributes(element), _typeof(config) === 'object' && config ? config : {});

    if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
      _config.toggle = false;
    }

    if (!data) {
      data = new Collapse(element, _config);
    }

    if (typeof config === 'string') {
      if (typeof data[config] === 'undefined') {
        throw new TypeError("No method named \"" + config + "\"");
      }

      data[config]();
    }
  };

  Collapse.jQueryInterface = function jQueryInterface(config) {
    return this.each(function () {
      Collapse.collapseInterface(this, config);
    });
  };

  Collapse.getInstance = function getInstance(element) {
    return Data.getData(element, DATA_KEY$3);
  };

  _createClass(Collapse, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$3;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$1;
    }
  }]);

  return Collapse;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


exports.Collapse = Collapse;
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A') {
    event.preventDefault();
  }

  var triggerData = Manipulator.getDataAttributes(this);
  var selector = getSelectorFromElement(this);
  var selectorElements = SelectorEngine.find(selector);
  selectorElements.forEach(function (element) {
    var data = Data.getData(element, DATA_KEY$3);
    var config;

    if (data) {
      // update parent attribute
      if (data._parent === null && typeof triggerData.parent === 'string') {
        data._config.parent = triggerData.parent;
        data._parent = data._getParent();
      }

      config = 'toggle';
    } else {
      config = triggerData;
    }

    Collapse.collapseInterface(element, config);
  });
});
var $$4 = getjQuery();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .collapse to jQuery only if jQuery is present
 */

/* istanbul ignore if */

if ($$4) {
  var JQUERY_NO_CONFLICT$3 = $$4.fn[NAME$3];
  $$4.fn[NAME$3] = Collapse.jQueryInterface;
  $$4.fn[NAME$3].Constructor = Collapse;

  $$4.fn[NAME$3].noConflict = function () {
    $$4.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse.jQueryInterface;
  };
}
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$4 = 'dropdown';
var VERSION$4 = '5.0.0-alpha2';
var DATA_KEY$4 = 'bs.dropdown';
var EVENT_KEY$4 = "." + DATA_KEY$4;
var DATA_API_KEY$4 = '.data-api';
var ESCAPE_KEY = 'Escape';
var SPACE_KEY = 'Space';
var TAB_KEY = 'Tab';
var ARROW_UP_KEY = 'ArrowUp';
var ARROW_DOWN_KEY = 'ArrowDown';
var RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEY + "|" + ARROW_DOWN_KEY + "|" + ESCAPE_KEY);
var EVENT_HIDE$1 = "hide" + EVENT_KEY$4;
var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4;
var EVENT_SHOW$1 = "show" + EVENT_KEY$4;
var EVENT_SHOWN$1 = "shown" + EVENT_KEY$4;
var EVENT_CLICK = "click" + EVENT_KEY$4;
var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4;
var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4;
var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4;
var CLASS_NAME_DISABLED = 'disabled';
var CLASS_NAME_SHOW$1 = 'show';
var CLASS_NAME_DROPUP = 'dropup';
var CLASS_NAME_DROPRIGHT = 'dropright';
var CLASS_NAME_DROPLEFT = 'dropleft';
var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
var CLASS_NAME_NAVBAR = 'navbar';
var CLASS_NAME_POSITION_STATIC = 'position-static';
var SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
var SELECTOR_FORM_CHILD = '.dropdown form';
var SELECTOR_MENU = '.dropdown-menu';
var SELECTOR_NAVBAR_NAV = '.navbar-nav';
var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
var PLACEMENT_TOP = 'top-start';
var PLACEMENT_TOPEND = 'top-end';
var PLACEMENT_BOTTOM = 'bottom-start';
var PLACEMENT_BOTTOMEND = 'bottom-end';
var PLACEMENT_RIGHT = 'right-start';
var PLACEMENT_LEFT = 'left-start';
var Default$2 = {
  offset: 0,
  flip: true,
  boundary: 'scrollParent',
  reference: 'toggle',
  display: 'dynamic',
  popperConfig: null
};
var DefaultType$2 = {
  offset: '(number|string|function)',
  flip: 'boolean',
  boundary: '(string|element)',
  reference: '(string|element)',
  display: 'string',
  popperConfig: '(null|object)'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Dropdown = /*#__PURE__*/function () {
  function Dropdown(element, config) {
    this._element = element;
    this._popper = null;
    this._config = this._getConfig(config);
    this._menu = this._getMenuElement();
    this._inNavbar = this._detectNavbar();

    this._addEventListeners();

    Data.setData(element, DATA_KEY$4, this);
  } // Getters


  var _proto = Dropdown.prototype; // Public

  _proto.toggle = function toggle() {
    if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED)) {
      return;
    }

    var isActive = this._element.classList.contains(CLASS_NAME_SHOW$1);

    Dropdown.clearMenus();

    if (isActive) {
      return;
    }

    this.show();
  };

  _proto.show = function show() {
    if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
      return;
    }

    var parent = Dropdown.getParentFromElement(this._element);
    var relatedTarget = {
      relatedTarget: this._element
    };
    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, relatedTarget);

    if (showEvent.defaultPrevented) {
      return;
    } // Disable totally Popper.js for Dropdown in Navbar


    if (!this._inNavbar) {
      if (typeof _popper["default"] === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org)');
      }

      var referenceElement = this._element;

      if (this._config.reference === 'parent') {
        referenceElement = parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = this._config.reference; // Check if it's jQuery element

        if (typeof this._config.reference.jquery !== 'undefined') {
          referenceElement = this._config.reference[0];
        }
      } // If boundary is not `scrollParent`, then set position to `static`
      // to allow the menu to "escape" the scroll parent's boundaries
      // https://github.com/twbs/bootstrap/issues/24251


      if (this._config.boundary !== 'scrollParent') {
        parent.classList.add(CLASS_NAME_POSITION_STATIC);
      }

      this._popper = new _popper["default"](referenceElement, this._menu, this._getPopperConfig());
    } // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


    if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
      var _ref;

      (_ref = []).concat.apply(_ref, document.body.children).forEach(function (elem) {
        return EventHandler.on(elem, 'mouseover', null, noop());
      });
    }

    this._element.focus();

    this._element.setAttribute('aria-expanded', true);

    Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1);
    Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1);
    EventHandler.trigger(parent, EVENT_SHOWN$1, relatedTarget);
  };

  _proto.hide = function hide() {
    if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || !this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
      return;
    }

    var parent = Dropdown.getParentFromElement(this._element);
    var relatedTarget = {
      relatedTarget: this._element
    };
    var hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);

    if (hideEvent.defaultPrevented) {
      return;
    }

    if (this._popper) {
      this._popper.destroy();
    }

    Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1);
    Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1);
    EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
  };

  _proto.dispose = function dispose() {
    Data.removeData(this._element, DATA_KEY$4);
    EventHandler.off(this._element, EVENT_KEY$4);
    this._element = null;
    this._menu = null;

    if (this._popper) {
      this._popper.destroy();

      this._popper = null;
    }
  };

  _proto.update = function update() {
    this._inNavbar = this._detectNavbar();

    if (this._popper) {
      this._popper.scheduleUpdate();
    }
  } // Private
  ;

  _proto._addEventListeners = function _addEventListeners() {
    var _this = this;

    EventHandler.on(this._element, EVENT_CLICK, function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this.toggle();
    });
  };

  _proto._getConfig = function _getConfig(config) {
    config = _extends({}, this.constructor.Default, Manipulator.getDataAttributes(this._element), config);
    typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
    return config;
  };

  _proto._getMenuElement = function _getMenuElement() {
    return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
  };

  _proto._getPlacement = function _getPlacement() {
    var parentDropdown = this._element.parentNode;
    var placement = PLACEMENT_BOTTOM; // Handle dropup

    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      placement = PLACEMENT_TOP;

      if (this._menu.classList.contains(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_TOPEND;
      }
    } else if (parentDropdown.classList.contains(CLASS_NAME_DROPRIGHT)) {
      placement = PLACEMENT_RIGHT;
    } else if (parentDropdown.classList.contains(CLASS_NAME_DROPLEFT)) {
      placement = PLACEMENT_LEFT;
    } else if (this._menu.classList.contains(CLASS_NAME_MENURIGHT)) {
      placement = PLACEMENT_BOTTOMEND;
    }

    return placement;
  };

  _proto._detectNavbar = function _detectNavbar() {
    return Boolean(this._element.closest("." + CLASS_NAME_NAVBAR));
  };

  _proto._getOffset = function _getOffset() {
    var _this2 = this;

    var offset = {};

    if (typeof this._config.offset === 'function') {
      offset.fn = function (data) {
        data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
        return data;
      };
    } else {
      offset.offset = this._config.offset;
    }

    return offset;
  };

  _proto._getPopperConfig = function _getPopperConfig() {
    var popperConfig = {
      placement: this._getPlacement(),
      modifiers: {
        offset: this._getOffset(),
        flip: {
          enabled: this._config.flip
        },
        preventOverflow: {
          boundariesElement: this._config.boundary
        }
      }
    }; // Disable Popper.js if we have a static display

    if (this._config.display === 'static') {
      popperConfig.modifiers.applyStyle = {
        enabled: false
      };
    }

    return _extends({}, popperConfig, this._config.popperConfig);
  } // Static
  ;

  Dropdown.dropdownInterface = function dropdownInterface(element, config) {
    var data = Data.getData(element, DATA_KEY$4);

    var _config = _typeof(config) === 'object' ? config : null;

    if (!data) {
      data = new Dropdown(element, _config);
    }

    if (typeof config === 'string') {
      if (typeof data[config] === 'undefined') {
        throw new TypeError("No method named \"" + config + "\"");
      }

      data[config]();
    }
  };

  Dropdown.jQueryInterface = function jQueryInterface(config) {
    return this.each(function () {
      Dropdown.dropdownInterface(this, config);
    });
  };

  Dropdown.clearMenus = function clearMenus(event) {
    if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
      return;
    }

    var toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$2);

    for (var i = 0, len = toggles.length; i < len; i++) {
      var parent = Dropdown.getParentFromElement(toggles[i]);
      var context = Data.getData(toggles[i], DATA_KEY$4);
      var relatedTarget = {
        relatedTarget: toggles[i]
      };

      if (event && event.type === 'click') {
        relatedTarget.clickEvent = event;
      }

      if (!context) {
        continue;
      }

      var dropdownMenu = context._menu;

      if (!toggles[i].classList.contains(CLASS_NAME_SHOW$1)) {
        continue;
      }

      if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.key === TAB_KEY) && dropdownMenu.contains(event.target)) {
        continue;
      }

      var hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);

      if (hideEvent.defaultPrevented) {
        continue;
      } // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support


      if ('ontouchstart' in document.documentElement) {
        var _ref2;

        (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (elem) {
          return EventHandler.off(elem, 'mouseover', null, noop());
        });
      }

      toggles[i].setAttribute('aria-expanded', 'false');

      if (context._popper) {
        context._popper.destroy();
      }

      dropdownMenu.classList.remove(CLASS_NAME_SHOW$1);
      toggles[i].classList.remove(CLASS_NAME_SHOW$1);
      EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
    }
  };

  Dropdown.getParentFromElement = function getParentFromElement(element) {
    return getElementFromSelector(element) || element.parentNode;
  };

  Dropdown.dataApiKeydownHandler = function dataApiKeydownHandler(event) {
    // If not input/textarea:
    //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
    // If input/textarea:
    //  - If space key => not a dropdown command
    //  - If key is other than escape
    //    - If key is not up or down => not a dropdown command
    //    - If trigger inside the menu => not a dropdown command
    if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (this.disabled || this.classList.contains(CLASS_NAME_DISABLED)) {
      return;
    }

    var parent = Dropdown.getParentFromElement(this);
    var isActive = this.classList.contains(CLASS_NAME_SHOW$1);

    if (event.key === ESCAPE_KEY) {
      var button = this.matches(SELECTOR_DATA_TOGGLE$2) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$2)[0];
      button.focus();
      Dropdown.clearMenus();
      return;
    }

    if (!isActive || event.key === SPACE_KEY) {
      Dropdown.clearMenus();
      return;
    }

    var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, parent).filter(isVisible);

    if (!items.length) {
      return;
    }

    var index = items.indexOf(event.target);

    if (event.key === ARROW_UP_KEY && index > 0) {
      // Up
      index--;
    }

    if (event.key === ARROW_DOWN_KEY && index < items.length - 1) {
      // Down
      index++;
    } // index is -1 if the first keydown is an ArrowUp


    index = index === -1 ? 0 : index;
    items[index].focus();
  };

  Dropdown.getInstance = function getInstance(element) {
    return Data.getData(element, DATA_KEY$4);
  };

  _createClass(Dropdown, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$4;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$2;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$2;
    }
  }]);

  return Dropdown;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


exports.Dropdown = Dropdown;
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$4, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (event) {
  event.preventDefault();
  event.stopPropagation();
  Dropdown.dropdownInterface(this, 'toggle');
});
EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
  return e.stopPropagation();
});
var $$5 = getjQuery();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .dropdown to jQuery only if jQuery is present
 */

/* istanbul ignore if */

if ($$5) {
  var JQUERY_NO_CONFLICT$4 = $$5.fn[NAME$4];
  $$5.fn[NAME$4] = Dropdown.jQueryInterface;
  $$5.fn[NAME$4].Constructor = Dropdown;

  $$5.fn[NAME$4].noConflict = function () {
    $$5.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown.jQueryInterface;
  };
}
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$5 = 'modal';
var VERSION$5 = '5.0.0-alpha2';
var DATA_KEY$5 = 'bs.modal';
var EVENT_KEY$5 = "." + DATA_KEY$5;
var DATA_API_KEY$5 = '.data-api';
var ESCAPE_KEY$1 = 'Escape';
var Default$3 = {
  backdrop: true,
  keyboard: true,
  focus: true,
  show: true
};
var DefaultType$3 = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  focus: 'boolean',
  show: 'boolean'
};
var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
var EVENT_RESIZE = "resize" + EVENT_KEY$5;
var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5;
var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5;
var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
var CLASS_NAME_BACKDROP = 'modal-backdrop';
var CLASS_NAME_OPEN = 'modal-open';
var CLASS_NAME_FADE = 'fade';
var CLASS_NAME_SHOW$2 = 'show';
var CLASS_NAME_STATIC = 'modal-static';
var SELECTOR_DIALOG = '.modal-dialog';
var SELECTOR_MODAL_BODY = '.modal-body';
var SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]';
var SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]';
var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
var SELECTOR_STICKY_CONTENT = '.sticky-top';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Modal = /*#__PURE__*/function () {
  function Modal(element, config) {
    this._config = this._getConfig(config);
    this._element = element;
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, element);
    this._backdrop = null;
    this._isShown = false;
    this._isBodyOverflowing = false;
    this._ignoreBackdropClick = false;
    this._isTransitioning = false;
    this._scrollbarWidth = 0;
    Data.setData(element, DATA_KEY$5, this);
  } // Getters


  var _proto = Modal.prototype; // Public

  _proto.toggle = function toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  };

  _proto.show = function show(relatedTarget) {
    var _this = this;

    if (this._isShown || this._isTransitioning) {
      return;
    }

    if (this._element.classList.contains(CLASS_NAME_FADE)) {
      this._isTransitioning = true;
    }

    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
      relatedTarget: relatedTarget
    });

    if (this._isShown || showEvent.defaultPrevented) {
      return;
    }

    this._isShown = true;

    this._checkScrollbar();

    this._setScrollbar();

    this._adjustDialog();

    this._setEscapeEvent();

    this._setResizeEvent();

    EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
      return _this.hide(event);
    });
    EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
      EventHandler.one(_this._element, EVENT_MOUSEUP_DISMISS, function (event) {
        if (event.target === _this._element) {
          _this._ignoreBackdropClick = true;
        }
      });
    });

    this._showBackdrop(function () {
      return _this._showElement(relatedTarget);
    });
  };

  _proto.hide = function hide(event) {
    var _this2 = this;

    if (event) {
      event.preventDefault();
    }

    if (!this._isShown || this._isTransitioning) {
      return;
    }

    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

    if (hideEvent.defaultPrevented) {
      return;
    }

    this._isShown = false;

    var transition = this._element.classList.contains(CLASS_NAME_FADE);

    if (transition) {
      this._isTransitioning = true;
    }

    this._setEscapeEvent();

    this._setResizeEvent();

    EventHandler.off(document, EVENT_FOCUSIN);

    this._element.classList.remove(CLASS_NAME_SHOW$2);

    EventHandler.off(this._element, EVENT_CLICK_DISMISS);
    EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

    if (transition) {
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, function (event) {
        return _this2._hideModal(event);
      });
      emulateTransitionEnd(this._element, transitionDuration);
    } else {
      this._hideModal();
    }
  };

  _proto.dispose = function dispose() {
    [window, this._element, this._dialog].forEach(function (htmlElement) {
      return EventHandler.off(htmlElement, EVENT_KEY$5);
    });
    /**
     * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
     * Do not move `document` in `htmlElements` array
     * It will remove `EVENT_CLICK_DATA_API` event that should remain
     */

    EventHandler.off(document, EVENT_FOCUSIN);
    Data.removeData(this._element, DATA_KEY$5);
    this._config = null;
    this._element = null;
    this._dialog = null;
    this._backdrop = null;
    this._isShown = null;
    this._isBodyOverflowing = null;
    this._ignoreBackdropClick = null;
    this._isTransitioning = null;
    this._scrollbarWidth = null;
  };

  _proto.handleUpdate = function handleUpdate() {
    this._adjustDialog();
  } // Private
  ;

  _proto._getConfig = function _getConfig(config) {
    config = _extends({}, Default$3, config);
    typeCheckConfig(NAME$5, config, DefaultType$3);
    return config;
  };

  _proto._showElement = function _showElement(relatedTarget) {
    var _this3 = this;

    var transition = this._element.classList.contains(CLASS_NAME_FADE);

    var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

    if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
      // Don't move modal's DOM position
      document.body.appendChild(this._element);
    }

    this._element.style.display = 'block';

    this._element.removeAttribute('aria-hidden');

    this._element.setAttribute('aria-modal', true);

    this._element.setAttribute('role', 'dialog');

    this._element.scrollTop = 0;

    if (modalBody) {
      modalBody.scrollTop = 0;
    }

    if (transition) {
      reflow(this._element);
    }

    this._element.classList.add(CLASS_NAME_SHOW$2);

    if (this._config.focus) {
      this._enforceFocus();
    }

    var transitionComplete = function transitionComplete() {
      if (_this3._config.focus) {
        _this3._element.focus();
      }

      _this3._isTransitioning = false;
      EventHandler.trigger(_this3._element, EVENT_SHOWN$2, {
        relatedTarget: relatedTarget
      });
    };

    if (transition) {
      var transitionDuration = getTransitionDurationFromElement(this._dialog);
      EventHandler.one(this._dialog, TRANSITION_END, transitionComplete);
      emulateTransitionEnd(this._dialog, transitionDuration);
    } else {
      transitionComplete();
    }
  };

  _proto._enforceFocus = function _enforceFocus() {
    var _this4 = this;

    EventHandler.off(document, EVENT_FOCUSIN); // guard against infinite focus loop

    EventHandler.on(document, EVENT_FOCUSIN, function (event) {
      if (document !== event.target && _this4._element !== event.target && !_this4._element.contains(event.target)) {
        _this4._element.focus();
      }
    });
  };

  _proto._setEscapeEvent = function _setEscapeEvent() {
    var _this5 = this;

    if (this._isShown) {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
        if (_this5._config.keyboard && event.key === ESCAPE_KEY$1) {
          event.preventDefault();

          _this5.hide();
        } else if (!_this5._config.keyboard && event.key === ESCAPE_KEY$1) {
          _this5._triggerBackdropTransition();
        }
      });
    } else {
      EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS);
    }
  };

  _proto._setResizeEvent = function _setResizeEvent() {
    var _this6 = this;

    if (this._isShown) {
      EventHandler.on(window, EVENT_RESIZE, function () {
        return _this6._adjustDialog();
      });
    } else {
      EventHandler.off(window, EVENT_RESIZE);
    }
  };

  _proto._hideModal = function _hideModal() {
    var _this7 = this;

    this._element.style.display = 'none';

    this._element.setAttribute('aria-hidden', true);

    this._element.removeAttribute('aria-modal');

    this._element.removeAttribute('role');

    this._isTransitioning = false;

    this._showBackdrop(function () {
      document.body.classList.remove(CLASS_NAME_OPEN);

      _this7._resetAdjustments();

      _this7._resetScrollbar();

      EventHandler.trigger(_this7._element, EVENT_HIDDEN$2);
    });
  };

  _proto._removeBackdrop = function _removeBackdrop() {
    this._backdrop.parentNode.removeChild(this._backdrop);

    this._backdrop = null;
  };

  _proto._showBackdrop = function _showBackdrop(callback) {
    var _this8 = this;

    var animate = this._element.classList.contains(CLASS_NAME_FADE) ? CLASS_NAME_FADE : '';

    if (this._isShown && this._config.backdrop) {
      this._backdrop = document.createElement('div');
      this._backdrop.className = CLASS_NAME_BACKDROP;

      if (animate) {
        this._backdrop.classList.add(animate);
      }

      document.body.appendChild(this._backdrop);
      EventHandler.on(this._element, EVENT_CLICK_DISMISS, function (event) {
        if (_this8._ignoreBackdropClick) {
          _this8._ignoreBackdropClick = false;
          return;
        }

        if (event.target !== event.currentTarget) {
          return;
        }

        _this8._triggerBackdropTransition();
      });

      if (animate) {
        reflow(this._backdrop);
      }

      this._backdrop.classList.add(CLASS_NAME_SHOW$2);

      if (!animate) {
        callback();
        return;
      }

      var backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
      EventHandler.one(this._backdrop, TRANSITION_END, callback);
      emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
    } else if (!this._isShown && this._backdrop) {
      this._backdrop.classList.remove(CLASS_NAME_SHOW$2);

      var callbackRemove = function callbackRemove() {
        _this8._removeBackdrop();

        callback();
      };

      if (this._element.classList.contains(CLASS_NAME_FADE)) {
        var _backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);

        EventHandler.one(this._backdrop, TRANSITION_END, callbackRemove);
        emulateTransitionEnd(this._backdrop, _backdropTransitionDuration);
      } else {
        callbackRemove();
      }
    } else {
      callback();
    }
  };

  _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
    var _this9 = this;

    if (this._config.backdrop === 'static') {
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

      if (hideEvent.defaultPrevented) {
        return;
      }

      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }

      this._element.classList.add(CLASS_NAME_STATIC);

      var modalTransitionDuration = getTransitionDurationFromElement(this._dialog);
      EventHandler.off(this._element, TRANSITION_END);
      EventHandler.one(this._element, TRANSITION_END, function () {
        _this9._element.classList.remove(CLASS_NAME_STATIC);

        if (!isModalOverflowing) {
          EventHandler.one(_this9._element, TRANSITION_END, function () {
            _this9._element.style.overflowY = '';
          });
          emulateTransitionEnd(_this9._element, modalTransitionDuration);
        }
      });
      emulateTransitionEnd(this._element, modalTransitionDuration);

      this._element.focus();
    } else {
      this.hide();
    }
  } // ----------------------------------------------------------------------
  // the following methods are used to handle overflowing modals
  // ----------------------------------------------------------------------
  ;

  _proto._adjustDialog = function _adjustDialog() {
    var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

    if (!this._isBodyOverflowing && isModalOverflowing) {
      this._element.style.paddingLeft = this._scrollbarWidth + "px";
    }

    if (this._isBodyOverflowing && !isModalOverflowing) {
      this._element.style.paddingRight = this._scrollbarWidth + "px";
    }
  };

  _proto._resetAdjustments = function _resetAdjustments() {
    this._element.style.paddingLeft = '';
    this._element.style.paddingRight = '';
  };

  _proto._checkScrollbar = function _checkScrollbar() {
    var rect = document.body.getBoundingClientRect();
    this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
    this._scrollbarWidth = this._getScrollbarWidth();
  };

  _proto._setScrollbar = function _setScrollbar() {
    var _this10 = this;

    if (this._isBodyOverflowing) {
      // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
      //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
      // Adjust fixed content padding
      SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (element) {
        var actualPadding = element.style.paddingRight;
        var calculatedPadding = window.getComputedStyle(element)['padding-right'];
        Manipulator.setDataAttribute(element, 'padding-right', actualPadding);
        element.style.paddingRight = parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px";
      }); // Adjust sticky content margin

      SelectorEngine.find(SELECTOR_STICKY_CONTENT).forEach(function (element) {
        var actualMargin = element.style.marginRight;
        var calculatedMargin = window.getComputedStyle(element)['margin-right'];
        Manipulator.setDataAttribute(element, 'margin-right', actualMargin);
        element.style.marginRight = parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px";
      }); // Adjust body padding

      var actualPadding = document.body.style.paddingRight;
      var calculatedPadding = window.getComputedStyle(document.body)['padding-right'];
      Manipulator.setDataAttribute(document.body, 'padding-right', actualPadding);
      document.body.style.paddingRight = parseFloat(calculatedPadding) + this._scrollbarWidth + "px";
    }

    document.body.classList.add(CLASS_NAME_OPEN);
  };

  _proto._resetScrollbar = function _resetScrollbar() {
    // Restore fixed content padding
    SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (element) {
      var padding = Manipulator.getDataAttribute(element, 'padding-right');

      if (typeof padding !== 'undefined') {
        Manipulator.removeDataAttribute(element, 'padding-right');
        element.style.paddingRight = padding;
      }
    }); // Restore sticky content and navbar-toggler margin

    SelectorEngine.find("" + SELECTOR_STICKY_CONTENT).forEach(function (element) {
      var margin = Manipulator.getDataAttribute(element, 'margin-right');

      if (typeof margin !== 'undefined') {
        Manipulator.removeDataAttribute(element, 'margin-right');
        element.style.marginRight = margin;
      }
    }); // Restore body padding

    var padding = Manipulator.getDataAttribute(document.body, 'padding-right');

    if (typeof padding === 'undefined') {
      document.body.style.paddingRight = '';
    } else {
      Manipulator.removeDataAttribute(document.body, 'padding-right');
      document.body.style.paddingRight = padding;
    }
  };

  _proto._getScrollbarWidth = function _getScrollbarWidth() {
    // thx d.walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  } // Static
  ;

  Modal.jQueryInterface = function jQueryInterface(config, relatedTarget) {
    return this.each(function () {
      var data = Data.getData(this, DATA_KEY$5);

      var _config = _extends({}, Default$3, Manipulator.getDataAttributes(this), _typeof(config) === 'object' && config ? config : {});

      if (!data) {
        data = new Modal(this, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config](relatedTarget);
      } else if (_config.show) {
        data.show(relatedTarget);
      }
    });
  };

  Modal.getInstance = function getInstance(element) {
    return Data.getData(element, DATA_KEY$5);
  };

  _createClass(Modal, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$5;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$3;
    }
  }]);

  return Modal;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


exports.Modal = Modal;
EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (event) {
  var _this11 = this;

  var target = getElementFromSelector(this);

  if (this.tagName === 'A' || this.tagName === 'AREA') {
    event.preventDefault();
  }

  EventHandler.one(target, EVENT_SHOW$2, function (showEvent) {
    if (showEvent.defaultPrevented) {
      // only register focus restorer if modal will actually get shown
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$2, function () {
      if (isVisible(_this11)) {
        _this11.focus();
      }
    });
  });
  var data = Data.getData(target, DATA_KEY$5);

  if (!data) {
    var config = _extends({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));

    data = new Modal(target, config);
  }

  data.show(this);
});
var $$6 = getjQuery();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .modal to jQuery only if jQuery is present
 */

/* istanbul ignore if */

if ($$6) {
  var JQUERY_NO_CONFLICT$5 = $$6.fn[NAME$5];
  $$6.fn[NAME$5] = Modal.jQueryInterface;
  $$6.fn[NAME$5].Constructor = Modal;

  $$6.fn[NAME$5].noConflict = function () {
    $$6.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal.jQueryInterface;
  };
}
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha2): util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */

var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
/**
 * A pattern that matches safe data URLs. Only matches image, video and audio types.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */

var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
  var attrName = attr.nodeName.toLowerCase();

  if (allowedAttributeList.indexOf(attrName) !== -1) {
    if (uriAttrs.indexOf(attrName) !== -1) {
      return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
    }

    return true;
  }

  var regExp = allowedAttributeList.filter(function (attrRegex) {
    return attrRegex instanceof RegExp;
  }); // Check if a regular expression validates the attribute.

  for (var i = 0, len = regExp.length; i < len; i++) {
    if (attrName.match(regExp[i])) {
      return true;
    }
  }

  return false;
};

var DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};

function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
  var _ref;

  if (!unsafeHtml.length) {
    return unsafeHtml;
  }

  if (sanitizeFn && typeof sanitizeFn === 'function') {
    return sanitizeFn(unsafeHtml);
  }

  var domParser = new window.DOMParser();
  var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
  var allowlistKeys = Object.keys(allowList);

  var elements = (_ref = []).concat.apply(_ref, createdDocument.body.querySelectorAll('*'));

  var _loop = function _loop(i, len) {
    var _ref2;

    var el = elements[i];
    var elName = el.nodeName.toLowerCase();

    if (allowlistKeys.indexOf(elName) === -1) {
      el.parentNode.removeChild(el);
      return "continue";
    }

    var attributeList = (_ref2 = []).concat.apply(_ref2, el.attributes);

    var allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
    attributeList.forEach(function (attr) {
      if (!allowedAttribute(attr, allowedAttributes)) {
        el.removeAttribute(attr.nodeName);
      }
    });
  };

  for (var i = 0, len = elements.length; i < len; i++) {
    var _ret = _loop(i);

    if (_ret === "continue") continue;
  }

  return createdDocument.body.innerHTML;
}
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$6 = 'tooltip';
var VERSION$6 = '5.0.0-alpha2';
var DATA_KEY$6 = 'bs.tooltip';
var EVENT_KEY$6 = "." + DATA_KEY$6;
var CLASS_PREFIX = 'bs-tooltip';
var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
var DISALLOWED_ATTRIBUTES = ['sanitize', 'allowList', 'sanitizeFn'];
var DefaultType$4 = {
  animation: 'boolean',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string',
  delay: '(number|object)',
  html: 'boolean',
  selector: '(string|boolean)',
  placement: '(string|function)',
  offset: '(number|string|function)',
  container: '(string|element|boolean)',
  fallbackPlacement: '(string|array)',
  boundary: '(string|element)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  allowList: 'object',
  popperConfig: '(null|object)'
};
var AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
};
var Default$4 = {
  animation: true,
  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
  trigger: 'hover focus',
  title: '',
  delay: 0,
  html: false,
  selector: false,
  placement: 'top',
  offset: 0,
  container: false,
  fallbackPlacement: 'flip',
  boundary: 'scrollParent',
  sanitize: true,
  sanitizeFn: null,
  allowList: DefaultAllowlist,
  popperConfig: null
};
var Event$1 = {
  HIDE: "hide" + EVENT_KEY$6,
  HIDDEN: "hidden" + EVENT_KEY$6,
  SHOW: "show" + EVENT_KEY$6,
  SHOWN: "shown" + EVENT_KEY$6,
  INSERTED: "inserted" + EVENT_KEY$6,
  CLICK: "click" + EVENT_KEY$6,
  FOCUSIN: "focusin" + EVENT_KEY$6,
  FOCUSOUT: "focusout" + EVENT_KEY$6,
  MOUSEENTER: "mouseenter" + EVENT_KEY$6,
  MOUSELEAVE: "mouseleave" + EVENT_KEY$6
};
var CLASS_NAME_FADE$1 = 'fade';
var CLASS_NAME_MODAL = 'modal';
var CLASS_NAME_SHOW$3 = 'show';
var HOVER_STATE_SHOW = 'show';
var HOVER_STATE_OUT = 'out';
var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
var TRIGGER_HOVER = 'hover';
var TRIGGER_FOCUS = 'focus';
var TRIGGER_CLICK = 'click';
var TRIGGER_MANUAL = 'manual';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Tooltip = /*#__PURE__*/function () {
  function Tooltip(element, config) {
    if (typeof _popper["default"] === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org)');
    } // private


    this._isEnabled = true;
    this._timeout = 0;
    this._hoverState = '';
    this._activeTrigger = {};
    this._popper = null; // Protected

    this.element = element;
    this.config = this._getConfig(config);
    this.tip = null;

    this._setListeners();

    Data.setData(element, this.constructor.DATA_KEY, this);
  } // Getters


  var _proto = Tooltip.prototype; // Public

  _proto.enable = function enable() {
    this._isEnabled = true;
  };

  _proto.disable = function disable() {
    this._isEnabled = false;
  };

  _proto.toggleEnabled = function toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  };

  _proto.toggle = function toggle(event) {
    if (!this._isEnabled) {
      return;
    }

    if (event) {
      var dataKey = this.constructor.DATA_KEY;
      var context = Data.getData(event.delegateTarget, dataKey);

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.setData(event.delegateTarget, dataKey, context);
      }

      context._activeTrigger.click = !context._activeTrigger.click;

      if (context._isWithActiveTrigger()) {
        context._enter(null, context);
      } else {
        context._leave(null, context);
      }
    } else {
      if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) {
        this._leave(null, this);

        return;
      }

      this._enter(null, this);
    }
  };

  _proto.dispose = function dispose() {
    clearTimeout(this._timeout);
    Data.removeData(this.element, this.constructor.DATA_KEY);
    EventHandler.off(this.element, this.constructor.EVENT_KEY);
    EventHandler.off(this.element.closest("." + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler);

    if (this.tip) {
      this.tip.parentNode.removeChild(this.tip);
    }

    this._isEnabled = null;
    this._timeout = null;
    this._hoverState = null;
    this._activeTrigger = null;

    if (this._popper) {
      this._popper.destroy();
    }

    this._popper = null;
    this.element = null;
    this.config = null;
    this.tip = null;
  };

  _proto.show = function show() {
    var _this = this;

    if (this.element.style.display === 'none') {
      throw new Error('Please use show on visible elements');
    }

    if (this.isWithContent() && this._isEnabled) {
      var showEvent = EventHandler.trigger(this.element, this.constructor.Event.SHOW);
      var shadowRoot = findShadowRoot(this.element);
      var isInTheDom = shadowRoot === null ? this.element.ownerDocument.documentElement.contains(this.element) : shadowRoot.contains(this.element);

      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }

      var tip = this.getTipElement();
      var tipId = getUID(this.constructor.NAME);
      tip.setAttribute('id', tipId);
      this.element.setAttribute('aria-describedby', tipId);
      this.setContent();

      if (this.config.animation) {
        tip.classList.add(CLASS_NAME_FADE$1);
      }

      var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

      var attachment = this._getAttachment(placement);

      this._addAttachmentClass(attachment);

      var container = this._getContainer();

      Data.setData(tip, this.constructor.DATA_KEY, this);

      if (!this.element.ownerDocument.documentElement.contains(this.tip)) {
        container.appendChild(tip);
      }

      EventHandler.trigger(this.element, this.constructor.Event.INSERTED);
      this._popper = new _popper["default"](this.element, tip, this._getPopperConfig(attachment));
      tip.classList.add(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

      if ('ontouchstart' in document.documentElement) {
        var _ref;

        (_ref = []).concat.apply(_ref, document.body.children).forEach(function (element) {
          EventHandler.on(element, 'mouseover', noop());
        });
      }

      var complete = function complete() {
        if (_this.config.animation) {
          _this._fixTransition();
        }

        var prevHoverState = _this._hoverState;
        _this._hoverState = null;
        EventHandler.trigger(_this.element, _this.constructor.Event.SHOWN);

        if (prevHoverState === HOVER_STATE_OUT) {
          _this._leave(null, _this);
        }
      };

      if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
        var transitionDuration = getTransitionDurationFromElement(this.tip);
        EventHandler.one(this.tip, TRANSITION_END, complete);
        emulateTransitionEnd(this.tip, transitionDuration);
      } else {
        complete();
      }
    }
  };

  _proto.hide = function hide() {
    var _this2 = this;

    if (!this._popper) {
      return;
    }

    var tip = this.getTipElement();

    var complete = function complete() {
      if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
        tip.parentNode.removeChild(tip);
      }

      _this2._cleanTipClass();

      _this2.element.removeAttribute('aria-describedby');

      EventHandler.trigger(_this2.element, _this2.constructor.Event.HIDDEN);

      _this2._popper.destroy();
    };

    var hideEvent = EventHandler.trigger(this.element, this.constructor.Event.HIDE);

    if (hideEvent.defaultPrevented) {
      return;
    }

    tip.classList.remove(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support

    if ('ontouchstart' in document.documentElement) {
      var _ref2;

      (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (element) {
        return EventHandler.off(element, 'mouseover', noop);
      });
    }

    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;

    if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
      var transitionDuration = getTransitionDurationFromElement(tip);
      EventHandler.one(tip, TRANSITION_END, complete);
      emulateTransitionEnd(tip, transitionDuration);
    } else {
      complete();
    }

    this._hoverState = '';
  };

  _proto.update = function update() {
    if (this._popper !== null) {
      this._popper.scheduleUpdate();
    }
  } // Protected
  ;

  _proto.isWithContent = function isWithContent() {
    return Boolean(this.getTitle());
  };

  _proto.getTipElement = function getTipElement() {
    if (this.tip) {
      return this.tip;
    }

    var element = document.createElement('div');
    element.innerHTML = this.config.template;
    this.tip = element.children[0];
    return this.tip;
  };

  _proto.setContent = function setContent() {
    var tip = this.getTipElement();
    this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
    tip.classList.remove(CLASS_NAME_FADE$1, CLASS_NAME_SHOW$3);
  };

  _proto.setElementContent = function setElementContent(element, content) {
    if (element === null) {
      return;
    }

    if (_typeof(content) === 'object' && isElement(content)) {
      if (content.jquery) {
        content = content[0];
      } // content is a DOM node or a jQuery


      if (this.config.html) {
        if (content.parentNode !== element) {
          element.innerHTML = '';
          element.appendChild(content);
        }
      } else {
        element.textContent = content.textContent;
      }

      return;
    }

    if (this.config.html) {
      if (this.config.sanitize) {
        content = sanitizeHtml(content, this.config.allowList, this.config.sanitizeFn);
      }

      element.innerHTML = content;
    } else {
      element.textContent = content;
    }
  };

  _proto.getTitle = function getTitle() {
    var title = this.element.getAttribute('data-original-title');

    if (!title) {
      title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
    }

    return title;
  } // Private
  ;

  _proto._getPopperConfig = function _getPopperConfig(attachment) {
    var _this3 = this;

    var defaultBsConfig = {
      placement: attachment,
      modifiers: {
        offset: this._getOffset(),
        flip: {
          behavior: this.config.fallbackPlacement
        },
        arrow: {
          element: "." + this.constructor.NAME + "-arrow"
        },
        preventOverflow: {
          boundariesElement: this.config.boundary
        }
      },
      onCreate: function onCreate(data) {
        if (data.originalPlacement !== data.placement) {
          _this3._handlePopperPlacementChange(data);
        }
      },
      onUpdate: function onUpdate(data) {
        return _this3._handlePopperPlacementChange(data);
      }
    };
    return _extends({}, defaultBsConfig, this.config.popperConfig);
  };

  _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
    this.getTipElement().classList.add(CLASS_PREFIX + "-" + attachment);
  };

  _proto._getOffset = function _getOffset() {
    var _this4 = this;

    var offset = {};

    if (typeof this.config.offset === 'function') {
      offset.fn = function (data) {
        data.offsets = _extends({}, data.offsets, _this4.config.offset(data.offsets, _this4.element) || {});
        return data;
      };
    } else {
      offset.offset = this.config.offset;
    }

    return offset;
  };

  _proto._getContainer = function _getContainer() {
    if (this.config.container === false) {
      return document.body;
    }

    if (isElement(this.config.container)) {
      return this.config.container;
    }

    return SelectorEngine.findOne(this.config.container);
  };

  _proto._getAttachment = function _getAttachment(placement) {
    return AttachmentMap[placement.toUpperCase()];
  };

  _proto._setListeners = function _setListeners() {
    var _this5 = this;

    var triggers = this.config.trigger.split(' ');
    triggers.forEach(function (trigger) {
      if (trigger === 'click') {
        EventHandler.on(_this5.element, _this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
          return _this5.toggle(event);
        });
      } else if (trigger !== TRIGGER_MANUAL) {
        var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
        var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
        EventHandler.on(_this5.element, eventIn, _this5.config.selector, function (event) {
          return _this5._enter(event);
        });
        EventHandler.on(_this5.element, eventOut, _this5.config.selector, function (event) {
          return _this5._leave(event);
        });
      }
    });

    this._hideModalHandler = function () {
      if (_this5.element) {
        _this5.hide();
      }
    };

    EventHandler.on(this.element.closest("." + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler);

    if (this.config.selector) {
      this.config = _extends({}, this.config, {
        trigger: 'manual',
        selector: ''
      });
    } else {
      this._fixTitle();
    }
  };

  _proto._fixTitle = function _fixTitle() {
    var titleType = _typeof(this.element.getAttribute('data-original-title'));

    if (this.element.getAttribute('title') || titleType !== 'string') {
      this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
      this.element.setAttribute('title', '');
    }
  };

  _proto._enter = function _enter(event, context) {
    var dataKey = this.constructor.DATA_KEY;
    context = context || Data.getData(event.delegateTarget, dataKey);

    if (!context) {
      context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
      Data.setData(event.delegateTarget, dataKey, context);
    }

    if (event) {
      context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
    }

    if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
      context._hoverState = HOVER_STATE_SHOW;
      return;
    }

    clearTimeout(context._timeout);
    context._hoverState = HOVER_STATE_SHOW;

    if (!context.config.delay || !context.config.delay.show) {
      context.show();
      return;
    }

    context._timeout = setTimeout(function () {
      if (context._hoverState === HOVER_STATE_SHOW) {
        context.show();
      }
    }, context.config.delay.show);
  };

  _proto._leave = function _leave(event, context) {
    var dataKey = this.constructor.DATA_KEY;
    context = context || Data.getData(event.delegateTarget, dataKey);

    if (!context) {
      context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
      Data.setData(event.delegateTarget, dataKey, context);
    }

    if (event) {
      context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
    }

    if (context._isWithActiveTrigger()) {
      return;
    }

    clearTimeout(context._timeout);
    context._hoverState = HOVER_STATE_OUT;

    if (!context.config.delay || !context.config.delay.hide) {
      context.hide();
      return;
    }

    context._timeout = setTimeout(function () {
      if (context._hoverState === HOVER_STATE_OUT) {
        context.hide();
      }
    }, context.config.delay.hide);
  };

  _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
    for (var trigger in this._activeTrigger) {
      if (this._activeTrigger[trigger]) {
        return true;
      }
    }

    return false;
  };

  _proto._getConfig = function _getConfig(config) {
    var dataAttributes = Manipulator.getDataAttributes(this.element);
    Object.keys(dataAttributes).forEach(function (dataAttr) {
      if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
        delete dataAttributes[dataAttr];
      }
    });

    if (config && _typeof(config.container) === 'object' && config.container.jquery) {
      config.container = config.container[0];
    }

    config = _extends({}, this.constructor.Default, dataAttributes, _typeof(config) === 'object' && config ? config : {});

    if (typeof config.delay === 'number') {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }

    if (typeof config.title === 'number') {
      config.title = config.title.toString();
    }

    if (typeof config.content === 'number') {
      config.content = config.content.toString();
    }

    typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

    if (config.sanitize) {
      config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
    }

    return config;
  };

  _proto._getDelegateConfig = function _getDelegateConfig() {
    var config = {};

    if (this.config) {
      for (var key in this.config) {
        if (this.constructor.Default[key] !== this.config[key]) {
          config[key] = this.config[key];
        }
      }
    }

    return config;
  };

  _proto._cleanTipClass = function _cleanTipClass() {
    var tip = this.getTipElement();
    var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

    if (tabClass !== null && tabClass.length > 0) {
      tabClass.map(function (token) {
        return token.trim();
      }).forEach(function (tClass) {
        return tip.classList.remove(tClass);
      });
    }
  };

  _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
    this.tip = popperData.instance.popper;

    this._cleanTipClass();

    this._addAttachmentClass(this._getAttachment(popperData.placement));
  };

  _proto._fixTransition = function _fixTransition() {
    var tip = this.getTipElement();
    var initConfigAnimation = this.config.animation;

    if (tip.getAttribute('x-placement') !== null) {
      return;
    }

    tip.classList.remove(CLASS_NAME_FADE$1);
    this.config.animation = false;
    this.hide();
    this.show();
    this.config.animation = initConfigAnimation;
  } // Static
  ;

  Tooltip.jQueryInterface = function jQueryInterface(config) {
    return this.each(function () {
      var data = Data.getData(this, DATA_KEY$6);

      var _config = _typeof(config) === 'object' && config;

      if (!data && /dispose|hide/.test(config)) {
        return;
      }

      if (!data) {
        data = new Tooltip(this, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    });
  };

  Tooltip.getInstance = function getInstance(element) {
    return Data.getData(element, DATA_KEY$6);
  };

  _createClass(Tooltip, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$6;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$4;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$6;
    }
  }, {
    key: "DATA_KEY",
    get: function get() {
      return DATA_KEY$6;
    }
  }, {
    key: "Event",
    get: function get() {
      return Event$1;
    }
  }, {
    key: "EVENT_KEY",
    get: function get() {
      return EVENT_KEY$6;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$4;
    }
  }]);

  return Tooltip;
}();

exports.Tooltip = Tooltip;
var $$7 = getjQuery();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .tooltip to jQuery only if jQuery is present
 */

/* istanbul ignore if */

if ($$7) {
  var JQUERY_NO_CONFLICT$6 = $$7.fn[NAME$6];
  $$7.fn[NAME$6] = Tooltip.jQueryInterface;
  $$7.fn[NAME$6].Constructor = Tooltip;

  $$7.fn[NAME$6].noConflict = function () {
    $$7.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip.jQueryInterface;
  };
}
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$7 = 'popover';
var VERSION$7 = '5.0.0-alpha2';
var DATA_KEY$7 = 'bs.popover';
var EVENT_KEY$7 = "." + DATA_KEY$7;
var CLASS_PREFIX$1 = 'bs-popover';
var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

var Default$5 = _extends({}, Tooltip.Default, {
  placement: 'right',
  trigger: 'click',
  content: '',
  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
});

var DefaultType$5 = _extends({}, Tooltip.DefaultType, {
  content: '(string|element|function)'
});

var Event$2 = {
  HIDE: "hide" + EVENT_KEY$7,
  HIDDEN: "hidden" + EVENT_KEY$7,
  SHOW: "show" + EVENT_KEY$7,
  SHOWN: "shown" + EVENT_KEY$7,
  INSERTED: "inserted" + EVENT_KEY$7,
  CLICK: "click" + EVENT_KEY$7,
  FOCUSIN: "focusin" + EVENT_KEY$7,
  FOCUSOUT: "focusout" + EVENT_KEY$7,
  MOUSEENTER: "mouseenter" + EVENT_KEY$7,
  MOUSELEAVE: "mouseleave" + EVENT_KEY$7
};
var CLASS_NAME_FADE$2 = 'fade';
var CLASS_NAME_SHOW$4 = 'show';
var SELECTOR_TITLE = '.popover-header';
var SELECTOR_CONTENT = '.popover-body';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Popover = /*#__PURE__*/function (_Tooltip) {
  _inheritsLoose(Popover, _Tooltip);

  function Popover() {
    return _Tooltip.apply(this, arguments) || this;
  }

  var _proto = Popover.prototype; // Overrides

  _proto.isWithContent = function isWithContent() {
    return this.getTitle() || this._getContent();
  };

  _proto.setContent = function setContent() {
    var tip = this.getTipElement(); // we use append for html objects to maintain js events

    this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());

    var content = this._getContent();

    if (typeof content === 'function') {
      content = content.call(this.element);
    }

    this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$4);
  } // Private
  ;

  _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
    this.getTipElement().classList.add(CLASS_PREFIX$1 + "-" + attachment);
  };

  _proto._getContent = function _getContent() {
    return this.element.getAttribute('data-content') || this.config.content;
  };

  _proto._cleanTipClass = function _cleanTipClass() {
    var tip = this.getTipElement();
    var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);

    if (tabClass !== null && tabClass.length > 0) {
      tabClass.map(function (token) {
        return token.trim();
      }).forEach(function (tClass) {
        return tip.classList.remove(tClass);
      });
    }
  } // Static
  ;

  Popover.jQueryInterface = function jQueryInterface(config) {
    return this.each(function () {
      var data = Data.getData(this, DATA_KEY$7);

      var _config = _typeof(config) === 'object' ? config : null;

      if (!data && /dispose|hide/.test(config)) {
        return;
      }

      if (!data) {
        data = new Popover(this, _config);
        Data.setData(this, DATA_KEY$7, data);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    });
  };

  Popover.getInstance = function getInstance(element) {
    return Data.getData(element, DATA_KEY$7);
  };

  _createClass(Popover, null, [{
    key: "VERSION",
    // Getters
    get: function get() {
      return VERSION$7;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$5;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$7;
    }
  }, {
    key: "DATA_KEY",
    get: function get() {
      return DATA_KEY$7;
    }
  }, {
    key: "Event",
    get: function get() {
      return Event$2;
    }
  }, {
    key: "EVENT_KEY",
    get: function get() {
      return EVENT_KEY$7;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$5;
    }
  }]);

  return Popover;
}(Tooltip);

exports.Popover = Popover;
var $$8 = getjQuery();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

/* istanbul ignore if */

if ($$8) {
  var JQUERY_NO_CONFLICT$7 = $$8.fn[NAME$7];
  $$8.fn[NAME$7] = Popover.jQueryInterface;
  $$8.fn[NAME$7].Constructor = Popover;

  $$8.fn[NAME$7].noConflict = function () {
    $$8.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover.jQueryInterface;
  };
}
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$8 = 'scrollspy';
var VERSION$8 = '5.0.0-alpha2';
var DATA_KEY$8 = 'bs.scrollspy';
var EVENT_KEY$8 = "." + DATA_KEY$8;
var DATA_API_KEY$6 = '.data-api';
var Default$6 = {
  offset: 10,
  method: 'auto',
  target: ''
};
var DefaultType$6 = {
  offset: 'number',
  method: 'string',
  target: '(string|element)'
};
var EVENT_ACTIVATE = "activate" + EVENT_KEY$8;
var EVENT_SCROLL = "scroll" + EVENT_KEY$8;
var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$8 + DATA_API_KEY$6;
var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
var CLASS_NAME_ACTIVE$2 = 'active';
var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
var SELECTOR_NAV_LINKS = '.nav-link';
var SELECTOR_NAV_ITEMS = '.nav-item';
var SELECTOR_LIST_ITEMS = '.list-group-item';
var SELECTOR_DROPDOWN = '.dropdown';
var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
var METHOD_OFFSET = 'offset';
var METHOD_POSITION = 'position';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var ScrollSpy = /*#__PURE__*/function () {
  function ScrollSpy(element, config) {
    var _this = this;

    this._element = element;
    this._scrollElement = element.tagName === 'BODY' ? window : element;
    this._config = this._getConfig(config);
    this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + ", " + this._config.target + " " + SELECTOR_LIST_ITEMS + ", " + this._config.target + " ." + CLASS_NAME_DROPDOWN_ITEM;
    this._offsets = [];
    this._targets = [];
    this._activeTarget = null;
    this._scrollHeight = 0;
    EventHandler.on(this._scrollElement, EVENT_SCROLL, function (event) {
      return _this._process(event);
    });
    this.refresh();

    this._process();

    Data.setData(element, DATA_KEY$8, this);
  } // Getters


  var _proto = ScrollSpy.prototype; // Public

  _proto.refresh = function refresh() {
    var _this2 = this;

    var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
    var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
    var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
    this._offsets = [];
    this._targets = [];
    this._scrollHeight = this._getScrollHeight();
    var targets = SelectorEngine.find(this._selector);
    targets.map(function (element) {
      var targetSelector = getSelectorFromElement(element);
      var target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

      if (target) {
        var targetBCR = target.getBoundingClientRect();

        if (targetBCR.width || targetBCR.height) {
          return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
        }
      }

      return null;
    }).filter(function (item) {
      return item;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).forEach(function (item) {
      _this2._offsets.push(item[0]);

      _this2._targets.push(item[1]);
    });
  };

  _proto.dispose = function dispose() {
    Data.removeData(this._element, DATA_KEY$8);
    EventHandler.off(this._scrollElement, EVENT_KEY$8);
    this._element = null;
    this._scrollElement = null;
    this._config = null;
    this._selector = null;
    this._offsets = null;
    this._targets = null;
    this._activeTarget = null;
    this._scrollHeight = null;
  } // Private
  ;

  _proto._getConfig = function _getConfig(config) {
    config = _extends({}, Default$6, _typeof(config) === 'object' && config ? config : {});

    if (typeof config.target !== 'string' && isElement(config.target)) {
      var id = config.target.id;

      if (!id) {
        id = getUID(NAME$8);
        config.target.id = id;
      }

      config.target = "#" + id;
    }

    typeCheckConfig(NAME$8, config, DefaultType$6);
    return config;
  };

  _proto._getScrollTop = function _getScrollTop() {
    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
  };

  _proto._getScrollHeight = function _getScrollHeight() {
    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  };

  _proto._getOffsetHeight = function _getOffsetHeight() {
    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
  };

  _proto._process = function _process() {
    var scrollTop = this._getScrollTop() + this._config.offset;

    var scrollHeight = this._getScrollHeight();

    var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

    if (this._scrollHeight !== scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      var target = this._targets[this._targets.length - 1];

      if (this._activeTarget !== target) {
        this._activate(target);
      }

      return;
    }

    if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
      this._activeTarget = null;

      this._clear();

      return;
    }

    for (var i = this._offsets.length; i--;) {
      var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

      if (isActiveTarget) {
        this._activate(this._targets[i]);
      }
    }
  };

  _proto._activate = function _activate(target) {
    this._activeTarget = target;

    this._clear();

    var queries = this._selector.split(',').map(function (selector) {
      return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
    });

    var link = SelectorEngine.findOne(queries.join(','));

    if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, link.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$2);
      link.classList.add(CLASS_NAME_ACTIVE$2);
    } else {
      // Set triggered link as active
      link.classList.add(CLASS_NAME_ACTIVE$2);
      SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP).forEach(function (listGroup) {
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        SelectorEngine.prev(listGroup, SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).forEach(function (item) {
          return item.classList.add(CLASS_NAME_ACTIVE$2);
        }); // Handle special case when .nav-link is inside .nav-item

        SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function (navItem) {
          SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function (item) {
            return item.classList.add(CLASS_NAME_ACTIVE$2);
          });
        });
      });
    }

    EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
      relatedTarget: target
    });
  };

  _proto._clear = function _clear() {
    SelectorEngine.find(this._selector).filter(function (node) {
      return node.classList.contains(CLASS_NAME_ACTIVE$2);
    }).forEach(function (node) {
      return node.classList.remove(CLASS_NAME_ACTIVE$2);
    });
  } // Static
  ;

  ScrollSpy.jQueryInterface = function jQueryInterface(config) {
    return this.each(function () {
      var data = Data.getData(this, DATA_KEY$8);

      var _config = _typeof(config) === 'object' && config;

      if (!data) {
        data = new ScrollSpy(this, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    });
  };

  ScrollSpy.getInstance = function getInstance(element) {
    return Data.getData(element, DATA_KEY$8);
  };

  _createClass(ScrollSpy, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$8;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$6;
    }
  }]);

  return ScrollSpy;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


exports.ScrollSpy = ScrollSpy;
EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
  SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function (spy) {
    return new ScrollSpy(spy, Manipulator.getDataAttributes(spy));
  });
});
var $$9 = getjQuery();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

/* istanbul ignore if */

if ($$9) {
  var JQUERY_NO_CONFLICT$8 = $$9.fn[NAME$8];
  $$9.fn[NAME$8] = ScrollSpy.jQueryInterface;
  $$9.fn[NAME$8].Constructor = ScrollSpy;

  $$9.fn[NAME$8].noConflict = function () {
    $$9.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy.jQueryInterface;
  };
}
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$9 = 'tab';
var VERSION$9 = '5.0.0-alpha2';
var DATA_KEY$9 = 'bs.tab';
var EVENT_KEY$9 = "." + DATA_KEY$9;
var DATA_API_KEY$7 = '.data-api';
var EVENT_HIDE$3 = "hide" + EVENT_KEY$9;
var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9;
var EVENT_SHOW$3 = "show" + EVENT_KEY$9;
var EVENT_SHOWN$3 = "shown" + EVENT_KEY$9;
var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7;
var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
var CLASS_NAME_ACTIVE$3 = 'active';
var CLASS_NAME_DISABLED$1 = 'disabled';
var CLASS_NAME_FADE$3 = 'fade';
var CLASS_NAME_SHOW$5 = 'show';
var SELECTOR_DROPDOWN$1 = '.dropdown';
var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
var SELECTOR_ACTIVE$1 = '.active';
var SELECTOR_ACTIVE_UL = ':scope > li > .active';
var SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
var SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Tab = /*#__PURE__*/function () {
  function Tab(element) {
    this._element = element;
    Data.setData(this._element, DATA_KEY$9, this);
  } // Getters


  var _proto = Tab.prototype; // Public

  _proto.show = function show() {
    var _this = this;

    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE$3) || this._element.classList.contains(CLASS_NAME_DISABLED$1)) {
      return;
    }

    var previous;
    var target = getElementFromSelector(this._element);

    var listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP$1);

    if (listElement) {
      var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$1;
      previous = SelectorEngine.find(itemSelector, listElement);
      previous = previous[previous.length - 1];
    }

    var hideEvent = null;

    if (previous) {
      hideEvent = EventHandler.trigger(previous, EVENT_HIDE$3, {
        relatedTarget: this._element
      });
    }

    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
      relatedTarget: previous
    });

    if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
      return;
    }

    this._activate(this._element, listElement);

    var complete = function complete() {
      EventHandler.trigger(previous, EVENT_HIDDEN$3, {
        relatedTarget: _this._element
      });
      EventHandler.trigger(_this._element, EVENT_SHOWN$3, {
        relatedTarget: previous
      });
    };

    if (target) {
      this._activate(target, target.parentNode, complete);
    } else {
      complete();
    }
  };

  _proto.dispose = function dispose() {
    Data.removeData(this._element, DATA_KEY$9);
    this._element = null;
  } // Private
  ;

  _proto._activate = function _activate(element, container, callback) {
    var _this2 = this;

    var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE$1);
    var active = activeElements[0];
    var isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$3);

    var complete = function complete() {
      return _this2._transitionComplete(element, active, callback);
    };

    if (active && isTransitioning) {
      var transitionDuration = getTransitionDurationFromElement(active);
      active.classList.remove(CLASS_NAME_SHOW$5);
      EventHandler.one(active, TRANSITION_END, complete);
      emulateTransitionEnd(active, transitionDuration);
    } else {
      complete();
    }
  };

  _proto._transitionComplete = function _transitionComplete(element, active, callback) {
    if (active) {
      active.classList.remove(CLASS_NAME_ACTIVE$3);
      var dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

      if (dropdownChild) {
        dropdownChild.classList.remove(CLASS_NAME_ACTIVE$3);
      }

      if (active.getAttribute('role') === 'tab') {
        active.setAttribute('aria-selected', false);
      }
    }

    element.classList.add(CLASS_NAME_ACTIVE$3);

    if (element.getAttribute('role') === 'tab') {
      element.setAttribute('aria-selected', true);
    }

    reflow(element);

    if (element.classList.contains(CLASS_NAME_FADE$3)) {
      element.classList.add(CLASS_NAME_SHOW$5);
    }

    if (element.parentNode && element.parentNode.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
      var dropdownElement = element.closest(SELECTOR_DROPDOWN$1);

      if (dropdownElement) {
        SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE$1).forEach(function (dropdown) {
          return dropdown.classList.add(CLASS_NAME_ACTIVE$3);
        });
      }

      element.setAttribute('aria-expanded', true);
    }

    if (callback) {
      callback();
    }
  } // Static
  ;

  Tab.jQueryInterface = function jQueryInterface(config) {
    return this.each(function () {
      var data = Data.getData(this, DATA_KEY$9) || new Tab(this);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    });
  };

  Tab.getInstance = function getInstance(element) {
    return Data.getData(element, DATA_KEY$9);
  };

  _createClass(Tab, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$9;
    }
  }]);

  return Tab;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


exports.Tab = Tab;
EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (event) {
  event.preventDefault();
  var data = Data.getData(this, DATA_KEY$9) || new Tab(this);
  data.show();
});
var $$a = getjQuery();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .tab to jQuery only if jQuery is present
 */

/* istanbul ignore if */

if ($$a) {
  var JQUERY_NO_CONFLICT$9 = $$a.fn[NAME$9];
  $$a.fn[NAME$9] = Tab.jQueryInterface;
  $$a.fn[NAME$9].Constructor = Tab;

  $$a.fn[NAME$9].noConflict = function () {
    $$a.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab.jQueryInterface;
  };
}
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$a = 'toast';
var VERSION$a = '5.0.0-alpha2';
var DATA_KEY$a = 'bs.toast';
var EVENT_KEY$a = "." + DATA_KEY$a;
var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a;
var EVENT_HIDE$4 = "hide" + EVENT_KEY$a;
var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a;
var EVENT_SHOW$4 = "show" + EVENT_KEY$a;
var EVENT_SHOWN$4 = "shown" + EVENT_KEY$a;
var CLASS_NAME_FADE$4 = 'fade';
var CLASS_NAME_HIDE = 'hide';
var CLASS_NAME_SHOW$6 = 'show';
var CLASS_NAME_SHOWING = 'showing';
var DefaultType$7 = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};
var Default$7 = {
  animation: true,
  autohide: true,
  delay: 5000
};
var SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Toast = /*#__PURE__*/function () {
  function Toast(element, config) {
    this._element = element;
    this._config = this._getConfig(config);
    this._timeout = null;

    this._setListeners();

    Data.setData(element, DATA_KEY$a, this);
  } // Getters


  var _proto = Toast.prototype; // Public

  _proto.show = function show() {
    var _this = this;

    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4);

    if (showEvent.defaultPrevented) {
      return;
    }

    this._clearTimeout();

    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE$4);
    }

    var complete = function complete() {
      _this._element.classList.remove(CLASS_NAME_SHOWING);

      _this._element.classList.add(CLASS_NAME_SHOW$6);

      EventHandler.trigger(_this._element, EVENT_SHOWN$4);

      if (_this._config.autohide) {
        _this._timeout = setTimeout(function () {
          _this.hide();
        }, _this._config.delay);
      }
    };

    this._element.classList.remove(CLASS_NAME_HIDE);

    reflow(this._element);

    this._element.classList.add(CLASS_NAME_SHOWING);

    if (this._config.animation) {
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
    } else {
      complete();
    }
  };

  _proto.hide = function hide() {
    var _this2 = this;

    if (!this._element.classList.contains(CLASS_NAME_SHOW$6)) {
      return;
    }

    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);

    if (hideEvent.defaultPrevented) {
      return;
    }

    var complete = function complete() {
      _this2._element.classList.add(CLASS_NAME_HIDE);

      EventHandler.trigger(_this2._element, EVENT_HIDDEN$4);
    };

    this._element.classList.remove(CLASS_NAME_SHOW$6);

    if (this._config.animation) {
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
    } else {
      complete();
    }
  };

  _proto.dispose = function dispose() {
    this._clearTimeout();

    if (this._element.classList.contains(CLASS_NAME_SHOW$6)) {
      this._element.classList.remove(CLASS_NAME_SHOW$6);
    }

    EventHandler.off(this._element, EVENT_CLICK_DISMISS$1);
    Data.removeData(this._element, DATA_KEY$a);
    this._element = null;
    this._config = null;
  } // Private
  ;

  _proto._getConfig = function _getConfig(config) {
    config = _extends({}, Default$7, Manipulator.getDataAttributes(this._element), _typeof(config) === 'object' && config ? config : {});
    typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
    return config;
  };

  _proto._setListeners = function _setListeners() {
    var _this3 = this;

    EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
      return _this3.hide();
    });
  };

  _proto._clearTimeout = function _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  } // Static
  ;

  Toast.jQueryInterface = function jQueryInterface(config) {
    return this.each(function () {
      var data = Data.getData(this, DATA_KEY$a);

      var _config = _typeof(config) === 'object' && config;

      if (!data) {
        data = new Toast(this, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config](this);
      }
    });
  };

  Toast.getInstance = function getInstance(element) {
    return Data.getData(element, DATA_KEY$a);
  };

  _createClass(Toast, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$a;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$7;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$7;
    }
  }]);

  return Toast;
}();

exports.Toast = Toast;
var $$b = getjQuery();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 *  add .toast to jQuery only if jQuery is present
 */

/* istanbul ignore if */

if ($$b) {
  var JQUERY_NO_CONFLICT$a = $$b.fn[NAME$a];
  $$b.fn[NAME$a] = Toast.jQueryInterface;
  $$b.fn[NAME$a].Constructor = Toast;

  $$b.fn[NAME$a].noConflict = function () {
    $$b.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast.jQueryInterface;
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = exports.Toast = exports.Tab = exports.ScrollSpy = exports.Popover = exports.Modal = exports.Dropdown = exports.Collapse = exports.Carousel = exports.Button = exports.Alert = void 0;

var _popper = _interopRequireDefault(require("popper.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
  }
}

function _createClass(e, t, n) {
  return t && _defineProperties(e.prototype, t), n && _defineProperties(e, n), e;
}

function _extends() {
  return (_extends = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];

      for (var i in n) {
        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }
    }

    return e;
  }).apply(this, arguments);
}

function _inheritsLoose(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
}

var MAX_UID = 1e6,
    MILLISECONDS_MULTIPLIER = 1e3,
    TRANSITION_END = "transitionend",
    toType = function toType(e) {
  return null == e ? "" + e : {}.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase();
},
    getUID = function getUID(e) {
  do {
    e += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(e));

  return e;
},
    getSelector = function getSelector(e) {
  var t = e.getAttribute("data-target");

  if (!t || "#" === t) {
    var n = e.getAttribute("href");
    t = n && "#" !== n ? n.trim() : null;
  }

  return t;
},
    getSelectorFromElement = function getSelectorFromElement(e) {
  var t = getSelector(e);
  return t && document.querySelector(t) ? t : null;
},
    getElementFromSelector = function getElementFromSelector(e) {
  var t = getSelector(e);
  return t ? document.querySelector(t) : null;
},
    getTransitionDurationFromElement = function getTransitionDurationFromElement(e) {
  if (!e) return 0;
  var t = window.getComputedStyle(e),
      n = t.transitionDuration,
      i = t.transitionDelay,
      r = parseFloat(n),
      o = parseFloat(i);
  return r || o ? (n = n.split(",")[0], i = i.split(",")[0], (parseFloat(n) + parseFloat(i)) * MILLISECONDS_MULTIPLIER) : 0;
},
    triggerTransitionEnd = function triggerTransitionEnd(e) {
  e.dispatchEvent(new Event(TRANSITION_END));
},
    isElement = function isElement(e) {
  return (e[0] || e).nodeType;
},
    emulateTransitionEnd = function emulateTransitionEnd(e, t) {
  var n = !1,
      i = t + 5;
  e.addEventListener(TRANSITION_END, function t() {
    n = !0, e.removeEventListener(TRANSITION_END, t);
  }), setTimeout(function () {
    n || triggerTransitionEnd(e);
  }, i);
},
    typeCheckConfig = function typeCheckConfig(e, t, n) {
  Object.keys(n).forEach(function (i) {
    var r = n[i],
        o = t[i],
        a = o && isElement(o) ? "element" : toType(o);
    if (!new RegExp(r).test(a)) throw new Error(e.toUpperCase() + ': Option "' + i + '" provided type "' + a + '" but expected type "' + r + '".');
  });
},
    isVisible = function isVisible(e) {
  if (!e) return !1;

  if (e.style && e.parentNode && e.parentNode.style) {
    var t = getComputedStyle(e),
        n = getComputedStyle(e.parentNode);
    return "none" !== t.display && "none" !== n.display && "hidden" !== t.visibility;
  }

  return !1;
},
    findShadowRoot = function e(t) {
  if (!document.documentElement.attachShadow) return null;

  if ("function" == typeof t.getRootNode) {
    var n = t.getRootNode();
    return n instanceof ShadowRoot ? n : null;
  }

  return t instanceof ShadowRoot ? t : t.parentNode ? e(t.parentNode) : null;
},
    noop = function noop() {
  return function () {};
},
    reflow = function reflow(e) {
  return e.offsetHeight;
},
    getjQuery = function getjQuery() {
  var e = window.jQuery;
  return e && !document.body.hasAttribute("data-no-jquery") ? e : null;
},
    mapData = function () {
  var e = {},
      t = 1;
  return {
    set: function set(n, i, r) {
      void 0 === n.bsKey && (n.bsKey = {
        key: i,
        id: t
      }, t++), e[n.bsKey.id] = r;
    },
    get: function get(t, n) {
      if (!t || void 0 === t.bsKey) return null;
      var i = t.bsKey;
      return i.key === n ? e[i.id] : null;
    },
    "delete": function _delete(t, n) {
      if (void 0 !== t.bsKey) {
        var i = t.bsKey;
        i.key === n && (delete e[i.id], delete t.bsKey);
      }
    }
  };
}(),
    Data = {
  setData: function setData(e, t, n) {
    mapData.set(e, t, n);
  },
  getData: function getData(e, t) {
    return mapData.get(e, t);
  },
  removeData: function removeData(e, t) {
    mapData["delete"](e, t);
  }
},
    _find = Element.prototype.querySelectorAll,
    _findOne = Element.prototype.querySelector,
    defaultPreventedPreservedOnDispatch = function () {
  var e = new CustomEvent("Bootstrap", {
    cancelable: !0
  }),
      t = document.createElement("div");
  return t.addEventListener("Bootstrap", function () {
    return null;
  }), e.preventDefault(), t.dispatchEvent(e), e.defaultPrevented;
}(),
    scopeSelectorRegex = /:scope\b/,
    supportScopeQuery = function () {
  var e = document.createElement("div");

  try {
    e.querySelectorAll(":scope *");
  } catch (e) {
    return !1;
  }

  return !0;
}();

supportScopeQuery || (_find = function find(e) {
  if (!scopeSelectorRegex.test(e)) return this.querySelectorAll(e);
  var t = Boolean(this.id);
  t || (this.id = getUID("scope"));
  var n = null;

  try {
    e = e.replace(scopeSelectorRegex, "#" + this.id), n = this.querySelectorAll(e);
  } finally {
    t || this.removeAttribute("id");
  }

  return n;
}, _findOne = function findOne(e) {
  if (!scopeSelectorRegex.test(e)) return this.querySelector(e);

  var t = _find.call(this, e);

  return void 0 !== t[0] ? t[0] : null;
});
var $ = getjQuery(),
    namespaceRegex = /[^.]*(?=\..*)\.|.*/,
    stripNameRegex = /\..*/,
    stripUidRegex = /::\d+$/,
    eventRegistry = {},
    uidEvent = 1,
    customEvents = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
},
    nativeEvents = ["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"];

function getUidEvent(e, t) {
  return t && t + "::" + uidEvent++ || e.uidEvent || uidEvent++;
}

function getEvent(e) {
  var t = getUidEvent(e);
  return e.uidEvent = t, eventRegistry[t] = eventRegistry[t] || {}, eventRegistry[t];
}

function bootstrapHandler(e, t) {
  return function n(i) {
    return i.delegateTarget = e, n.oneOff && EventHandler.off(e, i.type, t), t.apply(e, [i]);
  };
}

function bootstrapDelegationHandler(e, t, n) {
  return function i(r) {
    for (var o = e.querySelectorAll(t), a = r.target; a && a !== this; a = a.parentNode) {
      for (var s = o.length; s--;) {
        if (o[s] === a) return r.delegateTarget = a, i.oneOff && EventHandler.off(e, r.type, n), n.apply(a, [r]);
      }
    }

    return null;
  };
}

function findHandler(e, t, n) {
  void 0 === n && (n = null);

  for (var i = Object.keys(e), r = 0, o = i.length; r < o; r++) {
    var a = e[i[r]];
    if (a.originalHandler === t && a.delegationSelector === n) return a;
  }

  return null;
}

function normalizeParams(e, t, n) {
  var i = "string" == typeof t,
      r = i ? n : t,
      o = e.replace(stripNameRegex, ""),
      a = customEvents[o];
  return a && (o = a), nativeEvents.indexOf(o) > -1 || (o = e), [i, r, o];
}

function addHandler(e, t, n, i, r) {
  if ("string" == typeof t && e) {
    n || (n = i, i = null);

    var o = normalizeParams(t, n, i),
        a = o[0],
        s = o[1],
        l = o[2],
        E = getEvent(e),
        _ = E[l] || (E[l] = {}),
        c = findHandler(_, s, a ? n : null);

    if (c) c.oneOff = c.oneOff && r;else {
      var u = getUidEvent(s, t.replace(namespaceRegex, "")),
          f = a ? bootstrapDelegationHandler(e, n, i) : bootstrapHandler(e, n);
      f.delegationSelector = a ? n : null, f.originalHandler = s, f.oneOff = r, f.uidEvent = u, _[u] = f, e.addEventListener(l, f, a);
    }
  }
}

function removeHandler(e, t, n, i, r) {
  var o = findHandler(t[n], i, r);
  o && (e.removeEventListener(n, o, Boolean(r)), delete t[n][o.uidEvent]);
}

function removeNamespacedHandlers(e, t, n, i) {
  var r = t[n] || {};
  Object.keys(r).forEach(function (o) {
    if (o.indexOf(i) > -1) {
      var a = r[o];
      removeHandler(e, t, n, a.originalHandler, a.delegationSelector);
    }
  });
}

var EventHandler = {
  on: function on(e, t, n, i) {
    addHandler(e, t, n, i, !1);
  },
  one: function one(e, t, n, i) {
    addHandler(e, t, n, i, !0);
  },
  off: function off(e, t, n, i) {
    if ("string" == typeof t && e) {
      var r = normalizeParams(t, n, i),
          o = r[0],
          a = r[1],
          s = r[2],
          l = s !== t,
          E = getEvent(e),
          _ = "." === t.charAt(0);

      if (void 0 === a) {
        _ && Object.keys(E).forEach(function (n) {
          removeNamespacedHandlers(e, E, n, t.slice(1));
        });
        var c = E[s] || {};
        Object.keys(c).forEach(function (n) {
          var i = n.replace(stripUidRegex, "");

          if (!l || t.indexOf(i) > -1) {
            var r = c[n];
            removeHandler(e, E, s, r.originalHandler, r.delegationSelector);
          }
        });
      } else {
        if (!E || !E[s]) return;
        removeHandler(e, E, s, a, o ? n : null);
      }
    }
  },
  trigger: function trigger(e, t, n) {
    if ("string" != typeof t || !e) return null;
    var i,
        r = t.replace(stripNameRegex, ""),
        o = t !== r,
        a = nativeEvents.indexOf(r) > -1,
        s = !0,
        l = !0,
        E = !1,
        _ = null;
    return o && $ && (i = $.Event(t, n), $(e).trigger(i), s = !i.isPropagationStopped(), l = !i.isImmediatePropagationStopped(), E = i.isDefaultPrevented()), a ? (_ = document.createEvent("HTMLEvents")).initEvent(r, s, !0) : _ = new CustomEvent(t, {
      bubbles: s,
      cancelable: !0
    }), void 0 !== n && Object.keys(n).forEach(function (e) {
      Object.defineProperty(_, e, {
        get: function get() {
          return n[e];
        }
      });
    }), E && (_.preventDefault(), defaultPreventedPreservedOnDispatch || Object.defineProperty(_, "defaultPrevented", {
      get: function get() {
        return !0;
      }
    })), l && e.dispatchEvent(_), _.defaultPrevented && void 0 !== i && i.preventDefault(), _;
  }
},
    NAME = "alert",
    VERSION = "5.0.0-alpha2",
    DATA_KEY = "bs.alert",
    EVENT_KEY = "." + DATA_KEY,
    DATA_API_KEY = ".data-api",
    SELECTOR_DISMISS = '[data-dismiss="alert"]',
    EVENT_CLOSE = "close" + EVENT_KEY,
    EVENT_CLOSED = "closed" + EVENT_KEY,
    EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY,
    CLASSNAME_ALERT = "alert",
    CLASSNAME_FADE = "fade",
    CLASSNAME_SHOW = "show",
    Alert = function () {
  function e(e) {
    this._element = e, this._element && Data.setData(e, DATA_KEY, this);
  }

  var t = e.prototype;
  return t.close = function (e) {
    var t = e ? this._getRootElement(e) : this._element,
        n = this._triggerCloseEvent(t);

    null === n || n.defaultPrevented || this._removeElement(t);
  }, t.dispose = function () {
    Data.removeData(this._element, DATA_KEY), this._element = null;
  }, t._getRootElement = function (e) {
    return getElementFromSelector(e) || e.closest("." + CLASSNAME_ALERT);
  }, t._triggerCloseEvent = function (e) {
    return EventHandler.trigger(e, EVENT_CLOSE);
  }, t._removeElement = function (e) {
    var t = this;

    if (e.classList.remove(CLASSNAME_SHOW), e.classList.contains(CLASSNAME_FADE)) {
      var n = getTransitionDurationFromElement(e);
      EventHandler.one(e, TRANSITION_END, function () {
        return t._destroyElement(e);
      }), emulateTransitionEnd(e, n);
    } else this._destroyElement(e);
  }, t._destroyElement = function (e) {
    e.parentNode && e.parentNode.removeChild(e), EventHandler.trigger(e, EVENT_CLOSED);
  }, e.jQueryInterface = function (t) {
    return this.each(function () {
      var n = Data.getData(this, DATA_KEY);
      n || (n = new e(this)), "close" === t && n[t](this);
    });
  }, e.handleDismiss = function (e) {
    return function (t) {
      t && t.preventDefault(), e.close(this);
    };
  }, e.getInstance = function (e) {
    return Data.getData(e, DATA_KEY);
  }, _createClass(e, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION;
    }
  }]), e;
}();

exports.Alert = Alert;
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
var $$1 = getjQuery();

if ($$1) {
  var JQUERY_NO_CONFLICT = $$1.fn[NAME];
  $$1.fn[NAME] = Alert.jQueryInterface, $$1.fn[NAME].Constructor = Alert, $$1.fn[NAME].noConflict = function () {
    return $$1.fn[NAME] = JQUERY_NO_CONFLICT, Alert.jQueryInterface;
  };
}

var NAME$1 = "button",
    VERSION$1 = "5.0.0-alpha2",
    DATA_KEY$1 = "bs.button",
    EVENT_KEY$1 = "." + DATA_KEY$1,
    DATA_API_KEY$1 = ".data-api",
    CLASS_NAME_ACTIVE = "active",
    SELECTOR_DATA_TOGGLE = '[data-toggle="button"]',
    EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    Button = function () {
  function e(e) {
    this._element = e, Data.setData(e, DATA_KEY$1, this);
  }

  var t = e.prototype;
  return t.toggle = function () {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE));
  }, t.dispose = function () {
    Data.removeData(this._element, DATA_KEY$1), this._element = null;
  }, e.jQueryInterface = function (t) {
    return this.each(function () {
      var n = Data.getData(this, DATA_KEY$1);
      n || (n = new e(this)), "toggle" === t && n[t]();
    });
  }, e.getInstance = function (e) {
    return Data.getData(e, DATA_KEY$1);
  }, _createClass(e, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$1;
    }
  }]), e;
}();

exports.Button = Button;
EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE, function (e) {
  e.preventDefault();
  var t = e.target.closest(SELECTOR_DATA_TOGGLE),
      n = Data.getData(t, DATA_KEY$1);
  n || (n = new Button(t)), n.toggle();
});
var $$2 = getjQuery();

if ($$2) {
  var JQUERY_NO_CONFLICT$1 = $$2.fn[NAME$1];
  $$2.fn[NAME$1] = Button.jQueryInterface, $$2.fn[NAME$1].Constructor = Button, $$2.fn[NAME$1].noConflict = function () {
    return $$2.fn[NAME$1] = JQUERY_NO_CONFLICT$1, Button.jQueryInterface;
  };
}

function normalizeData(e) {
  return "true" === e || "false" !== e && (e === Number(e).toString() ? Number(e) : "" === e || "null" === e ? null : e);
}

function normalizeDataKey(e) {
  return e.replace(/[A-Z]/g, function (e) {
    return "-" + e.toLowerCase();
  });
}

var Manipulator = {
  setDataAttribute: function setDataAttribute(e, t, n) {
    e.setAttribute("data-" + normalizeDataKey(t), n);
  },
  removeDataAttribute: function removeDataAttribute(e, t) {
    e.removeAttribute("data-" + normalizeDataKey(t));
  },
  getDataAttributes: function getDataAttributes(e) {
    if (!e) return {};

    var t = _extends({}, e.dataset);

    return Object.keys(t).forEach(function (e) {
      t[e] = normalizeData(t[e]);
    }), t;
  },
  getDataAttribute: function getDataAttribute(e, t) {
    return normalizeData(e.getAttribute("data-" + normalizeDataKey(t)));
  },
  offset: function offset(e) {
    var t = e.getBoundingClientRect();
    return {
      top: t.top + document.body.scrollTop,
      left: t.left + document.body.scrollLeft
    };
  },
  position: function position(e) {
    return {
      top: e.offsetTop,
      left: e.offsetLeft
    };
  },
  toggleClass: function toggleClass(e, t) {
    e && (e.classList.contains(t) ? e.classList.remove(t) : e.classList.add(t));
  }
},
    NODE_TEXT = 3,
    SelectorEngine = {
  matches: function matches(e, t) {
    return e.matches(t);
  },
  find: function find(e, t) {
    var n;
    return void 0 === t && (t = document.documentElement), (n = []).concat.apply(n, _find.call(t, e));
  },
  findOne: function findOne(e, t) {
    return void 0 === t && (t = document.documentElement), _findOne.call(t, e);
  },
  children: function children(e, t) {
    var n,
        i = (n = []).concat.apply(n, e.children);
    return i.filter(function (e) {
      return e.matches(t);
    });
  },
  parents: function parents(e, t) {
    for (var n = [], i = e.parentNode; i && i.nodeType === Node.ELEMENT_NODE && i.nodeType !== NODE_TEXT;) {
      this.matches(i, t) && n.push(i), i = i.parentNode;
    }

    return n;
  },
  prev: function prev(e, t) {
    for (var n = e.previousElementSibling; n;) {
      if (n.matches(t)) return [n];
      n = n.previousElementSibling;
    }

    return [];
  },
  next: function next(e, t) {
    for (var n = e.nextElementSibling; n;) {
      if (this.matches(n, t)) return [n];
      n = n.nextElementSibling;
    }

    return [];
  }
},
    NAME$2 = "carousel",
    VERSION$2 = "5.0.0-alpha2",
    DATA_KEY$2 = "bs.carousel",
    EVENT_KEY$2 = "." + DATA_KEY$2,
    DATA_API_KEY$2 = ".data-api",
    ARROW_LEFT_KEY = "ArrowLeft",
    ARROW_RIGHT_KEY = "ArrowRight",
    TOUCHEVENT_COMPAT_WAIT = 500,
    SWIPE_THRESHOLD = 40,
    Default = {
  interval: 5e3,
  keyboard: !0,
  slide: !1,
  pause: "hover",
  wrap: !0,
  touch: !0
},
    DefaultType = {
  interval: "(number|boolean)",
  keyboard: "boolean",
  slide: "(boolean|string)",
  pause: "(string|boolean)",
  wrap: "boolean",
  touch: "boolean"
},
    DIRECTION_NEXT = "next",
    DIRECTION_PREV = "prev",
    DIRECTION_LEFT = "left",
    DIRECTION_RIGHT = "right",
    EVENT_SLIDE = "slide" + EVENT_KEY$2,
    EVENT_SLID = "slid" + EVENT_KEY$2,
    EVENT_KEYDOWN = "keydown" + EVENT_KEY$2,
    EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2,
    EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2,
    EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2,
    EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2,
    EVENT_TOUCHEND = "touchend" + EVENT_KEY$2,
    EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2,
    EVENT_POINTERUP = "pointerup" + EVENT_KEY$2,
    EVENT_DRAG_START = "dragstart" + EVENT_KEY$2,
    EVENT_LOAD_DATA_API = "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLASS_NAME_CAROUSEL = "carousel",
    CLASS_NAME_ACTIVE$1 = "active",
    CLASS_NAME_SLIDE = "slide",
    CLASS_NAME_RIGHT = "carousel-item-right",
    CLASS_NAME_LEFT = "carousel-item-left",
    CLASS_NAME_NEXT = "carousel-item-next",
    CLASS_NAME_PREV = "carousel-item-prev",
    CLASS_NAME_POINTER_EVENT = "pointer-event",
    SELECTOR_ACTIVE = ".active",
    SELECTOR_ACTIVE_ITEM = ".active.carousel-item",
    SELECTOR_ITEM = ".carousel-item",
    SELECTOR_ITEM_IMG = ".carousel-item img",
    SELECTOR_NEXT_PREV = ".carousel-item-next, .carousel-item-prev",
    SELECTOR_INDICATORS = ".carousel-indicators",
    SELECTOR_DATA_SLIDE = "[data-slide], [data-slide-to]",
    SELECTOR_DATA_RIDE = '[data-ride="carousel"]',
    PointerType = {
  TOUCH: "touch",
  PEN: "pen"
},
    Carousel = function () {
  function e(e, t) {
    this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(t), this._element = e, this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent), this._addEventListeners(), Data.setData(e, DATA_KEY$2, this);
  }

  var t = e.prototype;
  return t.next = function () {
    this._isSliding || this._slide(DIRECTION_NEXT);
  }, t.nextWhenVisible = function () {
    !document.hidden && isVisible(this._element) && this.next();
  }, t.prev = function () {
    this._isSliding || this._slide(DIRECTION_PREV);
  }, t.pause = function (e) {
    e || (this._isPaused = !0), SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element) && (triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
  }, t.cycle = function (e) {
    e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
  }, t.to = function (e) {
    var t = this;
    this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

    var n = this._getItemIndex(this._activeElement);

    if (!(e > this._items.length - 1 || e < 0)) if (this._isSliding) EventHandler.one(this._element, EVENT_SLID, function () {
      return t.to(e);
    });else {
      if (n === e) return this.pause(), void this.cycle();
      var i = e > n ? DIRECTION_NEXT : DIRECTION_PREV;

      this._slide(i, this._items[e]);
    }
  }, t.dispose = function () {
    EventHandler.off(this._element, EVENT_KEY$2), Data.removeData(this._element, DATA_KEY$2), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
  }, t._getConfig = function (e) {
    return e = _extends({}, Default, e), typeCheckConfig(NAME$2, e, DefaultType), e;
  }, t._handleSwipe = function () {
    var e = Math.abs(this.touchDeltaX);

    if (!(e <= SWIPE_THRESHOLD)) {
      var t = e / this.touchDeltaX;
      this.touchDeltaX = 0, t > 0 && this.prev(), t < 0 && this.next();
    }
  }, t._addEventListeners = function () {
    var e = this;
    this._config.keyboard && EventHandler.on(this._element, EVENT_KEYDOWN, function (t) {
      return e._keydown(t);
    }), "hover" === this._config.pause && (EventHandler.on(this._element, EVENT_MOUSEENTER, function (t) {
      return e.pause(t);
    }), EventHandler.on(this._element, EVENT_MOUSELEAVE, function (t) {
      return e.cycle(t);
    })), this._config.touch && this._touchSupported && this._addTouchEventListeners();
  }, t._addTouchEventListeners = function () {
    var e = this,
        t = function t(_t) {
      e._pointerEvent && PointerType[_t.pointerType.toUpperCase()] ? e.touchStartX = _t.clientX : e._pointerEvent || (e.touchStartX = _t.touches[0].clientX);
    },
        n = function n(t) {
      e._pointerEvent && PointerType[t.pointerType.toUpperCase()] && (e.touchDeltaX = t.clientX - e.touchStartX), e._handleSwipe(), "hover" === e._config.pause && (e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function (t) {
        return e.cycle(t);
      }, TOUCHEVENT_COMPAT_WAIT + e._config.interval));
    };

    SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function (e) {
      EventHandler.on(e, EVENT_DRAG_START, function (e) {
        return e.preventDefault();
      });
    }), this._pointerEvent ? (EventHandler.on(this._element, EVENT_POINTERDOWN, function (e) {
      return t(e);
    }), EventHandler.on(this._element, EVENT_POINTERUP, function (e) {
      return n(e);
    }), this._element.classList.add(CLASS_NAME_POINTER_EVENT)) : (EventHandler.on(this._element, EVENT_TOUCHSTART, function (e) {
      return t(e);
    }), EventHandler.on(this._element, EVENT_TOUCHMOVE, function (t) {
      return function (t) {
        t.touches && t.touches.length > 1 ? e.touchDeltaX = 0 : e.touchDeltaX = t.touches[0].clientX - e.touchStartX;
      }(t);
    }), EventHandler.on(this._element, EVENT_TOUCHEND, function (e) {
      return n(e);
    }));
  }, t._keydown = function (e) {
    if (!/input|textarea/i.test(e.target.tagName)) switch (e.key) {
      case ARROW_LEFT_KEY:
        e.preventDefault(), this.prev();
        break;

      case ARROW_RIGHT_KEY:
        e.preventDefault(), this.next();
    }
  }, t._getItemIndex = function (e) {
    return this._items = e && e.parentNode ? SelectorEngine.find(SELECTOR_ITEM, e.parentNode) : [], this._items.indexOf(e);
  }, t._getItemByDirection = function (e, t) {
    var n = e === DIRECTION_NEXT,
        i = e === DIRECTION_PREV,
        r = this._getItemIndex(t),
        o = this._items.length - 1;

    if ((i && 0 === r || n && r === o) && !this._config.wrap) return t;
    var a = (r + (e === DIRECTION_PREV ? -1 : 1)) % this._items.length;
    return -1 === a ? this._items[this._items.length - 1] : this._items[a];
  }, t._triggerSlideEvent = function (e, t) {
    var n = this._getItemIndex(e),
        i = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

    return EventHandler.trigger(this._element, EVENT_SLIDE, {
      relatedTarget: e,
      direction: t,
      from: i,
      to: n
    });
  }, t._setActiveIndicatorElement = function (e) {
    if (this._indicatorsElement) {
      for (var t = SelectorEngine.find(SELECTOR_ACTIVE, this._indicatorsElement), n = 0; n < t.length; n++) {
        t[n].classList.remove(CLASS_NAME_ACTIVE$1);
      }

      var i = this._indicatorsElement.children[this._getItemIndex(e)];

      i && i.classList.add(CLASS_NAME_ACTIVE$1);
    }
  }, t._slide = function (e, t) {
    var n,
        i,
        r,
        o = this,
        a = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element),
        s = this._getItemIndex(a),
        l = t || a && this._getItemByDirection(e, a),
        E = this._getItemIndex(l),
        _ = Boolean(this._interval);

    if (e === DIRECTION_NEXT ? (n = CLASS_NAME_LEFT, i = CLASS_NAME_NEXT, r = DIRECTION_LEFT) : (n = CLASS_NAME_RIGHT, i = CLASS_NAME_PREV, r = DIRECTION_RIGHT), l && l.classList.contains(CLASS_NAME_ACTIVE$1)) this._isSliding = !1;else if (!this._triggerSlideEvent(l, r).defaultPrevented && a && l) {
      if (this._isSliding = !0, _ && this.pause(), this._setActiveIndicatorElement(l), this._element.classList.contains(CLASS_NAME_SLIDE)) {
        l.classList.add(i), reflow(l), a.classList.add(n), l.classList.add(n);
        var c = parseInt(l.getAttribute("data-interval"), 10);
        c ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = c) : this._config.interval = this._config.defaultInterval || this._config.interval;
        var u = getTransitionDurationFromElement(a);
        EventHandler.one(a, TRANSITION_END, function () {
          l.classList.remove(n, i), l.classList.add(CLASS_NAME_ACTIVE$1), a.classList.remove(CLASS_NAME_ACTIVE$1, i, n), o._isSliding = !1, setTimeout(function () {
            EventHandler.trigger(o._element, EVENT_SLID, {
              relatedTarget: l,
              direction: r,
              from: s,
              to: E
            });
          }, 0);
        }), emulateTransitionEnd(a, u);
      } else a.classList.remove(CLASS_NAME_ACTIVE$1), l.classList.add(CLASS_NAME_ACTIVE$1), this._isSliding = !1, EventHandler.trigger(this._element, EVENT_SLID, {
        relatedTarget: l,
        direction: r,
        from: s,
        to: E
      });

      _ && this.cycle();
    }
  }, e.carouselInterface = function (t, n) {
    var i = Data.getData(t, DATA_KEY$2),
        r = _extends({}, Default, Manipulator.getDataAttributes(t));

    "object" == _typeof(n) && (r = _extends({}, r, n));
    var o = "string" == typeof n ? n : r.slide;
    if (i || (i = new e(t, r)), "number" == typeof n) i.to(n);else if ("string" == typeof o) {
      if (void 0 === i[o]) throw new TypeError('No method named "' + o + '"');
      i[o]();
    } else r.interval && r.ride && (i.pause(), i.cycle());
  }, e.jQueryInterface = function (t) {
    return this.each(function () {
      e.carouselInterface(this, t);
    });
  }, e.dataApiClickHandler = function (t) {
    var n = getElementFromSelector(this);

    if (n && n.classList.contains(CLASS_NAME_CAROUSEL)) {
      var i = _extends({}, Manipulator.getDataAttributes(n), Manipulator.getDataAttributes(this)),
          r = this.getAttribute("data-slide-to");

      r && (i.interval = !1), e.carouselInterface(n, i), r && Data.getData(n, DATA_KEY$2).to(r), t.preventDefault();
    }
  }, e.getInstance = function (e) {
    return Data.getData(e, DATA_KEY$2);
  }, _createClass(e, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$2;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default;
    }
  }]), e;
}();

exports.Carousel = Carousel;
EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler), EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
  for (var e = SelectorEngine.find(SELECTOR_DATA_RIDE), t = 0, n = e.length; t < n; t++) {
    Carousel.carouselInterface(e[t], Data.getData(e[t], DATA_KEY$2));
  }
});
var $$3 = getjQuery();

if ($$3) {
  var JQUERY_NO_CONFLICT$2 = $$3.fn[NAME$2];
  $$3.fn[NAME$2] = Carousel.jQueryInterface, $$3.fn[NAME$2].Constructor = Carousel, $$3.fn[NAME$2].noConflict = function () {
    return $$3.fn[NAME$2] = JQUERY_NO_CONFLICT$2, Carousel.jQueryInterface;
  };
}

var NAME$3 = "collapse",
    VERSION$3 = "5.0.0-alpha2",
    DATA_KEY$3 = "bs.collapse",
    EVENT_KEY$3 = "." + DATA_KEY$3,
    DATA_API_KEY$3 = ".data-api",
    Default$1 = {
  toggle: !0,
  parent: ""
},
    DefaultType$1 = {
  toggle: "boolean",
  parent: "(string|element)"
},
    EVENT_SHOW = "show" + EVENT_KEY$3,
    EVENT_SHOWN = "shown" + EVENT_KEY$3,
    EVENT_HIDE = "hide" + EVENT_KEY$3,
    EVENT_HIDDEN = "hidden" + EVENT_KEY$3,
    EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3,
    CLASS_NAME_SHOW = "show",
    CLASS_NAME_COLLAPSE = "collapse",
    CLASS_NAME_COLLAPSING = "collapsing",
    CLASS_NAME_COLLAPSED = "collapsed",
    WIDTH = "width",
    HEIGHT = "height",
    SELECTOR_ACTIVES = ".show, .collapsing",
    SELECTOR_DATA_TOGGLE$1 = '[data-toggle="collapse"]',
    Collapse = function () {
  function e(e, t) {
    this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1 + '[href="#' + e.id + '"],' + SELECTOR_DATA_TOGGLE$1 + '[data-target="#' + e.id + '"]');

    for (var n = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1), i = 0, r = n.length; i < r; i++) {
      var o = n[i],
          a = getSelectorFromElement(o),
          s = SelectorEngine.find(a).filter(function (t) {
        return t === e;
      });
      null !== a && s.length && (this._selector = a, this._triggerArray.push(o));
    }

    this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle(), Data.setData(e, DATA_KEY$3, this);
  }

  var t = e.prototype;
  return t.toggle = function () {
    this._element.classList.contains(CLASS_NAME_SHOW) ? this.hide() : this.show();
  }, t.show = function () {
    var t = this;

    if (!this._isTransitioning && !this._element.classList.contains(CLASS_NAME_SHOW)) {
      var n, i;
      this._parent && 0 === (n = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function (e) {
        return "string" == typeof t._config.parent ? e.getAttribute("data-parent") === t._config.parent : e.classList.contains(CLASS_NAME_COLLAPSE);
      })).length && (n = null);
      var r = SelectorEngine.findOne(this._selector);

      if (n) {
        var o = n.filter(function (e) {
          return r !== e;
        });
        if ((i = o[0] ? Data.getData(o[0], DATA_KEY$3) : null) && i._isTransitioning) return;
      }

      if (!EventHandler.trigger(this._element, EVENT_SHOW).defaultPrevented) {
        n && n.forEach(function (t) {
          r !== t && e.collapseInterface(t, "hide"), i || Data.setData(t, DATA_KEY$3, null);
        });

        var a = this._getDimension();

        this._element.classList.remove(CLASS_NAME_COLLAPSE), this._element.classList.add(CLASS_NAME_COLLAPSING), this._element.style[a] = 0, this._triggerArray.length && this._triggerArray.forEach(function (e) {
          e.classList.remove(CLASS_NAME_COLLAPSED), e.setAttribute("aria-expanded", !0);
        }), this.setTransitioning(!0);
        var s = "scroll" + (a[0].toUpperCase() + a.slice(1)),
            l = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, function () {
          t._element.classList.remove(CLASS_NAME_COLLAPSING), t._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW), t._element.style[a] = "", t.setTransitioning(!1), EventHandler.trigger(t._element, EVENT_SHOWN);
        }), emulateTransitionEnd(this._element, l), this._element.style[a] = this._element[s] + "px";
      }
    }
  }, t.hide = function () {
    var e = this;

    if (!this._isTransitioning && this._element.classList.contains(CLASS_NAME_SHOW) && !EventHandler.trigger(this._element, EVENT_HIDE).defaultPrevented) {
      var t = this._getDimension();

      this._element.style[t] = this._element.getBoundingClientRect()[t] + "px", reflow(this._element), this._element.classList.add(CLASS_NAME_COLLAPSING), this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
      var n = this._triggerArray.length;
      if (n > 0) for (var i = 0; i < n; i++) {
        var r = this._triggerArray[i],
            o = getElementFromSelector(r);
        o && !o.classList.contains(CLASS_NAME_SHOW) && (r.classList.add(CLASS_NAME_COLLAPSED), r.setAttribute("aria-expanded", !1));
      }
      this.setTransitioning(!0);
      this._element.style[t] = "";
      var a = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, function () {
        e.setTransitioning(!1), e._element.classList.remove(CLASS_NAME_COLLAPSING), e._element.classList.add(CLASS_NAME_COLLAPSE), EventHandler.trigger(e._element, EVENT_HIDDEN);
      }), emulateTransitionEnd(this._element, a);
    }
  }, t.setTransitioning = function (e) {
    this._isTransitioning = e;
  }, t.dispose = function () {
    Data.removeData(this._element, DATA_KEY$3), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
  }, t._getConfig = function (e) {
    return (e = _extends({}, Default$1, e)).toggle = Boolean(e.toggle), typeCheckConfig(NAME$3, e, DefaultType$1), e;
  }, t._getDimension = function () {
    return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
  }, t._getParent = function () {
    var e = this,
        t = this._config.parent;
    isElement(t) ? void 0 === t.jquery && void 0 === t[0] || (t = t[0]) : t = SelectorEngine.findOne(t);
    var n = SELECTOR_DATA_TOGGLE$1 + '[data-parent="' + t + '"]';
    return SelectorEngine.find(n, t).forEach(function (t) {
      var n = getElementFromSelector(t);

      e._addAriaAndCollapsedClass(n, [t]);
    }), t;
  }, t._addAriaAndCollapsedClass = function (e, t) {
    if (e && t.length) {
      var n = e.classList.contains(CLASS_NAME_SHOW);
      t.forEach(function (e) {
        n ? e.classList.remove(CLASS_NAME_COLLAPSED) : e.classList.add(CLASS_NAME_COLLAPSED), e.setAttribute("aria-expanded", n);
      });
    }
  }, e.collapseInterface = function (t, n) {
    var i = Data.getData(t, DATA_KEY$3),
        r = _extends({}, Default$1, Manipulator.getDataAttributes(t), "object" == _typeof(n) && n ? n : {});

    if (!i && r.toggle && "string" == typeof n && /show|hide/.test(n) && (r.toggle = !1), i || (i = new e(t, r)), "string" == typeof n) {
      if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
      i[n]();
    }
  }, e.jQueryInterface = function (t) {
    return this.each(function () {
      e.collapseInterface(this, t);
    });
  }, e.getInstance = function (e) {
    return Data.getData(e, DATA_KEY$3);
  }, _createClass(e, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$3;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$1;
    }
  }]), e;
}();

exports.Collapse = Collapse;
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function (e) {
  "A" === e.target.tagName && e.preventDefault();
  var t = Manipulator.getDataAttributes(this),
      n = getSelectorFromElement(this);
  SelectorEngine.find(n).forEach(function (e) {
    var n,
        i = Data.getData(e, DATA_KEY$3);
    i ? (null === i._parent && "string" == typeof t.parent && (i._config.parent = t.parent, i._parent = i._getParent()), n = "toggle") : n = t, Collapse.collapseInterface(e, n);
  });
});
var $$4 = getjQuery();

if ($$4) {
  var JQUERY_NO_CONFLICT$3 = $$4.fn[NAME$3];
  $$4.fn[NAME$3] = Collapse.jQueryInterface, $$4.fn[NAME$3].Constructor = Collapse, $$4.fn[NAME$3].noConflict = function () {
    return $$4.fn[NAME$3] = JQUERY_NO_CONFLICT$3, Collapse.jQueryInterface;
  };
}

var NAME$4 = "dropdown",
    VERSION$4 = "5.0.0-alpha2",
    DATA_KEY$4 = "bs.dropdown",
    EVENT_KEY$4 = "." + DATA_KEY$4,
    DATA_API_KEY$4 = ".data-api",
    ESCAPE_KEY = "Escape",
    SPACE_KEY = "Space",
    TAB_KEY = "Tab",
    ARROW_UP_KEY = "ArrowUp",
    ARROW_DOWN_KEY = "ArrowDown",
    RIGHT_MOUSE_BUTTON = 2,
    REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEY + "|" + ARROW_DOWN_KEY + "|" + ESCAPE_KEY),
    EVENT_HIDE$1 = "hide" + EVENT_KEY$4,
    EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4,
    EVENT_SHOW$1 = "show" + EVENT_KEY$4,
    EVENT_SHOWN$1 = "shown" + EVENT_KEY$4,
    EVENT_CLICK = "click" + EVENT_KEY$4,
    EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4,
    EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
    EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4,
    CLASS_NAME_DISABLED = "disabled",
    CLASS_NAME_SHOW$1 = "show",
    CLASS_NAME_DROPUP = "dropup",
    CLASS_NAME_DROPRIGHT = "dropright",
    CLASS_NAME_DROPLEFT = "dropleft",
    CLASS_NAME_MENURIGHT = "dropdown-menu-right",
    CLASS_NAME_NAVBAR = "navbar",
    CLASS_NAME_POSITION_STATIC = "position-static",
    SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]',
    SELECTOR_FORM_CHILD = ".dropdown form",
    SELECTOR_MENU = ".dropdown-menu",
    SELECTOR_NAVBAR_NAV = ".navbar-nav",
    SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
    PLACEMENT_TOP = "top-start",
    PLACEMENT_TOPEND = "top-end",
    PLACEMENT_BOTTOM = "bottom-start",
    PLACEMENT_BOTTOMEND = "bottom-end",
    PLACEMENT_RIGHT = "right-start",
    PLACEMENT_LEFT = "left-start",
    Default$2 = {
  offset: 0,
  flip: !0,
  boundary: "scrollParent",
  reference: "toggle",
  display: "dynamic",
  popperConfig: null
},
    DefaultType$2 = {
  offset: "(number|string|function)",
  flip: "boolean",
  boundary: "(string|element)",
  reference: "(string|element)",
  display: "string",
  popperConfig: "(null|object)"
},
    Dropdown = function () {
  function e(e, t) {
    this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners(), Data.setData(e, DATA_KEY$4, this);
  }

  var t = e.prototype;
  return t.toggle = function () {
    if (!this._element.disabled && !this._element.classList.contains(CLASS_NAME_DISABLED)) {
      var t = this._element.classList.contains(CLASS_NAME_SHOW$1);

      e.clearMenus(), t || this.show();
    }
  }, t.show = function () {
    if (!(this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || this._menu.classList.contains(CLASS_NAME_SHOW$1))) {
      var t = e.getParentFromElement(this._element),
          n = {
        relatedTarget: this._element
      };

      if (!EventHandler.trigger(this._element, EVENT_SHOW$1, n).defaultPrevented) {
        if (!this._inNavbar) {
          if (void 0 === _popper["default"]) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org)");
          var i = this._element;
          "parent" === this._config.reference ? i = t : isElement(this._config.reference) && (i = this._config.reference, void 0 !== this._config.reference.jquery && (i = this._config.reference[0])), "scrollParent" !== this._config.boundary && t.classList.add(CLASS_NAME_POSITION_STATIC), this._popper = new _popper["default"](i, this._menu, this._getPopperConfig());
        }

        var r;
        if ("ontouchstart" in document.documentElement && !t.closest(SELECTOR_NAVBAR_NAV)) (r = []).concat.apply(r, document.body.children).forEach(function (e) {
          return EventHandler.on(e, "mouseover", null, noop());
        });
        this._element.focus(), this._element.setAttribute("aria-expanded", !0), Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1), Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1), EventHandler.trigger(t, EVENT_SHOWN$1, n);
      }
    }
  }, t.hide = function () {
    if (!this._element.disabled && !this._element.classList.contains(CLASS_NAME_DISABLED) && this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
      var t = e.getParentFromElement(this._element),
          n = {
        relatedTarget: this._element
      };
      EventHandler.trigger(t, EVENT_HIDE$1, n).defaultPrevented || (this._popper && this._popper.destroy(), Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1), Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1), EventHandler.trigger(t, EVENT_HIDDEN$1, n));
    }
  }, t.dispose = function () {
    Data.removeData(this._element, DATA_KEY$4), EventHandler.off(this._element, EVENT_KEY$4), this._element = null, this._menu = null, this._popper && (this._popper.destroy(), this._popper = null);
  }, t.update = function () {
    this._inNavbar = this._detectNavbar(), this._popper && this._popper.scheduleUpdate();
  }, t._addEventListeners = function () {
    var e = this;
    EventHandler.on(this._element, EVENT_CLICK, function (t) {
      t.preventDefault(), t.stopPropagation(), e.toggle();
    });
  }, t._getConfig = function (e) {
    return e = _extends({}, this.constructor.Default, Manipulator.getDataAttributes(this._element), e), typeCheckConfig(NAME$4, e, this.constructor.DefaultType), e;
  }, t._getMenuElement = function () {
    return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
  }, t._getPlacement = function () {
    var e = this._element.parentNode,
        t = PLACEMENT_BOTTOM;
    return e.classList.contains(CLASS_NAME_DROPUP) ? (t = PLACEMENT_TOP, this._menu.classList.contains(CLASS_NAME_MENURIGHT) && (t = PLACEMENT_TOPEND)) : e.classList.contains(CLASS_NAME_DROPRIGHT) ? t = PLACEMENT_RIGHT : e.classList.contains(CLASS_NAME_DROPLEFT) ? t = PLACEMENT_LEFT : this._menu.classList.contains(CLASS_NAME_MENURIGHT) && (t = PLACEMENT_BOTTOMEND), t;
  }, t._detectNavbar = function () {
    return Boolean(this._element.closest("." + CLASS_NAME_NAVBAR));
  }, t._getOffset = function () {
    var e = this,
        t = {};
    return "function" == typeof this._config.offset ? t.fn = function (t) {
      return t.offsets = _extends({}, t.offsets, e._config.offset(t.offsets, e._element) || {}), t;
    } : t.offset = this._config.offset, t;
  }, t._getPopperConfig = function () {
    var e = {
      placement: this._getPlacement(),
      modifiers: {
        offset: this._getOffset(),
        flip: {
          enabled: this._config.flip
        },
        preventOverflow: {
          boundariesElement: this._config.boundary
        }
      }
    };
    return "static" === this._config.display && (e.modifiers.applyStyle = {
      enabled: !1
    }), _extends({}, e, this._config.popperConfig);
  }, e.dropdownInterface = function (t, n) {
    var i = Data.getData(t, DATA_KEY$4);

    if (i || (i = new e(t, "object" == _typeof(n) ? n : null)), "string" == typeof n) {
      if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
      i[n]();
    }
  }, e.jQueryInterface = function (t) {
    return this.each(function () {
      e.dropdownInterface(this, t);
    });
  }, e.clearMenus = function (t) {
    if (!t || t.button !== RIGHT_MOUSE_BUTTON && ("keyup" !== t.type || t.key === TAB_KEY)) for (var n = SelectorEngine.find(SELECTOR_DATA_TOGGLE$2), i = 0, r = n.length; i < r; i++) {
      var o = e.getParentFromElement(n[i]),
          a = Data.getData(n[i], DATA_KEY$4),
          s = {
        relatedTarget: n[i]
      };

      if (t && "click" === t.type && (s.clickEvent = t), a) {
        var l = a._menu;
        if (n[i].classList.contains(CLASS_NAME_SHOW$1)) if (!(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && t.key === TAB_KEY) && l.contains(t.target))) if (!EventHandler.trigger(o, EVENT_HIDE$1, s).defaultPrevented) {
          var E;
          if ("ontouchstart" in document.documentElement) (E = []).concat.apply(E, document.body.children).forEach(function (e) {
            return EventHandler.off(e, "mouseover", null, noop());
          });
          n[i].setAttribute("aria-expanded", "false"), a._popper && a._popper.destroy(), l.classList.remove(CLASS_NAME_SHOW$1), n[i].classList.remove(CLASS_NAME_SHOW$1), EventHandler.trigger(o, EVENT_HIDDEN$1, s);
        }
      }
    }
  }, e.getParentFromElement = function (e) {
    return getElementFromSelector(e) || e.parentNode;
  }, e.dataApiKeydownHandler = function (t) {
    if (!(/input|textarea/i.test(t.target.tagName) ? t.key === SPACE_KEY || t.key !== ESCAPE_KEY && (t.key !== ARROW_DOWN_KEY && t.key !== ARROW_UP_KEY || t.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(t.key)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !this.classList.contains(CLASS_NAME_DISABLED))) {
      var n = e.getParentFromElement(this),
          i = this.classList.contains(CLASS_NAME_SHOW$1);
      if (t.key === ESCAPE_KEY) return (this.matches(SELECTOR_DATA_TOGGLE$2) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$2)[0]).focus(), void e.clearMenus();

      if (i && t.key !== SPACE_KEY) {
        var r = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, n).filter(isVisible);

        if (r.length) {
          var o = r.indexOf(t.target);
          t.key === ARROW_UP_KEY && o > 0 && o--, t.key === ARROW_DOWN_KEY && o < r.length - 1 && o++, r[o = -1 === o ? 0 : o].focus();
        }
      } else e.clearMenus();
    }
  }, e.getInstance = function (e) {
    return Data.getData(e, DATA_KEY$4);
  }, _createClass(e, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$4;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$2;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$2;
    }
  }]), e;
}();

exports.Dropdown = Dropdown;
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown.dataApiKeydownHandler), EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler), EventHandler.on(document, EVENT_CLICK_DATA_API$4, Dropdown.clearMenus), EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus), EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (e) {
  e.preventDefault(), e.stopPropagation(), Dropdown.dropdownInterface(this, "toggle");
}), EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
  return e.stopPropagation();
});
var $$5 = getjQuery();

if ($$5) {
  var JQUERY_NO_CONFLICT$4 = $$5.fn[NAME$4];
  $$5.fn[NAME$4] = Dropdown.jQueryInterface, $$5.fn[NAME$4].Constructor = Dropdown, $$5.fn[NAME$4].noConflict = function () {
    return $$5.fn[NAME$4] = JQUERY_NO_CONFLICT$4, Dropdown.jQueryInterface;
  };
}

var NAME$5 = "modal",
    VERSION$5 = "5.0.0-alpha2",
    DATA_KEY$5 = "bs.modal",
    EVENT_KEY$5 = "." + DATA_KEY$5,
    DATA_API_KEY$5 = ".data-api",
    ESCAPE_KEY$1 = "Escape",
    Default$3 = {
  backdrop: !0,
  keyboard: !0,
  focus: !0,
  show: !0
},
    DefaultType$3 = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  focus: "boolean",
  show: "boolean"
},
    EVENT_HIDE$2 = "hide" + EVENT_KEY$5,
    EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5,
    EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5,
    EVENT_SHOW$2 = "show" + EVENT_KEY$5,
    EVENT_SHOWN$2 = "shown" + EVENT_KEY$5,
    EVENT_FOCUSIN = "focusin" + EVENT_KEY$5,
    EVENT_RESIZE = "resize" + EVENT_KEY$5,
    EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5,
    EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5,
    EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5,
    EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5,
    EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5,
    CLASS_NAME_SCROLLBAR_MEASURER = "modal-scrollbar-measure",
    CLASS_NAME_BACKDROP = "modal-backdrop",
    CLASS_NAME_OPEN = "modal-open",
    CLASS_NAME_FADE = "fade",
    CLASS_NAME_SHOW$2 = "show",
    CLASS_NAME_STATIC = "modal-static",
    SELECTOR_DIALOG = ".modal-dialog",
    SELECTOR_MODAL_BODY = ".modal-body",
    SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]',
    SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]',
    SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    SELECTOR_STICKY_CONTENT = ".sticky-top",
    Modal = function () {
  function e(e, t) {
    this._config = this._getConfig(t), this._element = e, this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, e), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0, Data.setData(e, DATA_KEY$5, this);
  }

  var t = e.prototype;
  return t.toggle = function (e) {
    return this._isShown ? this.hide() : this.show(e);
  }, t.show = function (e) {
    var t = this;

    if (!this._isShown && !this._isTransitioning) {
      this._element.classList.contains(CLASS_NAME_FADE) && (this._isTransitioning = !0);
      var n = EventHandler.trigger(this._element, EVENT_SHOW$2, {
        relatedTarget: e
      });
      this._isShown || n.defaultPrevented || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (e) {
        return t.hide(e);
      }), EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
        EventHandler.one(t._element, EVENT_MOUSEUP_DISMISS, function (e) {
          e.target === t._element && (t._ignoreBackdropClick = !0);
        });
      }), this._showBackdrop(function () {
        return t._showElement(e);
      }));
    }
  }, t.hide = function (e) {
    var t = this;

    if ((e && e.preventDefault(), this._isShown && !this._isTransitioning) && !EventHandler.trigger(this._element, EVENT_HIDE$2).defaultPrevented) {
      this._isShown = !1;

      var n = this._element.classList.contains(CLASS_NAME_FADE);

      if (n && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), EventHandler.off(document, EVENT_FOCUSIN), this._element.classList.remove(CLASS_NAME_SHOW$2), EventHandler.off(this._element, EVENT_CLICK_DISMISS), EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS), n) {
        var i = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, function (e) {
          return t._hideModal(e);
        }), emulateTransitionEnd(this._element, i);
      } else this._hideModal();
    }
  }, t.dispose = function () {
    [window, this._element, this._dialog].forEach(function (e) {
      return EventHandler.off(e, EVENT_KEY$5);
    }), EventHandler.off(document, EVENT_FOCUSIN), Data.removeData(this._element, DATA_KEY$5), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null;
  }, t.handleUpdate = function () {
    this._adjustDialog();
  }, t._getConfig = function (e) {
    return e = _extends({}, Default$3, e), typeCheckConfig(NAME$5, e, DefaultType$3), e;
  }, t._showElement = function (e) {
    var t = this,
        n = this._element.classList.contains(CLASS_NAME_FADE),
        i = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

    this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0, i && (i.scrollTop = 0), n && reflow(this._element), this._element.classList.add(CLASS_NAME_SHOW$2), this._config.focus && this._enforceFocus();

    var r = function r() {
      t._config.focus && t._element.focus(), t._isTransitioning = !1, EventHandler.trigger(t._element, EVENT_SHOWN$2, {
        relatedTarget: e
      });
    };

    if (n) {
      var o = getTransitionDurationFromElement(this._dialog);
      EventHandler.one(this._dialog, TRANSITION_END, r), emulateTransitionEnd(this._dialog, o);
    } else r();
  }, t._enforceFocus = function () {
    var e = this;
    EventHandler.off(document, EVENT_FOCUSIN), EventHandler.on(document, EVENT_FOCUSIN, function (t) {
      document === t.target || e._element === t.target || e._element.contains(t.target) || e._element.focus();
    });
  }, t._setEscapeEvent = function () {
    var e = this;
    this._isShown ? EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (t) {
      e._config.keyboard && t.key === ESCAPE_KEY$1 ? (t.preventDefault(), e.hide()) : e._config.keyboard || t.key !== ESCAPE_KEY$1 || e._triggerBackdropTransition();
    }) : EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS);
  }, t._setResizeEvent = function () {
    var e = this;
    this._isShown ? EventHandler.on(window, EVENT_RESIZE, function () {
      return e._adjustDialog();
    }) : EventHandler.off(window, EVENT_RESIZE);
  }, t._hideModal = function () {
    var e = this;
    this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(function () {
      document.body.classList.remove(CLASS_NAME_OPEN), e._resetAdjustments(), e._resetScrollbar(), EventHandler.trigger(e._element, EVENT_HIDDEN$2);
    });
  }, t._removeBackdrop = function () {
    this._backdrop.parentNode.removeChild(this._backdrop), this._backdrop = null;
  }, t._showBackdrop = function (e) {
    var t = this,
        n = this._element.classList.contains(CLASS_NAME_FADE) ? CLASS_NAME_FADE : "";

    if (this._isShown && this._config.backdrop) {
      if (this._backdrop = document.createElement("div"), this._backdrop.className = CLASS_NAME_BACKDROP, n && this._backdrop.classList.add(n), document.body.appendChild(this._backdrop), EventHandler.on(this._element, EVENT_CLICK_DISMISS, function (e) {
        t._ignoreBackdropClick ? t._ignoreBackdropClick = !1 : e.target === e.currentTarget && t._triggerBackdropTransition();
      }), n && reflow(this._backdrop), this._backdrop.classList.add(CLASS_NAME_SHOW$2), !n) return void e();
      var i = getTransitionDurationFromElement(this._backdrop);
      EventHandler.one(this._backdrop, TRANSITION_END, e), emulateTransitionEnd(this._backdrop, i);
    } else if (!this._isShown && this._backdrop) {
      this._backdrop.classList.remove(CLASS_NAME_SHOW$2);

      var r = function r() {
        t._removeBackdrop(), e();
      };

      if (this._element.classList.contains(CLASS_NAME_FADE)) {
        var o = getTransitionDurationFromElement(this._backdrop);
        EventHandler.one(this._backdrop, TRANSITION_END, r), emulateTransitionEnd(this._backdrop, o);
      } else r();
    } else e();
  }, t._triggerBackdropTransition = function () {
    var e = this;

    if ("static" === this._config.backdrop) {
      if (EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED).defaultPrevented) return;
      var t = this._element.scrollHeight > document.documentElement.clientHeight;
      t || (this._element.style.overflowY = "hidden"), this._element.classList.add(CLASS_NAME_STATIC);
      var n = getTransitionDurationFromElement(this._dialog);
      EventHandler.off(this._element, TRANSITION_END), EventHandler.one(this._element, TRANSITION_END, function () {
        e._element.classList.remove(CLASS_NAME_STATIC), t || (EventHandler.one(e._element, TRANSITION_END, function () {
          e._element.style.overflowY = "";
        }), emulateTransitionEnd(e._element, n));
      }), emulateTransitionEnd(this._element, n), this._element.focus();
    } else this.hide();
  }, t._adjustDialog = function () {
    var e = this._element.scrollHeight > document.documentElement.clientHeight;
    !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px");
  }, t._resetAdjustments = function () {
    this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
  }, t._checkScrollbar = function () {
    var e = document.body.getBoundingClientRect();
    this._isBodyOverflowing = Math.round(e.left + e.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
  }, t._setScrollbar = function () {
    var e = this;

    if (this._isBodyOverflowing) {
      SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (t) {
        var n = t.style.paddingRight,
            i = window.getComputedStyle(t)["padding-right"];
        Manipulator.setDataAttribute(t, "padding-right", n), t.style.paddingRight = parseFloat(i) + e._scrollbarWidth + "px";
      }), SelectorEngine.find(SELECTOR_STICKY_CONTENT).forEach(function (t) {
        var n = t.style.marginRight,
            i = window.getComputedStyle(t)["margin-right"];
        Manipulator.setDataAttribute(t, "margin-right", n), t.style.marginRight = parseFloat(i) - e._scrollbarWidth + "px";
      });
      var t = document.body.style.paddingRight,
          n = window.getComputedStyle(document.body)["padding-right"];
      Manipulator.setDataAttribute(document.body, "padding-right", t), document.body.style.paddingRight = parseFloat(n) + this._scrollbarWidth + "px";
    }

    document.body.classList.add(CLASS_NAME_OPEN);
  }, t._resetScrollbar = function () {
    SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (e) {
      var t = Manipulator.getDataAttribute(e, "padding-right");
      void 0 !== t && (Manipulator.removeDataAttribute(e, "padding-right"), e.style.paddingRight = t);
    }), SelectorEngine.find("" + SELECTOR_STICKY_CONTENT).forEach(function (e) {
      var t = Manipulator.getDataAttribute(e, "margin-right");
      void 0 !== t && (Manipulator.removeDataAttribute(e, "margin-right"), e.style.marginRight = t);
    });
    var e = Manipulator.getDataAttribute(document.body, "padding-right");
    void 0 === e ? document.body.style.paddingRight = "" : (Manipulator.removeDataAttribute(document.body, "padding-right"), document.body.style.paddingRight = e);
  }, t._getScrollbarWidth = function () {
    var e = document.createElement("div");
    e.className = CLASS_NAME_SCROLLBAR_MEASURER, document.body.appendChild(e);
    var t = e.getBoundingClientRect().width - e.clientWidth;
    return document.body.removeChild(e), t;
  }, e.jQueryInterface = function (t, n) {
    return this.each(function () {
      var i = Data.getData(this, DATA_KEY$5),
          r = _extends({}, Default$3, Manipulator.getDataAttributes(this), "object" == _typeof(t) && t ? t : {});

      if (i || (i = new e(this, r)), "string" == typeof t) {
        if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
        i[t](n);
      } else r.show && i.show(n);
    });
  }, e.getInstance = function (e) {
    return Data.getData(e, DATA_KEY$5);
  }, _createClass(e, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$5;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$3;
    }
  }]), e;
}();

exports.Modal = Modal;
EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (e) {
  var t = this,
      n = getElementFromSelector(this);
  "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault(), EventHandler.one(n, EVENT_SHOW$2, function (e) {
    e.defaultPrevented || EventHandler.one(n, EVENT_HIDDEN$2, function () {
      isVisible(t) && t.focus();
    });
  });
  var i = Data.getData(n, DATA_KEY$5);

  if (!i) {
    var r = _extends({}, Manipulator.getDataAttributes(n), Manipulator.getDataAttributes(this));

    i = new Modal(n, r);
  }

  i.show(this);
});
var $$6 = getjQuery();

if ($$6) {
  var JQUERY_NO_CONFLICT$5 = $$6.fn[NAME$5];
  $$6.fn[NAME$5] = Modal.jQueryInterface, $$6.fn[NAME$5].Constructor = Modal, $$6.fn[NAME$5].noConflict = function () {
    return $$6.fn[NAME$5] = JQUERY_NO_CONFLICT$5, Modal.jQueryInterface;
  };
}

var uriAttrs = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
    ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i,
    SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
    DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
    allowedAttribute = function allowedAttribute(e, t) {
  var n = e.nodeName.toLowerCase();
  if (-1 !== t.indexOf(n)) return -1 === uriAttrs.indexOf(n) || Boolean(e.nodeValue.match(SAFE_URL_PATTERN) || e.nodeValue.match(DATA_URL_PATTERN));

  for (var i = t.filter(function (e) {
    return e instanceof RegExp;
  }), r = 0, o = i.length; r < o; r++) {
    if (n.match(i[r])) return !0;
  }

  return !1;
},
    DefaultAllowlist = {
  "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
  a: ["target", "href", "title", "rel"],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};

function sanitizeHtml(e, t, n) {
  var i;
  if (!e.length) return e;
  if (n && "function" == typeof n) return n(e);

  for (var r = new window.DOMParser().parseFromString(e, "text/html"), o = Object.keys(t), a = (i = []).concat.apply(i, r.body.querySelectorAll("*")), s = function s(e, n) {
    var i,
        r = a[e],
        s = r.nodeName.toLowerCase();
    if (-1 === o.indexOf(s)) return r.parentNode.removeChild(r), "continue";
    var l = (i = []).concat.apply(i, r.attributes),
        E = [].concat(t["*"] || [], t[s] || []);
    l.forEach(function (e) {
      allowedAttribute(e, E) || r.removeAttribute(e.nodeName);
    });
  }, l = 0, E = a.length; l < E; l++) {
    s(l);
  }

  return r.body.innerHTML;
}

var NAME$6 = "tooltip",
    VERSION$6 = "5.0.0-alpha2",
    DATA_KEY$6 = "bs.tooltip",
    EVENT_KEY$6 = "." + DATA_KEY$6,
    CLASS_PREFIX = "bs-tooltip",
    BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", "g"),
    DISALLOWED_ATTRIBUTES = ["sanitize", "allowList", "sanitizeFn"],
    DefaultType$4 = {
  animation: "boolean",
  template: "string",
  title: "(string|element|function)",
  trigger: "string",
  delay: "(number|object)",
  html: "boolean",
  selector: "(string|boolean)",
  placement: "(string|function)",
  offset: "(number|string|function)",
  container: "(string|element|boolean)",
  fallbackPlacement: "(string|array)",
  boundary: "(string|element)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  allowList: "object",
  popperConfig: "(null|object)"
},
    AttachmentMap = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left"
},
    Default$4 = {
  animation: !0,
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  trigger: "hover focus",
  title: "",
  delay: 0,
  html: !1,
  selector: !1,
  placement: "top",
  offset: 0,
  container: !1,
  fallbackPlacement: "flip",
  boundary: "scrollParent",
  sanitize: !0,
  sanitizeFn: null,
  allowList: DefaultAllowlist,
  popperConfig: null
},
    Event$1 = {
  HIDE: "hide" + EVENT_KEY$6,
  HIDDEN: "hidden" + EVENT_KEY$6,
  SHOW: "show" + EVENT_KEY$6,
  SHOWN: "shown" + EVENT_KEY$6,
  INSERTED: "inserted" + EVENT_KEY$6,
  CLICK: "click" + EVENT_KEY$6,
  FOCUSIN: "focusin" + EVENT_KEY$6,
  FOCUSOUT: "focusout" + EVENT_KEY$6,
  MOUSEENTER: "mouseenter" + EVENT_KEY$6,
  MOUSELEAVE: "mouseleave" + EVENT_KEY$6
},
    CLASS_NAME_FADE$1 = "fade",
    CLASS_NAME_MODAL = "modal",
    CLASS_NAME_SHOW$3 = "show",
    HOVER_STATE_SHOW = "show",
    HOVER_STATE_OUT = "out",
    SELECTOR_TOOLTIP_INNER = ".tooltip-inner",
    TRIGGER_HOVER = "hover",
    TRIGGER_FOCUS = "focus",
    TRIGGER_CLICK = "click",
    TRIGGER_MANUAL = "manual",
    Tooltip = function () {
  function e(e, t) {
    if (void 0 === _popper["default"]) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org)");
    this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners(), Data.setData(e, this.constructor.DATA_KEY, this);
  }

  var t = e.prototype;
  return t.enable = function () {
    this._isEnabled = !0;
  }, t.disable = function () {
    this._isEnabled = !1;
  }, t.toggleEnabled = function () {
    this._isEnabled = !this._isEnabled;
  }, t.toggle = function (e) {
    if (this._isEnabled) if (e) {
      var t = this.constructor.DATA_KEY,
          n = Data.getData(e.delegateTarget, t);
      n || (n = new this.constructor(e.delegateTarget, this._getDelegateConfig()), Data.setData(e.delegateTarget, t, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n);
    } else {
      if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) return void this._leave(null, this);

      this._enter(null, this);
    }
  }, t.dispose = function () {
    clearTimeout(this._timeout), Data.removeData(this.element, this.constructor.DATA_KEY), EventHandler.off(this.element, this.constructor.EVENT_KEY), EventHandler.off(this.element.closest("." + CLASS_NAME_MODAL), "hide.bs.modal", this._hideModalHandler), this.tip && this.tip.parentNode.removeChild(this.tip), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
  }, t.show = function () {
    var e = this;
    if ("none" === this.element.style.display) throw new Error("Please use show on visible elements");

    if (this.isWithContent() && this._isEnabled) {
      var t = EventHandler.trigger(this.element, this.constructor.Event.SHOW),
          n = findShadowRoot(this.element),
          i = null === n ? this.element.ownerDocument.documentElement.contains(this.element) : n.contains(this.element);
      if (t.defaultPrevented || !i) return;
      var r = this.getTipElement(),
          o = getUID(this.constructor.NAME);
      r.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && r.classList.add(CLASS_NAME_FADE$1);

      var a = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
          s = this._getAttachment(a);

      this._addAttachmentClass(s);

      var l,
          E = this._getContainer();

      if (Data.setData(r, this.constructor.DATA_KEY, this), this.element.ownerDocument.documentElement.contains(this.tip) || E.appendChild(r), EventHandler.trigger(this.element, this.constructor.Event.INSERTED), this._popper = new _popper["default"](this.element, r, this._getPopperConfig(s)), r.classList.add(CLASS_NAME_SHOW$3), "ontouchstart" in document.documentElement) (l = []).concat.apply(l, document.body.children).forEach(function (e) {
        EventHandler.on(e, "mouseover", noop());
      });

      var _ = function _() {
        e.config.animation && e._fixTransition();
        var t = e._hoverState;
        e._hoverState = null, EventHandler.trigger(e.element, e.constructor.Event.SHOWN), t === HOVER_STATE_OUT && e._leave(null, e);
      };

      if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
        var c = getTransitionDurationFromElement(this.tip);
        EventHandler.one(this.tip, TRANSITION_END, _), emulateTransitionEnd(this.tip, c);
      } else _();
    }
  }, t.hide = function () {
    var e = this;

    if (this._popper) {
      var t = this.getTipElement(),
          n = function n() {
        e._hoverState !== HOVER_STATE_SHOW && t.parentNode && t.parentNode.removeChild(t), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), EventHandler.trigger(e.element, e.constructor.Event.HIDDEN), e._popper.destroy();
      };

      if (!EventHandler.trigger(this.element, this.constructor.Event.HIDE).defaultPrevented) {
        var i;
        if (t.classList.remove(CLASS_NAME_SHOW$3), "ontouchstart" in document.documentElement) (i = []).concat.apply(i, document.body.children).forEach(function (e) {
          return EventHandler.off(e, "mouseover", noop);
        });

        if (this._activeTrigger[TRIGGER_CLICK] = !1, this._activeTrigger[TRIGGER_FOCUS] = !1, this._activeTrigger[TRIGGER_HOVER] = !1, this.tip.classList.contains(CLASS_NAME_FADE$1)) {
          var r = getTransitionDurationFromElement(t);
          EventHandler.one(t, TRANSITION_END, n), emulateTransitionEnd(t, r);
        } else n();

        this._hoverState = "";
      }
    }
  }, t.update = function () {
    null !== this._popper && this._popper.scheduleUpdate();
  }, t.isWithContent = function () {
    return Boolean(this.getTitle());
  }, t.getTipElement = function () {
    if (this.tip) return this.tip;
    var e = document.createElement("div");
    return e.innerHTML = this.config.template, this.tip = e.children[0], this.tip;
  }, t.setContent = function () {
    var e = this.getTipElement();
    this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, e), this.getTitle()), e.classList.remove(CLASS_NAME_FADE$1, CLASS_NAME_SHOW$3);
  }, t.setElementContent = function (e, t) {
    if (null !== e) return "object" == _typeof(t) && isElement(t) ? (t.jquery && (t = t[0]), void (this.config.html ? t.parentNode !== e && (e.innerHTML = "", e.appendChild(t)) : e.textContent = t.textContent)) : void (this.config.html ? (this.config.sanitize && (t = sanitizeHtml(t, this.config.allowList, this.config.sanitizeFn)), e.innerHTML = t) : e.textContent = t);
  }, t.getTitle = function () {
    var e = this.element.getAttribute("data-original-title");
    return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e;
  }, t._getPopperConfig = function (e) {
    var t = this;
    return _extends({}, {
      placement: e,
      modifiers: {
        offset: this._getOffset(),
        flip: {
          behavior: this.config.fallbackPlacement
        },
        arrow: {
          element: "." + this.constructor.NAME + "-arrow"
        },
        preventOverflow: {
          boundariesElement: this.config.boundary
        }
      },
      onCreate: function onCreate(e) {
        e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e);
      },
      onUpdate: function onUpdate(e) {
        return t._handlePopperPlacementChange(e);
      }
    }, this.config.popperConfig);
  }, t._addAttachmentClass = function (e) {
    this.getTipElement().classList.add(CLASS_PREFIX + "-" + e);
  }, t._getOffset = function () {
    var e = this,
        t = {};
    return "function" == typeof this.config.offset ? t.fn = function (t) {
      return t.offsets = _extends({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t;
    } : t.offset = this.config.offset, t;
  }, t._getContainer = function () {
    return !1 === this.config.container ? document.body : isElement(this.config.container) ? this.config.container : SelectorEngine.findOne(this.config.container);
  }, t._getAttachment = function (e) {
    return AttachmentMap[e.toUpperCase()];
  }, t._setListeners = function () {
    var e = this;
    this.config.trigger.split(" ").forEach(function (t) {
      if ("click" === t) EventHandler.on(e.element, e.constructor.Event.CLICK, e.config.selector, function (t) {
        return e.toggle(t);
      });else if (t !== TRIGGER_MANUAL) {
        var n = t === TRIGGER_HOVER ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
            i = t === TRIGGER_HOVER ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
        EventHandler.on(e.element, n, e.config.selector, function (t) {
          return e._enter(t);
        }), EventHandler.on(e.element, i, e.config.selector, function (t) {
          return e._leave(t);
        });
      }
    }), this._hideModalHandler = function () {
      e.element && e.hide();
    }, EventHandler.on(this.element.closest("." + CLASS_NAME_MODAL), "hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = _extends({}, this.config, {
      trigger: "manual",
      selector: ""
    }) : this._fixTitle();
  }, t._fixTitle = function () {
    var e = _typeof(this.element.getAttribute("data-original-title"));

    (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
  }, t._enter = function (e, t) {
    var n = this.constructor.DATA_KEY;
    (t = t || Data.getData(e.delegateTarget, n)) || (t = new this.constructor(e.delegateTarget, this._getDelegateConfig()), Data.setData(e.delegateTarget, n, t)), e && (t._activeTrigger["focusin" === e.type ? TRIGGER_FOCUS : TRIGGER_HOVER] = !0), t.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || t._hoverState === HOVER_STATE_SHOW ? t._hoverState = HOVER_STATE_SHOW : (clearTimeout(t._timeout), t._hoverState = HOVER_STATE_SHOW, t.config.delay && t.config.delay.show ? t._timeout = setTimeout(function () {
      t._hoverState === HOVER_STATE_SHOW && t.show();
    }, t.config.delay.show) : t.show());
  }, t._leave = function (e, t) {
    var n = this.constructor.DATA_KEY;
    (t = t || Data.getData(e.delegateTarget, n)) || (t = new this.constructor(e.delegateTarget, this._getDelegateConfig()), Data.setData(e.delegateTarget, n, t)), e && (t._activeTrigger["focusout" === e.type ? TRIGGER_FOCUS : TRIGGER_HOVER] = !1), t._isWithActiveTrigger() || (clearTimeout(t._timeout), t._hoverState = HOVER_STATE_OUT, t.config.delay && t.config.delay.hide ? t._timeout = setTimeout(function () {
      t._hoverState === HOVER_STATE_OUT && t.hide();
    }, t.config.delay.hide) : t.hide());
  }, t._isWithActiveTrigger = function () {
    for (var e in this._activeTrigger) {
      if (this._activeTrigger[e]) return !0;
    }

    return !1;
  }, t._getConfig = function (e) {
    var t = Manipulator.getDataAttributes(this.element);
    return Object.keys(t).forEach(function (e) {
      -1 !== DISALLOWED_ATTRIBUTES.indexOf(e) && delete t[e];
    }), e && "object" == _typeof(e.container) && e.container.jquery && (e.container = e.container[0]), "number" == typeof (e = _extends({}, this.constructor.Default, t, "object" == _typeof(e) && e ? e : {})).delay && (e.delay = {
      show: e.delay,
      hide: e.delay
    }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), typeCheckConfig(NAME$6, e, this.constructor.DefaultType), e.sanitize && (e.template = sanitizeHtml(e.template, e.allowList, e.sanitizeFn)), e;
  }, t._getDelegateConfig = function () {
    var e = {};
    if (this.config) for (var t in this.config) {
      this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
    }
    return e;
  }, t._cleanTipClass = function () {
    var e = this.getTipElement(),
        t = e.getAttribute("class").match(BSCLS_PREFIX_REGEX);
    null !== t && t.length > 0 && t.map(function (e) {
      return e.trim();
    }).forEach(function (t) {
      return e.classList.remove(t);
    });
  }, t._handlePopperPlacementChange = function (e) {
    this.tip = e.instance.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(e.placement));
  }, t._fixTransition = function () {
    var e = this.getTipElement(),
        t = this.config.animation;
    null === e.getAttribute("x-placement") && (e.classList.remove(CLASS_NAME_FADE$1), this.config.animation = !1, this.hide(), this.show(), this.config.animation = t);
  }, e.jQueryInterface = function (t) {
    return this.each(function () {
      var n = Data.getData(this, DATA_KEY$6),
          i = "object" == _typeof(t) && t;

      if ((n || !/dispose|hide/.test(t)) && (n || (n = new e(this, i)), "string" == typeof t)) {
        if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
        n[t]();
      }
    });
  }, e.getInstance = function (e) {
    return Data.getData(e, DATA_KEY$6);
  }, _createClass(e, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$6;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$4;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$6;
    }
  }, {
    key: "DATA_KEY",
    get: function get() {
      return DATA_KEY$6;
    }
  }, {
    key: "Event",
    get: function get() {
      return Event$1;
    }
  }, {
    key: "EVENT_KEY",
    get: function get() {
      return EVENT_KEY$6;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$4;
    }
  }]), e;
}(),
    $$7 = getjQuery();

exports.Tooltip = Tooltip;

if ($$7) {
  var JQUERY_NO_CONFLICT$6 = $$7.fn[NAME$6];
  $$7.fn[NAME$6] = Tooltip.jQueryInterface, $$7.fn[NAME$6].Constructor = Tooltip, $$7.fn[NAME$6].noConflict = function () {
    return $$7.fn[NAME$6] = JQUERY_NO_CONFLICT$6, Tooltip.jQueryInterface;
  };
}

var NAME$7 = "popover",
    VERSION$7 = "5.0.0-alpha2",
    DATA_KEY$7 = "bs.popover",
    EVENT_KEY$7 = "." + DATA_KEY$7,
    CLASS_PREFIX$1 = "bs-popover",
    BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", "g"),
    Default$5 = _extends({}, Tooltip.Default, {
  placement: "right",
  trigger: "click",
  content: "",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
}),
    DefaultType$5 = _extends({}, Tooltip.DefaultType, {
  content: "(string|element|function)"
}),
    Event$2 = {
  HIDE: "hide" + EVENT_KEY$7,
  HIDDEN: "hidden" + EVENT_KEY$7,
  SHOW: "show" + EVENT_KEY$7,
  SHOWN: "shown" + EVENT_KEY$7,
  INSERTED: "inserted" + EVENT_KEY$7,
  CLICK: "click" + EVENT_KEY$7,
  FOCUSIN: "focusin" + EVENT_KEY$7,
  FOCUSOUT: "focusout" + EVENT_KEY$7,
  MOUSEENTER: "mouseenter" + EVENT_KEY$7,
  MOUSELEAVE: "mouseleave" + EVENT_KEY$7
},
    CLASS_NAME_FADE$2 = "fade",
    CLASS_NAME_SHOW$4 = "show",
    SELECTOR_TITLE = ".popover-header",
    SELECTOR_CONTENT = ".popover-body",
    Popover = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }

  _inheritsLoose(t, e);

  var n = t.prototype;
  return n.isWithContent = function () {
    return this.getTitle() || this._getContent();
  }, n.setContent = function () {
    var e = this.getTipElement();
    this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, e), this.getTitle());

    var t = this._getContent();

    "function" == typeof t && (t = t.call(this.element)), this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, e), t), e.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$4);
  }, n._addAttachmentClass = function (e) {
    this.getTipElement().classList.add(CLASS_PREFIX$1 + "-" + e);
  }, n._getContent = function () {
    return this.element.getAttribute("data-content") || this.config.content;
  }, n._cleanTipClass = function () {
    var e = this.getTipElement(),
        t = e.getAttribute("class").match(BSCLS_PREFIX_REGEX$1);
    null !== t && t.length > 0 && t.map(function (e) {
      return e.trim();
    }).forEach(function (t) {
      return e.classList.remove(t);
    });
  }, t.jQueryInterface = function (e) {
    return this.each(function () {
      var n = Data.getData(this, DATA_KEY$7),
          i = "object" == _typeof(e) ? e : null;

      if ((n || !/dispose|hide/.test(e)) && (n || (n = new t(this, i), Data.setData(this, DATA_KEY$7, n)), "string" == typeof e)) {
        if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
        n[e]();
      }
    });
  }, t.getInstance = function (e) {
    return Data.getData(e, DATA_KEY$7);
  }, _createClass(t, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$7;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$5;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$7;
    }
  }, {
    key: "DATA_KEY",
    get: function get() {
      return DATA_KEY$7;
    }
  }, {
    key: "Event",
    get: function get() {
      return Event$2;
    }
  }, {
    key: "EVENT_KEY",
    get: function get() {
      return EVENT_KEY$7;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$5;
    }
  }]), t;
}(Tooltip),
    $$8 = getjQuery();

exports.Popover = Popover;

if ($$8) {
  var JQUERY_NO_CONFLICT$7 = $$8.fn[NAME$7];
  $$8.fn[NAME$7] = Popover.jQueryInterface, $$8.fn[NAME$7].Constructor = Popover, $$8.fn[NAME$7].noConflict = function () {
    return $$8.fn[NAME$7] = JQUERY_NO_CONFLICT$7, Popover.jQueryInterface;
  };
}

var NAME$8 = "scrollspy",
    VERSION$8 = "5.0.0-alpha2",
    DATA_KEY$8 = "bs.scrollspy",
    EVENT_KEY$8 = "." + DATA_KEY$8,
    DATA_API_KEY$6 = ".data-api",
    Default$6 = {
  offset: 10,
  method: "auto",
  target: ""
},
    DefaultType$6 = {
  offset: "number",
  method: "string",
  target: "(string|element)"
},
    EVENT_ACTIVATE = "activate" + EVENT_KEY$8,
    EVENT_SCROLL = "scroll" + EVENT_KEY$8,
    EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$8 + DATA_API_KEY$6,
    CLASS_NAME_DROPDOWN_ITEM = "dropdown-item",
    CLASS_NAME_ACTIVE$2 = "active",
    SELECTOR_DATA_SPY = '[data-spy="scroll"]',
    SELECTOR_NAV_LIST_GROUP = ".nav, .list-group",
    SELECTOR_NAV_LINKS = ".nav-link",
    SELECTOR_NAV_ITEMS = ".nav-item",
    SELECTOR_LIST_ITEMS = ".list-group-item",
    SELECTOR_DROPDOWN = ".dropdown",
    SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle",
    METHOD_OFFSET = "offset",
    METHOD_POSITION = "position",
    ScrollSpy = function () {
  function e(e, t) {
    var n = this;
    this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(t), this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + ", " + this._config.target + " " + SELECTOR_LIST_ITEMS + ", " + this._config.target + " ." + CLASS_NAME_DROPDOWN_ITEM, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, EventHandler.on(this._scrollElement, EVENT_SCROLL, function (e) {
      return n._process(e);
    }), this.refresh(), this._process(), Data.setData(e, DATA_KEY$8, this);
  }

  var t = e.prototype;
  return t.refresh = function () {
    var e = this,
        t = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION,
        n = "auto" === this._config.method ? t : this._config.method,
        i = n === METHOD_POSITION ? this._getScrollTop() : 0;
    this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), SelectorEngine.find(this._selector).map(function (e) {
      var t = getSelectorFromElement(e),
          r = t ? SelectorEngine.findOne(t) : null;

      if (r) {
        var o = r.getBoundingClientRect();
        if (o.width || o.height) return [Manipulator[n](r).top + i, t];
      }

      return null;
    }).filter(function (e) {
      return e;
    }).sort(function (e, t) {
      return e[0] - t[0];
    }).forEach(function (t) {
      e._offsets.push(t[0]), e._targets.push(t[1]);
    });
  }, t.dispose = function () {
    Data.removeData(this._element, DATA_KEY$8), EventHandler.off(this._scrollElement, EVENT_KEY$8), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
  }, t._getConfig = function (e) {
    if ("string" != typeof (e = _extends({}, Default$6, "object" == _typeof(e) && e ? e : {})).target && isElement(e.target)) {
      var t = e.target.id;
      t || (t = getUID(NAME$8), e.target.id = t), e.target = "#" + t;
    }

    return typeCheckConfig(NAME$8, e, DefaultType$6), e;
  }, t._getScrollTop = function () {
    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
  }, t._getScrollHeight = function () {
    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  }, t._getOffsetHeight = function () {
    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
  }, t._process = function () {
    var e = this._getScrollTop() + this._config.offset,
        t = this._getScrollHeight(),
        n = this._config.offset + t - this._getOffsetHeight();

    if (this._scrollHeight !== t && this.refresh(), e >= n) {
      var i = this._targets[this._targets.length - 1];
      this._activeTarget !== i && this._activate(i);
    } else {
      if (this._activeTarget && e < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();

      for (var r = this._offsets.length; r--;) {
        this._activeTarget !== this._targets[r] && e >= this._offsets[r] && (void 0 === this._offsets[r + 1] || e < this._offsets[r + 1]) && this._activate(this._targets[r]);
      }
    }
  }, t._activate = function (e) {
    this._activeTarget = e, this._clear();

    var t = this._selector.split(",").map(function (t) {
      return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]';
    }),
        n = SelectorEngine.findOne(t.join(","));

    n.classList.contains(CLASS_NAME_DROPDOWN_ITEM) ? (SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, n.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$2), n.classList.add(CLASS_NAME_ACTIVE$2)) : (n.classList.add(CLASS_NAME_ACTIVE$2), SelectorEngine.parents(n, SELECTOR_NAV_LIST_GROUP).forEach(function (e) {
      SelectorEngine.prev(e, SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).forEach(function (e) {
        return e.classList.add(CLASS_NAME_ACTIVE$2);
      }), SelectorEngine.prev(e, SELECTOR_NAV_ITEMS).forEach(function (e) {
        SelectorEngine.children(e, SELECTOR_NAV_LINKS).forEach(function (e) {
          return e.classList.add(CLASS_NAME_ACTIVE$2);
        });
      });
    })), EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
      relatedTarget: e
    });
  }, t._clear = function () {
    SelectorEngine.find(this._selector).filter(function (e) {
      return e.classList.contains(CLASS_NAME_ACTIVE$2);
    }).forEach(function (e) {
      return e.classList.remove(CLASS_NAME_ACTIVE$2);
    });
  }, e.jQueryInterface = function (t) {
    return this.each(function () {
      var n = Data.getData(this, DATA_KEY$8);

      if (n || (n = new e(this, "object" == _typeof(t) && t)), "string" == typeof t) {
        if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
        n[t]();
      }
    });
  }, e.getInstance = function (e) {
    return Data.getData(e, DATA_KEY$8);
  }, _createClass(e, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$8;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$6;
    }
  }]), e;
}();

exports.ScrollSpy = ScrollSpy;
EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
  SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function (e) {
    return new ScrollSpy(e, Manipulator.getDataAttributes(e));
  });
});
var $$9 = getjQuery();

if ($$9) {
  var JQUERY_NO_CONFLICT$8 = $$9.fn[NAME$8];
  $$9.fn[NAME$8] = ScrollSpy.jQueryInterface, $$9.fn[NAME$8].Constructor = ScrollSpy, $$9.fn[NAME$8].noConflict = function () {
    return $$9.fn[NAME$8] = JQUERY_NO_CONFLICT$8, ScrollSpy.jQueryInterface;
  };
}

var NAME$9 = "tab",
    VERSION$9 = "5.0.0-alpha2",
    DATA_KEY$9 = "bs.tab",
    EVENT_KEY$9 = "." + DATA_KEY$9,
    DATA_API_KEY$7 = ".data-api",
    EVENT_HIDE$3 = "hide" + EVENT_KEY$9,
    EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9,
    EVENT_SHOW$3 = "show" + EVENT_KEY$9,
    EVENT_SHOWN$3 = "shown" + EVENT_KEY$9,
    EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7,
    CLASS_NAME_DROPDOWN_MENU = "dropdown-menu",
    CLASS_NAME_ACTIVE$3 = "active",
    CLASS_NAME_DISABLED$1 = "disabled",
    CLASS_NAME_FADE$3 = "fade",
    CLASS_NAME_SHOW$5 = "show",
    SELECTOR_DROPDOWN$1 = ".dropdown",
    SELECTOR_NAV_LIST_GROUP$1 = ".nav, .list-group",
    SELECTOR_ACTIVE$1 = ".active",
    SELECTOR_ACTIVE_UL = ":scope > li > .active",
    SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle",
    SELECTOR_DROPDOWN_ACTIVE_CHILD = ":scope > .dropdown-menu .active",
    Tab = function () {
  function e(e) {
    this._element = e, Data.setData(this._element, DATA_KEY$9, this);
  }

  var t = e.prototype;
  return t.show = function () {
    var e = this;

    if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE$3) || this._element.classList.contains(CLASS_NAME_DISABLED$1))) {
      var t,
          n = getElementFromSelector(this._element),
          i = this._element.closest(SELECTOR_NAV_LIST_GROUP$1);

      if (i) {
        var r = "UL" === i.nodeName || "OL" === i.nodeName ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$1;
        t = (t = SelectorEngine.find(r, i))[t.length - 1];
      }

      var o = null;

      if (t && (o = EventHandler.trigger(t, EVENT_HIDE$3, {
        relatedTarget: this._element
      })), !(EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget: t
      }).defaultPrevented || null !== o && o.defaultPrevented)) {
        this._activate(this._element, i);

        var a = function a() {
          EventHandler.trigger(t, EVENT_HIDDEN$3, {
            relatedTarget: e._element
          }), EventHandler.trigger(e._element, EVENT_SHOWN$3, {
            relatedTarget: t
          });
        };

        n ? this._activate(n, n.parentNode, a) : a();
      }
    }
  }, t.dispose = function () {
    Data.removeData(this._element, DATA_KEY$9), this._element = null;
  }, t._activate = function (e, t, n) {
    var i = this,
        r = (!t || "UL" !== t.nodeName && "OL" !== t.nodeName ? SelectorEngine.children(t, SELECTOR_ACTIVE$1) : SelectorEngine.find(SELECTOR_ACTIVE_UL, t))[0],
        o = n && r && r.classList.contains(CLASS_NAME_FADE$3),
        a = function a() {
      return i._transitionComplete(e, r, n);
    };

    if (r && o) {
      var s = getTransitionDurationFromElement(r);
      r.classList.remove(CLASS_NAME_SHOW$5), EventHandler.one(r, TRANSITION_END, a), emulateTransitionEnd(r, s);
    } else a();
  }, t._transitionComplete = function (e, t, n) {
    if (t) {
      t.classList.remove(CLASS_NAME_ACTIVE$3);
      var i = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, t.parentNode);
      i && i.classList.remove(CLASS_NAME_ACTIVE$3), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !1);
    }

    (e.classList.add(CLASS_NAME_ACTIVE$3), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), reflow(e), e.classList.contains(CLASS_NAME_FADE$3) && e.classList.add(CLASS_NAME_SHOW$5), e.parentNode && e.parentNode.classList.contains(CLASS_NAME_DROPDOWN_MENU)) && (e.closest(SELECTOR_DROPDOWN$1) && SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE$1).forEach(function (e) {
      return e.classList.add(CLASS_NAME_ACTIVE$3);
    }), e.setAttribute("aria-expanded", !0));
    n && n();
  }, e.jQueryInterface = function (t) {
    return this.each(function () {
      var n = Data.getData(this, DATA_KEY$9) || new e(this);

      if ("string" == typeof t) {
        if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
        n[t]();
      }
    });
  }, e.getInstance = function (e) {
    return Data.getData(e, DATA_KEY$9);
  }, _createClass(e, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$9;
    }
  }]), e;
}();

exports.Tab = Tab;
EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (e) {
  e.preventDefault(), (Data.getData(this, DATA_KEY$9) || new Tab(this)).show();
});
var $$a = getjQuery();

if ($$a) {
  var JQUERY_NO_CONFLICT$9 = $$a.fn[NAME$9];
  $$a.fn[NAME$9] = Tab.jQueryInterface, $$a.fn[NAME$9].Constructor = Tab, $$a.fn[NAME$9].noConflict = function () {
    return $$a.fn[NAME$9] = JQUERY_NO_CONFLICT$9, Tab.jQueryInterface;
  };
}

var NAME$a = "toast",
    VERSION$a = "5.0.0-alpha2",
    DATA_KEY$a = "bs.toast",
    EVENT_KEY$a = "." + DATA_KEY$a,
    EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a,
    EVENT_HIDE$4 = "hide" + EVENT_KEY$a,
    EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a,
    EVENT_SHOW$4 = "show" + EVENT_KEY$a,
    EVENT_SHOWN$4 = "shown" + EVENT_KEY$a,
    CLASS_NAME_FADE$4 = "fade",
    CLASS_NAME_HIDE = "hide",
    CLASS_NAME_SHOW$6 = "show",
    CLASS_NAME_SHOWING = "showing",
    DefaultType$7 = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
},
    Default$7 = {
  animation: !0,
  autohide: !0,
  delay: 5e3
},
    SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]',
    Toast = function () {
  function e(e, t) {
    this._element = e, this._config = this._getConfig(t), this._timeout = null, this._setListeners(), Data.setData(e, DATA_KEY$a, this);
  }

  var t = e.prototype;
  return t.show = function () {
    var e = this;

    if (!EventHandler.trigger(this._element, EVENT_SHOW$4).defaultPrevented) {
      this._clearTimeout(), this._config.animation && this._element.classList.add(CLASS_NAME_FADE$4);

      var t = function t() {
        e._element.classList.remove(CLASS_NAME_SHOWING), e._element.classList.add(CLASS_NAME_SHOW$6), EventHandler.trigger(e._element, EVENT_SHOWN$4), e._config.autohide && (e._timeout = setTimeout(function () {
          e.hide();
        }, e._config.delay));
      };

      if (this._element.classList.remove(CLASS_NAME_HIDE), reflow(this._element), this._element.classList.add(CLASS_NAME_SHOWING), this._config.animation) {
        var n = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, t), emulateTransitionEnd(this._element, n);
      } else t();
    }
  }, t.hide = function () {
    var e = this;

    if (this._element.classList.contains(CLASS_NAME_SHOW$6) && !EventHandler.trigger(this._element, EVENT_HIDE$4).defaultPrevented) {
      var t = function t() {
        e._element.classList.add(CLASS_NAME_HIDE), EventHandler.trigger(e._element, EVENT_HIDDEN$4);
      };

      if (this._element.classList.remove(CLASS_NAME_SHOW$6), this._config.animation) {
        var n = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, t), emulateTransitionEnd(this._element, n);
      } else t();
    }
  }, t.dispose = function () {
    this._clearTimeout(), this._element.classList.contains(CLASS_NAME_SHOW$6) && this._element.classList.remove(CLASS_NAME_SHOW$6), EventHandler.off(this._element, EVENT_CLICK_DISMISS$1), Data.removeData(this._element, DATA_KEY$a), this._element = null, this._config = null;
  }, t._getConfig = function (e) {
    return e = _extends({}, Default$7, Manipulator.getDataAttributes(this._element), "object" == _typeof(e) && e ? e : {}), typeCheckConfig(NAME$a, e, this.constructor.DefaultType), e;
  }, t._setListeners = function () {
    var e = this;
    EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
      return e.hide();
    });
  }, t._clearTimeout = function () {
    clearTimeout(this._timeout), this._timeout = null;
  }, e.jQueryInterface = function (t) {
    return this.each(function () {
      var n = Data.getData(this, DATA_KEY$a);

      if (n || (n = new e(this, "object" == _typeof(t) && t)), "string" == typeof t) {
        if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
        n[t](this);
      }
    });
  }, e.getInstance = function (e) {
    return Data.getData(e, DATA_KEY$a);
  }, _createClass(e, null, [{
    key: "VERSION",
    get: function get() {
      return VERSION$a;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$7;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$7;
    }
  }]), e;
}(),
    $$b = getjQuery();

exports.Toast = Toast;

if ($$b) {
  var JQUERY_NO_CONFLICT$a = $$b.fn[NAME$a];
  $$b.fn[NAME$a] = Toast.jQueryInterface, $$b.fn[NAME$a].Constructor = Toast, $$b.fn[NAME$a].noConflict = function () {
    return $$b.fn[NAME$a] = JQUERY_NO_CONFLICT$a, Toast.jQueryInterface;
  };
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap v5.0.0-alpha2 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('popper.js')) : typeof define === 'function' && define.amd ? define(['popper.js'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory(global.Popper));
})(void 0, function (Popper) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && _typeof(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var Popper__default = /*#__PURE__*/_interopDefaultLegacy(Popper);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000;
  var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  var toType = function toType(obj) {
    if (obj === null || obj === undefined) {
      return "" + obj;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var getUID = function getUID(prefix) {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));

    return prefix;
  };

  var getSelector = function getSelector(element) {
    var selector = element.getAttribute('data-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href');
      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  var getSelectorFromElement = function getSelectorFromElement(element) {
    var selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  var getElementFromSelector = function getElementFromSelector(element) {
    var selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    var _window$getComputedSt = window.getComputedStyle(element),
        transitionDuration = _window$getComputedSt.transitionDuration,
        transitionDelay = _window$getComputedSt.transitionDelay;

    var floatTransitionDuration = parseFloat(transitionDuration);
    var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  var triggerTransitionEnd = function triggerTransitionEnd(element) {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  var isElement = function isElement(obj) {
    return (obj[0] || obj).nodeType;
  };

  var emulateTransitionEnd = function emulateTransitionEnd(element, duration) {
    var called = false;
    var durationPadding = 5;
    var emulatedDuration = duration + durationPadding;

    function listener() {
      called = true;
      element.removeEventListener(TRANSITION_END, listener);
    }

    element.addEventListener(TRANSITION_END, listener);
    setTimeout(function () {
      if (!called) {
        triggerTransitionEnd(element);
      }
    }, emulatedDuration);
  };

  var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
    Object.keys(configTypes).forEach(function (property) {
      var expectedTypes = configTypes[property];
      var value = config[property];
      var valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
      }
    });
  };

  var isVisible = function isVisible(element) {
    if (!element) {
      return false;
    }

    if (element.style && element.parentNode && element.parentNode.style) {
      var elementStyle = getComputedStyle(element);
      var parentNodeStyle = getComputedStyle(element.parentNode);
      return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden';
    }

    return false;
  };

  var findShadowRoot = function findShadowRoot(element) {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      var root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  };

  var noop = function noop() {
    return function () {};
  };

  var reflow = function reflow(element) {
    return element.offsetHeight;
  };

  var getjQuery = function getjQuery() {
    var _window = window,
        jQuery = _window.jQuery;

    if (jQuery && !document.body.hasAttribute('data-no-jquery')) {
      return jQuery;
    }

    return null;
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var mapData = function () {
    var storeData = {};
    var id = 1;
    return {
      set: function set(element, key, data) {
        if (typeof element.bsKey === 'undefined') {
          element.bsKey = {
            key: key,
            id: id
          };
          id++;
        }

        storeData[element.bsKey.id] = data;
      },
      get: function get(element, key) {
        if (!element || typeof element.bsKey === 'undefined') {
          return null;
        }

        var keyProperties = element.bsKey;

        if (keyProperties.key === key) {
          return storeData[keyProperties.id];
        }

        return null;
      },
      "delete": function _delete(element, key) {
        if (typeof element.bsKey === 'undefined') {
          return;
        }

        var keyProperties = element.bsKey;

        if (keyProperties.key === key) {
          delete storeData[keyProperties.id];
          delete element.bsKey;
        }
      }
    };
  }();

  var Data = {
    setData: function setData(instance, key, data) {
      mapData.set(instance, key, data);
    },
    getData: function getData(instance, key) {
      return mapData.get(instance, key);
    },
    removeData: function removeData(instance, key) {
      mapData["delete"](instance, key);
    }
  };
  /* istanbul ignore file */

  var find = Element.prototype.querySelectorAll;
  var findOne = Element.prototype.querySelector; // MSEdge resets defaultPrevented flag upon dispatchEvent call if at least one listener is attached

  var defaultPreventedPreservedOnDispatch = function () {
    var e = new CustomEvent('Bootstrap', {
      cancelable: true
    });
    var element = document.createElement('div');
    element.addEventListener('Bootstrap', function () {
      return null;
    });
    e.preventDefault();
    element.dispatchEvent(e);
    return e.defaultPrevented;
  }();

  var scopeSelectorRegex = /:scope\b/;

  var supportScopeQuery = function () {
    var element = document.createElement('div');

    try {
      element.querySelectorAll(':scope *');
    } catch (_) {
      return false;
    }

    return true;
  }();

  if (!supportScopeQuery) {
    find = function find(selector) {
      if (!scopeSelectorRegex.test(selector)) {
        return this.querySelectorAll(selector);
      }

      var hasId = Boolean(this.id);

      if (!hasId) {
        this.id = getUID('scope');
      }

      var nodeList = null;

      try {
        selector = selector.replace(scopeSelectorRegex, "#" + this.id);
        nodeList = this.querySelectorAll(selector);
      } finally {
        if (!hasId) {
          this.removeAttribute('id');
        }
      }

      return nodeList;
    };

    findOne = function findOne(selector) {
      if (!scopeSelectorRegex.test(selector)) {
        return this.querySelector(selector);
      }

      var matches = find.call(this, selector);

      if (typeof matches[0] !== 'undefined') {
        return matches[0];
      }

      return null;
    };
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var $ = getjQuery();
  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {}; // Events storage

  var uidEvent = 1;
  var customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  var nativeEvents = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll'];
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
  }

  function getEvent(element) {
    var uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      var domElements = element.querySelectorAll(selector);

      for (var target = event.target; target && target !== this; target = target.parentNode) {
        for (var i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target;

            if (handler.oneOff) {
              EventHandler.off(element, event.type, fn);
            }

            return fn.apply(target, [event]);
          }
        }
      } // To please ESLint


      return null;
    };
  }

  function findHandler(events, handler, delegationSelector) {
    if (delegationSelector === void 0) {
      delegationSelector = null;
    }

    var uidEventList = Object.keys(events);

    for (var i = 0, len = uidEventList.length; i < len; i++) {
      var event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }

    return null;
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    var delegation = typeof handler === 'string';
    var originalHandler = delegation ? delegationFn : handler; // allow to get the native events from namespaced events ('click.bs.button' --> 'click')

    var typeEvent = originalTypeEvent.replace(stripNameRegex, '');
    var custom = customEvents[typeEvent];

    if (custom) {
      typeEvent = custom;
    }

    var isNative = nativeEvents.indexOf(typeEvent) > -1;

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    }

    var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
        delegation = _normalizeParams[0],
        originalHandler = _normalizeParams[1],
        typeEvent = _normalizeParams[2];

    var events = getEvent(element);
    var handlers = events[typeEvent] || (events[typeEvent] = {});
    var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }

    var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    var fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (handlerKey) {
      if (handlerKey.indexOf(namespace) > -1) {
        var event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  var EventHandler = {
    on: function on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },
    one: function one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },
    off: function off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      var _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn),
          delegation = _normalizeParams2[0],
          originalHandler = _normalizeParams2[1],
          typeEvent = _normalizeParams2[2];

      var inNamespace = typeEvent !== originalTypeEvent;
      var events = getEvent(element);
      var isNamespace = originalTypeEvent.charAt(0) === '.';

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return;
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }

      if (isNamespace) {
        Object.keys(events).forEach(function (elementEvent) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }

      var storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(function (keyHandlers) {
        var handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.indexOf(handlerKey) > -1) {
          var event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },
    trigger: function trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      var typeEvent = event.replace(stripNameRegex, '');
      var inNamespace = event !== typeEvent;
      var isNative = nativeEvents.indexOf(typeEvent) > -1;
      var jQueryEvent;
      var bubbles = true;
      var nativeDispatch = true;
      var defaultPrevented = false;
      var evt = null;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles: bubbles,
          cancelable: true
        });
      } // merge custom information in our event


      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(function (key) {
          Object.defineProperty(evt, key, {
            get: function get() {
              return args[key];
            }
          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();

        if (!defaultPreventedPreservedOnDispatch) {
          Object.defineProperty(evt, 'defaultPrevented', {
            get: function get() {
              return true;
            }
          });
        }
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt;
    }
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '5.0.0-alpha2';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var SELECTOR_DISMISS = '[data-dismiss="alert"]';
  var EVENT_CLOSE = "close" + EVENT_KEY;
  var EVENT_CLOSED = "closed" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASSNAME_ALERT = 'alert';
  var CLASSNAME_FADE = 'fade';
  var CLASSNAME_SHOW = 'show';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = /*#__PURE__*/function () {
    function Alert(element) {
      this._element = element;

      if (this._element) {
        Data.setData(element, DATA_KEY, this);
      }
    } // Getters


    var _proto = Alert.prototype; // Public

    _proto.close = function close(element) {
      var rootElement = element ? this._getRootElement(element) : this._element;

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent === null || customEvent.defaultPrevented) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      return getElementFromSelector(element) || element.closest("." + CLASSNAME_ALERT);
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      return EventHandler.trigger(element, EVENT_CLOSE);
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      element.classList.remove(CLASSNAME_SHOW);

      if (!element.classList.contains(CLASSNAME_FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = getTransitionDurationFromElement(element);
      EventHandler.one(element, TRANSITION_END, function () {
        return _this._destroyElement(element);
      });
      emulateTransitionEnd(element, transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }

      EventHandler.trigger(element, EVENT_CLOSED);
    } // Static
    ;

    Alert.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY);

        if (!data) {
          data = new Alert(this);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert.handleDismiss = function handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    Alert.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY);
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
  var $$1 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .alert to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$1) {
    var JQUERY_NO_CONFLICT = $$1.fn[NAME];
    $$1.fn[NAME] = Alert.jQueryInterface;
    $$1.fn[NAME].Constructor = Alert;

    $$1.fn[NAME].noConflict = function () {
      $$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$1 = 'button';
  var VERSION$1 = '5.0.0-alpha2';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var CLASS_NAME_ACTIVE = 'active';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
  var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = /*#__PURE__*/function () {
    function Button(element) {
      this._element = element;
      Data.setData(element, DATA_KEY$1, this);
    } // Getters


    var _proto = Button.prototype; // Public

    _proto.toggle = function toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$1);

        if (!data) {
          data = new Button(this);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    Button.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$1);
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();
    var button = event.target.closest(SELECTOR_DATA_TOGGLE);
    var data = Data.getData(button, DATA_KEY$1);

    if (!data) {
      data = new Button(button);
    }

    data.toggle();
  });
  var $$2 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .button to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$2) {
    var JQUERY_NO_CONFLICT$1 = $$2.fn[NAME$1];
    $$2.fn[NAME$1] = Button.jQueryInterface;
    $$2.fn[NAME$1].Constructor = Button;

    $$2.fn[NAME$1].noConflict = function () {
      $$2.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
      return Button.jQueryInterface;
    };
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  function normalizeData(val) {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    if (val === Number(val).toString()) {
      return Number(val);
    }

    if (val === '' || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, function (chr) {
      return "-" + chr.toLowerCase();
    });
  }

  var Manipulator = {
    setDataAttribute: function setDataAttribute(element, key, value) {
      element.setAttribute("data-" + normalizeDataKey(key), value);
    },
    removeDataAttribute: function removeDataAttribute(element, key) {
      element.removeAttribute("data-" + normalizeDataKey(key));
    },
    getDataAttributes: function getDataAttributes(element) {
      if (!element) {
        return {};
      }

      var attributes = _extends({}, element.dataset);

      Object.keys(attributes).forEach(function (key) {
        attributes[key] = normalizeData(attributes[key]);
      });
      return attributes;
    },
    getDataAttribute: function getDataAttribute(element, key) {
      return normalizeData(element.getAttribute("data-" + normalizeDataKey(key)));
    },
    offset: function offset(element) {
      var rect = element.getBoundingClientRect();
      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    },
    position: function position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    },
    toggleClass: function toggleClass(element, className) {
      if (!element) {
        return;
      }

      if (element.classList.contains(className)) {
        element.classList.remove(className);
      } else {
        element.classList.add(className);
      }
    }
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NODE_TEXT = 3;
  var SelectorEngine = {
    matches: function matches(element, selector) {
      return element.matches(selector);
    },
    find: function find$1(selector, element) {
      var _ref;

      if (element === void 0) {
        element = document.documentElement;
      }

      return (_ref = []).concat.apply(_ref, find.call(element, selector));
    },
    findOne: function findOne$1(selector, element) {
      if (element === void 0) {
        element = document.documentElement;
      }

      return findOne.call(element, selector);
    },
    children: function children(element, selector) {
      var _ref2;

      var children = (_ref2 = []).concat.apply(_ref2, element.children);

      return children.filter(function (child) {
        return child.matches(selector);
      });
    },
    parents: function parents(element, selector) {
      var parents = [];
      var ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (this.matches(ancestor, selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents;
    },
    prev: function prev(element, selector) {
      var previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },
    next: function next(element, selector) {
      var next = element.nextElementSibling;

      while (next) {
        if (this.matches(next, selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    }
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '5.0.0-alpha2';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var ARROW_LEFT_KEY = 'ArrowLeft';
  var ARROW_RIGHT_KEY = 'ArrowRight';
  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var DIRECTION_NEXT = 'next';
  var DIRECTION_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var EVENT_SLIDE = "slide" + EVENT_KEY$2;
  var EVENT_SLID = "slid" + EVENT_KEY$2;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY$2;
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2;
  var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2;
  var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2;
  var EVENT_TOUCHEND = "touchend" + EVENT_KEY$2;
  var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2;
  var EVENT_POINTERUP = "pointerup" + EVENT_KEY$2;
  var EVENT_DRAG_START = "dragstart" + EVENT_KEY$2;
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$2 + DATA_API_KEY$2;
  var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2;
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE$1 = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_RIGHT = 'carousel-item-right';
  var CLASS_NAME_LEFT = 'carousel-item-left';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = /*#__PURE__*/function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent);

      this._addEventListeners();

      Data.setData(element, DATA_KEY$2, this);
    } // Getters


    var _proto = Carousel.prototype; // Public

    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
        triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config && this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      EventHandler.off(this._element, EVENT_KEY$2);
      Data.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER, function (event) {
          return _this2.pause(event);
        });
        EventHandler.on(this._element, EVENT_MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch && this._touchSupported) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.touches && event.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
        EventHandler.on(itemImg, EVENT_DRAG_START, function (e) {
          return e.preventDefault();
        });
      });

      if (this._pointerEvent) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
          return move(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.key) {
        case ARROW_LEFT_KEY:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEY:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === DIRECTION_NEXT;
      var isPrevDirection = direction === DIRECTION_PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === DIRECTION_PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

      return EventHandler.trigger(this._element, EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = SelectorEngine.find(SELECTOR_ACTIVE, this._indicatorsElement);

        for (var i = 0; i < indicators.length; i++) {
          indicators[i].classList.remove(CLASS_NAME_ACTIVE$1);
        }

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          nextIndicator.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_LEFT;
        orderClassName = CLASS_NAME_NEXT;
        eventDirectionName = DIRECTION_LEFT;
      } else {
        directionalClassName = CLASS_NAME_RIGHT;
        orderClassName = CLASS_NAME_PREV;
        eventDirectionName = DIRECTION_RIGHT;
      }

      if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$1)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.defaultPrevented) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
        nextElement.classList.add(orderClassName);
        reflow(nextElement);
        activeElement.classList.add(directionalClassName);
        nextElement.classList.add(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = getTransitionDurationFromElement(activeElement);
        EventHandler.one(activeElement, TRANSITION_END, function () {
          nextElement.classList.remove(directionalClassName, orderClassName);
          nextElement.classList.add(CLASS_NAME_ACTIVE$1);
          activeElement.classList.remove(CLASS_NAME_ACTIVE$1, orderClassName, directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            EventHandler.trigger(_this4._element, EVENT_SLID, {
              relatedTarget: nextElement,
              direction: eventDirectionName,
              from: activeElementIndex,
              to: nextElementIndex
            });
          }, 0);
        });
        emulateTransitionEnd(activeElement, transitionDuration);
      } else {
        activeElement.classList.remove(CLASS_NAME_ACTIVE$1);
        nextElement.classList.add(CLASS_NAME_ACTIVE$1);
        this._isSliding = false;
        EventHandler.trigger(this._element, EVENT_SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel.carouselInterface = function carouselInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$2);

      var _config = _extends({}, Default, Manipulator.getDataAttributes(element));

      if (_typeof(config) === 'object') {
        _config = _extends({}, _config, config);
      }

      var action = typeof config === 'string' ? config : _config.slide;

      if (!data) {
        data = new Carousel(element, _config);
      }

      if (typeof config === 'number') {
        data.to(config);
      } else if (typeof action === 'string') {
        if (typeof data[action] === 'undefined') {
          throw new TypeError("No method named \"" + action + "\"");
        }

        data[action]();
      } else if (_config.interval && _config.ride) {
        data.pause();
        data.cycle();
      }
    };

    Carousel.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Carousel.carouselInterface(this, config);
      });
    };

    Carousel.dataApiClickHandler = function dataApiClickHandler(event) {
      var target = getElementFromSelector(this);

      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
        return;
      }

      var config = _extends({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel.carouselInterface(target, config);

      if (slideIndex) {
        Data.getData(target, DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    Carousel.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$2);
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
  EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
    var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

    for (var i = 0, len = carousels.length; i < len; i++) {
      Carousel.carouselInterface(carousels[i], Data.getData(carousels[i], DATA_KEY$2));
    }
  });
  var $$3 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .carousel to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$3) {
    var JQUERY_NO_CONFLICT$2 = $$3.fn[NAME$2];
    $$3.fn[NAME$2] = Carousel.jQueryInterface;
    $$3.fn[NAME$2].Constructor = Carousel;

    $$3.fn[NAME$2].noConflict = function () {
      $$3.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
      return Carousel.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$3 = 'collapse';
  var VERSION$3 = '5.0.0-alpha2';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var EVENT_SHOW = "show" + EVENT_KEY$3;
  var EVENT_SHOWN = "shown" + EVENT_KEY$3;
  var EVENT_HIDE = "hide" + EVENT_KEY$3;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY$3;
  var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3;
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var WIDTH = 'width';
  var HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE$1 = '[data-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = /*#__PURE__*/function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1 + "[href=\"#" + element.id + "\"]," + (SELECTOR_DATA_TOGGLE$1 + "[data-target=\"#" + element.id + "\"]"));
      var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1);

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = getSelectorFromElement(elem);
        var filterElement = SelectorEngine.find(selector).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }

      Data.setData(element, DATA_KEY$3, this);
    } // Getters


    var _proto = Collapse.prototype; // Public

    _proto.toggle = function toggle() {
      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      var container = SelectorEngine.findOne(this._selector);

      if (actives) {
        var tempActiveData = actives.filter(function (elem) {
          return container !== elem;
        });
        activesData = tempActiveData[0] ? Data.getData(tempActiveData[0], DATA_KEY$3) : null;

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = EventHandler.trigger(this._element, EVENT_SHOW);

      if (startEvent.defaultPrevented) {
        return;
      }

      if (actives) {
        actives.forEach(function (elemActive) {
          if (container !== elemActive) {
            Collapse.collapseInterface(elemActive, 'hide');
          }

          if (!activesData) {
            Data.setData(elemActive, DATA_KEY$3, null);
          }
        });
      }

      var dimension = this._getDimension();

      this._element.classList.remove(CLASS_NAME_COLLAPSE);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        this._triggerArray.forEach(function (element) {
          element.classList.remove(CLASS_NAME_COLLAPSED);
          element.setAttribute('aria-expanded', true);
        });
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_COLLAPSING);

        _this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        EventHandler.trigger(_this._element, EVENT_SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }

      var startEvent = EventHandler.trigger(this._element, EVENT_HIDE);

      if (startEvent.defaultPrevented) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      reflow(this._element);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var elem = getElementFromSelector(trigger);

          if (elem && !elem.classList.contains(CLASS_NAME_SHOW)) {
            trigger.classList.add(CLASS_NAME_COLLAPSED);
            trigger.setAttribute('aria-expanded', false);
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        _this2._element.classList.remove(CLASS_NAME_COLLAPSING);

        _this2._element.classList.add(CLASS_NAME_COLLAPSE);

        EventHandler.trigger(_this2._element, EVENT_HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent = this._config.parent;

      if (isElement(parent)) {
        // it's a jQuery object
        if (typeof parent.jquery !== 'undefined' || typeof parent[0] !== 'undefined') {
          parent = parent[0];
        }
      } else {
        parent = SelectorEngine.findOne(parent);
      }

      var selector = SELECTOR_DATA_TOGGLE$1 + "[data-parent=\"" + parent + "\"]";
      SelectorEngine.find(selector, parent).forEach(function (element) {
        var selected = getElementFromSelector(element);

        _this3._addAriaAndCollapsedClass(selected, [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (!element || !triggerArray.length) {
        return;
      }

      var isOpen = element.classList.contains(CLASS_NAME_SHOW);
      triggerArray.forEach(function (elem) {
        if (isOpen) {
          elem.classList.remove(CLASS_NAME_COLLAPSED);
        } else {
          elem.classList.add(CLASS_NAME_COLLAPSED);
        }

        elem.setAttribute('aria-expanded', isOpen);
      });
    } // Static
    ;

    Collapse.collapseInterface = function collapseInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$3);

      var _config = _extends({}, Default$1, Manipulator.getDataAttributes(element), _typeof(config) === 'object' && config ? config : {});

      if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      if (!data) {
        data = new Collapse(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    Collapse.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Collapse.collapseInterface(this, config);
      });
    };

    Collapse.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$3);
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A') {
      event.preventDefault();
    }

    var triggerData = Manipulator.getDataAttributes(this);
    var selector = getSelectorFromElement(this);
    var selectorElements = SelectorEngine.find(selector);
    selectorElements.forEach(function (element) {
      var data = Data.getData(element, DATA_KEY$3);
      var config;

      if (data) {
        // update parent attribute
        if (data._parent === null && typeof triggerData.parent === 'string') {
          data._config.parent = triggerData.parent;
          data._parent = data._getParent();
        }

        config = 'toggle';
      } else {
        config = triggerData;
      }

      Collapse.collapseInterface(element, config);
    });
  });
  var $$4 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .collapse to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$4) {
    var JQUERY_NO_CONFLICT$3 = $$4.fn[NAME$3];
    $$4.fn[NAME$3] = Collapse.jQueryInterface;
    $$4.fn[NAME$3].Constructor = Collapse;

    $$4.fn[NAME$3].noConflict = function () {
      $$4.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
      return Collapse.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$4 = 'dropdown';
  var VERSION$4 = '5.0.0-alpha2';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var ESCAPE_KEY = 'Escape';
  var SPACE_KEY = 'Space';
  var TAB_KEY = 'Tab';
  var ARROW_UP_KEY = 'ArrowUp';
  var ARROW_DOWN_KEY = 'ArrowDown';
  var RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEY + "|" + ARROW_DOWN_KEY + "|" + ESCAPE_KEY);
  var EVENT_HIDE$1 = "hide" + EVENT_KEY$4;
  var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4;
  var EVENT_SHOW$1 = "show" + EVENT_KEY$4;
  var EVENT_SHOWN$1 = "shown" + EVENT_KEY$4;
  var EVENT_CLICK = "click" + EVENT_KEY$4;
  var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4;
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_SHOW$1 = 'show';
  var CLASS_NAME_DROPUP = 'dropup';
  var CLASS_NAME_DROPRIGHT = 'dropright';
  var CLASS_NAME_DROPLEFT = 'dropleft';
  var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  var CLASS_NAME_NAVBAR = 'navbar';
  var CLASS_NAME_POSITION_STATIC = 'position-static';
  var SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
  var SELECTOR_FORM_CHILD = '.dropdown form';
  var SELECTOR_MENU = '.dropdown-menu';
  var SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  var PLACEMENT_TOP = 'top-start';
  var PLACEMENT_TOPEND = 'top-end';
  var PLACEMENT_BOTTOM = 'bottom-start';
  var PLACEMENT_BOTTOMEND = 'bottom-end';
  var PLACEMENT_RIGHT = 'right-start';
  var PLACEMENT_LEFT = 'left-start';
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = /*#__PURE__*/function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();

      Data.setData(element, DATA_KEY$4, this);
    } // Getters


    var _proto = Dropdown.prototype; // Public

    _proto.toggle = function toggle() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED)) {
        return;
      }

      var isActive = this._element.classList.contains(CLASS_NAME_SHOW$1);

      Dropdown.clearMenus();

      if (isActive) {
        return;
      }

      this.show();
    };

    _proto.show = function show() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
        return;
      }

      var parent = Dropdown.getParentFromElement(this._element);
      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, relatedTarget);

      if (showEvent.defaultPrevented) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar) {
        if (typeof Popper__default['default'] === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          parent.classList.add(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new Popper__default['default'](referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
        var _ref;

        (_ref = []).concat.apply(_ref, document.body.children).forEach(function (elem) {
          return EventHandler.on(elem, 'mouseover', null, noop());
        });
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1);
      Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1);
      EventHandler.trigger(parent, EVENT_SHOWN$1, relatedTarget);
    };

    _proto.hide = function hide() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || !this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
        return;
      }

      var parent = Dropdown.getParentFromElement(this._element);
      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1);
      Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1);
      EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$4);
      EventHandler.off(this._element, EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      EventHandler.on(this._element, EVENT_CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, this.constructor.Default, Manipulator.getDataAttributes(this._element), config);
      typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
    };

    _proto._getPlacement = function _getPlacement() {
      var parentDropdown = this._element.parentNode;
      var placement = PLACEMENT_BOTTOM; // Handle dropup

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        placement = PLACEMENT_TOP;

        if (this._menu.classList.contains(CLASS_NAME_MENURIGHT)) {
          placement = PLACEMENT_TOPEND;
        }
      } else if (parentDropdown.classList.contains(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if (parentDropdown.classList.contains(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if (this._menu.classList.contains(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return Boolean(this._element.closest("." + CLASS_NAME_NAVBAR));
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper.js if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _extends({}, popperConfig, this._config.popperConfig);
    } // Static
    ;

    Dropdown.dropdownInterface = function dropdownInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$4);

      var _config = _typeof(config) === 'object' ? config : null;

      if (!data) {
        data = new Dropdown(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    Dropdown.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Dropdown.dropdownInterface(this, config);
      });
    };

    Dropdown.clearMenus = function clearMenus(event) {
      if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
        return;
      }

      var toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$2);

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown.getParentFromElement(toggles[i]);
        var context = Data.getData(toggles[i], DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!toggles[i].classList.contains(CLASS_NAME_SHOW$1)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.key === TAB_KEY) && dropdownMenu.contains(event.target)) {
          continue;
        }

        var hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);

        if (hideEvent.defaultPrevented) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          var _ref2;

          (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (elem) {
            return EventHandler.off(elem, 'mouseover', null, noop());
          });
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        dropdownMenu.classList.remove(CLASS_NAME_SHOW$1);
        toggles[i].classList.remove(CLASS_NAME_SHOW$1);
        EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
      }
    };

    Dropdown.getParentFromElement = function getParentFromElement(element) {
      return getElementFromSelector(element) || element.parentNode;
    };

    Dropdown.dataApiKeydownHandler = function dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || this.classList.contains(CLASS_NAME_DISABLED)) {
        return;
      }

      var parent = Dropdown.getParentFromElement(this);
      var isActive = this.classList.contains(CLASS_NAME_SHOW$1);

      if (event.key === ESCAPE_KEY) {
        var button = this.matches(SELECTOR_DATA_TOGGLE$2) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$2)[0];
        button.focus();
        Dropdown.clearMenus();
        return;
      }

      if (!isActive || event.key === SPACE_KEY) {
        Dropdown.clearMenus();
        return;
      }

      var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, parent).filter(isVisible);

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.key === ARROW_UP_KEY && index > 0) {
        // Up
        index--;
      }

      if (event.key === ARROW_DOWN_KEY && index < items.length - 1) {
        // Down
        index++;
      } // index is -1 if the first keydown is an ArrowUp


      index = index === -1 ? 0 : index;
      items[index].focus();
    };

    Dropdown.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$4);
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (event) {
    event.preventDefault();
    event.stopPropagation();
    Dropdown.dropdownInterface(this, 'toggle');
  });
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
    return e.stopPropagation();
  });
  var $$5 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .dropdown to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$5) {
    var JQUERY_NO_CONFLICT$4 = $$5.fn[NAME$4];
    $$5.fn[NAME$4] = Dropdown.jQueryInterface;
    $$5.fn[NAME$4].Constructor = Dropdown;

    $$5.fn[NAME$4].noConflict = function () {
      $$5.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
      return Dropdown.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$5 = 'modal';
  var VERSION$5 = '5.0.0-alpha2';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var ESCAPE_KEY$1 = 'Escape';
  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
  var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
  var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
  var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
  var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
  var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
  var EVENT_RESIZE = "resize" + EVENT_KEY$5;
  var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5;
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
  var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5;
  var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
  var CLASS_NAME_BACKDROP = 'modal-backdrop';
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW$2 = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]';
  var SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]';
  var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  var SELECTOR_STICKY_CONTENT = '.sticky-top';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = /*#__PURE__*/function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, element);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
      Data.setData(element, DATA_KEY$5, this);
    } // Getters


    var _proto = Modal.prototype; // Public

    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if (this._element.classList.contains(CLASS_NAME_FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      });

      if (this._isShown || showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
        EventHandler.one(_this._element, EVENT_MOUSEUP_DISMISS, function (event) {
          if (event.target === _this._element) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;

      var transition = this._element.classList.contains(CLASS_NAME_FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.off(document, EVENT_FOCUSIN);

      this._element.classList.remove(CLASS_NAME_SHOW$2);

      EventHandler.off(this._element, EVENT_CLICK_DISMISS);
      EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        });
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return EventHandler.off(htmlElement, EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */

      EventHandler.off(document, EVENT_FOCUSIN);
      Data.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$3, config);
      typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = this._element.classList.contains(CLASS_NAME_FADE);

      var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.scrollTop = 0;

      if (modalBody) {
        modalBody.scrollTop = 0;
      }

      if (transition) {
        reflow(this._element);
      }

      this._element.classList.add(CLASS_NAME_SHOW$2);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        EventHandler.trigger(_this3._element, EVENT_SHOWN$2, {
          relatedTarget: relatedTarget
        });
      };

      if (transition) {
        var transitionDuration = getTransitionDurationFromElement(this._dialog);
        EventHandler.one(this._dialog, TRANSITION_END, transitionComplete);
        emulateTransitionEnd(this._dialog, transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      EventHandler.off(document, EVENT_FOCUSIN); // guard against infinite focus loop

      EventHandler.on(document, EVENT_FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && !_this4._element.contains(event.target)) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown) {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
          if (_this5._config.keyboard && event.key === ESCAPE_KEY$1) {
            event.preventDefault();

            _this5.hide();
          } else if (!_this5._config.keyboard && event.key === ESCAPE_KEY$1) {
            _this5._triggerBackdropTransition();
          }
        });
      } else {
        EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        EventHandler.on(window, EVENT_RESIZE, function () {
          return _this6._adjustDialog();
        });
      } else {
        EventHandler.off(window, EVENT_RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        document.body.classList.remove(CLASS_NAME_OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        EventHandler.trigger(_this7._element, EVENT_HIDDEN$2);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      this._backdrop.parentNode.removeChild(this._backdrop);

      this._backdrop = null;
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = this._element.classList.contains(CLASS_NAME_FADE) ? CLASS_NAME_FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = CLASS_NAME_BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        document.body.appendChild(this._backdrop);
        EventHandler.on(this._element, EVENT_CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          _this8._triggerBackdropTransition();
        });

        if (animate) {
          reflow(this._backdrop);
        }

        this._backdrop.classList.add(CLASS_NAME_SHOW$2);

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
        EventHandler.one(this._backdrop, TRANSITION_END, callback);
        emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        this._backdrop.classList.remove(CLASS_NAME_SHOW$2);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          callback();
        };

        if (this._element.classList.contains(CLASS_NAME_FADE)) {
          var _backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);

          EventHandler.one(this._backdrop, TRANSITION_END, callbackRemove);
          emulateTransitionEnd(this._backdrop, _backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else {
        callback();
      }
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this9 = this;

      if (this._config.backdrop === 'static') {
        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

        if (hideEvent.defaultPrevented) {
          return;
        }

        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!isModalOverflowing) {
          this._element.style.overflowY = 'hidden';
        }

        this._element.classList.add(CLASS_NAME_STATIC);

        var modalTransitionDuration = getTransitionDurationFromElement(this._dialog);
        EventHandler.off(this._element, TRANSITION_END);
        EventHandler.one(this._element, TRANSITION_END, function () {
          _this9._element.classList.remove(CLASS_NAME_STATIC);

          if (!isModalOverflowing) {
            EventHandler.one(_this9._element, TRANSITION_END, function () {
              _this9._element.style.overflowY = '';
            });
            emulateTransitionEnd(_this9._element, modalTransitionDuration);
          }
        });
        emulateTransitionEnd(this._element, modalTransitionDuration);

        this._element.focus();
      } else {
        this.hide();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        // Adjust fixed content padding
        SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = window.getComputedStyle(element)['padding-right'];
          Manipulator.setDataAttribute(element, 'padding-right', actualPadding);
          element.style.paddingRight = parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px";
        }); // Adjust sticky content margin

        SelectorEngine.find(SELECTOR_STICKY_CONTENT).forEach(function (element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = window.getComputedStyle(element)['margin-right'];
          Manipulator.setDataAttribute(element, 'margin-right', actualMargin);
          element.style.marginRight = parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px";
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = window.getComputedStyle(document.body)['padding-right'];
        Manipulator.setDataAttribute(document.body, 'padding-right', actualPadding);
        document.body.style.paddingRight = parseFloat(calculatedPadding) + this._scrollbarWidth + "px";
      }

      document.body.classList.add(CLASS_NAME_OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (element) {
        var padding = Manipulator.getDataAttribute(element, 'padding-right');

        if (typeof padding !== 'undefined') {
          Manipulator.removeDataAttribute(element, 'padding-right');
          element.style.paddingRight = padding;
        }
      }); // Restore sticky content and navbar-toggler margin

      SelectorEngine.find("" + SELECTOR_STICKY_CONTENT).forEach(function (element) {
        var margin = Manipulator.getDataAttribute(element, 'margin-right');

        if (typeof margin !== 'undefined') {
          Manipulator.removeDataAttribute(element, 'margin-right');
          element.style.marginRight = margin;
        }
      }); // Restore body padding

      var padding = Manipulator.getDataAttribute(document.body, 'padding-right');

      if (typeof padding === 'undefined') {
        document.body.style.paddingRight = '';
      } else {
        Manipulator.removeDataAttribute(document.body, 'padding-right');
        document.body.style.paddingRight = padding;
      }
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal.jQueryInterface = function jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$5);

        var _config = _extends({}, Default$3, Manipulator.getDataAttributes(this), _typeof(config) === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    Modal.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$5);
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (event) {
    var _this11 = this;

    var target = getElementFromSelector(this);

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    EventHandler.one(target, EVENT_SHOW$2, function (showEvent) {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler.one(target, EVENT_HIDDEN$2, function () {
        if (isVisible(_this11)) {
          _this11.focus();
        }
      });
    });
    var data = Data.getData(target, DATA_KEY$5);

    if (!data) {
      var config = _extends({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));

      data = new Modal(target, config);
    }

    data.show(this);
  });
  var $$6 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .modal to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$6) {
    var JQUERY_NO_CONFLICT$5 = $$6.fn[NAME$5];
    $$6.fn[NAME$5] = Modal.jQueryInterface;
    $$6.fn[NAME$5].Constructor = Modal;

    $$6.fn[NAME$5].noConflict = function () {
      $$6.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
      return Modal.jQueryInterface;
    };
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, len = regExp.length; i < len; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  };

  var DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };

  function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
    var _ref;

    if (!unsafeHtml.length) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var allowlistKeys = Object.keys(allowList);

    var elements = (_ref = []).concat.apply(_ref, createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var _ref2;

      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (allowlistKeys.indexOf(elName) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = (_ref2 = []).concat.apply(_ref2, el.attributes);

      var allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, allowedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$6 = 'tooltip';
  var VERSION$6 = '5.0.0-alpha2';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'allowList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    allowList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    allowList: DefaultAllowlist,
    popperConfig: null
  };
  var Event$1 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var CLASS_NAME_FADE$1 = 'fade';
  var CLASS_NAME_MODAL = 'modal';
  var CLASS_NAME_SHOW$3 = 'show';
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = /*#__PURE__*/function () {
    function Tooltip(element, config) {
      if (typeof Popper__default['default'] === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();

      Data.setData(element, this.constructor.DATA_KEY, this);
    } // Getters


    var _proto = Tooltip.prototype; // Public

    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = Data.getData(event.delegateTarget, dataKey);

        if (!context) {
          context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
          Data.setData(event.delegateTarget, dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      Data.removeData(this.element, this.constructor.DATA_KEY);
      EventHandler.off(this.element, this.constructor.EVENT_KEY);
      EventHandler.off(this.element.closest("." + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        this.tip.parentNode.removeChild(this.tip);
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if (this.element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }

      if (this.isWithContent() && this._isEnabled) {
        var showEvent = EventHandler.trigger(this.element, this.constructor.Event.SHOW);
        var shadowRoot = findShadowRoot(this.element);
        var isInTheDom = shadowRoot === null ? this.element.ownerDocument.documentElement.contains(this.element) : shadowRoot.contains(this.element);

        if (showEvent.defaultPrevented || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          tip.classList.add(CLASS_NAME_FADE$1);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this._addAttachmentClass(attachment);

        var container = this._getContainer();

        Data.setData(tip, this.constructor.DATA_KEY, this);

        if (!this.element.ownerDocument.documentElement.contains(this.tip)) {
          container.appendChild(tip);
        }

        EventHandler.trigger(this.element, this.constructor.Event.INSERTED);
        this._popper = new Popper__default['default'](this.element, tip, this._getPopperConfig(attachment));
        tip.classList.add(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          var _ref;

          (_ref = []).concat.apply(_ref, document.body.children).forEach(function (element) {
            EventHandler.on(element, 'mouseover', noop());
          });
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          EventHandler.trigger(_this.element, _this.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            _this._leave(null, _this);
          }
        };

        if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
          var transitionDuration = getTransitionDurationFromElement(this.tip);
          EventHandler.one(this.tip, TRANSITION_END, complete);
          emulateTransitionEnd(this.tip, transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (!this._popper) {
        return;
      }

      var tip = this.getTipElement();

      var complete = function complete() {
        if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        EventHandler.trigger(_this2.element, _this2.constructor.Event.HIDDEN);

        _this2._popper.destroy();
      };

      var hideEvent = EventHandler.trigger(this.element, this.constructor.Event.HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      tip.classList.remove(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        var _ref2;

        (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (element) {
          return EventHandler.off(element, 'mouseover', noop);
        });
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;

      if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
        var transitionDuration = getTransitionDurationFromElement(tip);
        EventHandler.one(tip, TRANSITION_END, complete);
        emulateTransitionEnd(tip, transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.getTipElement = function getTipElement() {
      if (this.tip) {
        return this.tip;
      }

      var element = document.createElement('div');
      element.innerHTML = this.config.template;
      this.tip = element.children[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
      tip.classList.remove(CLASS_NAME_FADE$1, CLASS_NAME_SHOW$3);
    };

    _proto.setElementContent = function setElementContent(element, content) {
      if (element === null) {
        return;
      }

      if (_typeof(content) === 'object' && isElement(content)) {
        if (content.jquery) {
          content = content[0];
        } // content is a DOM node or a jQuery


        if (this.config.html) {
          if (content.parentNode !== element) {
            element.innerHTML = '';
            element.appendChild(content);
          }
        } else {
          element.textContent = content.textContent;
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.allowList, this.config.sanitizeFn);
        }

        element.innerHTML = content;
      } else {
        element.textContent = content;
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: "." + this.constructor.NAME + "-arrow"
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _extends({}, defaultBsConfig, this.config.popperConfig);
    };

    _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
      this.getTipElement().classList.add(CLASS_PREFIX + "-" + attachment);
    };

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this4.config.offset(data.offsets, _this4.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (isElement(this.config.container)) {
        return this.config.container;
      }

      return SelectorEngine.findOne(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          EventHandler.on(_this5.element, _this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          EventHandler.on(_this5.element, eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          });
          EventHandler.on(_this5.element, eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };

      EventHandler.on(this.element.closest("." + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _extends({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = _typeof(this.element.getAttribute('data-original-title'));

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || Data.getData(event.delegateTarget, dataKey);

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.setData(event.delegateTarget, dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || Data.getData(event.delegateTarget, dataKey);

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.setData(event.delegateTarget, dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = Manipulator.getDataAttributes(this.element);
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });

      if (config && _typeof(config.container) === 'object' && config.container.jquery) {
        config.container = config.container[0];
      }

      config = _extends({}, this.constructor.Default, dataAttributes, _typeof(config) === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      this.tip = popperData.instance.popper;

      this._cleanTipClass();

      this._addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      tip.classList.remove(CLASS_NAME_FADE$1);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$6);

        var _config = _typeof(config) === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Tooltip.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$6);
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$1;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();

  var $$7 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .tooltip to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$7) {
    var JQUERY_NO_CONFLICT$6 = $$7.fn[NAME$6];
    $$7.fn[NAME$6] = Tooltip.jQueryInterface;
    $$7.fn[NAME$6].Constructor = Tooltip;

    $$7.fn[NAME$6].noConflict = function () {
      $$7.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
      return Tooltip.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$7 = 'popover';
  var VERSION$7 = '5.0.0-alpha2';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _extends({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _extends({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var Event$2 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
  };
  var CLASS_NAME_FADE$2 = 'fade';
  var CLASS_NAME_SHOW$4 = 'show';
  var SELECTOR_TITLE = '.popover-header';
  var SELECTOR_CONTENT = '.popover-body';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = /*#__PURE__*/function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype; // Overrides

    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement(); // we use append for html objects to maintain js events

      this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$4);
    } // Private
    ;

    _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
      this.getTipElement().classList.add(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    } // Static
    ;

    Popover.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$7);

        var _config = _typeof(config) === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          Data.setData(this, DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Popover.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$7);
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$2;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);

  var $$8 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  /* istanbul ignore if */

  if ($$8) {
    var JQUERY_NO_CONFLICT$7 = $$8.fn[NAME$7];
    $$8.fn[NAME$7] = Popover.jQueryInterface;
    $$8.fn[NAME$7].Constructor = Popover;

    $$8.fn[NAME$7].noConflict = function () {
      $$8.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
      return Popover.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$8 = 'scrollspy';
  var VERSION$8 = '5.0.0-alpha2';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate" + EVENT_KEY$8;
  var EVENT_SCROLL = "scroll" + EVENT_KEY$8;
  var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$8 + DATA_API_KEY$6;
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE$2 = 'active';
  var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = /*#__PURE__*/function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + ", " + this._config.target + " " + SELECTOR_LIST_ITEMS + ", " + this._config.target + " ." + CLASS_NAME_DROPDOWN_ITEM;
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      EventHandler.on(this._scrollElement, EVENT_SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();

      Data.setData(element, DATA_KEY$8, this);
    } // Getters


    var _proto = ScrollSpy.prototype; // Public

    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = SelectorEngine.find(this._selector);
      targets.map(function (element) {
        var targetSelector = getSelectorFromElement(element);
        var target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$8);
      EventHandler.off(this._scrollElement, EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$6, _typeof(config) === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && isElement(config.target)) {
        var id = config.target.id;

        if (!id) {
          id = getUID(NAME$8);
          config.target.id = id;
        }

        config.target = "#" + id;
      }

      typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var link = SelectorEngine.findOne(queries.join(','));

      if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, link.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$2);
        link.classList.add(CLASS_NAME_ACTIVE$2);
      } else {
        // Set triggered link as active
        link.classList.add(CLASS_NAME_ACTIVE$2);
        SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP).forEach(function (listGroup) {
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          SelectorEngine.prev(listGroup, SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).forEach(function (item) {
            return item.classList.add(CLASS_NAME_ACTIVE$2);
          }); // Handle special case when .nav-link is inside .nav-item

          SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function (navItem) {
            SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function (item) {
              return item.classList.add(CLASS_NAME_ACTIVE$2);
            });
          });
        });
      }

      EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      SelectorEngine.find(this._selector).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$2);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$2);
      });
    } // Static
    ;

    ScrollSpy.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$8);

        var _config = _typeof(config) === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    ScrollSpy.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$8);
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
    SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function (spy) {
      return new ScrollSpy(spy, Manipulator.getDataAttributes(spy));
    });
  });
  var $$9 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  /* istanbul ignore if */

  if ($$9) {
    var JQUERY_NO_CONFLICT$8 = $$9.fn[NAME$8];
    $$9.fn[NAME$8] = ScrollSpy.jQueryInterface;
    $$9.fn[NAME$8].Constructor = ScrollSpy;

    $$9.fn[NAME$8].noConflict = function () {
      $$9.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
      return ScrollSpy.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$9 = 'tab';
  var VERSION$9 = '5.0.0-alpha2';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var EVENT_HIDE$3 = "hide" + EVENT_KEY$9;
  var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9;
  var EVENT_SHOW$3 = "show" + EVENT_KEY$9;
  var EVENT_SHOWN$3 = "shown" + EVENT_KEY$9;
  var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7;
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE$3 = 'active';
  var CLASS_NAME_DISABLED$1 = 'disabled';
  var CLASS_NAME_FADE$3 = 'fade';
  var CLASS_NAME_SHOW$5 = 'show';
  var SELECTOR_DROPDOWN$1 = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  var SELECTOR_ACTIVE$1 = '.active';
  var SELECTOR_ACTIVE_UL = ':scope > li > .active';
  var SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = /*#__PURE__*/function () {
    function Tab(element) {
      this._element = element;
      Data.setData(this._element, DATA_KEY$9, this);
    } // Getters


    var _proto = Tab.prototype; // Public

    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE$3) || this._element.classList.contains(CLASS_NAME_DISABLED$1)) {
        return;
      }

      var previous;
      var target = getElementFromSelector(this._element);

      var listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP$1);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$1;
        previous = SelectorEngine.find(itemSelector, listElement);
        previous = previous[previous.length - 1];
      }

      var hideEvent = null;

      if (previous) {
        hideEvent = EventHandler.trigger(previous, EVENT_HIDE$3, {
          relatedTarget: this._element
        });
      }

      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget: previous
      });

      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return;
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        EventHandler.trigger(previous, EVENT_HIDDEN$3, {
          relatedTarget: _this._element
        });
        EventHandler.trigger(_this._element, EVENT_SHOWN$3, {
          relatedTarget: previous
        });
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE$1);
      var active = activeElements[0];
      var isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$3);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = getTransitionDurationFromElement(active);
        active.classList.remove(CLASS_NAME_SHOW$5);
        EventHandler.one(active, TRANSITION_END, complete);
        emulateTransitionEnd(active, transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        active.classList.remove(CLASS_NAME_ACTIVE$3);
        var dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

        if (dropdownChild) {
          dropdownChild.classList.remove(CLASS_NAME_ACTIVE$3);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      element.classList.add(CLASS_NAME_ACTIVE$3);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$3)) {
        element.classList.add(CLASS_NAME_SHOW$5);
      }

      if (element.parentNode && element.parentNode.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = element.closest(SELECTOR_DROPDOWN$1);

        if (dropdownElement) {
          SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE$1).forEach(function (dropdown) {
            return dropdown.classList.add(CLASS_NAME_ACTIVE$3);
          });
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$9) || new Tab(this);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Tab.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$9);
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (event) {
    event.preventDefault();
    var data = Data.getData(this, DATA_KEY$9) || new Tab(this);
    data.show();
  });
  var $$a = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .tab to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$a) {
    var JQUERY_NO_CONFLICT$9 = $$a.fn[NAME$9];
    $$a.fn[NAME$9] = Tab.jQueryInterface;
    $$a.fn[NAME$9].Constructor = Tab;

    $$a.fn[NAME$9].noConflict = function () {
      $$a.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
      return Tab.jQueryInterface;
    };
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$a = 'toast';
  var VERSION$a = '5.0.0-alpha2';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a;
  var EVENT_HIDE$4 = "hide" + EVENT_KEY$a;
  var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a;
  var EVENT_SHOW$4 = "show" + EVENT_KEY$a;
  var EVENT_SHOWN$4 = "shown" + EVENT_KEY$a;
  var CLASS_NAME_FADE$4 = 'fade';
  var CLASS_NAME_HIDE = 'hide';
  var CLASS_NAME_SHOW$6 = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 5000
  };
  var SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast = /*#__PURE__*/function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();

      Data.setData(element, DATA_KEY$a, this);
    } // Getters


    var _proto = Toast.prototype; // Public

    _proto.show = function show() {
      var _this = this;

      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE$4);
      }

      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_SHOWING);

        _this._element.classList.add(CLASS_NAME_SHOW$6);

        EventHandler.trigger(_this._element, EVENT_SHOWN$4);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(CLASS_NAME_HIDE);

      reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOWING);

      if (this._config.animation) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, complete);
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (!this._element.classList.contains(CLASS_NAME_SHOW$6)) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);

      if (hideEvent.defaultPrevented) {
        return;
      }

      var complete = function complete() {
        _this2._element.classList.add(CLASS_NAME_HIDE);

        EventHandler.trigger(_this2._element, EVENT_HIDDEN$4);
      };

      this._element.classList.remove(CLASS_NAME_SHOW$6);

      if (this._config.animation) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, complete);
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW$6)) {
        this._element.classList.remove(CLASS_NAME_SHOW$6);
      }

      EventHandler.off(this._element, EVENT_CLICK_DISMISS$1);
      Data.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$7, Manipulator.getDataAttributes(this._element), _typeof(config) === 'object' && config ? config : {});
      typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this3 = this;

      EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
        return _this3.hide();
      });
    };

    _proto._clearTimeout = function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static
    ;

    Toast.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$a);

        var _config = _typeof(config) === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    Toast.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$a);
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();

  var $$b = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   *  add .toast to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$b) {
    var JQUERY_NO_CONFLICT$a = $$b.fn[NAME$a];
    $$b.fn[NAME$a] = Toast.jQueryInterface;
    $$b.fn[NAME$a].Constructor = Toast;

    $$b.fn[NAME$a].noConflict = function () {
      $$b.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
      return Toast.jQueryInterface;
    };
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha2): index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  var index_umd = {
    Alert: Alert,
    Button: Button,
    Carousel: Carousel,
    Collapse: Collapse,
    Dropdown: Dropdown,
    Modal: Modal,
    Popover: Popover,
    ScrollSpy: ScrollSpy,
    Tab: Tab,
    Toast: Toast,
    Tooltip: Tooltip
  };
  return index_umd;
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap v5.0.0-alpha2 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e(require("popper.js")) : "function" == typeof define && define.amd ? define(["popper.js"], e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e(t.Popper);
}(void 0, function (t) {
  "use strict";

  function e(t) {
    return t && "object" == _typeof(t) && "default" in t ? t : {
      "default": t
    };
  }

  var n = e(t);

  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function o(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }

  function s() {
    return (s = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];

        for (var i in n) {
          Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
      }

      return t;
    }).apply(this, arguments);
  }

  var r,
      a,
      l,
      c,
      u = function u(t) {
    do {
      t += Math.floor(1e6 * Math.random());
    } while (document.getElementById(t));

    return t;
  },
      h = function h(t) {
    var e = t.getAttribute("data-target");

    if (!e || "#" === e) {
      var n = t.getAttribute("href");
      e = n && "#" !== n ? n.trim() : null;
    }

    return e;
  },
      f = function f(t) {
    var e = h(t);
    return e && document.querySelector(e) ? e : null;
  },
      d = function d(t) {
    var e = h(t);
    return e ? document.querySelector(e) : null;
  },
      g = function g(t) {
    if (!t) return 0;
    var e = window.getComputedStyle(t),
        n = e.transitionDuration,
        i = e.transitionDelay,
        o = parseFloat(n),
        s = parseFloat(i);
    return o || s ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0;
  },
      p = function p(t) {
    t.dispatchEvent(new Event("transitionend"));
  },
      m = function m(t) {
    return (t[0] || t).nodeType;
  },
      _ = function _(t, e) {
    var n = !1,
        i = e + 5;
    t.addEventListener("transitionend", function e() {
      n = !0, t.removeEventListener("transitionend", e);
    }), setTimeout(function () {
      n || p(t);
    }, i);
  },
      v = function v(t, e, n) {
    Object.keys(n).forEach(function (i) {
      var o,
          s = n[i],
          r = e[i],
          a = r && m(r) ? "element" : null == (o = r) ? "" + o : {}.toString.call(o).match(/\s([a-z]+)/i)[1].toLowerCase();
      if (!new RegExp(s).test(a)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + a + '" but expected type "' + s + '".');
    });
  },
      b = function b(t) {
    if (!t) return !1;

    if (t.style && t.parentNode && t.parentNode.style) {
      var e = getComputedStyle(t),
          n = getComputedStyle(t.parentNode);
      return "none" !== e.display && "none" !== n.display && "hidden" !== e.visibility;
    }

    return !1;
  },
      y = function y() {
    return function () {};
  },
      w = function w(t) {
    return t.offsetHeight;
  },
      E = function E() {
    var t = window.jQuery;
    return t && !document.body.hasAttribute("data-no-jquery") ? t : null;
  },
      T = (r = {}, a = 1, {
    set: function set(t, e, n) {
      void 0 === t.bsKey && (t.bsKey = {
        key: e,
        id: a
      }, a++), r[t.bsKey.id] = n;
    },
    get: function get(t, e) {
      if (!t || void 0 === t.bsKey) return null;
      var n = t.bsKey;
      return n.key === e ? r[n.id] : null;
    },
    "delete": function _delete(t, e) {
      if (void 0 !== t.bsKey) {
        var n = t.bsKey;
        n.key === e && (delete r[n.id], delete t.bsKey);
      }
    }
  }),
      k = function k(t, e, n) {
    T.set(t, e, n);
  },
      L = function L(t, e) {
    return T.get(t, e);
  },
      C = function C(t, e) {
    T["delete"](t, e);
  },
      A = Element.prototype.querySelectorAll,
      S = Element.prototype.querySelector,
      D = (l = new CustomEvent("Bootstrap", {
    cancelable: !0
  }), (c = document.createElement("div")).addEventListener("Bootstrap", function () {
    return null;
  }), l.preventDefault(), c.dispatchEvent(l), l.defaultPrevented),
      I = /:scope\b/;

  (function () {
    var t = document.createElement("div");

    try {
      t.querySelectorAll(":scope *");
    } catch (t) {
      return !1;
    }

    return !0;
  })() || (A = function A(t) {
    if (!I.test(t)) return this.querySelectorAll(t);
    var e = Boolean(this.id);
    e || (this.id = u("scope"));
    var n = null;

    try {
      t = t.replace(I, "#" + this.id), n = this.querySelectorAll(t);
    } finally {
      e || this.removeAttribute("id");
    }

    return n;
  }, S = function S(t) {
    if (!I.test(t)) return this.querySelector(t);
    var e = A.call(this, t);
    return void 0 !== e[0] ? e[0] : null;
  });
  var O = E(),
      N = /[^.]*(?=\..*)\.|.*/,
      j = /\..*/,
      x = /::\d+$/,
      P = {},
      R = 1,
      H = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  },
      B = ["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"];

  function M(t, e) {
    return e && e + "::" + R++ || t.uidEvent || R++;
  }

  function Q(t) {
    var e = M(t);
    return t.uidEvent = e, P[e] = P[e] || {}, P[e];
  }

  function U(t, e, n) {
    void 0 === n && (n = null);

    for (var i = Object.keys(t), o = 0, s = i.length; o < s; o++) {
      var r = t[i[o]];
      if (r.originalHandler === e && r.delegationSelector === n) return r;
    }

    return null;
  }

  function F(t, e, n) {
    var i = "string" == typeof e,
        o = i ? n : e,
        s = t.replace(j, ""),
        r = H[s];
    return r && (s = r), B.indexOf(s) > -1 || (s = t), [i, o, s];
  }

  function W(t, e, n, i, o) {
    if ("string" == typeof e && t) {
      n || (n = i, i = null);
      var s = F(e, n, i),
          r = s[0],
          a = s[1],
          l = s[2],
          c = Q(t),
          u = c[l] || (c[l] = {}),
          h = U(u, a, r ? n : null);
      if (h) h.oneOff = h.oneOff && o;else {
        var f = M(a, e.replace(N, "")),
            d = r ? function (t, e, n) {
          return function i(o) {
            for (var s = t.querySelectorAll(e), r = o.target; r && r !== this; r = r.parentNode) {
              for (var a = s.length; a--;) {
                if (s[a] === r) return o.delegateTarget = r, i.oneOff && V.off(t, o.type, n), n.apply(r, [o]);
              }
            }

            return null;
          };
        }(t, n, i) : function (t, e) {
          return function n(i) {
            return i.delegateTarget = t, n.oneOff && V.off(t, i.type, e), e.apply(t, [i]);
          };
        }(t, n);
        d.delegationSelector = r ? n : null, d.originalHandler = a, d.oneOff = o, d.uidEvent = f, u[f] = d, t.addEventListener(l, d, r);
      }
    }
  }

  function K(t, e, n, i, o) {
    var s = U(e[n], i, o);
    s && (t.removeEventListener(n, s, Boolean(o)), delete e[n][s.uidEvent]);
  }

  var V = {
    on: function on(t, e, n, i) {
      W(t, e, n, i, !1);
    },
    one: function one(t, e, n, i) {
      W(t, e, n, i, !0);
    },
    off: function off(t, e, n, i) {
      if ("string" == typeof e && t) {
        var o = F(e, n, i),
            s = o[0],
            r = o[1],
            a = o[2],
            l = a !== e,
            c = Q(t),
            u = "." === e.charAt(0);

        if (void 0 === r) {
          u && Object.keys(c).forEach(function (n) {
            !function (t, e, n, i) {
              var o = e[n] || {};
              Object.keys(o).forEach(function (s) {
                if (s.indexOf(i) > -1) {
                  var r = o[s];
                  K(t, e, n, r.originalHandler, r.delegationSelector);
                }
              });
            }(t, c, n, e.slice(1));
          });
          var h = c[a] || {};
          Object.keys(h).forEach(function (n) {
            var i = n.replace(x, "");

            if (!l || e.indexOf(i) > -1) {
              var o = h[n];
              K(t, c, a, o.originalHandler, o.delegationSelector);
            }
          });
        } else {
          if (!c || !c[a]) return;
          K(t, c, a, r, s ? n : null);
        }
      }
    },
    trigger: function trigger(t, e, n) {
      if ("string" != typeof e || !t) return null;
      var i,
          o = e.replace(j, ""),
          s = e !== o,
          r = B.indexOf(o) > -1,
          a = !0,
          l = !0,
          c = !1,
          u = null;
      return s && O && (i = O.Event(e, n), O(t).trigger(i), a = !i.isPropagationStopped(), l = !i.isImmediatePropagationStopped(), c = i.isDefaultPrevented()), r ? (u = document.createEvent("HTMLEvents")).initEvent(o, a, !0) : u = new CustomEvent(e, {
        bubbles: a,
        cancelable: !0
      }), void 0 !== n && Object.keys(n).forEach(function (t) {
        Object.defineProperty(u, t, {
          get: function get() {
            return n[t];
          }
        });
      }), c && (u.preventDefault(), D || Object.defineProperty(u, "defaultPrevented", {
        get: function get() {
          return !0;
        }
      })), l && t.dispatchEvent(u), u.defaultPrevented && void 0 !== i && i.preventDefault(), u;
    }
  },
      q = "alert",
      z = function () {
    function t(t) {
      this._element = t, this._element && k(t, "bs.alert", this);
    }

    var e = t.prototype;
    return e.close = function (t) {
      var e = t ? this._getRootElement(t) : this._element,
          n = this._triggerCloseEvent(e);

      null === n || n.defaultPrevented || this._removeElement(e);
    }, e.dispose = function () {
      C(this._element, "bs.alert"), this._element = null;
    }, e._getRootElement = function (t) {
      return d(t) || t.closest(".alert");
    }, e._triggerCloseEvent = function (t) {
      return V.trigger(t, "close.bs.alert");
    }, e._removeElement = function (t) {
      var e = this;

      if (t.classList.remove("show"), t.classList.contains("fade")) {
        var n = g(t);
        V.one(t, "transitionend", function () {
          return e._destroyElement(t);
        }), _(t, n);
      } else this._destroyElement(t);
    }, e._destroyElement = function (t) {
      t.parentNode && t.parentNode.removeChild(t), V.trigger(t, "closed.bs.alert");
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        var n = L(this, "bs.alert");
        n || (n = new t(this)), "close" === e && n[e](this);
      });
    }, t.handleDismiss = function (t) {
      return function (e) {
        e && e.preventDefault(), t.close(this);
      };
    }, t.getInstance = function (t) {
      return L(t, "bs.alert");
    }, o(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }]), t;
  }();

  V.on(document, "click.bs.alert.data-api", '[data-dismiss="alert"]', z.handleDismiss(new z()));
  var X = E();

  if (X) {
    var Y = X.fn[q];
    X.fn[q] = z.jQueryInterface, X.fn[q].Constructor = z, X.fn[q].noConflict = function () {
      return X.fn[q] = Y, z.jQueryInterface;
    };
  }

  var $ = function () {
    function t(t) {
      this._element = t, k(t, "bs.button", this);
    }

    var e = t.prototype;
    return e.toggle = function () {
      this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"));
    }, e.dispose = function () {
      C(this._element, "bs.button"), this._element = null;
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        var n = L(this, "bs.button");
        n || (n = new t(this)), "toggle" === e && n[e]();
      });
    }, t.getInstance = function (t) {
      return L(t, "bs.button");
    }, o(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }]), t;
  }();

  V.on(document, "click.bs.button.data-api", '[data-toggle="button"]', function (t) {
    t.preventDefault();
    var e = t.target.closest('[data-toggle="button"]'),
        n = L(e, "bs.button");
    n || (n = new $(e)), n.toggle();
  });
  var G = E();

  if (G) {
    var Z = G.fn.button;
    G.fn.button = $.jQueryInterface, G.fn.button.Constructor = $, G.fn.button.noConflict = function () {
      return G.fn.button = Z, $.jQueryInterface;
    };
  }

  function J(t) {
    return "true" === t || "false" !== t && (t === Number(t).toString() ? Number(t) : "" === t || "null" === t ? null : t);
  }

  function tt(t) {
    return t.replace(/[A-Z]/g, function (t) {
      return "-" + t.toLowerCase();
    });
  }

  var et = {
    setDataAttribute: function setDataAttribute(t, e, n) {
      t.setAttribute("data-" + tt(e), n);
    },
    removeDataAttribute: function removeDataAttribute(t, e) {
      t.removeAttribute("data-" + tt(e));
    },
    getDataAttributes: function getDataAttributes(t) {
      if (!t) return {};
      var e = s({}, t.dataset);
      return Object.keys(e).forEach(function (t) {
        e[t] = J(e[t]);
      }), e;
    },
    getDataAttribute: function getDataAttribute(t, e) {
      return J(t.getAttribute("data-" + tt(e)));
    },
    offset: function offset(t) {
      var e = t.getBoundingClientRect();
      return {
        top: e.top + document.body.scrollTop,
        left: e.left + document.body.scrollLeft
      };
    },
    position: function position(t) {
      return {
        top: t.offsetTop,
        left: t.offsetLeft
      };
    },
    toggleClass: function toggleClass(t, e) {
      t && (t.classList.contains(e) ? t.classList.remove(e) : t.classList.add(e));
    }
  },
      nt = {
    matches: function matches(t, e) {
      return t.matches(e);
    },
    find: function find(t, e) {
      var n;
      return void 0 === e && (e = document.documentElement), (n = []).concat.apply(n, A.call(e, t));
    },
    findOne: function findOne(t, e) {
      return void 0 === e && (e = document.documentElement), S.call(e, t);
    },
    children: function children(t, e) {
      var n,
          i = (n = []).concat.apply(n, t.children);
      return i.filter(function (t) {
        return t.matches(e);
      });
    },
    parents: function parents(t, e) {
      for (var n = [], i = t.parentNode; i && i.nodeType === Node.ELEMENT_NODE && 3 !== i.nodeType;) {
        this.matches(i, e) && n.push(i), i = i.parentNode;
      }

      return n;
    },
    prev: function prev(t, e) {
      for (var n = t.previousElementSibling; n;) {
        if (n.matches(e)) return [n];
        n = n.previousElementSibling;
      }

      return [];
    },
    next: function next(t, e) {
      for (var n = t.nextElementSibling; n;) {
        if (this.matches(n, e)) return [n];
        n = n.nextElementSibling;
      }

      return [];
    }
  },
      it = "carousel",
      ot = ".bs.carousel",
      st = {
    interval: 5e3,
    keyboard: !0,
    slide: !1,
    pause: "hover",
    wrap: !0,
    touch: !0
  },
      rt = {
    interval: "(number|boolean)",
    keyboard: "boolean",
    slide: "(boolean|string)",
    pause: "(string|boolean)",
    wrap: "boolean",
    touch: "boolean"
  },
      at = {
    TOUCH: "touch",
    PEN: "pen"
  },
      lt = function () {
    function t(t, e) {
      this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = nt.findOne(".carousel-indicators", this._element), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent), this._addEventListeners(), k(t, "bs.carousel", this);
    }

    var e = t.prototype;
    return e.next = function () {
      this._isSliding || this._slide("next");
    }, e.nextWhenVisible = function () {
      !document.hidden && b(this._element) && this.next();
    }, e.prev = function () {
      this._isSliding || this._slide("prev");
    }, e.pause = function (t) {
      t || (this._isPaused = !0), nt.findOne(".carousel-item-next, .carousel-item-prev", this._element) && (p(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
    }, e.cycle = function (t) {
      t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
    }, e.to = function (t) {
      var e = this;
      this._activeElement = nt.findOne(".active.carousel-item", this._element);

      var n = this._getItemIndex(this._activeElement);

      if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) V.one(this._element, "slid.bs.carousel", function () {
        return e.to(t);
      });else {
        if (n === t) return this.pause(), void this.cycle();
        var i = t > n ? "next" : "prev";

        this._slide(i, this._items[t]);
      }
    }, e.dispose = function () {
      V.off(this._element, ot), C(this._element, "bs.carousel"), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
    }, e._getConfig = function (t) {
      return t = s({}, st, t), v(it, t, rt), t;
    }, e._handleSwipe = function () {
      var t = Math.abs(this.touchDeltaX);

      if (!(t <= 40)) {
        var e = t / this.touchDeltaX;
        this.touchDeltaX = 0, e > 0 && this.prev(), e < 0 && this.next();
      }
    }, e._addEventListeners = function () {
      var t = this;
      this._config.keyboard && V.on(this._element, "keydown.bs.carousel", function (e) {
        return t._keydown(e);
      }), "hover" === this._config.pause && (V.on(this._element, "mouseenter.bs.carousel", function (e) {
        return t.pause(e);
      }), V.on(this._element, "mouseleave.bs.carousel", function (e) {
        return t.cycle(e);
      })), this._config.touch && this._touchSupported && this._addTouchEventListeners();
    }, e._addTouchEventListeners = function () {
      var t = this,
          e = function e(_e) {
        t._pointerEvent && at[_e.pointerType.toUpperCase()] ? t.touchStartX = _e.clientX : t._pointerEvent || (t.touchStartX = _e.touches[0].clientX);
      },
          n = function n(e) {
        t._pointerEvent && at[e.pointerType.toUpperCase()] && (t.touchDeltaX = e.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function (e) {
          return t.cycle(e);
        }, 500 + t._config.interval));
      };

      nt.find(".carousel-item img", this._element).forEach(function (t) {
        V.on(t, "dragstart.bs.carousel", function (t) {
          return t.preventDefault();
        });
      }), this._pointerEvent ? (V.on(this._element, "pointerdown.bs.carousel", function (t) {
        return e(t);
      }), V.on(this._element, "pointerup.bs.carousel", function (t) {
        return n(t);
      }), this._element.classList.add("pointer-event")) : (V.on(this._element, "touchstart.bs.carousel", function (t) {
        return e(t);
      }), V.on(this._element, "touchmove.bs.carousel", function (e) {
        return function (e) {
          e.touches && e.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX = e.touches[0].clientX - t.touchStartX;
        }(e);
      }), V.on(this._element, "touchend.bs.carousel", function (t) {
        return n(t);
      }));
    }, e._keydown = function (t) {
      if (!/input|textarea/i.test(t.target.tagName)) switch (t.key) {
        case "ArrowLeft":
          t.preventDefault(), this.prev();
          break;

        case "ArrowRight":
          t.preventDefault(), this.next();
      }
    }, e._getItemIndex = function (t) {
      return this._items = t && t.parentNode ? nt.find(".carousel-item", t.parentNode) : [], this._items.indexOf(t);
    }, e._getItemByDirection = function (t, e) {
      var n = "next" === t,
          i = "prev" === t,
          o = this._getItemIndex(e),
          s = this._items.length - 1;

      if ((i && 0 === o || n && o === s) && !this._config.wrap) return e;
      var r = (o + ("prev" === t ? -1 : 1)) % this._items.length;
      return -1 === r ? this._items[this._items.length - 1] : this._items[r];
    }, e._triggerSlideEvent = function (t, e) {
      var n = this._getItemIndex(t),
          i = this._getItemIndex(nt.findOne(".active.carousel-item", this._element));

      return V.trigger(this._element, "slide.bs.carousel", {
        relatedTarget: t,
        direction: e,
        from: i,
        to: n
      });
    }, e._setActiveIndicatorElement = function (t) {
      if (this._indicatorsElement) {
        for (var e = nt.find(".active", this._indicatorsElement), n = 0; n < e.length; n++) {
          e[n].classList.remove("active");
        }

        var i = this._indicatorsElement.children[this._getItemIndex(t)];

        i && i.classList.add("active");
      }
    }, e._slide = function (t, e) {
      var n,
          i,
          o,
          s = this,
          r = nt.findOne(".active.carousel-item", this._element),
          a = this._getItemIndex(r),
          l = e || r && this._getItemByDirection(t, r),
          c = this._getItemIndex(l),
          u = Boolean(this._interval);

      if ("next" === t ? (n = "carousel-item-left", i = "carousel-item-next", o = "left") : (n = "carousel-item-right", i = "carousel-item-prev", o = "right"), l && l.classList.contains("active")) this._isSliding = !1;else if (!this._triggerSlideEvent(l, o).defaultPrevented && r && l) {
        if (this._isSliding = !0, u && this.pause(), this._setActiveIndicatorElement(l), this._element.classList.contains("slide")) {
          l.classList.add(i), w(l), r.classList.add(n), l.classList.add(n);
          var h = parseInt(l.getAttribute("data-interval"), 10);
          h ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = h) : this._config.interval = this._config.defaultInterval || this._config.interval;
          var f = g(r);
          V.one(r, "transitionend", function () {
            l.classList.remove(n, i), l.classList.add("active"), r.classList.remove("active", i, n), s._isSliding = !1, setTimeout(function () {
              V.trigger(s._element, "slid.bs.carousel", {
                relatedTarget: l,
                direction: o,
                from: a,
                to: c
              });
            }, 0);
          }), _(r, f);
        } else r.classList.remove("active"), l.classList.add("active"), this._isSliding = !1, V.trigger(this._element, "slid.bs.carousel", {
          relatedTarget: l,
          direction: o,
          from: a,
          to: c
        });

        u && this.cycle();
      }
    }, t.carouselInterface = function (e, n) {
      var i = L(e, "bs.carousel"),
          o = s({}, st, et.getDataAttributes(e));
      "object" == _typeof(n) && (o = s({}, o, n));
      var r = "string" == typeof n ? n : o.slide;
      if (i || (i = new t(e, o)), "number" == typeof n) i.to(n);else if ("string" == typeof r) {
        if (void 0 === i[r]) throw new TypeError('No method named "' + r + '"');
        i[r]();
      } else o.interval && o.ride && (i.pause(), i.cycle());
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        t.carouselInterface(this, e);
      });
    }, t.dataApiClickHandler = function (e) {
      var n = d(this);

      if (n && n.classList.contains("carousel")) {
        var i = s({}, et.getDataAttributes(n), et.getDataAttributes(this)),
            o = this.getAttribute("data-slide-to");
        o && (i.interval = !1), t.carouselInterface(n, i), o && L(n, "bs.carousel").to(o), e.preventDefault();
      }
    }, t.getInstance = function (t) {
      return L(t, "bs.carousel");
    }, o(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return st;
      }
    }]), t;
  }();

  V.on(document, "click.bs.carousel.data-api", "[data-slide], [data-slide-to]", lt.dataApiClickHandler), V.on(window, "load.bs.carousel.data-api", function () {
    for (var t = nt.find('[data-ride="carousel"]'), e = 0, n = t.length; e < n; e++) {
      lt.carouselInterface(t[e], L(t[e], "bs.carousel"));
    }
  });
  var ct = E();

  if (ct) {
    var ut = ct.fn[it];
    ct.fn[it] = lt.jQueryInterface, ct.fn[it].Constructor = lt, ct.fn[it].noConflict = function () {
      return ct.fn[it] = ut, lt.jQueryInterface;
    };
  }

  var ht = "collapse",
      ft = {
    toggle: !0,
    parent: ""
  },
      dt = {
    toggle: "boolean",
    parent: "(string|element)"
  },
      gt = function () {
    function t(t, e) {
      this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = nt.find('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]');

      for (var n = nt.find('[data-toggle="collapse"]'), i = 0, o = n.length; i < o; i++) {
        var s = n[i],
            r = f(s),
            a = nt.find(r).filter(function (e) {
          return e === t;
        });
        null !== r && a.length && (this._selector = r, this._triggerArray.push(s));
      }

      this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle(), k(t, "bs.collapse", this);
    }

    var e = t.prototype;
    return e.toggle = function () {
      this._element.classList.contains("show") ? this.hide() : this.show();
    }, e.show = function () {
      var e = this;

      if (!this._isTransitioning && !this._element.classList.contains("show")) {
        var n, i;
        this._parent && 0 === (n = nt.find(".show, .collapsing", this._parent).filter(function (t) {
          return "string" == typeof e._config.parent ? t.getAttribute("data-parent") === e._config.parent : t.classList.contains("collapse");
        })).length && (n = null);
        var o = nt.findOne(this._selector);

        if (n) {
          var s = n.filter(function (t) {
            return o !== t;
          });
          if ((i = s[0] ? L(s[0], "bs.collapse") : null) && i._isTransitioning) return;
        }

        if (!V.trigger(this._element, "show.bs.collapse").defaultPrevented) {
          n && n.forEach(function (e) {
            o !== e && t.collapseInterface(e, "hide"), i || k(e, "bs.collapse", null);
          });

          var r = this._getDimension();

          this._element.classList.remove("collapse"), this._element.classList.add("collapsing"), this._element.style[r] = 0, this._triggerArray.length && this._triggerArray.forEach(function (t) {
            t.classList.remove("collapsed"), t.setAttribute("aria-expanded", !0);
          }), this.setTransitioning(!0);
          var a = "scroll" + (r[0].toUpperCase() + r.slice(1)),
              l = g(this._element);
          V.one(this._element, "transitionend", function () {
            e._element.classList.remove("collapsing"), e._element.classList.add("collapse", "show"), e._element.style[r] = "", e.setTransitioning(!1), V.trigger(e._element, "shown.bs.collapse");
          }), _(this._element, l), this._element.style[r] = this._element[a] + "px";
        }
      }
    }, e.hide = function () {
      var t = this;

      if (!this._isTransitioning && this._element.classList.contains("show") && !V.trigger(this._element, "hide.bs.collapse").defaultPrevented) {
        var e = this._getDimension();

        this._element.style[e] = this._element.getBoundingClientRect()[e] + "px", w(this._element), this._element.classList.add("collapsing"), this._element.classList.remove("collapse", "show");
        var n = this._triggerArray.length;
        if (n > 0) for (var i = 0; i < n; i++) {
          var o = this._triggerArray[i],
              s = d(o);
          s && !s.classList.contains("show") && (o.classList.add("collapsed"), o.setAttribute("aria-expanded", !1));
        }
        this.setTransitioning(!0);
        this._element.style[e] = "";
        var r = g(this._element);
        V.one(this._element, "transitionend", function () {
          t.setTransitioning(!1), t._element.classList.remove("collapsing"), t._element.classList.add("collapse"), V.trigger(t._element, "hidden.bs.collapse");
        }), _(this._element, r);
      }
    }, e.setTransitioning = function (t) {
      this._isTransitioning = t;
    }, e.dispose = function () {
      C(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
    }, e._getConfig = function (t) {
      return (t = s({}, ft, t)).toggle = Boolean(t.toggle), v(ht, t, dt), t;
    }, e._getDimension = function () {
      return this._element.classList.contains("width") ? "width" : "height";
    }, e._getParent = function () {
      var t = this,
          e = this._config.parent;
      m(e) ? void 0 === e.jquery && void 0 === e[0] || (e = e[0]) : e = nt.findOne(e);
      var n = '[data-toggle="collapse"][data-parent="' + e + '"]';
      return nt.find(n, e).forEach(function (e) {
        var n = d(e);

        t._addAriaAndCollapsedClass(n, [e]);
      }), e;
    }, e._addAriaAndCollapsedClass = function (t, e) {
      if (t && e.length) {
        var n = t.classList.contains("show");
        e.forEach(function (t) {
          n ? t.classList.remove("collapsed") : t.classList.add("collapsed"), t.setAttribute("aria-expanded", n);
        });
      }
    }, t.collapseInterface = function (e, n) {
      var i = L(e, "bs.collapse"),
          o = s({}, ft, et.getDataAttributes(e), "object" == _typeof(n) && n ? n : {});

      if (!i && o.toggle && "string" == typeof n && /show|hide/.test(n) && (o.toggle = !1), i || (i = new t(e, o)), "string" == typeof n) {
        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
        i[n]();
      }
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        t.collapseInterface(this, e);
      });
    }, t.getInstance = function (t) {
      return L(t, "bs.collapse");
    }, o(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return ft;
      }
    }]), t;
  }();

  V.on(document, "click.bs.collapse.data-api", '[data-toggle="collapse"]', function (t) {
    "A" === t.target.tagName && t.preventDefault();
    var e = et.getDataAttributes(this),
        n = f(this);
    nt.find(n).forEach(function (t) {
      var n,
          i = L(t, "bs.collapse");
      i ? (null === i._parent && "string" == typeof e.parent && (i._config.parent = e.parent, i._parent = i._getParent()), n = "toggle") : n = e, gt.collapseInterface(t, n);
    });
  });
  var pt = E();

  if (pt) {
    var mt = pt.fn[ht];
    pt.fn[ht] = gt.jQueryInterface, pt.fn[ht].Constructor = gt, pt.fn[ht].noConflict = function () {
      return pt.fn[ht] = mt, gt.jQueryInterface;
    };
  }

  var _t = "dropdown",
      vt = new RegExp("ArrowUp|ArrowDown|Escape"),
      bt = {
    offset: 0,
    flip: !0,
    boundary: "scrollParent",
    reference: "toggle",
    display: "dynamic",
    popperConfig: null
  },
      yt = {
    offset: "(number|string|function)",
    flip: "boolean",
    boundary: "(string|element)",
    reference: "(string|element)",
    display: "string",
    popperConfig: "(null|object)"
  },
      wt = function () {
    function t(t, e) {
      this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners(), k(t, "bs.dropdown", this);
    }

    var e = t.prototype;
    return e.toggle = function () {
      if (!this._element.disabled && !this._element.classList.contains("disabled")) {
        var e = this._element.classList.contains("show");

        t.clearMenus(), e || this.show();
      }
    }, e.show = function () {
      if (!(this._element.disabled || this._element.classList.contains("disabled") || this._menu.classList.contains("show"))) {
        var e = t.getParentFromElement(this._element),
            i = {
          relatedTarget: this._element
        };

        if (!V.trigger(this._element, "show.bs.dropdown", i).defaultPrevented) {
          if (!this._inNavbar) {
            if (void 0 === n["default"]) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org)");
            var o = this._element;
            "parent" === this._config.reference ? o = e : m(this._config.reference) && (o = this._config.reference, void 0 !== this._config.reference.jquery && (o = this._config.reference[0])), "scrollParent" !== this._config.boundary && e.classList.add("position-static"), this._popper = new n["default"](o, this._menu, this._getPopperConfig());
          }

          var s;
          if ("ontouchstart" in document.documentElement && !e.closest(".navbar-nav")) (s = []).concat.apply(s, document.body.children).forEach(function (t) {
            return V.on(t, "mouseover", null, function () {});
          });
          this._element.focus(), this._element.setAttribute("aria-expanded", !0), et.toggleClass(this._menu, "show"), et.toggleClass(this._element, "show"), V.trigger(e, "shown.bs.dropdown", i);
        }
      }
    }, e.hide = function () {
      if (!this._element.disabled && !this._element.classList.contains("disabled") && this._menu.classList.contains("show")) {
        var e = t.getParentFromElement(this._element),
            n = {
          relatedTarget: this._element
        };
        V.trigger(e, "hide.bs.dropdown", n).defaultPrevented || (this._popper && this._popper.destroy(), et.toggleClass(this._menu, "show"), et.toggleClass(this._element, "show"), V.trigger(e, "hidden.bs.dropdown", n));
      }
    }, e.dispose = function () {
      C(this._element, "bs.dropdown"), V.off(this._element, ".bs.dropdown"), this._element = null, this._menu = null, this._popper && (this._popper.destroy(), this._popper = null);
    }, e.update = function () {
      this._inNavbar = this._detectNavbar(), this._popper && this._popper.scheduleUpdate();
    }, e._addEventListeners = function () {
      var t = this;
      V.on(this._element, "click.bs.dropdown", function (e) {
        e.preventDefault(), e.stopPropagation(), t.toggle();
      });
    }, e._getConfig = function (t) {
      return t = s({}, this.constructor.Default, et.getDataAttributes(this._element), t), v(_t, t, this.constructor.DefaultType), t;
    }, e._getMenuElement = function () {
      return nt.next(this._element, ".dropdown-menu")[0];
    }, e._getPlacement = function () {
      var t = this._element.parentNode,
          e = "bottom-start";
      return t.classList.contains("dropup") ? (e = "top-start", this._menu.classList.contains("dropdown-menu-right") && (e = "top-end")) : t.classList.contains("dropright") ? e = "right-start" : t.classList.contains("dropleft") ? e = "left-start" : this._menu.classList.contains("dropdown-menu-right") && (e = "bottom-end"), e;
    }, e._detectNavbar = function () {
      return Boolean(this._element.closest(".navbar"));
    }, e._getOffset = function () {
      var t = this,
          e = {};
      return "function" == typeof this._config.offset ? e.fn = function (e) {
        return e.offsets = s({}, e.offsets, t._config.offset(e.offsets, t._element) || {}), e;
      } : e.offset = this._config.offset, e;
    }, e._getPopperConfig = function () {
      var t = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      };
      return "static" === this._config.display && (t.modifiers.applyStyle = {
        enabled: !1
      }), s({}, t, this._config.popperConfig);
    }, t.dropdownInterface = function (e, n) {
      var i = L(e, "bs.dropdown");

      if (i || (i = new t(e, "object" == _typeof(n) ? n : null)), "string" == typeof n) {
        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
        i[n]();
      }
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        t.dropdownInterface(this, e);
      });
    }, t.clearMenus = function (e) {
      if (!e || 2 !== e.button && ("keyup" !== e.type || "Tab" === e.key)) for (var n = nt.find('[data-toggle="dropdown"]'), i = 0, o = n.length; i < o; i++) {
        var s = t.getParentFromElement(n[i]),
            r = L(n[i], "bs.dropdown"),
            a = {
          relatedTarget: n[i]
        };

        if (e && "click" === e.type && (a.clickEvent = e), r) {
          var l = r._menu;
          if (n[i].classList.contains("show")) if (!(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && "Tab" === e.key) && l.contains(e.target))) if (!V.trigger(s, "hide.bs.dropdown", a).defaultPrevented) {
            var c;
            if ("ontouchstart" in document.documentElement) (c = []).concat.apply(c, document.body.children).forEach(function (t) {
              return V.off(t, "mouseover", null, function () {});
            });
            n[i].setAttribute("aria-expanded", "false"), r._popper && r._popper.destroy(), l.classList.remove("show"), n[i].classList.remove("show"), V.trigger(s, "hidden.bs.dropdown", a);
          }
        }
      }
    }, t.getParentFromElement = function (t) {
      return d(t) || t.parentNode;
    }, t.dataApiKeydownHandler = function (e) {
      if (!(/input|textarea/i.test(e.target.tagName) ? "Space" === e.key || "Escape" !== e.key && ("ArrowDown" !== e.key && "ArrowUp" !== e.key || e.target.closest(".dropdown-menu")) : !vt.test(e.key)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !this.classList.contains("disabled"))) {
        var n = t.getParentFromElement(this),
            i = this.classList.contains("show");
        if ("Escape" === e.key) return (this.matches('[data-toggle="dropdown"]') ? this : nt.prev(this, '[data-toggle="dropdown"]')[0]).focus(), void t.clearMenus();

        if (i && "Space" !== e.key) {
          var o = nt.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", n).filter(b);

          if (o.length) {
            var s = o.indexOf(e.target);
            "ArrowUp" === e.key && s > 0 && s--, "ArrowDown" === e.key && s < o.length - 1 && s++, o[s = -1 === s ? 0 : s].focus();
          }
        } else t.clearMenus();
      }
    }, t.getInstance = function (t) {
      return L(t, "bs.dropdown");
    }, o(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return bt;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return yt;
      }
    }]), t;
  }();

  V.on(document, "keydown.bs.dropdown.data-api", '[data-toggle="dropdown"]', wt.dataApiKeydownHandler), V.on(document, "keydown.bs.dropdown.data-api", ".dropdown-menu", wt.dataApiKeydownHandler), V.on(document, "click.bs.dropdown.data-api", wt.clearMenus), V.on(document, "keyup.bs.dropdown.data-api", wt.clearMenus), V.on(document, "click.bs.dropdown.data-api", '[data-toggle="dropdown"]', function (t) {
    t.preventDefault(), t.stopPropagation(), wt.dropdownInterface(this, "toggle");
  }), V.on(document, "click.bs.dropdown.data-api", ".dropdown form", function (t) {
    return t.stopPropagation();
  });
  var Et = E();

  if (Et) {
    var Tt = Et.fn[_t];
    Et.fn[_t] = wt.jQueryInterface, Et.fn[_t].Constructor = wt, Et.fn[_t].noConflict = function () {
      return Et.fn[_t] = Tt, wt.jQueryInterface;
    };
  }

  var kt = {
    backdrop: !0,
    keyboard: !0,
    focus: !0,
    show: !0
  },
      Lt = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    focus: "boolean",
    show: "boolean"
  },
      Ct = function () {
    function t(t, e) {
      this._config = this._getConfig(e), this._element = t, this._dialog = nt.findOne(".modal-dialog", t), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0, k(t, "bs.modal", this);
    }

    var e = t.prototype;
    return e.toggle = function (t) {
      return this._isShown ? this.hide() : this.show(t);
    }, e.show = function (t) {
      var e = this;

      if (!this._isShown && !this._isTransitioning) {
        this._element.classList.contains("fade") && (this._isTransitioning = !0);
        var n = V.trigger(this._element, "show.bs.modal", {
          relatedTarget: t
        });
        this._isShown || n.defaultPrevented || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), V.on(this._element, "click.dismiss.bs.modal", '[data-dismiss="modal"]', function (t) {
          return e.hide(t);
        }), V.on(this._dialog, "mousedown.dismiss.bs.modal", function () {
          V.one(e._element, "mouseup.dismiss.bs.modal", function (t) {
            t.target === e._element && (e._ignoreBackdropClick = !0);
          });
        }), this._showBackdrop(function () {
          return e._showElement(t);
        }));
      }
    }, e.hide = function (t) {
      var e = this;

      if ((t && t.preventDefault(), this._isShown && !this._isTransitioning) && !V.trigger(this._element, "hide.bs.modal").defaultPrevented) {
        this._isShown = !1;

        var n = this._element.classList.contains("fade");

        if (n && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), V.off(document, "focusin.bs.modal"), this._element.classList.remove("show"), V.off(this._element, "click.dismiss.bs.modal"), V.off(this._dialog, "mousedown.dismiss.bs.modal"), n) {
          var i = g(this._element);
          V.one(this._element, "transitionend", function (t) {
            return e._hideModal(t);
          }), _(this._element, i);
        } else this._hideModal();
      }
    }, e.dispose = function () {
      [window, this._element, this._dialog].forEach(function (t) {
        return V.off(t, ".bs.modal");
      }), V.off(document, "focusin.bs.modal"), C(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null;
    }, e.handleUpdate = function () {
      this._adjustDialog();
    }, e._getConfig = function (t) {
      return t = s({}, kt, t), v("modal", t, Lt), t;
    }, e._showElement = function (t) {
      var e = this,
          n = this._element.classList.contains("fade"),
          i = nt.findOne(".modal-body", this._dialog);

      this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0, i && (i.scrollTop = 0), n && w(this._element), this._element.classList.add("show"), this._config.focus && this._enforceFocus();

      var o = function o() {
        e._config.focus && e._element.focus(), e._isTransitioning = !1, V.trigger(e._element, "shown.bs.modal", {
          relatedTarget: t
        });
      };

      if (n) {
        var s = g(this._dialog);
        V.one(this._dialog, "transitionend", o), _(this._dialog, s);
      } else o();
    }, e._enforceFocus = function () {
      var t = this;
      V.off(document, "focusin.bs.modal"), V.on(document, "focusin.bs.modal", function (e) {
        document === e.target || t._element === e.target || t._element.contains(e.target) || t._element.focus();
      });
    }, e._setEscapeEvent = function () {
      var t = this;
      this._isShown ? V.on(this._element, "keydown.dismiss.bs.modal", function (e) {
        t._config.keyboard && "Escape" === e.key ? (e.preventDefault(), t.hide()) : t._config.keyboard || "Escape" !== e.key || t._triggerBackdropTransition();
      }) : V.off(this._element, "keydown.dismiss.bs.modal");
    }, e._setResizeEvent = function () {
      var t = this;
      this._isShown ? V.on(window, "resize.bs.modal", function () {
        return t._adjustDialog();
      }) : V.off(window, "resize.bs.modal");
    }, e._hideModal = function () {
      var t = this;
      this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(function () {
        document.body.classList.remove("modal-open"), t._resetAdjustments(), t._resetScrollbar(), V.trigger(t._element, "hidden.bs.modal");
      });
    }, e._removeBackdrop = function () {
      this._backdrop.parentNode.removeChild(this._backdrop), this._backdrop = null;
    }, e._showBackdrop = function (t) {
      var e = this,
          n = this._element.classList.contains("fade") ? "fade" : "";

      if (this._isShown && this._config.backdrop) {
        if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && this._backdrop.classList.add(n), document.body.appendChild(this._backdrop), V.on(this._element, "click.dismiss.bs.modal", function (t) {
          e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && e._triggerBackdropTransition();
        }), n && w(this._backdrop), this._backdrop.classList.add("show"), !n) return void t();
        var i = g(this._backdrop);
        V.one(this._backdrop, "transitionend", t), _(this._backdrop, i);
      } else if (!this._isShown && this._backdrop) {
        this._backdrop.classList.remove("show");

        var o = function o() {
          e._removeBackdrop(), t();
        };

        if (this._element.classList.contains("fade")) {
          var s = g(this._backdrop);
          V.one(this._backdrop, "transitionend", o), _(this._backdrop, s);
        } else o();
      } else t();
    }, e._triggerBackdropTransition = function () {
      var t = this;

      if ("static" === this._config.backdrop) {
        if (V.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
        var e = this._element.scrollHeight > document.documentElement.clientHeight;
        e || (this._element.style.overflowY = "hidden"), this._element.classList.add("modal-static");
        var n = g(this._dialog);
        V.off(this._element, "transitionend"), V.one(this._element, "transitionend", function () {
          t._element.classList.remove("modal-static"), e || (V.one(t._element, "transitionend", function () {
            t._element.style.overflowY = "";
          }), _(t._element, n));
        }), _(this._element, n), this._element.focus();
      } else this.hide();
    }, e._adjustDialog = function () {
      var t = this._element.scrollHeight > document.documentElement.clientHeight;
      !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px");
    }, e._resetAdjustments = function () {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
    }, e._checkScrollbar = function () {
      var t = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(t.left + t.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
    }, e._setScrollbar = function () {
      var t = this;

      if (this._isBodyOverflowing) {
        nt.find(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top").forEach(function (e) {
          var n = e.style.paddingRight,
              i = window.getComputedStyle(e)["padding-right"];
          et.setDataAttribute(e, "padding-right", n), e.style.paddingRight = parseFloat(i) + t._scrollbarWidth + "px";
        }), nt.find(".sticky-top").forEach(function (e) {
          var n = e.style.marginRight,
              i = window.getComputedStyle(e)["margin-right"];
          et.setDataAttribute(e, "margin-right", n), e.style.marginRight = parseFloat(i) - t._scrollbarWidth + "px";
        });
        var e = document.body.style.paddingRight,
            n = window.getComputedStyle(document.body)["padding-right"];
        et.setDataAttribute(document.body, "padding-right", e), document.body.style.paddingRight = parseFloat(n) + this._scrollbarWidth + "px";
      }

      document.body.classList.add("modal-open");
    }, e._resetScrollbar = function () {
      nt.find(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top").forEach(function (t) {
        var e = et.getDataAttribute(t, "padding-right");
        void 0 !== e && (et.removeDataAttribute(t, "padding-right"), t.style.paddingRight = e);
      }), nt.find(".sticky-top").forEach(function (t) {
        var e = et.getDataAttribute(t, "margin-right");
        void 0 !== e && (et.removeDataAttribute(t, "margin-right"), t.style.marginRight = e);
      });
      var t = et.getDataAttribute(document.body, "padding-right");
      void 0 === t ? document.body.style.paddingRight = "" : (et.removeDataAttribute(document.body, "padding-right"), document.body.style.paddingRight = t);
    }, e._getScrollbarWidth = function () {
      var t = document.createElement("div");
      t.className = "modal-scrollbar-measure", document.body.appendChild(t);
      var e = t.getBoundingClientRect().width - t.clientWidth;
      return document.body.removeChild(t), e;
    }, t.jQueryInterface = function (e, n) {
      return this.each(function () {
        var i = L(this, "bs.modal"),
            o = s({}, kt, et.getDataAttributes(this), "object" == _typeof(e) && e ? e : {});

        if (i || (i = new t(this, o)), "string" == typeof e) {
          if (void 0 === i[e]) throw new TypeError('No method named "' + e + '"');
          i[e](n);
        } else o.show && i.show(n);
      });
    }, t.getInstance = function (t) {
      return L(t, "bs.modal");
    }, o(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return kt;
      }
    }]), t;
  }();

  V.on(document, "click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
    var e = this,
        n = d(this);
    "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault(), V.one(n, "show.bs.modal", function (t) {
      t.defaultPrevented || V.one(n, "hidden.bs.modal", function () {
        b(e) && e.focus();
      });
    });
    var i = L(n, "bs.modal");

    if (!i) {
      var o = s({}, et.getDataAttributes(n), et.getDataAttributes(this));
      i = new Ct(n, o);
    }

    i.show(this);
  });
  var At = E();

  if (At) {
    var St = At.fn.modal;
    At.fn.modal = Ct.jQueryInterface, At.fn.modal.Constructor = Ct, At.fn.modal.noConflict = function () {
      return At.fn.modal = St, Ct.jQueryInterface;
    };
  }

  var Dt = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
      It = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
      Ot = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
      Nt = {
    "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };

  function jt(t, e, n) {
    var i;
    if (!t.length) return t;
    if (n && "function" == typeof n) return n(t);

    for (var o = new window.DOMParser().parseFromString(t, "text/html"), s = Object.keys(e), r = (i = []).concat.apply(i, o.body.querySelectorAll("*")), a = function a(t, n) {
      var i,
          o = r[t],
          a = o.nodeName.toLowerCase();
      if (-1 === s.indexOf(a)) return o.parentNode.removeChild(o), "continue";
      var l = (i = []).concat.apply(i, o.attributes),
          c = [].concat(e["*"] || [], e[a] || []);
      l.forEach(function (t) {
        (function (t, e) {
          var n = t.nodeName.toLowerCase();
          if (-1 !== e.indexOf(n)) return -1 === Dt.indexOf(n) || Boolean(t.nodeValue.match(It) || t.nodeValue.match(Ot));

          for (var i = e.filter(function (t) {
            return t instanceof RegExp;
          }), o = 0, s = i.length; o < s; o++) {
            if (n.match(i[o])) return !0;
          }

          return !1;
        })(t, c) || o.removeAttribute(t.nodeName);
      });
    }, l = 0, c = r.length; l < c; l++) {
      a(l);
    }

    return o.body.innerHTML;
  }

  var xt = "tooltip",
      Pt = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
      Rt = ["sanitize", "allowList", "sanitizeFn"],
      Ht = {
    animation: "boolean",
    template: "string",
    title: "(string|element|function)",
    trigger: "string",
    delay: "(number|object)",
    html: "boolean",
    selector: "(string|boolean)",
    placement: "(string|function)",
    offset: "(number|string|function)",
    container: "(string|element|boolean)",
    fallbackPlacement: "(string|array)",
    boundary: "(string|element)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    allowList: "object",
    popperConfig: "(null|object)"
  },
      Bt = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: "right",
    BOTTOM: "bottom",
    LEFT: "left"
  },
      Mt = {
    animation: !0,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    selector: !1,
    placement: "top",
    offset: 0,
    container: !1,
    fallbackPlacement: "flip",
    boundary: "scrollParent",
    sanitize: !0,
    sanitizeFn: null,
    allowList: Nt,
    popperConfig: null
  },
      Qt = {
    HIDE: "hide.bs.tooltip",
    HIDDEN: "hidden.bs.tooltip",
    SHOW: "show.bs.tooltip",
    SHOWN: "shown.bs.tooltip",
    INSERTED: "inserted.bs.tooltip",
    CLICK: "click.bs.tooltip",
    FOCUSIN: "focusin.bs.tooltip",
    FOCUSOUT: "focusout.bs.tooltip",
    MOUSEENTER: "mouseenter.bs.tooltip",
    MOUSELEAVE: "mouseleave.bs.tooltip"
  },
      Ut = function () {
    function t(t, e) {
      if (void 0 === n["default"]) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org)");
      this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners(), k(t, this.constructor.DATA_KEY, this);
    }

    var e = t.prototype;
    return e.enable = function () {
      this._isEnabled = !0;
    }, e.disable = function () {
      this._isEnabled = !1;
    }, e.toggleEnabled = function () {
      this._isEnabled = !this._isEnabled;
    }, e.toggle = function (t) {
      if (this._isEnabled) if (t) {
        var e = this.constructor.DATA_KEY,
            n = L(t.delegateTarget, e);
        n || (n = new this.constructor(t.delegateTarget, this._getDelegateConfig()), k(t.delegateTarget, e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n);
      } else {
        if (this.getTipElement().classList.contains("show")) return void this._leave(null, this);

        this._enter(null, this);
      }
    }, e.dispose = function () {
      clearTimeout(this._timeout), C(this.element, this.constructor.DATA_KEY), V.off(this.element, this.constructor.EVENT_KEY), V.off(this.element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this.tip && this.tip.parentNode.removeChild(this.tip), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
    }, e.show = function () {
      var t = this;
      if ("none" === this.element.style.display) throw new Error("Please use show on visible elements");

      if (this.isWithContent() && this._isEnabled) {
        var e = V.trigger(this.element, this.constructor.Event.SHOW),
            i = function t(e) {
          if (!document.documentElement.attachShadow) return null;

          if ("function" == typeof e.getRootNode) {
            var n = e.getRootNode();
            return n instanceof ShadowRoot ? n : null;
          }

          return e instanceof ShadowRoot ? e : e.parentNode ? t(e.parentNode) : null;
        }(this.element),
            o = null === i ? this.element.ownerDocument.documentElement.contains(this.element) : i.contains(this.element);

        if (e.defaultPrevented || !o) return;
        var s = this.getTipElement(),
            r = u(this.constructor.NAME);
        s.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && s.classList.add("fade");

        var a = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
            l = this._getAttachment(a);

        this._addAttachmentClass(l);

        var c,
            h = this._getContainer();

        if (k(s, this.constructor.DATA_KEY, this), this.element.ownerDocument.documentElement.contains(this.tip) || h.appendChild(s), V.trigger(this.element, this.constructor.Event.INSERTED), this._popper = new n["default"](this.element, s, this._getPopperConfig(l)), s.classList.add("show"), "ontouchstart" in document.documentElement) (c = []).concat.apply(c, document.body.children).forEach(function (t) {
          V.on(t, "mouseover", function () {});
        });

        var f = function f() {
          t.config.animation && t._fixTransition();
          var e = t._hoverState;
          t._hoverState = null, V.trigger(t.element, t.constructor.Event.SHOWN), "out" === e && t._leave(null, t);
        };

        if (this.tip.classList.contains("fade")) {
          var d = g(this.tip);
          V.one(this.tip, "transitionend", f), _(this.tip, d);
        } else f();
      }
    }, e.hide = function () {
      var t = this;

      if (this._popper) {
        var e = this.getTipElement(),
            n = function n() {
          "show" !== t._hoverState && e.parentNode && e.parentNode.removeChild(e), t._cleanTipClass(), t.element.removeAttribute("aria-describedby"), V.trigger(t.element, t.constructor.Event.HIDDEN), t._popper.destroy();
        };

        if (!V.trigger(this.element, this.constructor.Event.HIDE).defaultPrevented) {
          var i;
          if (e.classList.remove("show"), "ontouchstart" in document.documentElement) (i = []).concat.apply(i, document.body.children).forEach(function (t) {
            return V.off(t, "mouseover", y);
          });

          if (this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, this.tip.classList.contains("fade")) {
            var o = g(e);
            V.one(e, "transitionend", n), _(e, o);
          } else n();

          this._hoverState = "";
        }
      }
    }, e.update = function () {
      null !== this._popper && this._popper.scheduleUpdate();
    }, e.isWithContent = function () {
      return Boolean(this.getTitle());
    }, e.getTipElement = function () {
      if (this.tip) return this.tip;
      var t = document.createElement("div");
      return t.innerHTML = this.config.template, this.tip = t.children[0], this.tip;
    }, e.setContent = function () {
      var t = this.getTipElement();
      this.setElementContent(nt.findOne(".tooltip-inner", t), this.getTitle()), t.classList.remove("fade", "show");
    }, e.setElementContent = function (t, e) {
      if (null !== t) return "object" == _typeof(e) && m(e) ? (e.jquery && (e = e[0]), void (this.config.html ? e.parentNode !== t && (t.innerHTML = "", t.appendChild(e)) : t.textContent = e.textContent)) : void (this.config.html ? (this.config.sanitize && (e = jt(e, this.config.allowList, this.config.sanitizeFn)), t.innerHTML = e) : t.textContent = e);
    }, e.getTitle = function () {
      var t = this.element.getAttribute("data-original-title");
      return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t;
    }, e._getPopperConfig = function (t) {
      var e = this;
      return s({}, {
        placement: t,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: "." + this.constructor.NAME + "-arrow"
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(t) {
          t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t);
        },
        onUpdate: function onUpdate(t) {
          return e._handlePopperPlacementChange(t);
        }
      }, this.config.popperConfig);
    }, e._addAttachmentClass = function (t) {
      this.getTipElement().classList.add("bs-tooltip-" + t);
    }, e._getOffset = function () {
      var t = this,
          e = {};
      return "function" == typeof this.config.offset ? e.fn = function (e) {
        return e.offsets = s({}, e.offsets, t.config.offset(e.offsets, t.element) || {}), e;
      } : e.offset = this.config.offset, e;
    }, e._getContainer = function () {
      return !1 === this.config.container ? document.body : m(this.config.container) ? this.config.container : nt.findOne(this.config.container);
    }, e._getAttachment = function (t) {
      return Bt[t.toUpperCase()];
    }, e._setListeners = function () {
      var t = this;
      this.config.trigger.split(" ").forEach(function (e) {
        if ("click" === e) V.on(t.element, t.constructor.Event.CLICK, t.config.selector, function (e) {
          return t.toggle(e);
        });else if ("manual" !== e) {
          var n = "hover" === e ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
              i = "hover" === e ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
          V.on(t.element, n, t.config.selector, function (e) {
            return t._enter(e);
          }), V.on(t.element, i, t.config.selector, function (e) {
            return t._leave(e);
          });
        }
      }), this._hideModalHandler = function () {
        t.element && t.hide();
      }, V.on(this.element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = s({}, this.config, {
        trigger: "manual",
        selector: ""
      }) : this._fixTitle();
    }, e._fixTitle = function () {
      var t = _typeof(this.element.getAttribute("data-original-title"));

      (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
    }, e._enter = function (t, e) {
      var n = this.constructor.DATA_KEY;
      (e = e || L(t.delegateTarget, n)) || (e = new this.constructor(t.delegateTarget, this._getDelegateConfig()), k(t.delegateTarget, n, e)), t && (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0), e.getTipElement().classList.contains("show") || "show" === e._hoverState ? e._hoverState = "show" : (clearTimeout(e._timeout), e._hoverState = "show", e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function () {
        "show" === e._hoverState && e.show();
      }, e.config.delay.show) : e.show());
    }, e._leave = function (t, e) {
      var n = this.constructor.DATA_KEY;
      (e = e || L(t.delegateTarget, n)) || (e = new this.constructor(t.delegateTarget, this._getDelegateConfig()), k(t.delegateTarget, n, e)), t && (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = "out", e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function () {
        "out" === e._hoverState && e.hide();
      }, e.config.delay.hide) : e.hide());
    }, e._isWithActiveTrigger = function () {
      for (var t in this._activeTrigger) {
        if (this._activeTrigger[t]) return !0;
      }

      return !1;
    }, e._getConfig = function (t) {
      var e = et.getDataAttributes(this.element);
      return Object.keys(e).forEach(function (t) {
        -1 !== Rt.indexOf(t) && delete e[t];
      }), t && "object" == _typeof(t.container) && t.container.jquery && (t.container = t.container[0]), "number" == typeof (t = s({}, this.constructor.Default, e, "object" == _typeof(t) && t ? t : {})).delay && (t.delay = {
        show: t.delay,
        hide: t.delay
      }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), v(xt, t, this.constructor.DefaultType), t.sanitize && (t.template = jt(t.template, t.allowList, t.sanitizeFn)), t;
    }, e._getDelegateConfig = function () {
      var t = {};
      if (this.config) for (var e in this.config) {
        this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
      }
      return t;
    }, e._cleanTipClass = function () {
      var t = this.getTipElement(),
          e = t.getAttribute("class").match(Pt);
      null !== e && e.length > 0 && e.map(function (t) {
        return t.trim();
      }).forEach(function (e) {
        return t.classList.remove(e);
      });
    }, e._handlePopperPlacementChange = function (t) {
      this.tip = t.instance.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(t.placement));
    }, e._fixTransition = function () {
      var t = this.getTipElement(),
          e = this.config.animation;
      null === t.getAttribute("x-placement") && (t.classList.remove("fade"), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e);
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        var n = L(this, "bs.tooltip"),
            i = "object" == _typeof(e) && e;

        if ((n || !/dispose|hide/.test(e)) && (n || (n = new t(this, i)), "string" == typeof e)) {
          if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
          n[e]();
        }
      });
    }, t.getInstance = function (t) {
      return L(t, "bs.tooltip");
    }, o(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return Mt;
      }
    }, {
      key: "NAME",
      get: function get() {
        return xt;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.tooltip";
      }
    }, {
      key: "Event",
      get: function get() {
        return Qt;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".bs.tooltip";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Ht;
      }
    }]), t;
  }(),
      Ft = E();

  if (Ft) {
    var Wt = Ft.fn[xt];
    Ft.fn[xt] = Ut.jQueryInterface, Ft.fn[xt].Constructor = Ut, Ft.fn[xt].noConflict = function () {
      return Ft.fn[xt] = Wt, Ut.jQueryInterface;
    };
  }

  var Kt = "popover",
      Vt = new RegExp("(^|\\s)bs-popover\\S+", "g"),
      qt = s({}, Ut.Default, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }),
      zt = s({}, Ut.DefaultType, {
    content: "(string|element|function)"
  }),
      Xt = {
    HIDE: "hide.bs.popover",
    HIDDEN: "hidden.bs.popover",
    SHOW: "show.bs.popover",
    SHOWN: "shown.bs.popover",
    INSERTED: "inserted.bs.popover",
    CLICK: "click.bs.popover",
    FOCUSIN: "focusin.bs.popover",
    FOCUSOUT: "focusout.bs.popover",
    MOUSEENTER: "mouseenter.bs.popover",
    MOUSELEAVE: "mouseleave.bs.popover"
  },
      Yt = function (t) {
    var e, n;

    function i() {
      return t.apply(this, arguments) || this;
    }

    n = t, (e = i).prototype = Object.create(n.prototype), e.prototype.constructor = e, e.__proto__ = n;
    var s = i.prototype;
    return s.isWithContent = function () {
      return this.getTitle() || this._getContent();
    }, s.setContent = function () {
      var t = this.getTipElement();
      this.setElementContent(nt.findOne(".popover-header", t), this.getTitle());

      var e = this._getContent();

      "function" == typeof e && (e = e.call(this.element)), this.setElementContent(nt.findOne(".popover-body", t), e), t.classList.remove("fade", "show");
    }, s._addAttachmentClass = function (t) {
      this.getTipElement().classList.add("bs-popover-" + t);
    }, s._getContent = function () {
      return this.element.getAttribute("data-content") || this.config.content;
    }, s._cleanTipClass = function () {
      var t = this.getTipElement(),
          e = t.getAttribute("class").match(Vt);
      null !== e && e.length > 0 && e.map(function (t) {
        return t.trim();
      }).forEach(function (e) {
        return t.classList.remove(e);
      });
    }, i.jQueryInterface = function (t) {
      return this.each(function () {
        var e = L(this, "bs.popover"),
            n = "object" == _typeof(t) ? t : null;

        if ((e || !/dispose|hide/.test(t)) && (e || (e = new i(this, n), k(this, "bs.popover", e)), "string" == typeof t)) {
          if (void 0 === e[t]) throw new TypeError('No method named "' + t + '"');
          e[t]();
        }
      });
    }, i.getInstance = function (t) {
      return L(t, "bs.popover");
    }, o(i, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return qt;
      }
    }, {
      key: "NAME",
      get: function get() {
        return Kt;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.popover";
      }
    }, {
      key: "Event",
      get: function get() {
        return Xt;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".bs.popover";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return zt;
      }
    }]), i;
  }(Ut),
      $t = E();

  if ($t) {
    var Gt = $t.fn[Kt];
    $t.fn[Kt] = Yt.jQueryInterface, $t.fn[Kt].Constructor = Yt, $t.fn[Kt].noConflict = function () {
      return $t.fn[Kt] = Gt, Yt.jQueryInterface;
    };
  }

  var Zt = "scrollspy",
      Jt = {
    offset: 10,
    method: "auto",
    target: ""
  },
      te = {
    offset: "number",
    method: "string",
    target: "(string|element)"
  },
      ee = function () {
    function t(t, e) {
      var n = this;
      this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " .nav-link, " + this._config.target + " .list-group-item, " + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, V.on(this._scrollElement, "scroll.bs.scrollspy", function (t) {
        return n._process(t);
      }), this.refresh(), this._process(), k(t, "bs.scrollspy", this);
    }

    var e = t.prototype;
    return e.refresh = function () {
      var t = this,
          e = this._scrollElement === this._scrollElement.window ? "offset" : "position",
          n = "auto" === this._config.method ? e : this._config.method,
          i = "position" === n ? this._getScrollTop() : 0;
      this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), nt.find(this._selector).map(function (t) {
        var e = f(t),
            o = e ? nt.findOne(e) : null;

        if (o) {
          var s = o.getBoundingClientRect();
          if (s.width || s.height) return [et[n](o).top + i, e];
        }

        return null;
      }).filter(function (t) {
        return t;
      }).sort(function (t, e) {
        return t[0] - e[0];
      }).forEach(function (e) {
        t._offsets.push(e[0]), t._targets.push(e[1]);
      });
    }, e.dispose = function () {
      C(this._element, "bs.scrollspy"), V.off(this._scrollElement, ".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
    }, e._getConfig = function (t) {
      if ("string" != typeof (t = s({}, Jt, "object" == _typeof(t) && t ? t : {})).target && m(t.target)) {
        var e = t.target.id;
        e || (e = u(Zt), t.target.id = e), t.target = "#" + e;
      }

      return v(Zt, t, te), t;
    }, e._getScrollTop = function () {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }, e._getScrollHeight = function () {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }, e._getOffsetHeight = function () {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }, e._process = function () {
      var t = this._getScrollTop() + this._config.offset,
          e = this._getScrollHeight(),
          n = this._config.offset + e - this._getOffsetHeight();

      if (this._scrollHeight !== e && this.refresh(), t >= n) {
        var i = this._targets[this._targets.length - 1];
        this._activeTarget !== i && this._activate(i);
      } else {
        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();

        for (var o = this._offsets.length; o--;) {
          this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o]);
        }
      }
    }, e._activate = function (t) {
      this._activeTarget = t, this._clear();

      var e = this._selector.split(",").map(function (e) {
        return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]';
      }),
          n = nt.findOne(e.join(","));

      n.classList.contains("dropdown-item") ? (nt.findOne(".dropdown-toggle", n.closest(".dropdown")).classList.add("active"), n.classList.add("active")) : (n.classList.add("active"), nt.parents(n, ".nav, .list-group").forEach(function (t) {
        nt.prev(t, ".nav-link, .list-group-item").forEach(function (t) {
          return t.classList.add("active");
        }), nt.prev(t, ".nav-item").forEach(function (t) {
          nt.children(t, ".nav-link").forEach(function (t) {
            return t.classList.add("active");
          });
        });
      })), V.trigger(this._scrollElement, "activate.bs.scrollspy", {
        relatedTarget: t
      });
    }, e._clear = function () {
      nt.find(this._selector).filter(function (t) {
        return t.classList.contains("active");
      }).forEach(function (t) {
        return t.classList.remove("active");
      });
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        var n = L(this, "bs.scrollspy");

        if (n || (n = new t(this, "object" == _typeof(e) && e)), "string" == typeof e) {
          if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
          n[e]();
        }
      });
    }, t.getInstance = function (t) {
      return L(t, "bs.scrollspy");
    }, o(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "Default",
      get: function get() {
        return Jt;
      }
    }]), t;
  }();

  V.on(window, "load.bs.scrollspy.data-api", function () {
    nt.find('[data-spy="scroll"]').forEach(function (t) {
      return new ee(t, et.getDataAttributes(t));
    });
  });
  var ne = E();

  if (ne) {
    var ie = ne.fn[Zt];
    ne.fn[Zt] = ee.jQueryInterface, ne.fn[Zt].Constructor = ee, ne.fn[Zt].noConflict = function () {
      return ne.fn[Zt] = ie, ee.jQueryInterface;
    };
  }

  var oe = function () {
    function t(t) {
      this._element = t, k(this._element, "bs.tab", this);
    }

    var e = t.prototype;
    return e.show = function () {
      var t = this;

      if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains("active") || this._element.classList.contains("disabled"))) {
        var e,
            n = d(this._element),
            i = this._element.closest(".nav, .list-group");

        if (i) {
          var o = "UL" === i.nodeName || "OL" === i.nodeName ? ":scope > li > .active" : ".active";
          e = (e = nt.find(o, i))[e.length - 1];
        }

        var s = null;

        if (e && (s = V.trigger(e, "hide.bs.tab", {
          relatedTarget: this._element
        })), !(V.trigger(this._element, "show.bs.tab", {
          relatedTarget: e
        }).defaultPrevented || null !== s && s.defaultPrevented)) {
          this._activate(this._element, i);

          var r = function r() {
            V.trigger(e, "hidden.bs.tab", {
              relatedTarget: t._element
            }), V.trigger(t._element, "shown.bs.tab", {
              relatedTarget: e
            });
          };

          n ? this._activate(n, n.parentNode, r) : r();
        }
      }
    }, e.dispose = function () {
      C(this._element, "bs.tab"), this._element = null;
    }, e._activate = function (t, e, n) {
      var i = this,
          o = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? nt.children(e, ".active") : nt.find(":scope > li > .active", e))[0],
          s = n && o && o.classList.contains("fade"),
          r = function r() {
        return i._transitionComplete(t, o, n);
      };

      if (o && s) {
        var a = g(o);
        o.classList.remove("show"), V.one(o, "transitionend", r), _(o, a);
      } else r();
    }, e._transitionComplete = function (t, e, n) {
      if (e) {
        e.classList.remove("active");
        var i = nt.findOne(":scope > .dropdown-menu .active", e.parentNode);
        i && i.classList.remove("active"), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1);
      }

      (t.classList.add("active"), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), w(t), t.classList.contains("fade") && t.classList.add("show"), t.parentNode && t.parentNode.classList.contains("dropdown-menu")) && (t.closest(".dropdown") && nt.find(".dropdown-toggle").forEach(function (t) {
        return t.classList.add("active");
      }), t.setAttribute("aria-expanded", !0));
      n && n();
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        var n = L(this, "bs.tab") || new t(this);

        if ("string" == typeof e) {
          if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
          n[e]();
        }
      });
    }, t.getInstance = function (t) {
      return L(t, "bs.tab");
    }, o(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }]), t;
  }();

  V.on(document, "click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (t) {
    t.preventDefault(), (L(this, "bs.tab") || new oe(this)).show();
  });
  var se = E();

  if (se) {
    var re = se.fn.tab;
    se.fn.tab = oe.jQueryInterface, se.fn.tab.Constructor = oe, se.fn.tab.noConflict = function () {
      return se.fn.tab = re, oe.jQueryInterface;
    };
  }

  var ae = {
    animation: "boolean",
    autohide: "boolean",
    delay: "number"
  },
      le = {
    animation: !0,
    autohide: !0,
    delay: 5e3
  },
      ce = function () {
    function t(t, e) {
      this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners(), k(t, "bs.toast", this);
    }

    var e = t.prototype;
    return e.show = function () {
      var t = this;

      if (!V.trigger(this._element, "show.bs.toast").defaultPrevented) {
        this._clearTimeout(), this._config.animation && this._element.classList.add("fade");

        var e = function e() {
          t._element.classList.remove("showing"), t._element.classList.add("show"), V.trigger(t._element, "shown.bs.toast"), t._config.autohide && (t._timeout = setTimeout(function () {
            t.hide();
          }, t._config.delay));
        };

        if (this._element.classList.remove("hide"), w(this._element), this._element.classList.add("showing"), this._config.animation) {
          var n = g(this._element);
          V.one(this._element, "transitionend", e), _(this._element, n);
        } else e();
      }
    }, e.hide = function () {
      var t = this;

      if (this._element.classList.contains("show") && !V.trigger(this._element, "hide.bs.toast").defaultPrevented) {
        var e = function e() {
          t._element.classList.add("hide"), V.trigger(t._element, "hidden.bs.toast");
        };

        if (this._element.classList.remove("show"), this._config.animation) {
          var n = g(this._element);
          V.one(this._element, "transitionend", e), _(this._element, n);
        } else e();
      }
    }, e.dispose = function () {
      this._clearTimeout(), this._element.classList.contains("show") && this._element.classList.remove("show"), V.off(this._element, "click.dismiss.bs.toast"), C(this._element, "bs.toast"), this._element = null, this._config = null;
    }, e._getConfig = function (t) {
      return t = s({}, le, et.getDataAttributes(this._element), "object" == _typeof(t) && t ? t : {}), v("toast", t, this.constructor.DefaultType), t;
    }, e._setListeners = function () {
      var t = this;
      V.on(this._element, "click.dismiss.bs.toast", '[data-dismiss="toast"]', function () {
        return t.hide();
      });
    }, e._clearTimeout = function () {
      clearTimeout(this._timeout), this._timeout = null;
    }, t.jQueryInterface = function (e) {
      return this.each(function () {
        var n = L(this, "bs.toast");

        if (n || (n = new t(this, "object" == _typeof(e) && e)), "string" == typeof e) {
          if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
          n[e](this);
        }
      });
    }, t.getInstance = function (t) {
      return L(t, "bs.toast");
    }, o(t, null, [{
      key: "VERSION",
      get: function get() {
        return "5.0.0-alpha2";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return ae;
      }
    }, {
      key: "Default",
      get: function get() {
        return le;
      }
    }]), t;
  }(),
      ue = E();

  if (ue) {
    var he = ue.fn.toast;
    ue.fn.toast = ce.jQueryInterface, ue.fn.toast.Constructor = ce, ue.fn.toast.noConflict = function () {
      return ue.fn.toast = he, ce.jQueryInterface;
    };
  }

  return {
    Alert: z,
    Button: $,
    Carousel: lt,
    Collapse: gt,
    Dropdown: wt,
    Modal: Ct,
    Popover: Yt,
    ScrollSpy: ee,
    Tab: oe,
    Toast: ce,
    Tooltip: Ut
  };
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 Copyright (C) Federico Zivolo 2020
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function (e, t) {
  'object' == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t();
})(void 0, function () {
  'use strict';

  function e(e) {
    return e && '[object Function]' === {}.toString.call(e);
  }

  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = e.ownerDocument.defaultView,
        n = o.getComputedStyle(e, null);
    return t ? n[t] : n;
  }

  function o(e) {
    return 'HTML' === e.nodeName ? e : e.parentNode || e.host;
  }

  function n(e) {
    if (!e) return document.body;

    switch (e.nodeName) {
      case 'HTML':
      case 'BODY':
        return e.ownerDocument.body;

      case '#document':
        return e.body;
    }

    var i = t(e),
        r = i.overflow,
        p = i.overflowX,
        s = i.overflowY;
    return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e));
  }

  function i(e) {
    return e && e.referenceNode ? e.referenceNode : e;
  }

  function r(e) {
    return 11 === e ? re : 10 === e ? pe : re || pe;
  }

  function p(e) {
    if (!e) return document.documentElement;

    for (var o = r(10) ? document.body : null, n = e.offsetParent || null; n === o && e.nextElementSibling;) {
      n = (e = e.nextElementSibling).offsetParent;
    }

    var i = n && n.nodeName;
    return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TH', 'TD', 'TABLE'].indexOf(n.nodeName) && 'static' === t(n, 'position') ? p(n) : n : e ? e.ownerDocument.documentElement : document.documentElement;
  }

  function s(e) {
    var t = e.nodeName;
    return 'BODY' !== t && ('HTML' === t || p(e.firstElementChild) === e);
  }

  function d(e) {
    return null === e.parentNode ? e : d(e.parentNode);
  }

  function a(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
        n = o ? e : t,
        i = o ? t : e,
        r = document.createRange();
    r.setStart(n, 0), r.setEnd(i, 0);
    var l = r.commonAncestorContainer;
    if (e !== l && t !== l || n.contains(i)) return s(l) ? l : p(l);
    var f = d(e);
    return f.host ? a(f.host, t) : a(e, d(t).host);
  }

  function l(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
        o = 'top' === t ? 'scrollTop' : 'scrollLeft',
        n = e.nodeName;

    if ('BODY' === n || 'HTML' === n) {
      var i = e.ownerDocument.documentElement,
          r = e.ownerDocument.scrollingElement || i;
      return r[o];
    }

    return e[o];
  }

  function f(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        n = l(t, 'top'),
        i = l(t, 'left'),
        r = o ? -1 : 1;
    return e.top += n * r, e.bottom += n * r, e.left += i * r, e.right += i * r, e;
  }

  function m(e, t) {
    var o = 'x' === t ? 'Left' : 'Top',
        n = 'Left' == o ? 'Right' : 'Bottom';
    return parseFloat(e['border' + o + 'Width']) + parseFloat(e['border' + n + 'Width']);
  }

  function h(e, t, o, n) {
    return ee(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], r(10) ? parseInt(o['offset' + e]) + parseInt(n['margin' + ('Height' === e ? 'Top' : 'Left')]) + parseInt(n['margin' + ('Height' === e ? 'Bottom' : 'Right')]) : 0);
  }

  function c(e) {
    var t = e.body,
        o = e.documentElement,
        n = r(10) && getComputedStyle(o);
    return {
      height: h('Height', t, o, n),
      width: h('Width', t, o, n)
    };
  }

  function g(e) {
    return le({}, e, {
      right: e.left + e.width,
      bottom: e.top + e.height
    });
  }

  function u(e) {
    var o = {};

    try {
      if (r(10)) {
        o = e.getBoundingClientRect();
        var n = l(e, 'top'),
            i = l(e, 'left');
        o.top += n, o.left += i, o.bottom += n, o.right += i;
      } else o = e.getBoundingClientRect();
    } catch (t) {}

    var p = {
      left: o.left,
      top: o.top,
      width: o.right - o.left,
      height: o.bottom - o.top
    },
        s = 'HTML' === e.nodeName ? c(e.ownerDocument) : {},
        d = s.width || e.clientWidth || p.width,
        a = s.height || e.clientHeight || p.height,
        f = e.offsetWidth - d,
        h = e.offsetHeight - a;

    if (f || h) {
      var u = t(e);
      f -= m(u, 'x'), h -= m(u, 'y'), p.width -= f, p.height -= h;
    }

    return g(p);
  }

  function b(e, o) {
    var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        p = r(10),
        s = 'HTML' === o.nodeName,
        d = u(e),
        a = u(o),
        l = n(e),
        m = t(o),
        h = parseFloat(m.borderTopWidth),
        c = parseFloat(m.borderLeftWidth);
    i && s && (a.top = ee(a.top, 0), a.left = ee(a.left, 0));
    var b = g({
      top: d.top - a.top - h,
      left: d.left - a.left - c,
      width: d.width,
      height: d.height
    });

    if (b.marginTop = 0, b.marginLeft = 0, !p && s) {
      var w = parseFloat(m.marginTop),
          y = parseFloat(m.marginLeft);
      b.top -= h - w, b.bottom -= h - w, b.left -= c - y, b.right -= c - y, b.marginTop = w, b.marginLeft = y;
    }

    return (p && !i ? o.contains(l) : o === l && 'BODY' !== l.nodeName) && (b = f(b, o)), b;
  }

  function w(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        o = e.ownerDocument.documentElement,
        n = b(e, o),
        i = ee(o.clientWidth, window.innerWidth || 0),
        r = ee(o.clientHeight, window.innerHeight || 0),
        p = t ? 0 : l(o),
        s = t ? 0 : l(o, 'left'),
        d = {
      top: p - n.top + n.marginTop,
      left: s - n.left + n.marginLeft,
      width: i,
      height: r
    };
    return g(d);
  }

  function y(e) {
    var n = e.nodeName;
    if ('BODY' === n || 'HTML' === n) return !1;
    if ('fixed' === t(e, 'position')) return !0;
    var i = o(e);
    return !!i && y(i);
  }

  function E(e) {
    if (!e || !e.parentElement || r()) return document.documentElement;

    for (var o = e.parentElement; o && 'none' === t(o, 'transform');) {
      o = o.parentElement;
    }

    return o || document.documentElement;
  }

  function v(e, t, r, p) {
    var s = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
        d = {
      top: 0,
      left: 0
    },
        l = s ? E(e) : a(e, i(t));
    if ('viewport' === p) d = w(l, s);else {
      var f;
      'scrollParent' === p ? (f = n(o(t)), 'BODY' === f.nodeName && (f = e.ownerDocument.documentElement)) : 'window' === p ? f = e.ownerDocument.documentElement : f = p;
      var m = b(f, l, s);

      if ('HTML' === f.nodeName && !y(l)) {
        var h = c(e.ownerDocument),
            g = h.height,
            u = h.width;
        d.top += m.top - m.marginTop, d.bottom = g + m.top, d.left += m.left - m.marginLeft, d.right = u + m.left;
      } else d = m;
    }
    r = r || 0;
    var v = 'number' == typeof r;
    return d.left += v ? r : r.left || 0, d.top += v ? r : r.top || 0, d.right -= v ? r : r.right || 0, d.bottom -= v ? r : r.bottom || 0, d;
  }

  function x(e) {
    var t = e.width,
        o = e.height;
    return t * o;
  }

  function O(e, t, o, n, i) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf('auto')) return e;
    var p = v(o, n, r, i),
        s = {
      top: {
        width: p.width,
        height: t.top - p.top
      },
      right: {
        width: p.right - t.right,
        height: p.height
      },
      bottom: {
        width: p.width,
        height: p.bottom - t.bottom
      },
      left: {
        width: t.left - p.left,
        height: p.height
      }
    },
        d = Object.keys(s).map(function (e) {
      return le({
        key: e
      }, s[e], {
        area: x(s[e])
      });
    }).sort(function (e, t) {
      return t.area - e.area;
    }),
        a = d.filter(function (e) {
      var t = e.width,
          n = e.height;
      return t >= o.clientWidth && n >= o.clientHeight;
    }),
        l = 0 < a.length ? a[0].key : d[0].key,
        f = e.split('-')[1];
    return l + (f ? '-' + f : '');
  }

  function L(e, t, o) {
    var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
        r = n ? E(t) : a(t, i(o));
    return b(o, r, n);
  }

  function S(e) {
    var t = e.ownerDocument.defaultView,
        o = t.getComputedStyle(e),
        n = parseFloat(o.marginTop || 0) + parseFloat(o.marginBottom || 0),
        i = parseFloat(o.marginLeft || 0) + parseFloat(o.marginRight || 0),
        r = {
      width: e.offsetWidth + i,
      height: e.offsetHeight + n
    };
    return r;
  }

  function T(e) {
    var t = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }

  function C(e, t, o) {
    o = o.split('-')[0];
    var n = S(e),
        i = {
      width: n.width,
      height: n.height
    },
        r = -1 !== ['right', 'left'].indexOf(o),
        p = r ? 'top' : 'left',
        s = r ? 'left' : 'top',
        d = r ? 'height' : 'width',
        a = r ? 'width' : 'height';
    return i[p] = t[p] + t[d] / 2 - n[d] / 2, i[s] = o === s ? t[s] - n[a] : t[T(s)], i;
  }

  function D(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }

  function N(e, t, o) {
    if (Array.prototype.findIndex) return e.findIndex(function (e) {
      return e[t] === o;
    });
    var n = D(e, function (e) {
      return e[t] === o;
    });
    return e.indexOf(n);
  }

  function P(t, o, n) {
    var i = void 0 === n ? t : t.slice(0, N(t, 'name', n));
    return i.forEach(function (t) {
      t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      var n = t['function'] || t.fn;
      t.enabled && e(n) && (o.offsets.popper = g(o.offsets.popper), o.offsets.reference = g(o.offsets.reference), o = n(o, t));
    }), o;
  }

  function k() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      e.offsets.reference = L(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = O(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = C(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = P(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
    }
  }

  function W(e, t) {
    return e.some(function (e) {
      var o = e.name,
          n = e.enabled;
      return n && o === t;
    });
  }

  function B(e) {
    for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
      var i = t[n],
          r = i ? '' + i + o : e;
      if ('undefined' != typeof document.body.style[r]) return r;
    }

    return null;
  }

  function H() {
    return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[B('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }

  function A(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window;
  }

  function M(e, t, o, i) {
    var r = 'BODY' === e.nodeName,
        p = r ? e.ownerDocument.defaultView : e;
    p.addEventListener(t, o, {
      passive: !0
    }), r || M(n(p.parentNode), t, o, i), i.push(p);
  }

  function F(e, t, o, i) {
    o.updateBound = i, A(e).addEventListener('resize', o.updateBound, {
      passive: !0
    });
    var r = n(e);
    return M(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o;
  }

  function I() {
    this.state.eventsEnabled || (this.state = F(this.reference, this.options, this.state, this.scheduleUpdate));
  }

  function R(e, t) {
    return A(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) {
      e.removeEventListener('scroll', t.updateBound);
    }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
  }

  function U() {
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = R(this.reference, this.state));
  }

  function Y(e) {
    return '' !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }

  function V(e, t) {
    Object.keys(t).forEach(function (o) {
      var n = '';
      -1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && Y(t[o]) && (n = 'px'), e.style[o] = t[o] + n;
    });
  }

  function j(e, t) {
    Object.keys(t).forEach(function (o) {
      var n = t[o];
      !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }

  function q(e, t) {
    var o = e.offsets,
        n = o.popper,
        i = o.reference,
        r = $,
        p = function p(e) {
      return e;
    },
        s = r(i.width),
        d = r(n.width),
        a = -1 !== ['left', 'right'].indexOf(e.placement),
        l = -1 !== e.placement.indexOf('-'),
        f = t ? a || l || s % 2 == d % 2 ? r : Z : p,
        m = t ? r : p;

    return {
      left: f(1 == s % 2 && 1 == d % 2 && !l && t ? n.left - 1 : n.left),
      top: m(n.top),
      bottom: m(n.bottom),
      right: f(n.right)
    };
  }

  function K(e, t, o) {
    var n = D(e, function (e) {
      var o = e.name;
      return o === t;
    }),
        i = !!n && e.some(function (e) {
      return e.name === o && e.enabled && e.order < n.order;
    });

    if (!i) {
      var r = '`' + t + '`';
      console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!');
    }

    return i;
  }

  function z(e) {
    return 'end' === e ? 'start' : 'start' === e ? 'end' : e;
  }

  function G(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        o = he.indexOf(e),
        n = he.slice(o + 1).concat(he.slice(0, o));
    return t ? n.reverse() : n;
  }

  function _(e, t, o, n) {
    var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
        r = +i[1],
        p = i[2];
    if (!r) return e;

    if (0 === p.indexOf('%')) {
      var s;

      switch (p) {
        case '%p':
          s = o;
          break;

        case '%':
        case '%r':
        default:
          s = n;
      }

      var d = g(s);
      return d[t] / 100 * r;
    }

    if ('vh' === p || 'vw' === p) {
      var a;
      return a = 'vh' === p ? ee(document.documentElement.clientHeight, window.innerHeight || 0) : ee(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r;
    }

    return r;
  }

  function X(e, t, o, n) {
    var i = [0, 0],
        r = -1 !== ['right', 'left'].indexOf(n),
        p = e.split(/(\+|\-)/).map(function (e) {
      return e.trim();
    }),
        s = p.indexOf(D(p, function (e) {
      return -1 !== e.search(/,|\s/);
    }));
    p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    var d = /\s*,\s*|\s+/,
        a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
    return a = a.map(function (e, n) {
      var i = (1 === n ? !r : r) ? 'height' : 'width',
          p = !1;
      return e.reduce(function (e, t) {
        return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t);
      }, []).map(function (e) {
        return _(e, i, t, o);
      });
    }), a.forEach(function (e, t) {
      e.forEach(function (o, n) {
        Y(o) && (i[t] += o * ('-' === e[n - 1] ? -1 : 1));
      });
    }), i;
  }

  function J(e, t) {
    var o,
        n = t.offset,
        i = e.placement,
        r = e.offsets,
        p = r.popper,
        s = r.reference,
        d = i.split('-')[0];
    return o = Y(+n) ? [+n, 0] : X(n, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e;
  }

  var Q = Math.min,
      Z = Math.floor,
      $ = Math.round,
      ee = Math.max,
      te = 'undefined' != typeof window && 'undefined' != typeof document && 'undefined' != typeof navigator,
      oe = function () {
    for (var e = ['Edge', 'Trident', 'Firefox'], t = 0; t < e.length; t += 1) {
      if (te && 0 <= navigator.userAgent.indexOf(e[t])) return 1;
    }

    return 0;
  }(),
      ne = te && window.Promise,
      ie = ne ? function (e) {
    var t = !1;
    return function () {
      t || (t = !0, window.Promise.resolve().then(function () {
        t = !1, e();
      }));
    };
  } : function (e) {
    var t = !1;
    return function () {
      t || (t = !0, setTimeout(function () {
        t = !1, e();
      }, oe));
    };
  },
      re = te && !!(window.MSInputMethodContext && document.documentMode),
      pe = te && /MSIE 10/.test(navigator.userAgent),
      se = function se(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  },
      de = function () {
    function e(e, t) {
      for (var o, n = 0; n < t.length; n++) {
        o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }

    return function (t, o, n) {
      return o && e(t.prototype, o), n && e(t, n), t;
    };
  }(),
      ae = function ae(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = o, e;
  },
      le = Object.assign || function (e) {
    for (var t, o = 1; o < arguments.length; o++) {
      for (var n in t = arguments[o], t) {
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      }
    }

    return e;
  },
      fe = te && /Firefox/i.test(navigator.userAgent),
      me = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
      he = me.slice(3),
      ce = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  },
      ge = function () {
    function t(o, n) {
      var i = this,
          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
      se(this, t), this.scheduleUpdate = function () {
        return requestAnimationFrame(i.update);
      }, this.update = ie(this.update.bind(this)), this.options = le({}, t.Defaults, r), this.state = {
        isDestroyed: !1,
        isCreated: !1,
        scrollParents: []
      }, this.reference = o && o.jquery ? o[0] : o, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(le({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
        i.options.modifiers[e] = le({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {});
      }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
        return le({
          name: e
        }, i.options.modifiers[e]);
      }).sort(function (e, t) {
        return e.order - t.order;
      }), this.modifiers.forEach(function (t) {
        t.enabled && e(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state);
      }), this.update();
      var p = this.options.eventsEnabled;
      p && this.enableEventListeners(), this.state.eventsEnabled = p;
    }

    return de(t, [{
      key: 'update',
      value: function value() {
        return k.call(this);
      }
    }, {
      key: 'destroy',
      value: function value() {
        return H.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function value() {
        return I.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function value() {
        return U.call(this);
      }
    }]), t;
  }();

  return ge.Utils = ('undefined' == typeof window ? global : window).PopperUtils, ge.placements = me, ge.Defaults = {
    placement: 'bottom',
    positionFixed: !1,
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function onCreate() {},
    onUpdate: function onUpdate() {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function fn(e) {
          var t = e.placement,
              o = t.split('-')[0],
              n = t.split('-')[1];

          if (n) {
            var i = e.offsets,
                r = i.reference,
                p = i.popper,
                s = -1 !== ['bottom', 'top'].indexOf(o),
                d = s ? 'left' : 'top',
                a = s ? 'width' : 'height',
                l = {
              start: ae({}, d, r[d]),
              end: ae({}, d, r[d] + r[a] - p[a])
            };
            e.offsets.popper = le({}, p, l[n]);
          }

          return e;
        }
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: J,
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function fn(e, t) {
          var o = t.boundariesElement || p(e.instance.popper);
          e.instance.reference === o && (o = p(o));
          var n = B('transform'),
              i = e.instance.popper.style,
              r = i.top,
              s = i.left,
              d = i[n];
          i.top = '', i.left = '', i[n] = '';
          var a = v(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed);
          i.top = r, i.left = s, i[n] = d, t.boundaries = a;
          var l = t.priority,
              f = e.offsets.popper,
              m = {
            primary: function primary(e) {
              var o = f[e];
              return f[e] < a[e] && !t.escapeWithReference && (o = ee(f[e], a[e])), ae({}, e, o);
            },
            secondary: function secondary(e) {
              var o = 'right' === e ? 'left' : 'top',
                  n = f[o];
              return f[e] > a[e] && !t.escapeWithReference && (n = Q(f[o], a[e] - ('right' === e ? f.width : f.height))), ae({}, o, n);
            }
          };
          return l.forEach(function (e) {
            var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
            f = le({}, f, m[t](e));
          }), e.offsets.popper = f, e;
        },
        priority: ['left', 'right', 'top', 'bottom'],
        padding: 5,
        boundariesElement: 'scrollParent'
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function fn(e) {
          var t = e.offsets,
              o = t.popper,
              n = t.reference,
              i = e.placement.split('-')[0],
              r = Z,
              p = -1 !== ['top', 'bottom'].indexOf(i),
              s = p ? 'right' : 'bottom',
              d = p ? 'left' : 'top',
              a = p ? 'width' : 'height';
          return o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]), o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])), e;
        }
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function fn(e, o) {
          var n;
          if (!K(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
          var i = o.element;

          if ('string' == typeof i) {
            if (i = e.instance.popper.querySelector(i), !i) return e;
          } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;

          var r = e.placement.split('-')[0],
              p = e.offsets,
              s = p.popper,
              d = p.reference,
              a = -1 !== ['left', 'right'].indexOf(r),
              l = a ? 'height' : 'width',
              f = a ? 'Top' : 'Left',
              m = f.toLowerCase(),
              h = a ? 'left' : 'top',
              c = a ? 'bottom' : 'right',
              u = S(i)[l];
          d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)), d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]), e.offsets.popper = g(e.offsets.popper);
          var b = d[m] + d[l] / 2 - u / 2,
              w = t(e.instance.popper),
              y = parseFloat(w['margin' + f]),
              E = parseFloat(w['border' + f + 'Width']),
              v = b - e.offsets.popper[m] - y - E;
          return v = ee(Q(s[l] - u, v), 0), e.arrowElement = i, e.offsets.arrow = (n = {}, ae(n, m, $(v)), ae(n, h, ''), n), e;
        },
        element: '[x-arrow]'
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function fn(e, t) {
          if (W(e.instance.modifiers, 'inner')) return e;
          if (e.flipped && e.placement === e.originalPlacement) return e;
          var o = v(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
              n = e.placement.split('-')[0],
              i = T(n),
              r = e.placement.split('-')[1] || '',
              p = [];

          switch (t.behavior) {
            case ce.FLIP:
              p = [n, i];
              break;

            case ce.CLOCKWISE:
              p = G(n);
              break;

            case ce.COUNTERCLOCKWISE:
              p = G(n, !0);
              break;

            default:
              p = t.behavior;
          }

          return p.forEach(function (s, d) {
            if (n !== s || p.length === d + 1) return e;
            n = e.placement.split('-')[0], i = T(n);
            var a = e.offsets.popper,
                l = e.offsets.reference,
                f = Z,
                m = 'left' === n && f(a.right) > f(l.left) || 'right' === n && f(a.left) < f(l.right) || 'top' === n && f(a.bottom) > f(l.top) || 'bottom' === n && f(a.top) < f(l.bottom),
                h = f(a.left) < f(o.left),
                c = f(a.right) > f(o.right),
                g = f(a.top) < f(o.top),
                u = f(a.bottom) > f(o.bottom),
                b = 'left' === n && h || 'right' === n && c || 'top' === n && g || 'bottom' === n && u,
                w = -1 !== ['top', 'bottom'].indexOf(n),
                y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && g || !w && 'end' === r && u),
                E = !!t.flipVariationsByContent && (w && 'start' === r && c || w && 'end' === r && h || !w && 'start' === r && u || !w && 'end' === r && g),
                v = y || E;
            (m || b || v) && (e.flipped = !0, (m || b) && (n = p[d + 1]), v && (r = z(r)), e.placement = n + (r ? '-' + r : ''), e.offsets.popper = le({}, e.offsets.popper, C(e.instance.popper, e.offsets.reference, e.placement)), e = P(e.instance.modifiers, e, 'flip'));
          }), e;
        },
        behavior: 'flip',
        padding: 5,
        boundariesElement: 'viewport',
        flipVariations: !1,
        flipVariationsByContent: !1
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function fn(e) {
          var t = e.placement,
              o = t.split('-')[0],
              n = e.offsets,
              i = n.popper,
              r = n.reference,
              p = -1 !== ['left', 'right'].indexOf(o),
              s = -1 === ['top', 'left'].indexOf(o);
          return i[p ? 'left' : 'top'] = r[o] - (s ? i[p ? 'width' : 'height'] : 0), e.placement = T(t), e.offsets.popper = g(i), e;
        }
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function fn(e) {
          if (!K(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
          var t = e.offsets.reference,
              o = D(e.instance.modifiers, function (e) {
            return 'preventOverflow' === e.name;
          }).boundaries;

          if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
            if (!0 === e.hide) return e;
            e.hide = !0, e.attributes['x-out-of-boundaries'] = '';
          } else {
            if (!1 === e.hide) return e;
            e.hide = !1, e.attributes['x-out-of-boundaries'] = !1;
          }

          return e;
        }
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function fn(e, t) {
          var o = t.x,
              n = t.y,
              i = e.offsets.popper,
              r = D(e.instance.modifiers, function (e) {
            return 'applyStyle' === e.name;
          }).gpuAcceleration;
          void 0 !== r && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
          var s,
              d,
              a = void 0 === r ? t.gpuAcceleration : r,
              l = p(e.instance.popper),
              f = u(l),
              m = {
            position: i.position
          },
              h = q(e, 2 > window.devicePixelRatio || !fe),
              c = 'bottom' === o ? 'top' : 'bottom',
              g = 'right' === n ? 'left' : 'right',
              b = B('transform');
          if (d = 'bottom' == c ? 'HTML' === l.nodeName ? -l.clientHeight + h.bottom : -f.height + h.bottom : h.top, s = 'right' == g ? 'HTML' === l.nodeName ? -l.clientWidth + h.right : -f.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[g] = 0, m.willChange = 'transform';else {
            var w = 'bottom' == c ? -1 : 1,
                y = 'right' == g ? -1 : 1;
            m[c] = d * w, m[g] = s * y, m.willChange = c + ', ' + g;
          }
          var E = {
            "x-placement": e.placement
          };
          return e.attributes = le({}, E, e.attributes), e.styles = le({}, m, e.styles), e.arrowStyles = le({}, e.offsets.arrow, e.arrowStyles), e;
        },
        gpuAcceleration: !0,
        x: 'bottom',
        y: 'right'
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function fn(e) {
          return V(e.instance.popper, e.styles), j(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && V(e.arrowElement, e.arrowStyles), e;
        },
        onLoad: function onLoad(e, t, o, n, i) {
          var r = L(i, t, e, o.positionFixed),
              p = O(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
          return t.setAttribute('x-placement', p), V(t, {
            position: o.positionFixed ? 'fixed' : 'absolute'
          }), o;
        },
        gpuAcceleration: void 0
      }
    }
  }, ge;
});
//# sourceMappingURL=all.js.map
