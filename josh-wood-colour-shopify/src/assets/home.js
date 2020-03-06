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
/******/ 		"home": 0
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
/******/ 	deferredModules.push(["./src/js/home.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/components/advice-teaser.js":
/*!********************************************!*\
  !*** ./src/js/components/advice-teaser.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flickity */ \"./node_modules/flickity/js/index.js\");\n/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flickity__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\");\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash_nth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/nth */ \"./node_modules/lodash/nth.js\");\n/* harmony import */ var lodash_nth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_nth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _services_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/helpers */ \"./src/js/services/helpers.js\");\n/**\n * @prettier\n * \n */\n\n\n\n\n\nvar els = {};\n\nvar CAROUSEL_OPTIONS = {\n    cellSelector: '.js-advice-carousel-item',\n    draggable: false,\n    friction: 1,\n    pageDots: false,\n    prevNextButtons: false,\n    selectedAttraction: 0.1,\n    wrapAround: true\n};\nvar adviceContent = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(window, 'globalData.adviceContent');\n\nvar flickity = void 0;\n\nvar setNavigationState = function setNavigationState() {\n    var $carouselNextButton = els.$carouselNextButton,\n        $carouselPrevButton = els.$carouselPrevButton;\n\n\n    if ($carouselNextButton && $carouselPrevButton) {\n        $carouselNextButton.classList.toggle('is-disabled', flickity.selectedIndex === flickity.slides.length - 1);\n        $carouselPrevButton.classList.toggle('is-disabled', flickity.selectedIndex === 0);\n    }\n};\n\nvar setAdviceContent = function setAdviceContent(_ref) {\n    var title = _ref.title,\n        url = _ref.url;\n\n    if (els.$title && els.$cta) {\n        els.$title.innerHTML = title;\n        els.$cta.href = url;\n    }\n};\n\nvar setRecommendedProduct = function setRecommendedProduct(_ref2) {\n    var image = _ref2.image,\n        price = _ref2.price,\n        title = _ref2.title,\n        url = _ref2.url;\n    var $productPrice = els.$productPrice,\n        $productTitle = els.$productTitle,\n        $product = els.$product;\n\n\n    if ($productPrice && $productTitle && $product) {\n        if (title && price && url) {\n            $productPrice.innerText = price;\n            $productTitle.innerText = title;\n            $product.href = url;\n            $product.style.display = 'block';\n        } else {\n            $product.style.display = 'none';\n        }\n    }\n};\n\nvar setIframeSource = function setIframeSource($element) {\n    $element.src = $element.dataset.src;\n};\n\nvar handleNewSlideSelect = function handleNewSlideSelect() {\n    if (flickity) {\n        var newContent = lodash_nth__WEBPACK_IMPORTED_MODULE_2___default()(adviceContent, flickity.selectedIndex);\n\n        if (newContent) {\n            setAdviceContent(newContent);\n            setRecommendedProduct(newContent.product);\n        }\n\n        var $iframe = flickity.selectedElement.querySelector('iframe');\n\n        if ($iframe && !$iframe.src) {\n            setIframeSource($iframe);\n        }\n    }\n};\n\nvar handleCarouselNavClick = function handleCarouselNavClick(event) {\n    if (event.target) {\n        event.preventDefault();\n\n        var $target = Object(_services_helpers__WEBPACK_IMPORTED_MODULE_3__[\"intendedTargetElement\"])('js-advice-carousel-nav', event.target);\n\n        var direction = $target.classList.contains('js-advice-carousel-nav-next') ? 'next' : 'previous';\n\n        if (flickity) {\n            if (direction === 'next') {\n                flickity.next();\n            } else {\n                flickity.previous();\n            }\n\n            setNavigationState();\n        }\n    }\n};\n\nvar setup = function setup() {\n    var $carousel = els.$carousel;\n\n\n    if ($carousel) {\n        flickity = new flickity__WEBPACK_IMPORTED_MODULE_0___default.a($carousel, CAROUSEL_OPTIONS);\n\n        flickity.resize();\n        flickity.on('select', handleNewSlideSelect);\n\n        $carousel.classList.remove('c-advice-teaser__carousel--loading');\n\n        var $iframe = $carousel.querySelector('iframe');\n\n        if ($iframe) {\n            setTimeout(function () {\n                return setIframeSource($iframe);\n            }, 1000);\n        }\n    }\n};\n\nvar events = function events() {\n    if (els.$carouselNextButton) {\n        els.$carouselNextButton.addEventListener('click', handleCarouselNavClick);\n    }\n\n    if (els.$carouselPrevButton) {\n        els.$carouselPrevButton.addEventListener('click', handleCarouselNavClick);\n    }\n};\n\nvar cache = function cache() {\n    els.$carousel = document.querySelector('.js-advice-carousel');\n    els.$carouselNextButton = document.querySelector('.js-advice-carousel-nav-next');\n    els.$carouselPrevButton = document.querySelector('.js-advice-carousel-nav-prev');\n    els.$cta = document.querySelector('.js-advice-cta');\n    els.$productPrice = document.querySelector('.js-advice-product-price');\n    els.$productTitle = document.querySelector('.js-advice-product-title');\n    els.$product = document.querySelector('.js-advice-product');\n    els.$title = document.querySelector('.js-advice-title');\n};\n\nvar init = function init() {\n    cache();\n    events();\n    setup();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ init: init });\n\n//# sourceURL=webpack:///./src/js/components/advice-teaser.js?");

/***/ }),

