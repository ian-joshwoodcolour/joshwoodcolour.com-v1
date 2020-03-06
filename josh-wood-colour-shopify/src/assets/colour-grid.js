/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"colour-grid": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/colour-grid.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/colour-grid.js":
/*!*******************************!*\
  !*** ./src/js/colour-grid.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/preact-compat/dist/preact-compat.es.js\");\n/* harmony import */ var _components_react_ColourGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/react/ColourGrid */ \"./src/js/components/react/ColourGrid.js\");\n/**\n * @prettier\n */\n\n\n\n\nvar init = function init() {\n    var view = window.globalData.view;\n\n    if (view === 'consultation-tool-intro') {\n        Object(react__WEBPACK_IMPORTED_MODULE_0__[\"render\"])(react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(_components_react_ColourGrid__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), document.querySelector('#colour-grid'));\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ init: init });\n\n//# sourceURL=webpack:///./src/js/colour-grid.js?");

/***/ }),

/***/ "./src/js/components/colour-grid-conf.js":
/*!***********************************************!*\
  !*** ./src/js/components/colour-grid-conf.js ***!
  \***********************************************/
/*! exports provided: colourGridConf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colourGridConf\", function() { return colourGridConf; });\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\");\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);\n/**\n * @prettier\n * \n */\n\n\n\nvar colourGridConf = [{\n    tooltipText: 'Shade 2',\n    imageUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, 'globalData.colourGridImages.2-0', 'http://placehold.it/170x170/1f140b')\n}, {\n    tooltipText: 'Shade 3',\n    imageUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, 'globalData.colourGridImages.3-0', 'http://placehold.it/170x170/1f140b')\n}, {\n    tooltipText: 'Shade 4',\n    imageUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, 'globalData.colourGridImages.4-0', 'http://placehold.it/170x170/1f140b')\n}, {\n    tooltipText: 'Shade 5',\n    imageUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, 'globalData.colourGridImages.5-0', 'http://placehold.it/170x170/1f140b')\n}, {\n    tooltipText: 'Shade 5.5',\n    imageUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, 'globalData.colourGridImages.5-5', 'http://placehold.it/170x170/1f140b')\n}, {\n    tooltipText: 'Shade 6',\n    imageUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, 'globalData.colourGridImages.6-0', 'http://placehold.it/170x170/1f140b')\n}, {\n    tooltipText: 'Shade 6.5',\n    imageUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, 'globalData.colourGridImages.6-5', 'http://placehold.it/170x170/1f140b')\n}, {\n    tooltipText: 'Shade 7',\n    imageUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, 'globalData.colourGridImages.7-0', 'http://placehold.it/170x170/1f140b')\n}, {\n    tooltipText: 'Shade 7.5',\n    imageUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, 'globalData.colourGridImages.7-5', 'http://placehold.it/170x170/1f140b')\n}, {\n    tooltipText: 'Shade 8',\n    imageUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, 'globalData.colourGridImages.8-0', 'http://placehold.it/170x170/1f140b')\n}, {\n    tooltipText: 'Shade 8.5',\n    imageUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, 'globalData.colourGridImages.8-5', 'http://placehold.it/170x170/1f140b')\n}, {\n    tooltipText: 'Shade 9',\n    imageUrl: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(window, 'globalData.colourGridImages.9-0', 'http://placehold.it/170x170/1f140b')\n}];\n\n//# sourceURL=webpack:///./src/js/components/colour-grid-conf.js?");

/***/ }),

/***/ "./src/js/components/react/ColourGrid.js":
/*!***********************************************!*\
  !*** ./src/js/components/react/ColourGrid.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/preact-compat/dist/preact-compat.es.js\");\n/* harmony import */ var react_masonry_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-masonry-component */ \"./node_modules/react-masonry-component/lib/index.js\");\n/* harmony import */ var react_masonry_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_masonry_component__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-tooltip */ \"./node_modules/react-tooltip/dist/index.js\");\n/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_tooltip__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _colour_grid_conf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../colour-grid-conf */ \"./src/js/components/colour-grid-conf.js\");\n/**\n * @prettier\n */\n\n\n\n\n\n\nvar ColourGrid = function ColourGrid() {\n    return react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\n        'div',\n        null,\n        react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\n            react_masonry_component__WEBPACK_IMPORTED_MODULE_1___default.a,\n            { onLayoutComplete: function onLayoutComplete() {\n                    return react_tooltip__WEBPACK_IMPORTED_MODULE_2___default.a.rebuild();\n                } },\n            _colour_grid_conf__WEBPACK_IMPORTED_MODULE_3__[\"colourGridConf\"].map(function (image, i) {\n                return react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\n                    'div',\n                    { className: 'u-4/12@mobile u-6/12', 'data-tip': image.tooltipText },\n                    react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement('img', { className: 'u-1/1', src: image.imageUrl })\n                );\n            })\n        ),\n        react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(react_tooltip__WEBPACK_IMPORTED_MODULE_2___default.a, { place: 'top', type: 'dark', effect: 'float' })\n    );\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ColourGrid);\n\n//# sourceURL=webpack:///./src/js/components/react/ColourGrid.js?");

/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** readable-stream (ignored) ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///readable-stream_(ignored)?");

/***/ })

/******/ });