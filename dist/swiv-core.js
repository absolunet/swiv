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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractModel = __webpack_require__(5);
var NotImplementedError = __webpack_require__(6);
var resolve = __webpack_require__(18);
var filter = __webpack_require__(19);

module.exports = function (_AbstractModel) {
	_inherits(AbstractEventModel, _AbstractModel);

	function AbstractEventModel() {
		_classCallCheck(this, AbstractEventModel);

		var _this = _possibleConstructorReturn(this, (AbstractEventModel.__proto__ || Object.getPrototypeOf(AbstractEventModel)).call(this));

		_this.mainDataType = Object;
		return _this;
	}

	_createClass(AbstractEventModel, [{
		key: 'setMainData',
		value: function setMainData() {
			var _this2 = this;

			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var keyList = this.getMainDataKey().split('.');
			var lastKey = keyList.pop();
			var key = keyList.join('.');
			var container = resolve(key, this) || {};

			if (container) {
				var isOfMainType = data.constructor !== Array ? this.isOfMainType(data) : data.every(function (d) {
					return _this2.isOfMainType(d);
				});

				if (!isOfMainType) {
					if (__webpack_require__(1).get('debug', false)) {
						// eslint-disable-next-line no-console
						console.warn('The main data does not fit the expected type: ' + this.getMainDataType().name);
					}
				}
				if (container[lastKey] && container[lastKey].constructor === Array && data.constructor !== Array) {
					container[lastKey].push(data);
				} else {
					container[lastKey] = data;
				}
			}
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			if (this.mainDataKey) {
				return this.mainDataKey;
			}

			throw new NotImplementedError();
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return this.mainDataType || Object;
		}
	}, {
		key: 'isOfMainType',
		value: function isOfMainType(data) {
			var _this3 = this;

			return Object.keys(filter(new (this.getMainDataType())().getRequiredFields(), function (val, key) {
				return typeof val === 'function' ? val(key, _this3) : Boolean(val);
			})).every(function (key) {
				return typeof data[key] === 'boolean' || data[key];
			});
		}
	}, {
		key: 'getWhitelistedFunctions',
		value: function getWhitelistedFunctions() {
			return ['eventCallback'];
		}
	}, {
		key: 'getEventName',
		value: function getEventName() {
			return this.constructor.getEventName();
		}
	}]);

	return AbstractEventModel;
}(AbstractModel);

module.exports.getEventName = function () {
	var name = this.eventName || this.name;

	return name.replace(/(Event)?Model$/, '');
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfigs = __webpack_require__(16);

var _constants = {};

var ConfigRepository = function () {
	function ConfigRepository() {
		_classCallCheck(this, ConfigRepository);
	}

	_createClass(ConfigRepository, [{
		key: 'get',
		value: function get(key) {
			var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			return this.has(key) ? _constants[key] : defaultValue;
		}
	}, {
		key: 'set',
		value: function set(key, value) {
			_constants[key] = value;

			if (!(Object.getOwnPropertyDescriptor(this, key) || {}).get) {
				Object.defineProperty(this, key, {
					get: function get() {
						return this.get(key);
					},
					set: function set(v) {
						this.set(key, v);
					}
				});
			}

			return this;
		}
	}, {
		key: 'has',
		value: function has(key) {
			return typeof _constants[key] !== 'undefined';
		}
	}, {
		key: 'remove',
		value: function remove(key) {
			delete _constants[key];

			return this;
		}
	}, {
		key: 'all',
		value: function all() {
			var constantsCopy = {};

			for (var key in _constants) {
				if (typeof _constants[key] !== 'undefined') {
					constantsCopy[key] = _constants[key];
				}
			}

			return constantsCopy;
		}
	}]);

	return ConfigRepository;
}();

var configs = new ConfigRepository();

for (var key in defaultConfigs) {
	if (defaultConfigs[key]) {
		configs.set(key, defaultConfigs[key]);
	}
}

module.exports = configs;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractDataModel = __webpack_require__(3);

module.exports = function (_AbstractDataModel) {
	_inherits(ProductDataModel, _AbstractDataModel);

	function ProductDataModel() {
		_classCallCheck(this, ProductDataModel);

		return _possibleConstructorReturn(this, (ProductDataModel.__proto__ || Object.getPrototypeOf(ProductDataModel)).apply(this, arguments));
	}

	_createClass(ProductDataModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				name: '',
				id: '',
				brand: '',
				category: '',
				variant: '',
				list: '',
				position: 1,
				price: 0,
				quantity: 1,
				coupon: ''
			};
		}
	}, {
		key: 'getRequiredFields',
		value: function getRequiredFields() {
			return {
				id: function id(product) {
					return !product.name;
				},
				name: function name(product) {
					return !product.id;
				}
			};
		}
	}]);

	return ProductDataModel;
}(AbstractDataModel);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractModel = __webpack_require__(5);

