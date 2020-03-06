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
/******/ 		"experts": 0
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
/******/ 	deferredModules.push(["./src/js/experts.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/components/react/ExpertsCard.js":
/*!************************************************!*\
  !*** ./src/js/components/react/ExpertsCard.js ***!
  \************************************************/
/*! exports provided: ExpertsCard, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ExpertsCard\", function() { return ExpertsCard; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var scrollmonitor_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scrollmonitor-react */ \"./node_modules/scrollmonitor-react/dist/index.js\");\n/* harmony import */ var scrollmonitor_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(scrollmonitor_react__WEBPACK_IMPORTED_MODULE_1__);\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * @prettier\n * @/flow\n */\n\n\n\nvar ExpertsCard = function (_Component) {\n    _inherits(ExpertsCard, _Component);\n\n    function ExpertsCard(props) {\n        _classCallCheck(this, ExpertsCard);\n\n        return _possibleConstructorReturn(this, (ExpertsCard.__proto__ || Object.getPrototypeOf(ExpertsCard)).call(this, props));\n    }\n\n    _createClass(ExpertsCard, [{\n        key: 'componentWillReceiveProps',\n        value: function componentWillReceiveProps(nextProps) {\n            if (this.props.isInViewport === false && nextProps.isInViewport === true) {\n                this.props.stopWatcher();\n            }\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var _props = this.props,\n                data = _props.data,\n                isInViewport = _props.isInViewport,\n                titlePosition = _props.titlePosition;\n\n\n            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                'div',\n                {\n                    className: 'c-card c-card--default',\n                    itemScope: true,\n                    itemProp: 'Person',\n                    itemType: 'http://schema.org/Person'\n                },\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                    'div',\n                    {\n                        className: 'c-card__image-wrapper u-fade-intersected ' + (isInViewport ? 'u-in-viewport' : '')\n                    },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                        'a',\n                        {\n                            href: data.profileLink,\n                            className: 'c-card__title c-card__title--' + titlePosition\n                        },\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                            'h2',\n                            { className: 'u-h3 u-heading', itemProp: 'name' },\n                            data.name\n                        ),\n                        data.role ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                            'span',\n                            { itemProp: 'jobTitle' },\n                            data.role\n                        ) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('br', null)\n                    ),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('a', {\n                        href: data.profileLink,\n                        style: {\n                            backgroundImage: isInViewport ? 'url(' + data.photo + ')' : null,\n                            backgroundPosition: 'top center'\n                        },\n                        className: 'c-card__image'\n                    }),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                        'div',\n                        { className: 'u-hide' },\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                            'span',\n                            { itemProp: 'worksFor', itemType: 'http://schema.org/Organization' },\n                            'Josh Wood Colour'\n                        ),\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                            'span',\n                            { itemProp: 'image' },\n                            data.photo\n                        )\n                    )\n                )\n            );\n        }\n    }]);\n\n    return ExpertsCard;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(scrollmonitor_react__WEBPACK_IMPORTED_MODULE_1__[\"Watch\"])(ExpertsCard));\n\n//# sourceURL=webpack:///./src/js/components/react/ExpertsCard.js?");

/***/ }),

/***/ "./src/js/components/react/ExpertsFilterNav.js":
/*!*****************************************************!*\
  !*** ./src/js/components/react/ExpertsFilterNav.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/**\n * @prettier\n * \n */\n\n\nvar ExpertsFilterNav = function ExpertsFilterNav(_ref) {\n    var activeFilter = _ref.activeFilter,\n        filters = _ref.filters,\n        handleClick = _ref.handleClick;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n        \"nav\",\n        { className: \"c-filter-nav u-pt u-pt0@mobile u-fade-in\", \"data-filter\": activeFilter },\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n            \"ul\",\n            { className: \"o-list-inline c-filter-nav__nav u-pt0\" },\n            filters.map(function (filter, index) {\n                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                    \"li\",\n                    { className: \"o-list-inline__item c-filter-nav__item u-pt0\", key: index },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                        \"button\",\n                        {\n                            className: \"c-button c-button--black c-button--block u-1/1 \" + (activeFilter !== filter.slug ? 'c-button--ghost' : ''),\n                            \"data-filter\": filter.slug,\n                            onClick: function onClick(event) {\n                                if (event && event.target) {\n                                    event.target.blur();\n                                }\n\n                                handleClick(filter.slug);\n                            }\n                        },\n                        filter.name\n                    )\n                );\n            })\n        )\n    );\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ExpertsFilterNav);\n\n//# sourceURL=webpack:///./src/js/components/react/ExpertsFilterNav.js?");

/***/ }),

