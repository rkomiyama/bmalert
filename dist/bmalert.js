/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	// BMAlert
	// github.com/Boletomovil/bmalert
	
	(function (window, document) {
	  'use strict';
	
	  window.bmalertClasses = {
	    modal: 'bmalert-container',
	    confirm: 'bmalert-confirm',
	    cancel: 'bmalert-cancel'
	  };
	
	  window.bmalertIDs = {
	    bm: 'BM_x5F_Logo',
	    loader: 'bm-loader'
	  };
	
	  var defaultParams = {
	    title: '',
	    alertState: 'complete',
	    cancelButtonText: 'Cancel',
	    confirmButtonText: 'OK',
	    cancelButtonCallback: function () {},
	    confirmButtonCallback: function () {},
	    showCancel: false,
	    showConfirm: true,
	    closeOnConfirm: true,
	    clickOutsideToClose: false
	  };
	
	  function showModal() {
	    var modal = getModal();
	    if (arguments[0] === undefined) {
	      window.console.error('sweetAlert expects at least 1 attribute!');
	      return false;
	    }
	
	    var params = extend({}, defaultParams);
	
	    switch (typeof arguments[0]) {
	      case 'string':
	        params.title = arguments[0];
	        params.alertState = arguments[1] || defaultParams.alertState;
	        break;
	
	      case 'object':
	        params.title = arguments[0].title || defaultParams.title;
	        params.cancelButtonText = arguments[0].cancelButtonText || defaultParams.cancelButtonText;
	        params.confirmButtonText = arguments[0].confirmButtonText || defaultParams.confirmButtonText;
	        params.cancelButtonCallback = arguments[0].cancelButtonCallback || defaultParams.cancelButtonCallback;
	        params.confirmButtonCallback = arguments[0].confirmButtonCallback || defaultParams.confirmButtonCallback;
	        params.alertState = arguments[0].alertState || defaultParams.alertState;
	        params.showCancel = arguments[0].showCancel || defaultParams.showCancel;
	        params.showConfirm = arguments[0].showConfirm || defaultParams.showConfirm;
	        params.closeOnConfirm = arguments[0].closeOnConfirm || defaultParams.closeOnConfirm;
	        params.clickOutsideToClose = arguments[0].clickOutsideToClose || defaultParams.clickOutsideToClose;
	        break;
	
	      default:
	        window.console.error('Unexpected type of argument! Expected "string" or "object", got ' + typeof arguments[0]);
	        return false;
	    }
	
	    setParameters(params);
	    removeClass(modal, 'bmalert-hide');
	    addClass(modal, 'bmalert-show');
	  }
	
	  function closeModal() {
	    var modal = getModal();
	    removeClass(modal, 'bmalert-show');
	    addClass(modal, 'bmalert-hide');
	
	    var $bmIcon = document.getElementById(window.bmalertIDs.bm);
	    var $bmLoader = document.getElementById(window.bmalertIDs.loader);
	
	    removeAllClasses($bmIcon);
	    removeAllClasses($bmLoader);
	
	    addClass($bmIcon, 'loading-icon');
	  }
	
	  var setParameters = function (params) {
	    var modal = getModal();
	    var $btnsContainer = document.getElementById("bmalert-btns");
	    var $title = modal.querySelector('h1');
	
	    $title.innerHTML = params.title;
	
	    var $confirmBtn = modal.querySelector('button.' + window.bmalertClasses.confirm);
	    var $cancelBtn = modal.querySelector('button.' + window.bmalertClasses.cancel);
	
	    //This also removes any previous event listeners.
	    var $cleanConfirmBtn = $confirmBtn.cloneNode(true);
	    var $cleanCancelBtn = $cancelBtn.cloneNode(true);
	
	    $cleanCancelBtn.innerHTML = params.cancelButtonText;
	    $cleanConfirmBtn.innerHTML = params.confirmButtonText;
	
	    if (params.closeOnConfirm) {
	      $cleanConfirmBtn.addEventListener("click", closeModal);
	    }
	
	    if (params.clickOutsideToClose) {
	      modal.addEventListener("click", closeModal);
	    }
	
	    $cleanCancelBtn.addEventListener("click", params.cancelButtonCallback || defaultParams.cancelButtonCallback);
	    $cleanCancelBtn.addEventListener("click", closeModal);
	    $cleanConfirmBtn.addEventListener("click", params.confirmButtonCallback || defaultParams.confirmButtonCallback);
	
	    if (!params.showCancel) {
	      $cleanCancelBtn.style.display = 'none';
	    } else {
	      $cleanCancelBtn.style.display = 'inline-block';
	    }
	
	    if (!params.showConfirm) {
	      $cleanConfirmBtn.style.display = 'none';
	    } else {
	      $cleanConfirmBtn.style.display = 'inline-block';
	    }
	
	    $btnsContainer.replaceChild($cleanCancelBtn, $cancelBtn);
	    $btnsContainer.replaceChild($cleanConfirmBtn, $confirmBtn);
	
	    setAlertState(params.alertState);
	  };
	
	  var setAlertState = function (state) {
	    var $bmIcon = document.getElementById(window.bmalertIDs.bm);
	    var $bmLoader = document.getElementById(window.bmalertIDs.loader);
	
	    removeAllClasses($bmIcon);
	    removeAllClasses($bmLoader);
	
	    addClass($bmIcon, 'loading-icon');
	
	    switch (arguments[0]) {
	      case 'complete':
	        addClass($bmIcon, 'show-icon');
	        addClass($bmLoader, 'spinner-container-complete');
	        break;
	      case 'loading':
	        var modal = getModal();
	        var $confirmBtn = modal.querySelector('button.' + window.bmalertClasses.confirm);
	        var $cancelBtn = modal.querySelector('button.' + window.bmalertClasses.cancel);
	        $confirmBtn.style.display = 'none';
	        $cancelBtn.style.display = 'none';
	        addClass($bmLoader, 'spinner-container-loading');
	        break;
	      case 'warning':
	        addClass($bmIcon, 'show-icon');
	        addClass($bmLoader, 'spinner-container-warning');
	        break;
	      case 'error':
	        addClass($bmIcon, 'show-icon');
	        addClass($bmLoader, 'spinner-container-error');
	        break;
	      case 'none':
	        break;
	      default:
	        addClass($bmIcon, 'show-icon');
	        break;
	    }
	  };
	
	  var removeAllClasses = function (elem) {
	    elem.setAttribute('class', "");
	  };
	
	  var removeClass = function (elem, className) {
	    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
	    if (hasClass(elem, className)) {
	      while (newClass.indexOf(' ' + className + ' ') >= 0) {
	        newClass = newClass.replace(' ' + className + ' ', ' ');
	      }
	      elem.setAttribute('class', newClass.replace(/^\s+|\s+$/g, ''));
	    }
	  };
	
	  var addClass = function (elem, className) {
	    if (className && !hasClass(elem, className)) {
	      elem.setAttribute('class', elem.className + ' ' + className);
	    }
	  };
	
	  var getModal = function () {
	    return document.querySelector('.' + window.bmalertClasses.modal);
	  };
	
	  var hasClass = function (elem, className) {
	    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	  };
	
	  var extend = function (a, b) {
	    for (var key in b) {
	      if (b.hasOwnProperty(key)) {
	        a[key] = b[key];
	      }
	    }
	
	    return a;
	  };
	
	  /*
	   * Global BMAlert function :B
	   */
	  window.bmalert = function () {
	    // Copy arguments to the local args variable
	    var args = arguments;
	
	    var modal = getModal();
	
	    if (modal === null) {
	      window.bmalert.init();
	      modal = getModal();
	    }
	
	    return showModal.apply(this, args);
	  };
	
	  window.bmalert.updateAlertState = function (state) {
	    setAlertState(state);
	  };
	
	  window.bmalert.dismiss = function (state) {
	    closeModal();
	  };
	
	  /*
	   * Add modal + overlay to DOM
	   */
	  window.bmalert.init = function () {
	    if (document.getElementsByClassName(window.bmalertClasses.modal).length) {
	      return;
	    }
	
	    var bmalertHTML = '<div id="bmalert-prompt">' + '<div id="spinner_container">' + '<svg width="160px" height="160px" version="1.1" id="L_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' + 'viewBox="0 0 116.1 115.9" enable-background="new 0 0 116.1 115.9" xml:space="preserve">' + '<g id="Loader_x5F_Group">' + '<path id="loader" fill="#D8D8D8" d="M58.2,8.7c-0.2,0-0.4,0-0.5,0c-30.8,0.7-53,28.4-48,58.5c2.3,14,11.5,26.2,23.5,33.4' + 'c0.6,0.4,1.3,0.7,1.9,1.1c0.2,0.2,0.5,0.3,0.8,0.5c0.7,0.4,1.5,0.7,2.2,1c7.2,3.2,15,4.5,22.7,4c0.3,0,0.6,0,0.9-0.1' + 'c0.6,0,1.1-0.1,1.7-0.2c0.5-0.1,1.1-0.1,1.6-0.2c0.4-0.1,0.8-0.1,1.2-0.2c0.6-0.1,1.2-0.2,1.8-0.4c0.4-0.1,0.7-0.1,1.1-0.2' + 'c0.5-0.1,0.9-0.2,1.4-0.4c3.4-0.9,6.7-2.1,9.9-3.6c0.3-0.2,0.6-0.4,0.9-0.6c12.6-6.6,22.3-18.6,25.4-34.1' + 'C112.5,37.2,88.5,9.2,58.2,8.7z M99.3,65.4c-2.7,16.2-14.4,28-28.6,32.5c-0.1,0-0.3,0.1-0.4,0.1c-0.5,0.2-1,0.3-1.6,0.4' + 'c-0.4,0.1-0.9,0.2-1.3,0.3c-0.2,0.1-0.4,0.1-0.7,0.2c-22.5,4.7-45.1-10.1-49.8-33.7C12,39.9,32.9,16.6,58,16.2c0.1,0,0.1,0,0.1,0' + 'c0,0,0,0,0,0C84,16.6,103.5,39.9,99.3,65.4z"/>' + '</g>' + '<g id="BM_x5F_Logo_x5F_Group">' + '<g>' + '<path fill="#D8D9D9" d="M73.5,63c0,0.3,0.2,1.7,0,3.1c-0.1,0.9-0.7,1.9-1.3,2l0,0c-0.2,0-0.4-0.1-0.5-0.3l0,0' + 'c-0.2-0.4-0.6-0.7-1-0.7c-0.6,0-1.1,0.5-1.1,1.1c0,0.3,0.1,0.6,0.3,0.8l0,0c0.8,0.8,1.9,1.3,3.1,1.3c2.1,0,3.8-1.4,4.2-3.4l0-0.1' + 'c0.3-1.4,0.4-11.6,0.4-14.9V52c0-0.5,0-0.9,0-1c0-0.1,0-0.1,0-0.2c-0.3-2.7-2.2-5-4.7-6l-0.1-0.1c-1.5-0.7-4.8-0.8-8.4-0.2' + 'l-2.4,0.5c-0.1,0-0.2-0.1-0.3-0.1l-0.3-0.1c-3.4-1-10.2-0.5-10.2-0.5c-9.9,1-10.1,8.5-10.1,8.5c-0.1,0.4-0.3,6.7-0.3,6.7L40.5,61' + 'c0,0,0,0.5-0.1,1.5c-0.1,0.9-0.5,1.8-1.1,2.5l0,0c0,0,0,0,0,0.1c0,0.1-0.1,0.2-0.1,0.2c0,0.3,0.2,0.5,0.5,0.5c0.1,0,0.1,0,0.2,0' + 'c0,0,0,0,0.1-0.1s1.8-2.4,1.8-2.4l0.1-0.1c0,0,0,2.6,0,5l0.1,3.2c0,0,0,0,0,0c0,0.2,0.1,0.3,0.1,0.5c0.2,0.4,0.6,0.6,1,0.6l0.2,0' + 'l5.2,0h0.3c0.4,0,0.7-0.4,0.8-0.7c0,0,0-0.2,0-0.5c0-0.2,0-4.8,0-4.8s2.7,0.5,4.7,0.5s4.7-0.5,4.7-0.5l0,4.8' + 'c0,1.2,1.1,1.2,1.1,1.2l0.2,0l5.3,0h0.3c0.4,0,0.7-0.4,0.8-0.7c0,0,0-0.2,0-0.5c0-0.2,0-4.8,0-4.8l0-3c0,0,0-0.1,0-0.1' + 'c0-1.3,1-2.3,2.3-2.3c0.3,0,0.5,0,0.7,0.1l0,0c0,0,0,0.1,0,0.1c0,1,0.7,1.8,1.6,2c0.2,0,0.3,0.1,0.5,0.1c0.2,0,0.3,0,0.5,0' + 'C72.5,63.4,72.9,63.3,73.5,63z"/>' + '<path fill="#D8D9D9" d="M72.9,44.8l-0.1-0.1c-1.5-0.7-4.8-0.8-8.4-0.2l-2.4,0.5c0,0-1,0.2-2.6,0.9c-1.4,0.6-2.4,2.6-2.4,4.3' + 'c0,0.6,0.1,1.2,0.4,1.8l5.1,8.7c0.4,0.7,1.1,1.1,1.9,1.1c1.2,0,2.2-1,2.2-2.2"/>' + '</g>' + '<g id="BM_x5F_Logo" class="loading-icon show-icon">' + '<path display="inline" fill="#8BC04C" d="M72,62.1c0,0.3,0.2,1.6,0,3C72,66,71.4,67,70.8,67.1l0,0c-0.2,0-0.4-0.1-0.4-0.3l0,0' + 'c-0.2-0.4-0.6-0.6-1-0.6c-0.6,0-1.1,0.5-1.1,1.1c0,0.3,0.1,0.6,0.3,0.8l0,0c0.8,0.8,1.8,1.2,3,1.2c2,0,3.7-1.4,4.1-3.3l0-0.1' + 'c0.3-1.4,0.4-11.2,0.4-14.5v-0.1c0-0.5,0-0.9,0-1c0-0.1,0-0.1,0-0.2c-0.3-2.7-2.1-4.9-4.5-5.9l-0.1-0.1c-1.5-0.7-4.6-0.8-8.2-0.2' + 'l-2.4,0.5c-0.1,0-0.2-0.1-0.3-0.1l-0.3-0.1c-3.3-1-10-0.5-10-0.5c-9.7,0.9-9.9,8.3-9.9,8.3c0,0.4-0.3,6.5-0.3,6.5L40,60.2' + 'c0,0,0,0.5-0.1,1.4c-0.1,0.9-0.4,1.8-1,2.4l0,0c0,0,0,0,0,0.1c0,0.1-0.1,0.2-0.1,0.2c0,0.3,0.2,0.5,0.5,0.5c0.1,0,0.1,0,0.2,0' + 'c0,0,0,0,0.1-0.1c0,0,1.8-2.4,1.8-2.4l0.1-0.1c0,0,0,2.5,0,4.9l0.1,3.2c0,0,0,0,0,0c0,0.2,0.1,0.3,0.1,0.5c0.2,0.4,0.5,0.6,1,0.6' + 'l0.2,0l5,0h0.3c0.4,0,0.7-0.4,0.7-0.7c0,0,0-0.2,0-0.4c0-0.2,0-4.7,0-4.7s2.6,0.5,4.6,0.5c2,0,4.6-0.5,4.6-0.5l0,4.7' + 'c0,1.2,1.1,1.1,1.1,1.1l0.2,0l5.1,0h0.3c0.4,0,0.7-0.4,0.7-0.7c0,0,0-0.2,0-0.4c0-0.2,0-4.7,0-4.7l0-3c0,0,0-0.1,0-0.1' + 'c0-1.2,1-2.3,2.3-2.3c0.2,0,0.5,0,0.7,0.1l0,0c0,0,0,0.1,0,0.1c0,1,0.7,1.8,1.6,2c0.2,0,0.3,0.1,0.5,0.1c0.2,0,0.3,0,0.4,0' + 'C71.1,62.4,71.5,62.4,72,62.1z"/>' + '<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="69.6185" y1="51.6438" x2="54.2153" y2="53.8182">' + '<stop  offset="0" style="stop-color:#629A41;stop-opacity:0"/>' + '<stop  offset="0.3917" style="stop-color:#629A41;stop-opacity:0.3"/>' + '<stop  offset="1" style="stop-color:#629A41"/>' + '</linearGradient>' + '<path display="inline" fill="url(#SVGID_1_)" d="M71.5,44.4l-0.1-0.1c-1.5-0.7-4.6-0.8-8.2-0.2l-2.4,0.5c0,0-1,0.2-2.6,0.9' + 'c-1.4,0.6-2.3,2.5-2.3,4.2c0,0.6,0.1,1.2,0.4,1.7l5,8.5c0.4,0.7,1.1,1.1,1.9,1.1c1.2,0,2.2-1,2.2-2.2"/>' + '<circle display="inline" fill="#FFFFFF" cx="69.5" cy="55.7" r="0.4"/>' + '</g>' + '</g>' + '</svg>' + '<svg id="bm-loader" class="spinner-container-complete" width="160px" height="160px" viewBox="0 0 52 52">' + '<circle class="path" cx="26px" cy="26px" r="20px" fill="none" stroke-width="3.3px"></circle>' + '</svg>' + '</div>' + '<h1 id="bmalert-title" class="bmalert-title">Seguro?</h1>' + '<div id="bmalert-btns">' + '<button id="bmalert-cancel" class="bmalert-cancel">Si</button>' + '<button id="bmalert-confirm" class="bmalert-confirm">No</button>' + '</div' + '</div>';
	    var bmalertWrap = document.createElement('div');
	    bmalertWrap.className = window.bmalertClasses.modal;
	
	    bmalertWrap.innerHTML = bmalertHTML;
	
	    document.body.appendChild(bmalertWrap);
	  };
	
	  /**
	   * Set default params for each popup
	   * @param {Object} userParams
	   */
	  window.bmalert.setDefaults = function (userParams) {
	    if (!userParams) {
	      throw new Error('userParams is required');
	    }
	    if (typeof userParams !== 'object') {
	      throw new Error('userParams has to be a object');
	    }
	    extend(defaultParams, userParams);
	  };
	
	  /*
	   * If library is injected after page has loaded
	   */
	  (function () {
	    if (document.readyState === 'complete' || document.readyState === 'interactive' && document.body) {
	      window.bmalert.init();
	    } else {
	      if (document.addEventListener) {
	        document.addEventListener('DOMContentLoaded', function onDomContentLoaded() {
	          document.removeEventListener('DOMContentLoaded', onDomContentLoaded, false);
	          window.bmalert.init();
	        }, false);
	      } else {
	        if (document.attachEvent) {
	          document.attachEvent('onreadystatechange', function onReadyStateChange() {
	            if (document.readyState === 'complete') {
	              document.detachEvent('onreadystatechange', onReadyStateChange);
	              window.bmalert.init();
	            }
	          });
	        }
	      }
	    }
	  })();
	})(window, document);

/***/ }
/******/ ]);
//# sourceMappingURL=bmalert.js.map