module.exports = function (_AbstractModel) {
	_inherits(AbstractDataModel, _AbstractModel);

	function AbstractDataModel() {
		_classCallCheck(this, AbstractDataModel);

		return _possibleConstructorReturn(this, (AbstractDataModel.__proto__ || Object.getPrototypeOf(AbstractDataModel)).apply(this, arguments));
	}

	_createClass(AbstractDataModel, [{
		key: 'getRequiredFields',
		value: function getRequiredFields() {
			return {};
		}
	}]);

	return AbstractDataModel;
}(AbstractModel);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractDataModel = __webpack_require__(3);

module.exports = function (_AbstractDataModel) {
  _inherits(ActionFieldDataModel, _AbstractDataModel);

  function ActionFieldDataModel() {
    _classCallCheck(this, ActionFieldDataModel);

    return _possibleConstructorReturn(this, (ActionFieldDataModel.__proto__ || Object.getPrototypeOf(ActionFieldDataModel)).apply(this, arguments));
  }

  return ActionFieldDataModel;
}(AbstractDataModel);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function AbstractModel() {
		var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, AbstractModel);

		this.map(this.getDefaultModelData()).map(data);
	}

	_createClass(AbstractModel, [{
		key: 'map',
		value: function map(data) {
			for (var prop in data) {
				if (typeof data[prop] !== 'undefined') {
					this.set(prop, data[prop], data);
				}
			}

			return this;
		}
	}, {
		key: 'set',
		value: function set(prop, value, context) {
			this[prop] = this.mapPropertyValue(prop, value, context);

			return this;
		}
	}, {
		key: 'getData',
		value: function getData() {
			var data = {};
			var whitelistedFunctions = this.getWhitelistedFunctions();

			for (var prop in this) {
				if (typeof this[prop] !== 'undefined') {
					var type = _typeof(this[prop]);

					if (type !== 'undefined' && (typeof this[prop] !== 'function' || whitelistedFunctions.indexOf(prop) !== -1)) {
						data[prop] = this[prop];
					}
				}
			}

			return data;
		}
	}, {
		key: 'getWhitelistedFunctions',
		value: function getWhitelistedFunctions() {
			return [];
		}
	}, {
		key: 'mapPropertyValue',
		value: function mapPropertyValue(prop, value) {
			var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
			// eslint-disable-line no-unused-vars
			return value;
		}
	}, {
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {};
		}
	}]);

	return AbstractModel;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_Error) {
	_inherits(NotImplementedError, _Error);

	function NotImplementedError(method) {
		_classCallCheck(this, NotImplementedError);

		// eslint-disable-next-line no-caller
		return _possibleConstructorReturn(this, (NotImplementedError.__proto__ || Object.getPrototypeOf(NotImplementedError)).call(this, "Method " + (method || arguments.callee.caller.name) + "() must be implemented."));
	}

	return NotImplementedError;
}(Error);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractDataModel = __webpack_require__(3);

module.exports = function (_AbstractDataModel) {
	_inherits(PromotionDataModel, _AbstractDataModel);

	function PromotionDataModel() {
		_classCallCheck(this, PromotionDataModel);

		return _possibleConstructorReturn(this, (PromotionDataModel.__proto__ || Object.getPrototypeOf(PromotionDataModel)).apply(this, arguments));
	}

	_createClass(PromotionDataModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				id: '',
				name: '',
				creative: '',
				position: ''
			};
		}
	}, {
		key: 'getRequiredFields',
		value: function getRequiredFields() {
			return {
				id: function id(promotion, event) {
					return ['purchase', 'refund'].indexOf(event.getEventName()) !== -1;
				}
			};
		}
	}]);

	return PromotionDataModel;
}(AbstractDataModel);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var _arguments = arguments;
var debounceUntil = function debounceUntil(callback, rule) {
	var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


	var _rule = typeof rule === 'function' ? rule : function () {
		return true;
	};

	setTimeout(function () {
		if (_rule()) {
			callback();
		} else {
			debounceUntil.apply(undefined, _arguments);
		}
	}, delay);
};