/***/ "./src/js/components/equal-heights.js":
/*!********************************************!*\
  !*** ./src/js/components/equal-heights.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar els = {}; /**\n               * @prettier\n               * \n               */\n\n\nvar getPanelHeights = function getPanelHeights() {\n    if (els.$items) {\n        var heights = [].concat(_toConsumableArray(els.$items)).map(function ($panel) {\n            var isActive = $panel.classList.contains('is-active');\n\n            if (!isActive) {\n                $panel.style.visibility = 'hidden';\n                $panel.style.display = 'block';\n            }\n\n            var height = $panel.getBoundingClientRect().height;\n\n            if (!isActive) {\n                $panel.style.display = 'none';\n                $panel.style.visibility = 'visible';\n            }\n\n            return height;\n        });\n\n        return heights;\n    }\n};\n\nvar setEqualPanelHeights = function setEqualPanelHeights(height) {\n    if (els.$items && els.$itemsContainer) {\n        [].concat(_toConsumableArray(els.$items), [els.$itemsContainer]).map(function ($element) {\n            return $element.style.height = height + 'px';\n        });\n    }\n};\n\nvar equalise = function equalise() {\n    var heights = getPanelHeights();\n\n    if (heights) {\n        var sortedHeights = heights.sort(function (a, b) {\n            return a - b;\n        }).reverse();\n        var tallest = sortedHeights[0];\n\n        setEqualPanelHeights(tallest);\n    }\n};\n\nvar cache = function cache() {\n    els.$items = document.querySelectorAll('.js-equal-height');\n    els.$itemsContainer = document.querySelector('.js-equal-height-container');\n};\n\nvar init = function init() {\n    cache();\n    equalise();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ init: init });\n\n//# sourceURL=webpack:///./src/js/components/equal-heights.js?");

/***/ }),

