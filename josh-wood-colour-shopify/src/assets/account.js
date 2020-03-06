/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1]
/******/ 		var executeModules = data[2];
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
/******/ 			var fullfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fullfilled = false;
/******/ 			}
/******/ 			if(fullfilled) {
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
/******/ 	var installedChunks = {
/******/ 		"account": 0
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/account.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/account.js":
/*!***************************!*\
  !*** ./src/js/account.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/account */ \"./src/js/components/account.js\");\n/**\n * @prettier\n */\n\n\nvar init = function init() {\n    _components_account__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\n};\n\nif (window.isModernBrowser) {\n    window.addEventListener('load', init);\n}\n\n//# sourceURL=webpack:///./src/js/account.js?");

/***/ }),

/***/ "./src/js/components/account.js":
/*!**************************************!*\
  !*** ./src/js/components/account.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var animejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! animejs */ \"./node_modules/animejs/anime.min.js\");\n/* harmony import */ var animejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(animejs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ \"./src/js/config.js\");\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @prettier\n * \n */\n\n\n\nvar els = {\n    one: 2,\n    two: 4,\n    three: 6,\n    five: 'foobarbazfoobarbaz'\n};\n\nvar ACCOUNT_DELETE_POST_URL = '/account/addresses/';\n\nvar handlePostError = function handlePostError(error) {\n    return alert(error);\n};\n\nvar handlePostSuccess = function handlePostSuccess(response, addressId) {\n    var $form = document.querySelector('.js-address-container[data-address-id=\"' + addressId + '\"]');\n\n    if ($form) {\n        animejs__WEBPACK_IMPORTED_MODULE_0___default()({\n            begin: function begin() {\n                $form.style.overflow = 'hidden';\n            },\n            complete: function complete() {\n                $form.remove();\n            },\n\n            duration: _config__WEBPACK_IMPORTED_MODULE_1__[\"ANIMATION_DURATION\"],\n            easing: 'easeOutExpo',\n            height: 0,\n            opacity: [1, 0],\n            targets: $form\n        });\n    }\n};\n\nvar deleteAddress = function deleteAddress(addressId) {\n    var url = '' + ACCOUNT_DELETE_POST_URL + addressId;\n    var params = {\n        body: '_method=delete',\n        credentials: 'same-origin',\n        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },\n        method: 'post'\n    };\n\n    fetch(url, params).then(function (r) {\n        return handlePostSuccess(r, addressId);\n    }, handlePostError).catch(handlePostError);\n};\n\nvar handleDeleteClick = function handleDeleteClick(event) {\n    if (confirm('Are you sure you want to delete this address?')) {\n        var $target = event.target;\n\n        deleteAddress($target.dataset.addressId);\n    }\n};\n\nvar events = function events() {\n    if (els.$deleteButtons) {\n        [].concat(_toConsumableArray(els.$deleteButtons)).map(function ($button) {\n            return $button.addEventListener('click', handleDeleteClick);\n        });\n    }\n};\n\nvar cache = function cache() {\n    els.$deleteButtons = document.querySelectorAll('.js-delete-address');\n};\n\nvar init = function init() {\n    cache();\n    events();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ init: init });\n\n//# sourceURL=webpack:///./src/js/components/account.js?");

/***/ }),

/***/ "./src/js/config.js":
/*!**************************!*\
  !*** ./src/js/config.js ***!
  \**************************/
/*! exports provided: SPACING, SPACING_SMALL, SPACING_TINY, CHAT_BUBBLE_SPRING, CHAT_BUBBLE_SLOW_SPRING, ANIMATION_DURATION, ANIMATION_EASING, ANIMATION_ELASTICITY, API_URL, CONSULTATION_LANDING_URL, CONSULTATION_RESULTS_URL, CONSULTATION_STORAGE_KEY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SPACING\", function() { return SPACING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SPACING_SMALL\", function() { return SPACING_SMALL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SPACING_TINY\", function() { return SPACING_TINY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CHAT_BUBBLE_SPRING\", function() { return CHAT_BUBBLE_SPRING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CHAT_BUBBLE_SLOW_SPRING\", function() { return CHAT_BUBBLE_SLOW_SPRING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ANIMATION_DURATION\", function() { return ANIMATION_DURATION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ANIMATION_EASING\", function() { return ANIMATION_EASING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ANIMATION_ELASTICITY\", function() { return ANIMATION_ELASTICITY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"API_URL\", function() { return API_URL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CONSULTATION_LANDING_URL\", function() { return CONSULTATION_LANDING_URL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CONSULTATION_RESULTS_URL\", function() { return CONSULTATION_RESULTS_URL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CONSULTATION_STORAGE_KEY\", function() { return CONSULTATION_STORAGE_KEY; });\n/**\n * @prettier\n * \n */\nvar SPACING = 24;\nvar SPACING_SMALL = 12;\nvar SPACING_TINY = 8;\n\nvar CHAT_BUBBLE_SPRING = {\n    damping: 17,\n    stiffness: 140\n};\nvar CHAT_BUBBLE_SLOW_SPRING = {\n    damping: 18,\n    stiffness: 90\n};\n\nvar ANIMATION_DURATION = 600;\nvar ANIMATION_EASING = 'easeOutExpo';\nvar ANIMATION_ELASTICITY = ANIMATION_DURATION / 3;\n\nvar API_URL = 'https://api.joshwoodcolour.com/';\n\nvar CONSULTATION_LANDING_URL = '/pages/consultation';\nvar CONSULTATION_RESULTS_URL = '/pages/consultation-results';\nvar CONSULTATION_STORAGE_KEY = 'jwc-consultation-answers';\n\n//# sourceURL=webpack:///./src/js/config.js?");

/***/ })

/******/ });