module.exports = debounceUntil;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotImplementedError = __webpack_require__(6);

module.exports = function () {
	function QueuableServiceFactory() {
		_classCallCheck(this, QueuableServiceFactory);
	}

	_createClass(QueuableServiceFactory, [{
		key: 'getService',
		value: function getService() {
			throw new NotImplementedError();
		}
	}]);

	return QueuableServiceFactory;
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractServiceFactory = __webpack_require__(9);
var NoQueueServiceError = __webpack_require__(35);

module.exports = function (_AbstractServiceFacto) {
	_inherits(AbstractQueuableServiceFactory, _AbstractServiceFacto);

	function AbstractQueuableServiceFactory() {
		_classCallCheck(this, AbstractQueuableServiceFactory);

		var _this = _possibleConstructorReturn(this, (AbstractQueuableServiceFactory.__proto__ || Object.getPrototypeOf(AbstractQueuableServiceFactory)).call(this));

		_this.queuedServices = [];
		return _this;
	}

	_createClass(AbstractQueuableServiceFactory, [{
		key: 'queueService',
		value: function queueService(service) {
			this.queuedServices.push(service);

			return this;
		}
	}, {
		key: 'getService',
		value: function getService() {
			if (this.queuedServices.length === 0) {
				throw new NoQueueServiceError();
			}

			return this.queuedServices[this.queuedServices.length - 1];
		}
	}]);

	return AbstractQueuableServiceFactory;
}(AbstractServiceFactory);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

window.swiv = __webpack_require__(13);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
	gee: __webpack_require__(14)
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var configs = __webpack_require__(1);
var debounceUntil = __webpack_require__(8);
var GeeFactory = __webpack_require__(32);

debounceUntil(function () {
	configs.set('ready', true);
}, function () {
	return configs.gtm && window[configs.gtm] !== null;
});

module.exports = new GeeFactory();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
	dataLayer: 'dataLayer',
	gtm: 'google_tag_manager',
	eventPrefix: 'gee.',
	gaPrefix: 'ec:',
	events: [__webpack_require__(17), __webpack_require__(20), __webpack_require__(21), __webpack_require__(22), __webpack_require__(23), __webpack_require__(25), __webpack_require__(26), __webpack_require__(27), __webpack_require__(28), __webpack_require__(29), __webpack_require__(30), __webpack_require__(31)]
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);

module.exports = function (_AbstractEventModel) {
	_inherits(DefaultEventModel, _AbstractEventModel);

	function DefaultEventModel() {
		_classCallCheck(this, DefaultEventModel);

		return _possibleConstructorReturn(this, (DefaultEventModel.__proto__ || Object.getPrototypeOf(DefaultEventModel)).apply(this, arguments));
	}

	_createClass(DefaultEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				ecommerce: {}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return Object;
		}
	}]);

	return DefaultEventModel;
}(AbstractEventModel);

