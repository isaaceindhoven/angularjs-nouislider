(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("nouislider"));
	else if(typeof define === 'function' && define.amd)
		define("angularjs-nouislider", ["angular", "nouislider"], factory);
	else if(typeof exports === 'object')
		exports["angularjs-nouislider"] = factory(require("angular"), require("nouislider"));
	else
		root["angularjs-nouislider"] = factory(root["angular"], root["noUiSlider"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.module = exports.moduleName = undefined;

var _angular = __webpack_require__(1);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleName = exports.moduleName = 'noUiSlider';
var _module = _angular2.default.module(moduleName, []);
exports.module = _module;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _module = __webpack_require__(0);

__webpack_require__(3);

exports.default = _module.moduleName;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(1);

var _angular2 = _interopRequireDefault(_angular);

var _nouislider = __webpack_require__(4);

var _nouislider2 = _interopRequireDefault(_nouislider);

var _module2 = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_module2.module.directive('noUiSlider', ['$timeout', '$q', '$log', function ($timeout, $q, $log) {
  return {
    restrict: 'AE',
    require: '?ngModel',
    scope: {
      created: '&?sliderCreated',
      options: '@sliderOptions'
    },
    link: function link(scope, element, attrs, ngModel) {
      var htmlElement = element[0];
      var options = _angular2.default.fromJson(scope.options);

      /**
       * Extends the API returned by noUiSlider with the `$on` function which wraps the `on` function
       * to use Angular.
       *
       * @param {Object} api The API instance returned by the `noUiSlider.create()` method
       * @return {Object} The API instance with the added `$on` function
       */
      function extendApi(api) {
        api.$on = function (eventName, callback) {
          var wrappedCallback = function wrappedCallback() {
            $timeout(function () {
              callback(api.get());
            });
          };

          api.on(eventName, wrappedCallback);

          return function () {
            api.off(eventName, wrappedCallback);
          };
        };

        return api;
      }

      /**
       * Creates a watcher that calls the function given by the `slider-created` directive attribute.
       * The watcher fires every time the `slider-created` function changes.
       *
       * @param {Object} api The API instance returned by the `noUiSlider.create()` method
       */
      function setCreatedWatcher(api) {
        scope.$watch('created', function (newCallback) {
          if (!_angular2.default.isFunction(newCallback)) {
            return;
          }

          newCallback({ api: api });
        });
      }

      /**
       * Creates a watcher that looks for changes in the `slider-options` directive attribute. When a
       * change is detected the options for the noUiSlider instance are updated. Note that only the
       * 'margin', 'limit', 'step', 'range', 'animate' and 'snap' options can be updated this way (as
       * documented in https://refreshless.com/nouislider/more/#section-update). All other option
       * updates require you to destroy the current instance and create a new one.
       *
       * @param {Object} api The API instance returned by the `noUiSlider.create()` method
       */
      function setOptionsWatcher(api) {
        scope.$watch('options', function (newOptions, oldOptions) {
          if (_angular2.default.equals(newOptions, oldOptions)) {
            return;
          }

          options = _angular2.default.fromJson(scope.options);

          api.updateOptions(options);
        });
      }

      /**
       * Add ngModel controls to the directive. This allows the use of ngModel to set and get the
       * value in the slider. It uses the noUiSlider API's get and set functions, so no custom
       * formatters need to be defined for ngModel. The ngModelOptions can be used.
       *
       * @param {Object} api The API instance returned by the `noUiSlider.create()` method
       */
      function bindNgModelControls(api) {
        ngModel.$render = function () {
          api.set(ngModel.$modelValue);
        };

        api.on('update', function () {
          var positions = api.get();
          ngModel.$setViewValue(positions);
        });
      }

      /**
       * A utility function that returns a promise which resolves when ngModel is correctly loaded,
       * using $timeout.
       *
       * @return {Promise} Returns a promise that resolves with `null` when ngModel is null and thus
       * not in use. If the value entered for ngModel is not an array or number, an error is thrown
       * and thus the promise rejects. If the value entered for ngModel is correct, the promise
       * resolves with this value.
       */
      function initializeNgModel() {
        if (ngModel === null) {
          return $q.resolve(null);
        }

        return $q(function (resolve) {
          $timeout(function () {
            if (!(_angular2.default.isArray(ngModel.$modelValue) || _angular2.default.isNumber(ngModel.$modelValue))) {
              throw new Error('Value provided in ngModel is not a valid noUislider start position. Expected a Number or an Array of Numbers, found: ' + ngModel.$modelValue);
            }

            resolve(ngModel.$modelValue);
          });
        });
      }

      /**
       * Creates a noUiSlider instance.
       */
      function createInstance() {
        var api = extendApi(_nouislider2.default.create(htmlElement, options));

        setCreatedWatcher(api);
        setOptionsWatcher(api);

        if (ngModel !== null) {
          bindNgModelControls(api);
        }
      }

      // Wait for ngModel to be initialized
      initializeNgModel().then(function ($modelValue) {
        if ($modelValue !== null) {
          // If ngModel is being used, (over)write the start option for the noUiSlider options
          options.start = $modelValue;
        }

        // Create a noUiSlider instance
        createInstance();
      }).catch($log.error);
    }
  };
}]);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=angularjs-nouislider.js.map