/***/ "./src/js/components/react/ExpertsList.js":
/*!************************************************!*\
  !*** ./src/js/components/react/ExpertsList.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scroll_monitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scroll-monitor */ \"./src/js/components/scroll-monitor.js\");\n/* harmony import */ var _ExpertsCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ExpertsCard */ \"./src/js/components/react/ExpertsCard.js\");\n/* harmony import */ var _ExpertsFilterNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ExpertsFilterNav */ \"./src/js/components/react/ExpertsFilterNav.js\");\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * @prettier\n * @/flow\n */\n\n\n\n\n\nvar ExpertsList = function (_Component) {\n    _inherits(ExpertsList, _Component);\n\n    function ExpertsList(props) {\n        _classCallCheck(this, ExpertsList);\n\n        var _this = _possibleConstructorReturn(this, (ExpertsList.__proto__ || Object.getPrototypeOf(ExpertsList)).call(this, props));\n\n        _this.state = {\n            activeFilter: _this.getDefaultFilter(),\n            content: _this.props.content,\n            filters: _this.getUniqueFilters(_this.props.content.filters)\n        };\n        return _this;\n    }\n\n    _createClass(ExpertsList, [{\n        key: 'getUniqueFilters',\n        value: function getUniqueFilters(filters) {\n            var unique = filters.reduce(function (all, current) {\n                var exists = all.filter(function (filter) {\n                    return filter.name === current.name;\n                }).length;\n\n                return exists ? all : [].concat(_toConsumableArray(all), [current]);\n            }, []);\n\n            return unique;\n        }\n    }, {\n        key: 'getDefaultFilter',\n        value: function getDefaultFilter() {\n            var defaultFilter = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : null;\n\n            if (!defaultFilter) {\n                defaultFilter = this.props.content.filters[0].slug;\n            }\n\n            return defaultFilter;\n        }\n    }, {\n        key: 'handleFilterChange',\n        value: function handleFilterChange(filter) {\n            var _this2 = this;\n\n            var content = this.state.content;\n\n            this.setState({\n                activeFilter: filter,\n                content: _extends({}, content, { experts: [] })\n            }, function () {\n                _this2.setState({ content: content });\n            });\n\n            window.location.hash = '#' + filter;\n\n            if (window.ga) {\n                window.ga('send', 'event', {\n                    eventCategory: 'Experts Filter',\n                    eventAction: 'change',\n                    eventLabel: filter\n                });\n            }\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var _state = this.state,\n                activeFilter = _state.activeFilter,\n                content = _state.content,\n                filters = _state.filters;\n\n\n            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                'div',\n                null,\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ExpertsFilterNav__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    activeFilter: activeFilter,\n                    filters: filters,\n                    handleClick: this.handleFilterChange.bind(this)\n                }),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                    'div',\n                    { className: 'o-layout o-layout--offset-tops o-layout--large u-stack-layout@mobile c-cards--h-offsets u-mt++' },\n                    content.experts ? content.experts.filter(function (expert) {\n                        return expert.active === true && expert.categorySlug === activeFilter;\n                    }).map(function (expert, index) {\n                        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n                            'div',\n                            {\n                                className: 'o-layout__item u-6/12@mobile u-4/12@tabletSmall u-6/12@mobile u-fade-in',\n                                key: index\n                            },\n                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ExpertsCard__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                data: expert,\n                                offsets: _scroll_monitor__WEBPACK_IMPORTED_MODULE_1__[\"SCROLL_MONITOR_OFFSET\"],\n                                titlePosition: index % 3 === 0 ? 'left' : 'right'\n                            })\n                        );\n                    }) : null\n                )\n            );\n        }\n    }]);\n\n    return ExpertsList;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nExpertsList.defaultProps = {\n    content: {\n        experts: [],\n        filters: []\n    }\n};\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ExpertsList);\n\n//# sourceURL=webpack:///./src/js/components/react/ExpertsList.js?");

/***/ }),

/***/ "./src/js/components/scroll-monitor.js":
/*!*********************************************!*\
  !*** ./src/js/components/scroll-monitor.js ***!
  \*********************************************/
/*! exports provided: SCROLL_MONITOR_OFFSET, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SCROLL_MONITOR_OFFSET\", function() { return SCROLL_MONITOR_OFFSET; });\n/* harmony import */ var scrollmonitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scrollmonitor */ \"./node_modules/scrollmonitor/scrollMonitor.js\");\n/* harmony import */ var scrollmonitor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scrollmonitor__WEBPACK_IMPORTED_MODULE_0__);\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * @prettier\n * \n */\n\n\nvar els = {};\n\nvar SCROLL_MONITOR_OFFSET = -150;\n\nvar handleItemEnterViewport = function handleItemEnterViewport(event, item) {\n    var element = item.watchItem;\n\n    element.classList.add('u-in-viewport');\n\n    if (element.tagName === 'IMG') {\n        element.src = element.dataset.src;\n    }\n};\n\nvar createMonitors = function createMonitors() {\n    if (els.$items) {\n        [].concat(_toConsumableArray(els.$items)).map(function ($item) {\n            var monitor = scrollmonitor__WEBPACK_IMPORTED_MODULE_0___default.a.create($item, SCROLL_MONITOR_OFFSET);\n\n            monitor.enterViewport(handleItemEnterViewport);\n        });\n    }\n};\n\nvar cache = function cache() {\n    els.$items = document.querySelectorAll('.js-monitor');\n};\n\nvar init = function init() {\n    cache();\n    createMonitors();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ init: init });\n\n//# sourceURL=webpack:///./src/js/components/scroll-monitor.js?");

/***/ }),

/***/ "./src/js/experts.js":
/*!***************************!*\
  !*** ./src/js/experts.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_react_ExpertsList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/react/ExpertsList */ \"./src/js/components/react/ExpertsList.js\");\n/**\n * @prettier\n * @/flow\n */\n\n\n\n\nvar init = function init() {\n    var _window$globalData = window.globalData,\n        content = _window$globalData.content,\n        view = _window$globalData.view;\n\n\n    if (view === 'experts-list') {\n        Object(react_dom__WEBPACK_IMPORTED_MODULE_1__[\"render\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_react_ExpertsList__WEBPACK_IMPORTED_MODULE_2__[\"default\"], { content: content }), document.querySelector('#experts-content'));\n    }\n};\n\nif (window.isModernBrowser) {\n    window.addEventListener('load', init);\n}\n\n//# sourceURL=webpack:///./src/js/experts.js?");

/***/ })

/******/ });