module.exports.eventName = 'DefaultEventModel';

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (path) {
	var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	return path.split('.').reduce(function (prev, curr) {
		return prev ? prev[curr] : undefined;
	}, obj);
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (obj, predicate) {
	var result = {};

	for (var key in obj) {
		if (predicate(obj[key], key)) {
			result[key] = obj[key];
		}
	}

	return result;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ProductModel = __webpack_require__(2);

module.exports = function (_AbstractEventModel) {
	_inherits(AddToCartEventModel, _AbstractEventModel);

	function AddToCartEventModel() {
		_classCallCheck(this, AddToCartEventModel);

		return _possibleConstructorReturn(this, (AddToCartEventModel.__proto__ || Object.getPrototypeOf(AddToCartEventModel)).apply(this, arguments));
	}

	_createClass(AddToCartEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'addToCart',
				ecommerce: {
					currencyCode: __webpack_require__(1).get('currencyCode', 'USD'),
					add: {
						products: []
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.add.products';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ProductModel;
		}
	}]);

	return AddToCartEventModel;
}(AbstractEventModel);

module.exports.eventName = 'AddToCartEventModel';

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ProductModel = __webpack_require__(2);

module.exports = function (_AbstractEventModel) {
	_inherits(CheckoutEventModel, _AbstractEventModel);

	function CheckoutEventModel() {
		_classCallCheck(this, CheckoutEventModel);

		return _possibleConstructorReturn(this, (CheckoutEventModel.__proto__ || Object.getPrototypeOf(CheckoutEventModel)).apply(this, arguments));
	}

	_createClass(CheckoutEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'checkout',
				ecommerce: {
					actionField: {
						step: 1,
						option: __webpack_require__(1).get('defaultCreditCard', '')
					},
					products: []
				},
				eventCallback: function eventCallback() {} // eslint-disable-line no-empty-function
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.products';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ProductModel;
		}
	}]);

	return CheckoutEventModel;
}(AbstractEventModel);

module.exports.eventName = 'CheckoutEventModel';

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ActionFieldModel = __webpack_require__(4);

module.exports = function (_AbstractEventModel) {
	_inherits(CheckoutOptionEventModel, _AbstractEventModel);

	function CheckoutOptionEventModel() {
		_classCallCheck(this, CheckoutOptionEventModel);

		return _possibleConstructorReturn(this, (CheckoutOptionEventModel.__proto__ || Object.getPrototypeOf(CheckoutOptionEventModel)).apply(this, arguments));
	}

	_createClass(CheckoutOptionEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'checkoutOption',
				ecommerce: {
					checkout_option: { // eslint-disable-line camelcase
						actionField: {
							step: 1,
							option: __webpack_require__(1).get('defaultCreditCard', '')
						}
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.checkout_option.actionField';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ActionFieldModel;
		}
	}]);

	return CheckoutOptionEventModel;
}(AbstractEventModel);

module.exports.eventName = 'CheckoutOptionEventModel';

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ProductDataModel = __webpack_require__(24);

module.exports = function (_AbstractEventModel) {
	_inherits(ProductImpressionEventModel, _AbstractEventModel);

	function ProductImpressionEventModel() {
		_classCallCheck(this, ProductImpressionEventModel);

		return _possibleConstructorReturn(this, (ProductImpressionEventModel.__proto__ || Object.getPrototypeOf(ProductImpressionEventModel)).apply(this, arguments));
	}

	_createClass(ProductImpressionEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'productImpression',
				ecommerce: {
					currencyCode: __webpack_require__(1).get('currencyCode', 'USD'),
					impressions: []
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.impressions';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ProductDataModel;
		}
	}]);

	return ProductImpressionEventModel;
}(AbstractEventModel);

module.exports.eventName = 'ProductImpressionEventModel';

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractDataModel = __webpack_require__(3);

module.exports = function (_AbstractDataModel) {
	_inherits(ProductDataModel, _AbstractDataModel);

	function ProductDataModel() {
		_classCallCheck(this, ProductDataModel);

		return _possibleConstructorReturn(this, (ProductDataModel.__proto__ || Object.getPrototypeOf(ProductDataModel)).apply(this, arguments));
	}

	_createClass(ProductDataModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				name: '',
				id: '',
				brand: '',
				category: '',
				variant: '',
				list: '',
				position: 1,
				price: 0
			};
		}
	}, {
		key: 'getRequiredFields',
		value: function getRequiredFields() {
			return {
				id: function id(product) {
					return !product.name;
				},
				name: function name(product) {
					return !product.id;
				}
			};
		}
	}]);

	return ProductDataModel;
}(AbstractDataModel);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ProductModel = __webpack_require__(2);

module.exports = function (_AbstractEventModel) {
	_inherits(ProductClickEventModel, _AbstractEventModel);

	function ProductClickEventModel() {
		_classCallCheck(this, ProductClickEventModel);

		return _possibleConstructorReturn(this, (ProductClickEventModel.__proto__ || Object.getPrototypeOf(ProductClickEventModel)).apply(this, arguments));
	}

	_createClass(ProductClickEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'productClick',
				ecommerce: {
					click: {
						actionField: {},
						products: []
					}
				},
				eventCallback: function eventCallback() {} // eslint-disable-line no-empty-function
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.click.products';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ProductModel;
		}
	}]);

	return ProductClickEventModel;
}(AbstractEventModel);

