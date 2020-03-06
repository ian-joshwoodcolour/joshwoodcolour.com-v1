/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/editorial.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/components/related-content.js":
/*!**********************************************!*\
  !*** ./src/js/components/related-content.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar els = {}; /**\n               * @prettier\n               * \n               */\n\n\nvar showContainer = function showContainer($container) {\n    if ($container) {\n        $container.classList.remove('u-hide');\n    }\n};\n\nvar checkForContent = function checkForContent() {\n    if (els.$articlesContainer && els.$articles && els.$articles.length > 0) {\n        [].concat(_toConsumableArray(els.$articlesContainer)).map(showContainer);\n    }\n\n    if (els.$productsContainer && els.$products && els.$products.length > 0) {\n        [].concat(_toConsumableArray(els.$productsContainer)).map(showContainer);\n    }\n};\n\nvar cache = function cache() {\n    els.$articles = document.querySelectorAll('.js-related-article');\n    els.$articlesContainer = document.querySelectorAll('.js-related-articles');\n    els.$products = document.querySelectorAll('.js-related-product');\n    els.$productsContainer = document.querySelectorAll('.js-related-products');\n};\n\nvar init = function init() {\n    cache();\n    checkForContent();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ init: init });\n\n//# sourceURL=webpack:///./src/js/components/related-content.js?");

/***/ }),

/***/ "./src/js/components/responsive-video.js":
/*!***********************************************!*\
  !*** ./src/js/components/responsive-video.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar els = {}; /**\n               * @prettier\n               * \n               */\n\n\nvar wrap = function wrap($element) {\n    var $wrapper = document.createElement('div');\n\n    if ($element.parentNode) {\n        $element.parentNode.insertBefore($wrapper, $element);\n\n        $wrapper.classList.add('c-responsive-video');\n        $wrapper.appendChild($element);\n    }\n};\n\nvar addWrappers = function addWrappers() {\n    if (els.$iframes) {\n        [].concat(_toConsumableArray(els.$iframes)).map(wrap);\n    }\n};\n\nvar cache = function cache() {\n    els.$iframes = document.querySelectorAll('.js-iframe-container iframe');\n};\n\nvar init = function init() {\n    cache();\n    addWrappers();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ init: init });\n\n//# sourceURL=webpack:///./src/js/components/responsive-video.js?");

/***/ }),

/***/ "./src/js/editorial.js":
/*!*****************************!*\
  !*** ./src/js/editorial.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_related_content__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/related-content */ \"./src/js/components/related-content.js\");\n/* harmony import */ var _components_responsive_video__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/responsive-video */ \"./src/js/components/responsive-video.js\");\n/**\n * @prettier\n * \n */\n\n\n\nvar init = function init() {\n    _components_related_content__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\n    _components_responsive_video__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\n};\n\nif (window.isModernBrowser) {\n    window.addEventListener('load', init);\n}\n\n//# sourceURL=webpack:///./src/js/editorial.js?");

/***/ })

/******/ });