/***/ "./src/js/components/tab-list.js":
/*!***************************************!*\
  !*** ./src/js/components/tab-list.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var animejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! animejs */ \"./node_modules/animejs/anime.min.js\");\n/* harmony import */ var animejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(animejs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_eq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/eq */ \"./node_modules/lodash/eq.js\");\n/* harmony import */ var lodash_eq__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_eq__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/find */ \"./node_modules/lodash/find.js\");\n/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/findIndex */ \"./node_modules/lodash/findIndex.js\");\n/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_findIndex__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var lodash_nth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/nth */ \"./node_modules/lodash/nth.js\");\n/* harmony import */ var lodash_nth__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_nth__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ \"./src/js/config.js\");\n/* harmony import */ var _services_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/helpers */ \"./src/js/services/helpers.js\");\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @prettier\n * \n */\n\n\n\n\n\n\n\n\nvar els = {};\nvar activeTabIndex = -1;\nvar tabInterval = void 0;\nvar isTabbingAutomatically = true;\n\nvar trackTabDisplay = function trackTabDisplay(tabComponent, tabId) {\n    if (window.ga) {\n        var label = tabComponent + ' | ' + tabId;\n\n        window.ga('send', 'event', {\n            eventCategory: 'Tab display',\n            eventAction: 'Clicked',\n            eventLabel: label,\n            nonInteraction: isTabbingAutomatically\n        });\n    }\n};\n\nvar setIntervalChange = function setIntervalChange() {\n    if (els.$container) {\n        var timeout = parseInt(els.$container.dataset.timeout);\n\n        if (timeout) {\n            tabInterval = setInterval(setNextTabActive, timeout);\n        }\n    }\n};\n\nvar disableIntervalChange = function disableIntervalChange() {\n    if (tabInterval) {\n        clearInterval(tabInterval);\n        tabInterval = null;\n    }\n};\n\nvar setPanelInvisible = function setPanelInvisible(index) {\n    if (els.$panels) {\n        var $panel = lodash_nth__WEBPACK_IMPORTED_MODULE_4___default()([].concat(_toConsumableArray(els.$panels)), index);\n\n        if ($panel) {\n            $panel.style.display = 'none';\n        }\n    }\n};\n\nvar setPanelVisible = function setPanelVisible(index) {\n    if (els.$panels) {\n        var $panel = lodash_nth__WEBPACK_IMPORTED_MODULE_4___default()([].concat(_toConsumableArray(els.$panels)), index);\n\n        if ($panel) {\n            animejs__WEBPACK_IMPORTED_MODULE_0___default()({\n                begin: function begin() {\n                    $panel.style.opacity = '0';\n                    $panel.style.display = 'block';\n                },\n\n                duration: _config__WEBPACK_IMPORTED_MODULE_5__[\"ANIMATION_DURATION\"] * 2,\n                easing: _config__WEBPACK_IMPORTED_MODULE_5__[\"ANIMATION_EASING\"],\n                opacity: [0, 1],\n                targets: $panel,\n                translateY: [_config__WEBPACK_IMPORTED_MODULE_5__[\"SPACING\"], 0]\n            });\n\n            trackTabDisplay($panel.id, $panel.dataset.component);\n        }\n    }\n};\n\nvar setButtonState = function setButtonState(index, selected) {\n    if (els.$tabButtons) {\n        var $button = lodash_nth__WEBPACK_IMPORTED_MODULE_4___default()([].concat(_toConsumableArray(els.$tabButtons)), index);\n\n        if ($button) {\n            $button.classList.toggle('c-quote-tabs__tab--active', selected);\n            $button.classList.toggle('is-active', selected);\n            $button.setAttribute('aria-selected', selected.toString());\n        }\n    }\n};\n\nvar getTabIndex = function getTabIndex(selector) {\n    return els.$tabButtons ? lodash_findIndex__WEBPACK_IMPORTED_MODULE_3___default()([].concat(_toConsumableArray(els.$tabButtons)), function ($button) {\n        return lodash_eq__WEBPACK_IMPORTED_MODULE_1___default()($button.id, selector + '-tab');\n    }) : -1;\n};\n\nvar changeActiveTab = function changeActiveTab(index) {\n    if (activeTabIndex >= 0) {\n        setPanelInvisible(activeTabIndex);\n        setButtonState(activeTabIndex, false);\n    }\n\n    setPanelVisible(index);\n    setButtonState(index, true);\n\n    activeTabIndex = index;\n};\n\nvar handleTabClick = function handleTabClick(event) {\n    if (event.target) {\n        event.preventDefault();\n\n        var $target = Object(_services_helpers__WEBPACK_IMPORTED_MODULE_6__[\"intendedTargetElement\"])('js-tab', event.target);\n\n        if ($target) {\n            var tabIsSelected = $target.getAttribute('aria-selected');\n            var targetSelector = $target.getAttribute('aria-controls');\n\n            if (lodash_eq__WEBPACK_IMPORTED_MODULE_1___default()(tabIsSelected, 'false') && targetSelector) {\n                var targetIndex = getTabIndex(targetSelector);\n\n                if (targetIndex >= 0) {\n                    isTabbingAutomatically = false;\n\n                    changeActiveTab(targetIndex);\n                    disableIntervalChange();\n                }\n            }\n        }\n    }\n};\n\nvar setActiveTabIndex = function setActiveTabIndex() {\n    if (els.$tabButtons) {\n        activeTabIndex = lodash_findIndex__WEBPACK_IMPORTED_MODULE_3___default()([].concat(_toConsumableArray(els.$tabButtons)), function ($button) {\n            return lodash_eq__WEBPACK_IMPORTED_MODULE_1___default()($button.getAttribute('aria-selected'), 'true');\n        });\n    }\n};\n\nvar isTabVisible = function isTabVisible($element) {\n    var dimensions = $element.getBoundingClientRect();\n\n    return dimensions.width > 0 && dimensions.height > 0;\n};\n\nvar getNextTabIndex = function getNextTabIndex() {\n    var skipCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;\n\n    var nextTabIndex = -1;\n\n    if (els.$tabButtons && activeTabIndex >= 0) {\n        nextTabIndex = activeTabIndex + skipCount < [].concat(_toConsumableArray(els.$tabButtons)).length ? activeTabIndex + skipCount : 0;\n\n        var isVisible = isTabVisible(els.$tabButtons[nextTabIndex]);\n\n        if (!isVisible) {\n            return getNextTabIndex(skipCount + 1);\n        }\n    }\n\n    return nextTabIndex;\n};\n\nvar setNextTabActive = function setNextTabActive() {\n    var nextTabIndex = getNextTabIndex();\n\n    if (nextTabIndex >= 0) {\n        changeActiveTab(nextTabIndex);\n    }\n};\n\nvar cache = function cache() {\n    els.$container = document.querySelector('.js-tabs-container');\n    els.$panels = document.querySelectorAll('.js-panel');\n    els.$tabButtons = document.querySelectorAll('.js-tab');\n};\n\nvar events = function events() {\n    if (els.$panels && els.$tabButtons) {\n        [].concat(_toConsumableArray(els.$tabButtons)).map(function ($button) {\n            return $button.addEventListener('click', handleTabClick, false);\n        });\n    }\n};\n\nvar init = function init() {\n    cache();\n    events();\n    setActiveTabIndex();\n    setIntervalChange();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ init: init });\n\n//# sourceURL=webpack:///./src/js/components/tab-list.js?");