module.exports.eventName = 'ProductClickEventModel';

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ProductModel = __webpack_require__(2);

module.exports = function (_AbstractEventModel) {
	_inherits(ProductDetailEventModel, _AbstractEventModel);

	function ProductDetailEventModel() {
		_classCallCheck(this, ProductDetailEventModel);

		return _possibleConstructorReturn(this, (ProductDetailEventModel.__proto__ || Object.getPrototypeOf(ProductDetailEventModel)).apply(this, arguments));
	}

	_createClass(ProductDetailEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'productDetail',
				ecommerce: {
					detail: {
						actionField: {},
						products: []
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.detail.products';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ProductModel;
		}
	}]);

	return ProductDetailEventModel;
}(AbstractEventModel);

module.exports.eventName = 'ProductDetailEventModel';

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var PromotionModel = __webpack_require__(7);

module.exports = function (_AbstractEventModel) {
	_inherits(PromoClickEventModel, _AbstractEventModel);

	function PromoClickEventModel() {
		_classCallCheck(this, PromoClickEventModel);

		return _possibleConstructorReturn(this, (PromoClickEventModel.__proto__ || Object.getPrototypeOf(PromoClickEventModel)).apply(this, arguments));
	}

	_createClass(PromoClickEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'promotionClick',
				ecommerce: {
					promoClick: {
						promotions: []
					}
				},
				eventCallback: function eventCallback() {} // eslint-disable-line no-empty-function
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.promoClick.promotions';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return PromotionModel;
		}
	}]);

	return PromoClickEventModel;
}(AbstractEventModel);

module.exports.eventName = 'PromoClickEventModel';

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var PromotionModel = __webpack_require__(7);

module.exports = function (_AbstractEventModel) {
	_inherits(PromoViewEventModel, _AbstractEventModel);

	function PromoViewEventModel() {
		_classCallCheck(this, PromoViewEventModel);

		return _possibleConstructorReturn(this, (PromoViewEventModel.__proto__ || Object.getPrototypeOf(PromoViewEventModel)).apply(this, arguments));
	}

	_createClass(PromoViewEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'promotionView',
				ecommerce: {
					promoView: {
						promotions: []
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.promoView.promotions';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return PromotionModel;
		}
	}]);

	return PromoViewEventModel;
}(AbstractEventModel);

module.exports.eventName = 'PromoViewEventModel';

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ActionFieldModel = __webpack_require__(4);

module.exports = function (_AbstractEventModel) {
	_inherits(PurchaseEventModel, _AbstractEventModel);

	function PurchaseEventModel() {
		_classCallCheck(this, PurchaseEventModel);

		return _possibleConstructorReturn(this, (PurchaseEventModel.__proto__ || Object.getPrototypeOf(PurchaseEventModel)).apply(this, arguments));
	}

	_createClass(PurchaseEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'purchase',
				ecommerce: {
					purchase: {
						actionField: new ActionFieldModel()
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.purchase.actionField';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ActionFieldModel;
		}
	}]);

	return PurchaseEventModel;
}(AbstractEventModel);

module.exports.eventName = 'PurchaseEventModel';

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ActionFieldModel = __webpack_require__(4);

module.exports = function (_AbstractEventModel) {
	_inherits(RefundEventModel, _AbstractEventModel);

	function RefundEventModel() {
		_classCallCheck(this, RefundEventModel);

		return _possibleConstructorReturn(this, (RefundEventModel.__proto__ || Object.getPrototypeOf(RefundEventModel)).apply(this, arguments));
	}

	_createClass(RefundEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'refund',
				ecommerce: {
					refund: {
						actionField: new ActionFieldModel()
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.refund.actionField';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ActionFieldModel;
		}
	}]);

	return RefundEventModel;
}(AbstractEventModel);

module.exports.eventName = 'RefundEventModel';

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEventModel = __webpack_require__(0);
var ProductModel = __webpack_require__(2);

