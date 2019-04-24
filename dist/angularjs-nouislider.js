(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("nouislider"));
	else if(typeof define === 'function' && define.amd)
		define("angularjs-nouislider", ["angular", "nouislider"], factory);
	else if(typeof exports === 'object')
		exports["angularjs-nouislider"] = factory(require("angular"), require("nouislider"));
	else
		root["angularjs-nouislider"] = factory(root["angular"], root["noUiSlider"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_angular__, __WEBPACK_EXTERNAL_MODULE_nouislider__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/directive.js":
/*!**************************!*\
  !*** ./src/directive.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nouislider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nouislider */ "nouislider");
/* harmony import */ var nouislider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nouislider__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module */ "./src/module.js");



_module__WEBPACK_IMPORTED_MODULE_2__["module"].directive('noUiSlider', ["$timeout", "$q", "$log", function ($timeout, $q, $log) {
  return {
    restrict: 'AE',
    require: '?ngModel',
    scope: {
      created: '&?sliderCreated',
      options: '=?sliderOptions'
    },
    link: function link(scope, element, attrs, ngModel) {
      var htmlElement = element[0];
      var options = angular__WEBPACK_IMPORTED_MODULE_0___default.a.copy(scope.options);
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
          if (!angular__WEBPACK_IMPORTED_MODULE_0___default.a.isFunction(newCallback)) {
            return;
          }

          newCallback({
            api: api
          });
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
          if (angular__WEBPACK_IMPORTED_MODULE_0___default.a.equals(newOptions, oldOptions)) {
            return;
          }

          options = angular__WEBPACK_IMPORTED_MODULE_0___default.a.copy(scope.options);
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
            if (!(angular__WEBPACK_IMPORTED_MODULE_0___default.a.isArray(ngModel.$modelValue) || angular__WEBPACK_IMPORTED_MODULE_0___default.a.isNumber(ngModel.$modelValue))) {
              throw new Error("Value provided in ngModel is not a valid noUislider start position. Expected a Number or an Array of Numbers, found: ".concat(ngModel.$modelValue));
            }

            resolve(ngModel.$modelValue);
          });
        });
      }
      /**
       * Creates a noUiSlider instance.
       */


      function createInstance() {
        var api = extendApi(nouislider__WEBPACK_IMPORTED_MODULE_1___default.a.create(htmlElement, options));
        setCreatedWatcher(api);
        setOptionsWatcher(api);

        if (ngModel !== null) {
          bindNgModelControls(api);
        }
      } // Wait for ngModel to be initialized


      initializeNgModel().then(function ($modelValue) {
        if ($modelValue !== null) {
          // If ngModel is being used, (over)write the start option for the noUiSlider options
          options.start = $modelValue;
        } // Create a noUiSlider instance


        createInstance();
      })["catch"]($log.error);
    }
  };
}]);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module */ "./src/module.js");
/* harmony import */ var _directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./directive */ "./src/directive.js");


/* harmony default export */ __webpack_exports__["default"] = (_module__WEBPACK_IMPORTED_MODULE_0__["moduleName"]);

/***/ }),

/***/ "./src/module.js":
/*!***********************!*\
  !*** ./src/module.js ***!
  \***********************/
/*! exports provided: moduleName, module */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moduleName", function() { return moduleName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "module", function() { return module; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);

var moduleName = 'noUiSlider';
var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(moduleName, []);

/***/ }),

/***/ "angular":
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_angular__;

/***/ }),

/***/ "nouislider":
/*!**********************************************************************************************************!*\
  !*** external {"commonjs":"nouislider","commonjs2":"nouislider","amd":"nouislider","root":"noUiSlider"} ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_nouislider__;

/***/ })

/******/ });
});
//# sourceMappingURL=angularjs-nouislider.js.map