/***/ }),

/***/ "./src/js/config.js":
/*!**************************!*\
  !*** ./src/js/config.js ***!
  \**************************/
/*! exports provided: SPACING, SPACING_SMALL, SPACING_TINY, CHAT_BUBBLE_SPRING, CHAT_BUBBLE_SLOW_SPRING, ANIMATION_DURATION, ANIMATION_EASING, ANIMATION_ELASTICITY, API_URL, CONSULTATION_LANDING_URL, CONSULTATION_RESULTS_URL, CONSULTATION_STORAGE_KEY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SPACING\", function() { return SPACING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SPACING_SMALL\", function() { return SPACING_SMALL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SPACING_TINY\", function() { return SPACING_TINY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CHAT_BUBBLE_SPRING\", function() { return CHAT_BUBBLE_SPRING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CHAT_BUBBLE_SLOW_SPRING\", function() { return CHAT_BUBBLE_SLOW_SPRING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ANIMATION_DURATION\", function() { return ANIMATION_DURATION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ANIMATION_EASING\", function() { return ANIMATION_EASING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ANIMATION_ELASTICITY\", function() { return ANIMATION_ELASTICITY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"API_URL\", function() { return API_URL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CONSULTATION_LANDING_URL\", function() { return CONSULTATION_LANDING_URL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CONSULTATION_RESULTS_URL\", function() { return CONSULTATION_RESULTS_URL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CONSULTATION_STORAGE_KEY\", function() { return CONSULTATION_STORAGE_KEY; });\n/**\n * @prettier\n * \n */\nvar SPACING = 24;\nvar SPACING_SMALL = 12;\nvar SPACING_TINY = 8;\n\nvar CHAT_BUBBLE_SPRING = {\n    damping: 17,\n    stiffness: 140\n};\nvar CHAT_BUBBLE_SLOW_SPRING = {\n    damping: 18,\n    stiffness: 90\n};\n\nvar ANIMATION_DURATION = 600;\nvar ANIMATION_EASING = 'easeOutExpo';\nvar ANIMATION_ELASTICITY = ANIMATION_DURATION / 3;\n\nvar API_URL = 'https://api.joshwoodcolour.com/';\n\nvar CONSULTATION_LANDING_URL = '/pages/consultation';\nvar CONSULTATION_RESULTS_URL = '/pages/consultation-results';\nvar CONSULTATION_STORAGE_KEY = 'jwc-consultation-answers';\n\n//# sourceURL=webpack:///./src/js/config.js?");