module.exports = function (_AbstractEventModel) {
	_inherits(RemoveFromCartEventModel, _AbstractEventModel);

	function RemoveFromCartEventModel() {
		_classCallCheck(this, RemoveFromCartEventModel);

		return _possibleConstructorReturn(this, (RemoveFromCartEventModel.__proto__ || Object.getPrototypeOf(RemoveFromCartEventModel)).apply(this, arguments));
	}

	_createClass(RemoveFromCartEventModel, [{
		key: 'getDefaultModelData',
		value: function getDefaultModelData() {
			return {
				event: 'removeFromCart',
				ecommerce: {
					remove: {
						products: []
					}
				}
			};
		}
	}, {
		key: 'getMainDataKey',
		value: function getMainDataKey() {
			return 'ecommerce.remove.products';
		}
	}, {
		key: 'getMainDataType',
		value: function getMainDataType() {
			return ProductModel;
		}
	}]);

	return RemoveFromCartEventModel;
}(AbstractEventModel);

module.exports.eventName = 'RemoveFromCartEventModel';

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FactoryContract = __webpack_require__(9);
var GoogleEnhancedEcommerceService = __webpack_require__(33);

var eventServiceFactory = new (__webpack_require__(34))();
var mapperServiceFactory = new (__webpack_require__(37))();
var configs = __webpack_require__(1);

var _singleton = void 0;

module.exports = function (_FactoryContract) {
	_inherits(GoogleEnhancedEcommerceServiceFactory, _FactoryContract);

	function GoogleEnhancedEcommerceServiceFactory() {
		_classCallCheck(this, GoogleEnhancedEcommerceServiceFactory);

		var _this = _possibleConstructorReturn(this, (GoogleEnhancedEcommerceServiceFactory.__proto__ || Object.getPrototypeOf(GoogleEnhancedEcommerceServiceFactory)).call(this));

		_this.configs = configs;
		return _this;
	}

	_createClass(GoogleEnhancedEcommerceServiceFactory, [{
		key: 'setEventService',
		value: function setEventService(service) {
			eventServiceFactory.queueService(service);

			return this;
		}
	}, {
		key: 'setMapperService',
		value: function setMapperService(service) {
			mapperServiceFactory.queueService(service);

			return this;
		}
	}, {
		key: 'getService',
		value: function getService() {
			if (!_singleton) {
				var eventService = eventServiceFactory.getService();
				var mapperService = mapperServiceFactory.getService();
				_singleton = new GoogleEnhancedEcommerceService(eventService, mapperService, this.configs);
			}

			return _singleton;
		}
	}]);

	return GoogleEnhancedEcommerceServiceFactory;
}(FactoryContract);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debounceUntil = __webpack_require__(8);

module.exports = function () {
	function GoogleEnhancedEcommerceService(eventService, mapperService, configs) {
		var _this = this;

		_classCallCheck(this, GoogleEnhancedEcommerceService);

		this.eventService = eventService;
		this.mapperService = mapperService;
		this.configs = configs;

		configs.events.forEach(function (event) {
			_this.registerEvent(_this.getCleanEventName(event));
		});
	}

	_createClass(GoogleEnhancedEcommerceService, [{
		key: 'registerEvent',
		value: function registerEvent(event) {
			var _this2 = this;

			this.eventService.subscribe(this.getEventName(event), function (data) {
				debounceUntil(function () {
					window[_this2.configs.dataLayer].push(data);
				}, function () {
					return _this2.configs.ready;
				});
			});

			this['trigger' + this.getCleanEventName(this.getEventModelClass(event), true)] = function (data) {
				return _this2.trigger(event, data);
			};

			return this;
		}
	}, {
		key: 'trigger',
		value: function trigger(event) {
			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var mappedData = this.mapperService.map(data, this.getEventModel(event));

			if (mappedData && Object.keys(mappedData).length > 0) {
				this.eventService.publish(this.getEventName(event), mappedData);
			}

			return this;
		}
	}, {
		key: 'getEventName',
		value: function getEventName(event) {
			var withPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			var prefix = withPrefix ? this.configs.get('eventPrefix', '') : '';

			return '' + prefix + event;
		}
	}, {
		key: 'getEventModel',
		value: function getEventModel(event) {
			var EventModel = this.getEventModelClass(event);

			return new EventModel();
		}
	}, {
		key: 'getEventModelClass',
		value: function getEventModelClass(event) {
			var eventCollection = this.configs.events;

			for (var i = eventCollection.length - 1; i >= 0; i--) {
				if (this.getCleanEventName(eventCollection[i]) === event) {
					return eventCollection[i];
				}
			}

			for (var j = 0; j < eventCollection.length; j++) {
				if (/^[dD]efault/.test(eventCollection[j].name)) {
					return eventCollection[j];
				}
			}

			return eventCollection[0];
		}
	}, {
		key: 'getCleanEventName',
		value: function getCleanEventName(event) {
			var toPascalCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var cleanName = typeof event.getEventName === 'function' ? event.getEventName() : event.replace(/(Event)?Model$/, '');

			return '' + cleanName.charAt(0)['to' + (toPascalCase ? 'Upper' : 'Lower') + 'Case']() + cleanName.slice(1);
		}
	}]);

	return GoogleEnhancedEcommerceService;
}();

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractQueuableServiceFactory = __webpack_require__(10);
var DefaultEventService = __webpack_require__(36);