/***/ }),

/***/ "./src/js/home.js":
/*!************************!*\
  !*** ./src/js/home.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_advice_teaser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/advice-teaser */ \"./src/js/components/advice-teaser.js\");\n/* harmony import */ var _components_equal_heights__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/equal-heights */ \"./src/js/components/equal-heights.js\");\n/* harmony import */ var _components_tab_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/tab-list */ \"./src/js/components/tab-list.js\");\n/**\n * @prettier\n * \n */\n\n\n\n\n\n\nvar init = function init() {\n    _components_advice_teaser__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init();\n    _components_equal_heights__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init();\n    _components_tab_list__WEBPACK_IMPORTED_MODULE_4__[\"default\"].init();\n};\n\nif (window.isModernBrowser) {\n    window.addEventListener('load', init);\n}\n\n//# sourceURL=webpack:///./src/js/home.js?");

/***/ }),

/***/ "./src/js/services/helpers.js":
/*!************************************!*\
  !*** ./src/js/services/helpers.js ***!
  \************************************/
/*! exports provided: intendedTargetElement, throttle, lerp, getPrice, preloadImages, triggerMouseEvent, handleFetchErrors, getFetchParams, getShadeFromProductName, formatFormDataToJSON, formatFormDataToParams, isIE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"intendedTargetElement\", function() { return intendedTargetElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"throttle\", function() { return throttle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lerp\", function() { return lerp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPrice\", function() { return getPrice; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"preloadImages\", function() { return preloadImages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"triggerMouseEvent\", function() { return triggerMouseEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleFetchErrors\", function() { return handleFetchErrors; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getFetchParams\", function() { return getFetchParams; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getShadeFromProductName\", function() { return getShadeFromProductName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatFormDataToJSON\", function() { return formatFormDataToJSON; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatFormDataToParams\", function() { return formatFormDataToParams; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isIE\", function() { return isIE; });\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\");\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_round__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/round */ \"./node_modules/lodash/round.js\");\n/* harmony import */ var lodash_round__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_round__WEBPACK_IMPORTED_MODULE_1__);\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _this = undefined;\n\n/**\n * @prettier\n * @/flow\n */\n\n\n\n(function (window) {\n    if (typeof Event !== 'undefined') {\n        try {\n            new _MouseEvent('test');\n\n            return false;\n        } catch (e) {}\n\n        var _MouseEvent = function _MouseEvent(eventType) {\n            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { bubbles: false, cancelable: false };\n\n            var mouseEvent = document.createEvent('MouseEvent');\n\n            mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);\n\n            return mouseEvent;\n        };\n\n        _MouseEvent.prototype = Event.prototype;\n\n        window.MouseEvent = _MouseEvent;\n    }\n})(window);\n\n/**\n * Still figuring out Flow types - will come back to this!\n * - For recursive functions, how do we define return types for a specific value or the function?\n * - How can HTMLElement types reference their 'possibly null' parentNode values?\n */\nvar intendedTargetElement = function intendedTargetElement(selector, element) {\n    if (element && !element.classList.contains(selector)) {\n        if (element.parentNode) {\n            return intendedTargetElement(selector, element.parentNode);\n        }\n    }\n\n    return element;\n};\n\nvar throttle = function throttle(func) {\n    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;\n\n    var timer = null;\n\n    return function () {\n        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n            args[_key] = arguments[_key];\n        }\n\n        if (timer === null) {\n            timer = setTimeout(function () {\n                func.apply(_this, args);\n                timer = null;\n            }, wait);\n        }\n    };\n};\n\nvar lerp = function lerp(a, b) {\n    var f = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.1;\n    return (1 - f) * a + f * b;\n};\n\nvar getPrice = function getPrice(value) {\n    var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '£';\n    var roundBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;\n\n    return '' + currency + lodash_round__WEBPACK_IMPORTED_MODULE_1___default()(value / roundBy, 2);\n};\n\nvar preloadImages = function preloadImages() {\n    var images = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n\n    images.map(function (imageURL) {\n        if ((typeof Image === 'undefined' ? 'undefined' : _typeof(Image)) !== undefined) {\n            var image = new Image();\n\n            image.src = imageURL;\n        }\n    });\n};\n\nvar triggerMouseEvent = function triggerMouseEvent($element) {\n    var eventType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';\n\n    var event = new MouseEvent(eventType, {\n        bubbles: true,\n        cancelable: true,\n        view: window\n    });\n\n    var canceled = !$element.dispatchEvent(event);\n};\n\nvar handleFetchErrors = function handleFetchErrors(response) {\n    if (!response.ok) {\n        throw Error(response.statusText);\n    }\n    return response;\n};\n\nvar getFetchParams = function getFetchParams(data) {\n    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';\n\n    var params = {\n        credentials: 'same-origin',\n        headers: { Accept: 'application/json', 'content-type': 'application/json' },\n        method: method\n    };\n\n    if (data) {\n        params = _extends({}, params, {\n            method: 'post',\n            body: JSON.stringify(data)\n        });\n    }\n\n    return params;\n};\n\nvar getShadeFromProductName = function getShadeFromProductName() {\n    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n    var matches = title.match(/[\\d\\.]+/g);\n\n    if (matches) {\n        var match = matches.join('');\n\n        return match;\n    }\n\n    return '';\n};\n\nvar formatFormDataToJSON = function formatFormDataToJSON($form) {\n    var formData = new FormData($form);\n    var formattedData = {};\n\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n        for (var _iterator = formData.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n            var pair = _step.value;\n\n            formattedData[pair[0]] = pair[1];\n        }\n    } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n    } finally {\n        try {\n            if (!_iteratorNormalCompletion && _iterator.return) {\n                _iterator.return();\n            }\n        } finally {\n            if (_didIteratorError) {\n                throw _iteratorError;\n            }\n        }\n    }\n\n    return JSON.stringify(formattedData);\n};\n\nvar formatFormDataToParams = function formatFormDataToParams($form) {\n    var formData = new FormData($form);\n    var formattedData = [];\n\n    var _iteratorNormalCompletion2 = true;\n    var _didIteratorError2 = false;\n    var _iteratorError2 = undefined;\n\n    try {\n        for (var _iterator2 = formData.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n            var pair = _step2.value;\n\n            formattedData.push(pair[0] + '=' + pair[1]);\n        }\n    } catch (err) {\n        _didIteratorError2 = true;\n        _iteratorError2 = err;\n    } finally {\n        try {\n            if (!_iteratorNormalCompletion2 && _iterator2.return) {\n                _iterator2.return();\n            }\n        } finally {\n            if (_didIteratorError2) {\n                throw _iteratorError2;\n            }\n        }\n    }\n\n    return formattedData.join('&');\n};\n\nvar isIE = function isIE() {\n    if (typeof navigator !== 'undefined') {\n        var userAgent = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(navigator, 'userAgent', '').includes('MSIE');\n        var appVersion = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(navigator, 'appVersion', '').includes('Trident/');\n\n        return userAgent || appVersion;\n    }\n};\n\n//# sourceURL=webpack:///./src/js/services/helpers.js?");

/***/ })

/******/ });