module.exports = function (_AbstractQueuableServ) {
	_inherits(EventServiceFactory, _AbstractQueuableServ);

	function EventServiceFactory() {
		_classCallCheck(this, EventServiceFactory);

		var _this = _possibleConstructorReturn(this, (EventServiceFactory.__proto__ || Object.getPrototypeOf(EventServiceFactory)).call(this));

		_this.queueService(new DefaultEventService());
		return _this;
	}

	return EventServiceFactory;
}(AbstractQueuableServiceFactory);

/***/ }),
/* 35 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_Error) {
	_inherits(noQueueServiceError, _Error);

	function noQueueServiceError() {
		var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'There is no queued service.';

		_classCallCheck(this, noQueueServiceError);

		return _possibleConstructorReturn(this, (noQueueServiceError.__proto__ || Object.getPrototypeOf(noQueueServiceError)).call(this, message));
	}

	return noQueueServiceError;
}(Error);

/***/ }),
/* 36 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function DefaultEventService() {
		_classCallCheck(this, DefaultEventService);

		this.events = {};
	}

	_createClass(DefaultEventService, [{
		key: "subscribe",
		value: function subscribe(event, callback) {
			var token = this.generateToken();
			this.events[event] = this.events[event] || [];
			this.events[event].push({ token: token, callback: callback });

			return token;
		}
	}, {
		key: "unsubscribe",
		value: function unsubscribe(token) {
			for (var event in this.events) {
				if (this.events[event]) {
					for (var i = this.events[event].length - 1; i >= 0; i--) {
						if (this.events[event].token === token) {
							this.events[event].splice(i, 1);
						}
					}
				}
			}
		}
	}, {
		key: "publish",
		value: function publish(event) {
			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			(this.events[event] || []).forEach(function (subscriber) {
				subscriber.callback(data);
			});
		}
	}, {
		key: "generateToken",
		value: function generateToken() {
			return Math.random().toString(32).substr(2);
		}
	}]);

	return DefaultEventService;
}();

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractQueuableServiceFactory = __webpack_require__(10);
var DefaultMapperService = __webpack_require__(38);

module.exports = function (_AbstractQueuableServ) {
	_inherits(MapperServiceFactory, _AbstractQueuableServ);

	function MapperServiceFactory() {
		_classCallCheck(this, MapperServiceFactory);

		var _this = _possibleConstructorReturn(this, (MapperServiceFactory.__proto__ || Object.getPrototypeOf(MapperServiceFactory)).call(this));

		_this.queueService(new DefaultMapperService());
		return _this;
	}

	return MapperServiceFactory;
}(AbstractQueuableServiceFactory);

/***/ }),
/* 38 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function DefaultMapperService() {
		_classCallCheck(this, DefaultMapperService);
	}

	_createClass(DefaultMapperService, [{
		key: "map",
		value: function map(data, event) {
			event.setMainData(data);

			return event;
		}
	}]);

	return DefaultMapperService;
}();

/***/ })
/******/ ]);