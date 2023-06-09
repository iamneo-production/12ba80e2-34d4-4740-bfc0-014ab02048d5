(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ 2:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/coder/project/workspace/angularapp/src/styles.css */"OmL/");


/***/ }),

/***/ "JPst":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "LboF":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "OmL/":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--12-1!../node_modules/postcss-loader/src??embedded!./styles.css */ "W9N5");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "W9N5":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--12-1!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "JPst");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* You can add global styles to this file, and also import other style files */\r\n/* based on angular-toastr css https://github.com/Foxandxss/angular-toastr/blob/cb508fe6801d6b288d3afc525bb40fee1b101650/dist/angular-toastr.css */\r\n/* position */\r\nbody,html{\r\n  background-color: #d4d2d5;\r\n  background-image: url(\"data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M81.28 88H68.413l19.298 19.298L81.28 88zm2.107 0h13.226L90 107.838 83.387 88zm15.334 0h12.866l-19.298 19.298L98.72 88zm-32.927-2.207L73.586 78h32.827l.5.5 7.294 7.293L115.414 87l-24.707 24.707-.707.707L64.586 87l1.207-1.207zm2.62.207L74 80.414 79.586 86H68.414zm16 0L90 80.414 95.586 86H84.414zm16 0L106 80.414 111.586 86h-11.172zm-8-6h11.173L98 85.586 92.414 80zM82 85.586L87.586 80H76.414L82 85.586zM17.414 0L.707 16.707 0 17.414V0h17.414zM4.28 0L0 12.838V0h4.28zm10.306 0L2.288 12.298 6.388 0h8.198zM180 17.414L162.586 0H180v17.414zM165.414 0l12.298 12.298L173.612 0h-8.198zM180 12.838L175.72 0H180v12.838zM0 163h16.413l.5.5 7.294 7.293L25.414 172l-8 8H0v-17zm0 10h6.613l-2.334 7H0v-7zm14.586 7l7-7H8.72l-2.333 7h8.2zM0 165.414L5.586 171H0v-5.586zM10.414 171L16 165.414 21.586 171H10.414zm-8-6h11.172L8 170.586 2.414 165zM180 163h-16.413l-7.794 7.793-1.207 1.207 8 8H180v-17zm-14.586 17l-7-7h12.865l2.333 7h-8.2zM180 173h-6.613l2.334 7H180v-7zm-21.586-2l5.586-5.586 5.586 5.586h-11.172zM180 165.414L174.414 171H180v-5.586zm-8 5.172l5.586-5.586h-11.172l5.586 5.586zM152.933 25.653l1.414 1.414-33.94 33.942-1.416-1.416 33.943-33.94zm1.414 127.28l-1.414 1.414-33.942-33.94 1.416-1.416 33.94 33.943zm-127.28 1.414l-1.414-1.414 33.94-33.942 1.416 1.416-33.943 33.94zm-1.414-127.28l1.414-1.414 33.942 33.94-1.416 1.416-33.94-33.943zM0 85c2.21 0 4 1.79 4 4s-1.79 4-4 4v-8zm180 0c-2.21 0-4 1.79-4 4s1.79 4 4 4v-8zM94 0c0 2.21-1.79 4-4 4s-4-1.79-4-4h8zm0 180c0-2.21-1.79-4-4-4s-4 1.79-4 4h8z' fill='%23575659' fill-opacity='0.12' fill-rule='evenodd'/%3E%3C/svg%3E\");\r\n    height: 100%;   \r\n}\r\n.toast-center-center {\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n}\r\n.toast-top-center {\r\n  top: 0;\r\n  right: 0;\r\n  width: 100%;\r\n}\r\n.toast-bottom-center {\r\n  bottom: 0;\r\n  right: 0;\r\n  width: 100%;\r\n}\r\n.toast-top-full-width {\r\n  top: 0;\r\n  right: 0;\r\n  width: 100%;\r\n}\r\n.toast-bottom-full-width {\r\n  bottom: 0;\r\n  right: 0;\r\n  width: 100%;\r\n}\r\n.toast-top-left {\r\n  top: 12px;\r\n  left: 12px;\r\n}\r\n.toast-top-right {\r\n  top: 12px;\r\n  right: 12px;\r\n}\r\n.toast-bottom-right {\r\n  right: 12px;\r\n  bottom: 12px;\r\n}\r\n.toast-bottom-left {\r\n  bottom: 12px;\r\n  left: 12px;\r\n}\r\n/* toast styles */\r\n.toast-title {\r\n  font-weight: bold;\r\n}\r\n.toast-message {\r\n  word-wrap: break-word;\r\n}\r\n.toast-message a,\r\n.toast-message label {\r\n  color: #ffffff;\r\n}\r\n.toast-message a:hover {\r\n  color: #cccccc;\r\n  text-decoration: none;\r\n}\r\n.toast-close-button {\r\n  position: relative;\r\n  right: -0.3em;\r\n  top: -0.3em;\r\n  float: right;\r\n  font-size: 20px;\r\n  font-weight: bold;\r\n  color: #ffffff;\r\n  text-shadow: 0 1px 0 #ffffff;\r\n  /* opacity: 0.8; */\r\n}\r\n.toast-close-button:hover,\r\n.toast-close-button:focus {\r\n  color: #000000;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n  opacity: 0.4;\r\n}\r\n/*Additional properties for button version\r\n   iOS requires the button element instead of an anchor tag.\r\n   If you want the anchor version, it requires `href=\"#\"`.*/\r\nbutton.toast-close-button {\r\n  padding: 0;\r\n  cursor: pointer;\r\n  background: transparent;\r\n  border: 0;\r\n}\r\n.toast-container {\r\n  pointer-events: none;\r\n  position: fixed;\r\n  z-index: 999999;\r\n}\r\n.toast-container * {\r\n  box-sizing: border-box;\r\n}\r\n.toast-container .ngx-toastr {\r\n  position: relative;\r\n  overflow: hidden;\r\n  margin: 0 0 6px;\r\n  padding: 15px 15px 15px 50px;\r\n  width: 300px;\r\n  border-radius: 3px 3px 3px 3px;\r\n  background-position: 15px center;\r\n  background-repeat: no-repeat;\r\n  background-size: 24px;\r\n  box-shadow: 0 0 12px #999999;\r\n  color: #ffffff;\r\n}\r\n.toast-container .ngx-toastr:hover {\r\n  box-shadow: 0 0 12px #000000;\r\n  opacity: 1;\r\n  cursor: pointer;\r\n}\r\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/info-circle.svg */\r\n.toast-info {\r\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1MTIgNTEyJyB3aWR0aD0nNTEyJyBoZWlnaHQ9JzUxMic+PHBhdGggZmlsbD0ncmdiKDI1NSwyNTUsMjU1KScgZD0nTTI1NiA4QzExOS4wNDMgOCA4IDExOS4wODMgOCAyNTZjMCAxMzYuOTk3IDExMS4wNDMgMjQ4IDI0OCAyNDhzMjQ4LTExMS4wMDMgMjQ4LTI0OEM1MDQgMTE5LjA4MyAzOTIuOTU3IDggMjU2IDh6bTAgMTEwYzIzLjE5NiAwIDQyIDE4LjgwNCA0MiA0MnMtMTguODA0IDQyLTQyIDQyLTQyLTE4LjgwNC00Mi00MiAxOC44MDQtNDIgNDItNDJ6bTU2IDI1NGMwIDYuNjI3LTUuMzczIDEyLTEyIDEyaC04OGMtNi42MjcgMC0xMi01LjM3My0xMi0xMnYtMjRjMC02LjYyNyA1LjM3My0xMiAxMi0xMmgxMnYtNjRoLTEyYy02LjYyNyAwLTEyLTUuMzczLTEyLTEydi0yNGMwLTYuNjI3IDUuMzczLTEyIDEyLTEyaDY0YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJ2MTAwaDEyYzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJ2MjR6Jy8+PC9zdmc+\");\r\n}\r\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/times-circle.svg */\r\n.toast-error {\r\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1MTIgNTEyJyB3aWR0aD0nNTEyJyBoZWlnaHQ9JzUxMic+PHBhdGggZmlsbD0ncmdiKDI1NSwyNTUsMjU1KScgZD0nTTI1NiA4QzExOSA4IDggMTE5IDggMjU2czExMSAyNDggMjQ4IDI0OCAyNDgtMTExIDI0OC0yNDhTMzkzIDggMjU2IDh6bTEyMS42IDMxMy4xYzQuNyA0LjcgNC43IDEyLjMgMCAxN0wzMzggMzc3LjZjLTQuNyA0LjctMTIuMyA0LjctMTcgMEwyNTYgMzEybC02NS4xIDY1LjZjLTQuNyA0LjctMTIuMyA0LjctMTcgMEwxMzQuNCAzMzhjLTQuNy00LjctNC43LTEyLjMgMC0xN2w2NS42LTY1LTY1LjYtNjUuMWMtNC43LTQuNy00LjctMTIuMyAwLTE3bDM5LjYtMzkuNmM0LjctNC43IDEyLjMtNC43IDE3IDBsNjUgNjUuNyA2NS4xLTY1LjZjNC43LTQuNyAxMi4zLTQuNyAxNyAwbDM5LjYgMzkuNmM0LjcgNC43IDQuNyAxMi4zIDAgMTdMMzEyIDI1Nmw2NS42IDY1LjF6Jy8+PC9zdmc+\");\r\n}\r\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/check.svg */\r\n.toast-success {\r\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1MTIgNTEyJyB3aWR0aD0nNTEyJyBoZWlnaHQ9JzUxMic+PHBhdGggZmlsbD0ncmdiKDI1NSwyNTUsMjU1KScgZD0nTTE3My44OTggNDM5LjQwNGwtMTY2LjQtMTY2LjRjLTkuOTk3LTkuOTk3LTkuOTk3LTI2LjIwNiAwLTM2LjIwNGwzNi4yMDMtMzYuMjA0YzkuOTk3LTkuOTk4IDI2LjIwNy05Ljk5OCAzNi4yMDQgMEwxOTIgMzEyLjY5IDQzMi4wOTUgNzIuNTk2YzkuOTk3LTkuOTk3IDI2LjIwNy05Ljk5NyAzNi4yMDQgMGwzNi4yMDMgMzYuMjA0YzkuOTk3IDkuOTk3IDkuOTk3IDI2LjIwNiAwIDM2LjIwNGwtMjk0LjQgMjk0LjQwMWMtOS45OTggOS45OTctMjYuMjA3IDkuOTk3LTM2LjIwNC0uMDAxeicvPjwvc3ZnPg==\");\r\n}\r\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/exclamation-triangle.svg */\r\n.toast-warning {\r\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1NzYgNTEyJyB3aWR0aD0nNTc2JyBoZWlnaHQ9JzUxMic+PHBhdGggZmlsbD0ncmdiKDI1NSwyNTUsMjU1KScgZD0nTTU2OS41MTcgNDQwLjAxM0M1ODcuOTc1IDQ3Mi4wMDcgNTY0LjgwNiA1MTIgNTI3Ljk0IDUxMkg0OC4wNTRjLTM2LjkzNyAwLTU5Ljk5OS00MC4wNTUtNDEuNTc3LTcxLjk4N0wyNDYuNDIzIDIzLjk4NWMxOC40NjctMzIuMDA5IDY0LjcyLTMxLjk1MSA4My4xNTQgMGwyMzkuOTQgNDE2LjAyOHpNMjg4IDM1NGMtMjUuNDA1IDAtNDYgMjAuNTk1LTQ2IDQ2czIwLjU5NSA0NiA0NiA0NiA0Ni0yMC41OTUgNDYtNDYtMjAuNTk1LTQ2LTQ2LTQ2em0tNDMuNjczLTE2NS4zNDZsNy40MTggMTM2Yy4zNDcgNi4zNjQgNS42MDkgMTEuMzQ2IDExLjk4MiAxMS4zNDZoNDguNTQ2YzYuMzczIDAgMTEuNjM1LTQuOTgyIDExLjk4Mi0xMS4zNDZsNy40MTgtMTM2Yy4zNzUtNi44NzQtNS4wOTgtMTIuNjU0LTExLjk4Mi0xMi42NTRoLTYzLjM4M2MtNi44ODQgMC0xMi4zNTYgNS43OC0xMS45ODEgMTIuNjU0eicvPjwvc3ZnPg==\");\r\n}\r\n.toast-container.toast-top-center .ngx-toastr,\r\n.toast-container.toast-bottom-center .ngx-toastr {\r\n  width: 300px;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n.toast-container.toast-top-full-width .ngx-toastr,\r\n.toast-container.toast-bottom-full-width .ngx-toastr {\r\n  width: 96%;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n.ngx-toastr {\r\n  background-color: #030303;\r\n  pointer-events: auto;\r\n}\r\n.toast-success {\r\n  background-color: #51a351;\r\n}\r\n.toast-error {\r\n  background-color: #bd362f;\r\n}\r\n.toast-info {\r\n  background-color: #2f96b4;\r\n}\r\n.toast-warning {\r\n  background-color: #f89406;\r\n}\r\n.toast-progress {\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  height: 4px;\r\n  background-color: #000000;\r\n  opacity: 0.4;\r\n}\r\n/* Responsive Design */\r\n@media all and (max-width: 240px) {\r\n  .toast-container .ngx-toastr.div {\r\n    padding: 8px 8px 8px 50px;\r\n    width: 11em;\r\n  }\r\n  .toast-container .toast-close-button {\r\n    right: -0.2em;\r\n    top: -0.2em;\r\n  }\r\n}\r\n@media all and (min-width: 241px) and (max-width: 480px) {\r\n  .toast-container .ngx-toastr.div {\r\n    padding: 8px 8px 8px 50px;\r\n    width: 18em;\r\n  }\r\n  .toast-container .toast-close-button {\r\n    right: -0.2em;\r\n    top: -0.2em;\r\n  }\r\n}\r\n@media all and (min-width: 481px) and (max-width: 768px) {\r\n  .toast-container .ngx-toastr.div {\r\n    padding: 15px 15px 15px 50px;\r\n    width: 25em;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://src/styles.css"],"names":[],"mappings":"AAAA,8EAA8E;AAC9E,kJAAkJ;AAElJ,aAAa;AACb;EACE,yBAAyB;EACzB,uqDAAuqD;IACrqD,YAAY;AAChB;AAEA;EACE,QAAQ;EACR,SAAS;EACT,gCAAgC;AAClC;AACA;EACE,MAAM;EACN,QAAQ;EACR,WAAW;AACb;AACA;EACE,SAAS;EACT,QAAQ;EACR,WAAW;AACb;AACA;EACE,MAAM;EACN,QAAQ;EACR,WAAW;AACb;AACA;EACE,SAAS;EACT,QAAQ;EACR,WAAW;AACb;AACA;EACE,SAAS;EACT,UAAU;AACZ;AACA;EACE,SAAS;EACT,WAAW;AACb;AACA;EACE,WAAW;EACX,YAAY;AACd;AACA;EACE,YAAY;EACZ,UAAU;AACZ;AAEA,iBAAiB;AACjB;EACE,iBAAiB;AACnB;AACA;EACE,qBAAqB;AACvB;AACA;;EAEE,cAAc;AAChB;AACA;EACE,cAAc;EACd,qBAAqB;AACvB;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,WAAW;EACX,YAAY;EACZ,eAAe;EACf,iBAAiB;EACjB,cAAc;EACd,4BAA4B;EAC5B,kBAAkB;AACpB;AACA;;EAEE,cAAc;EACd,qBAAqB;EACrB,eAAe;EACf,YAAY;AACd;AACA;;2DAE2D;AAC3D;EACE,UAAU;EACV,eAAe;EACf,uBAAuB;EACvB,SAAS;AACX;AACA;EACE,oBAAoB;EACpB,eAAe;EACf,eAAe;AACjB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,4BAA4B;EAC5B,YAAY;EACZ,8BAA8B;EAC9B,gCAAgC;EAChC,4BAA4B;EAC5B,qBAAqB;EACrB,4BAA4B;EAC5B,cAAc;AAChB;AACA;EACE,4BAA4B;EAC5B,UAAU;EACV,eAAe;AACjB;AACA,iHAAiH;AACjH;EACE,mvBAAmvB;AACrvB;AACA,kHAAkH;AAClH;EACE,mtBAAmtB;AACrtB;AACA,2GAA2G;AAC3G;EACE,+kBAA+kB;AACjlB;AACA,0HAA0H;AAC1H;EACE,uzBAAuzB;AACzzB;AACA;;EAEE,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;AACpB;AACA;;EAEE,UAAU;EACV,iBAAiB;EACjB,kBAAkB;AACpB;AACA;EACE,yBAAyB;EACzB,oBAAoB;AACtB;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,kBAAkB;EAClB,OAAO;EACP,SAAS;EACT,WAAW;EACX,yBAAyB;EACzB,YAAY;AACd;AACA,sBAAsB;AACtB;EACE;IACE,yBAAyB;IACzB,WAAW;EACb;EACA;IACE,aAAa;IACb,WAAW;EACb;AACF;AACA;EACE;IACE,yBAAyB;IACzB,WAAW;EACb;EACA;IACE,aAAa;IACb,WAAW;EACb;AACF;AACA;EACE;IACE,4BAA4B;IAC5B,WAAW;EACb;AACF","sourcesContent":["/* You can add global styles to this file, and also import other style files */\r\n/* based on angular-toastr css https://github.com/Foxandxss/angular-toastr/blob/cb508fe6801d6b288d3afc525bb40fee1b101650/dist/angular-toastr.css */\r\n\r\n/* position */\r\nbody,html{\r\n  background-color: #d4d2d5;\r\n  background-image: url(\"data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M81.28 88H68.413l19.298 19.298L81.28 88zm2.107 0h13.226L90 107.838 83.387 88zm15.334 0h12.866l-19.298 19.298L98.72 88zm-32.927-2.207L73.586 78h32.827l.5.5 7.294 7.293L115.414 87l-24.707 24.707-.707.707L64.586 87l1.207-1.207zm2.62.207L74 80.414 79.586 86H68.414zm16 0L90 80.414 95.586 86H84.414zm16 0L106 80.414 111.586 86h-11.172zm-8-6h11.173L98 85.586 92.414 80zM82 85.586L87.586 80H76.414L82 85.586zM17.414 0L.707 16.707 0 17.414V0h17.414zM4.28 0L0 12.838V0h4.28zm10.306 0L2.288 12.298 6.388 0h8.198zM180 17.414L162.586 0H180v17.414zM165.414 0l12.298 12.298L173.612 0h-8.198zM180 12.838L175.72 0H180v12.838zM0 163h16.413l.5.5 7.294 7.293L25.414 172l-8 8H0v-17zm0 10h6.613l-2.334 7H0v-7zm14.586 7l7-7H8.72l-2.333 7h8.2zM0 165.414L5.586 171H0v-5.586zM10.414 171L16 165.414 21.586 171H10.414zm-8-6h11.172L8 170.586 2.414 165zM180 163h-16.413l-7.794 7.793-1.207 1.207 8 8H180v-17zm-14.586 17l-7-7h12.865l2.333 7h-8.2zM180 173h-6.613l2.334 7H180v-7zm-21.586-2l5.586-5.586 5.586 5.586h-11.172zM180 165.414L174.414 171H180v-5.586zm-8 5.172l5.586-5.586h-11.172l5.586 5.586zM152.933 25.653l1.414 1.414-33.94 33.942-1.416-1.416 33.943-33.94zm1.414 127.28l-1.414 1.414-33.942-33.94 1.416-1.416 33.94 33.943zm-127.28 1.414l-1.414-1.414 33.94-33.942 1.416 1.416-33.943 33.94zm-1.414-127.28l1.414-1.414 33.942 33.94-1.416 1.416-33.94-33.943zM0 85c2.21 0 4 1.79 4 4s-1.79 4-4 4v-8zm180 0c-2.21 0-4 1.79-4 4s1.79 4 4 4v-8zM94 0c0 2.21-1.79 4-4 4s-4-1.79-4-4h8zm0 180c0-2.21-1.79-4-4-4s-4 1.79-4 4h8z' fill='%23575659' fill-opacity='0.12' fill-rule='evenodd'/%3E%3C/svg%3E\");\r\n    height: 100%;   \r\n}\r\n\r\n.toast-center-center {\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n}\r\n.toast-top-center {\r\n  top: 0;\r\n  right: 0;\r\n  width: 100%;\r\n}\r\n.toast-bottom-center {\r\n  bottom: 0;\r\n  right: 0;\r\n  width: 100%;\r\n}\r\n.toast-top-full-width {\r\n  top: 0;\r\n  right: 0;\r\n  width: 100%;\r\n}\r\n.toast-bottom-full-width {\r\n  bottom: 0;\r\n  right: 0;\r\n  width: 100%;\r\n}\r\n.toast-top-left {\r\n  top: 12px;\r\n  left: 12px;\r\n}\r\n.toast-top-right {\r\n  top: 12px;\r\n  right: 12px;\r\n}\r\n.toast-bottom-right {\r\n  right: 12px;\r\n  bottom: 12px;\r\n}\r\n.toast-bottom-left {\r\n  bottom: 12px;\r\n  left: 12px;\r\n}\r\n\r\n/* toast styles */\r\n.toast-title {\r\n  font-weight: bold;\r\n}\r\n.toast-message {\r\n  word-wrap: break-word;\r\n}\r\n.toast-message a,\r\n.toast-message label {\r\n  color: #ffffff;\r\n}\r\n.toast-message a:hover {\r\n  color: #cccccc;\r\n  text-decoration: none;\r\n}\r\n.toast-close-button {\r\n  position: relative;\r\n  right: -0.3em;\r\n  top: -0.3em;\r\n  float: right;\r\n  font-size: 20px;\r\n  font-weight: bold;\r\n  color: #ffffff;\r\n  text-shadow: 0 1px 0 #ffffff;\r\n  /* opacity: 0.8; */\r\n}\r\n.toast-close-button:hover,\r\n.toast-close-button:focus {\r\n  color: #000000;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n  opacity: 0.4;\r\n}\r\n/*Additional properties for button version\r\n   iOS requires the button element instead of an anchor tag.\r\n   If you want the anchor version, it requires `href=\"#\"`.*/\r\nbutton.toast-close-button {\r\n  padding: 0;\r\n  cursor: pointer;\r\n  background: transparent;\r\n  border: 0;\r\n}\r\n.toast-container {\r\n  pointer-events: none;\r\n  position: fixed;\r\n  z-index: 999999;\r\n}\r\n.toast-container * {\r\n  box-sizing: border-box;\r\n}\r\n.toast-container .ngx-toastr {\r\n  position: relative;\r\n  overflow: hidden;\r\n  margin: 0 0 6px;\r\n  padding: 15px 15px 15px 50px;\r\n  width: 300px;\r\n  border-radius: 3px 3px 3px 3px;\r\n  background-position: 15px center;\r\n  background-repeat: no-repeat;\r\n  background-size: 24px;\r\n  box-shadow: 0 0 12px #999999;\r\n  color: #ffffff;\r\n}\r\n.toast-container .ngx-toastr:hover {\r\n  box-shadow: 0 0 12px #000000;\r\n  opacity: 1;\r\n  cursor: pointer;\r\n}\r\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/info-circle.svg */\r\n.toast-info {\r\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1MTIgNTEyJyB3aWR0aD0nNTEyJyBoZWlnaHQ9JzUxMic+PHBhdGggZmlsbD0ncmdiKDI1NSwyNTUsMjU1KScgZD0nTTI1NiA4QzExOS4wNDMgOCA4IDExOS4wODMgOCAyNTZjMCAxMzYuOTk3IDExMS4wNDMgMjQ4IDI0OCAyNDhzMjQ4LTExMS4wMDMgMjQ4LTI0OEM1MDQgMTE5LjA4MyAzOTIuOTU3IDggMjU2IDh6bTAgMTEwYzIzLjE5NiAwIDQyIDE4LjgwNCA0MiA0MnMtMTguODA0IDQyLTQyIDQyLTQyLTE4LjgwNC00Mi00MiAxOC44MDQtNDIgNDItNDJ6bTU2IDI1NGMwIDYuNjI3LTUuMzczIDEyLTEyIDEyaC04OGMtNi42MjcgMC0xMi01LjM3My0xMi0xMnYtMjRjMC02LjYyNyA1LjM3My0xMiAxMi0xMmgxMnYtNjRoLTEyYy02LjYyNyAwLTEyLTUuMzczLTEyLTEydi0yNGMwLTYuNjI3IDUuMzczLTEyIDEyLTEyaDY0YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJ2MTAwaDEyYzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJ2MjR6Jy8+PC9zdmc+\");\r\n}\r\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/times-circle.svg */\r\n.toast-error {\r\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1MTIgNTEyJyB3aWR0aD0nNTEyJyBoZWlnaHQ9JzUxMic+PHBhdGggZmlsbD0ncmdiKDI1NSwyNTUsMjU1KScgZD0nTTI1NiA4QzExOSA4IDggMTE5IDggMjU2czExMSAyNDggMjQ4IDI0OCAyNDgtMTExIDI0OC0yNDhTMzkzIDggMjU2IDh6bTEyMS42IDMxMy4xYzQuNyA0LjcgNC43IDEyLjMgMCAxN0wzMzggMzc3LjZjLTQuNyA0LjctMTIuMyA0LjctMTcgMEwyNTYgMzEybC02NS4xIDY1LjZjLTQuNyA0LjctMTIuMyA0LjctMTcgMEwxMzQuNCAzMzhjLTQuNy00LjctNC43LTEyLjMgMC0xN2w2NS42LTY1LTY1LjYtNjUuMWMtNC43LTQuNy00LjctMTIuMyAwLTE3bDM5LjYtMzkuNmM0LjctNC43IDEyLjMtNC43IDE3IDBsNjUgNjUuNyA2NS4xLTY1LjZjNC43LTQuNyAxMi4zLTQuNyAxNyAwbDM5LjYgMzkuNmM0LjcgNC43IDQuNyAxMi4zIDAgMTdMMzEyIDI1Nmw2NS42IDY1LjF6Jy8+PC9zdmc+\");\r\n}\r\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/check.svg */\r\n.toast-success {\r\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1MTIgNTEyJyB3aWR0aD0nNTEyJyBoZWlnaHQ9JzUxMic+PHBhdGggZmlsbD0ncmdiKDI1NSwyNTUsMjU1KScgZD0nTTE3My44OTggNDM5LjQwNGwtMTY2LjQtMTY2LjRjLTkuOTk3LTkuOTk3LTkuOTk3LTI2LjIwNiAwLTM2LjIwNGwzNi4yMDMtMzYuMjA0YzkuOTk3LTkuOTk4IDI2LjIwNy05Ljk5OCAzNi4yMDQgMEwxOTIgMzEyLjY5IDQzMi4wOTUgNzIuNTk2YzkuOTk3LTkuOTk3IDI2LjIwNy05Ljk5NyAzNi4yMDQgMGwzNi4yMDMgMzYuMjA0YzkuOTk3IDkuOTk3IDkuOTk3IDI2LjIwNiAwIDM2LjIwNGwtMjk0LjQgMjk0LjQwMWMtOS45OTggOS45OTctMjYuMjA3IDkuOTk3LTM2LjIwNC0uMDAxeicvPjwvc3ZnPg==\");\r\n}\r\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/exclamation-triangle.svg */\r\n.toast-warning {\r\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1NzYgNTEyJyB3aWR0aD0nNTc2JyBoZWlnaHQ9JzUxMic+PHBhdGggZmlsbD0ncmdiKDI1NSwyNTUsMjU1KScgZD0nTTU2OS41MTcgNDQwLjAxM0M1ODcuOTc1IDQ3Mi4wMDcgNTY0LjgwNiA1MTIgNTI3Ljk0IDUxMkg0OC4wNTRjLTM2LjkzNyAwLTU5Ljk5OS00MC4wNTUtNDEuNTc3LTcxLjk4N0wyNDYuNDIzIDIzLjk4NWMxOC40NjctMzIuMDA5IDY0LjcyLTMxLjk1MSA4My4xNTQgMGwyMzkuOTQgNDE2LjAyOHpNMjg4IDM1NGMtMjUuNDA1IDAtNDYgMjAuNTk1LTQ2IDQ2czIwLjU5NSA0NiA0NiA0NiA0Ni0yMC41OTUgNDYtNDYtMjAuNTk1LTQ2LTQ2LTQ2em0tNDMuNjczLTE2NS4zNDZsNy40MTggMTM2Yy4zNDcgNi4zNjQgNS42MDkgMTEuMzQ2IDExLjk4MiAxMS4zNDZoNDguNTQ2YzYuMzczIDAgMTEuNjM1LTQuOTgyIDExLjk4Mi0xMS4zNDZsNy40MTgtMTM2Yy4zNzUtNi44NzQtNS4wOTgtMTIuNjU0LTExLjk4Mi0xMi42NTRoLTYzLjM4M2MtNi44ODQgMC0xMi4zNTYgNS43OC0xMS45ODEgMTIuNjU0eicvPjwvc3ZnPg==\");\r\n}\r\n.toast-container.toast-top-center .ngx-toastr,\r\n.toast-container.toast-bottom-center .ngx-toastr {\r\n  width: 300px;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n.toast-container.toast-top-full-width .ngx-toastr,\r\n.toast-container.toast-bottom-full-width .ngx-toastr {\r\n  width: 96%;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n.ngx-toastr {\r\n  background-color: #030303;\r\n  pointer-events: auto;\r\n}\r\n.toast-success {\r\n  background-color: #51a351;\r\n}\r\n.toast-error {\r\n  background-color: #bd362f;\r\n}\r\n.toast-info {\r\n  background-color: #2f96b4;\r\n}\r\n.toast-warning {\r\n  background-color: #f89406;\r\n}\r\n.toast-progress {\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  height: 4px;\r\n  background-color: #000000;\r\n  opacity: 0.4;\r\n}\r\n/* Responsive Design */\r\n@media all and (max-width: 240px) {\r\n  .toast-container .ngx-toastr.div {\r\n    padding: 8px 8px 8px 50px;\r\n    width: 11em;\r\n  }\r\n  .toast-container .toast-close-button {\r\n    right: -0.2em;\r\n    top: -0.2em;\r\n  }\r\n}\r\n@media all and (min-width: 241px) and (max-width: 480px) {\r\n  .toast-container .ngx-toastr.div {\r\n    padding: 8px 8px 8px 50px;\r\n    width: 18em;\r\n  }\r\n  .toast-container .toast-close-button {\r\n    right: -0.2em;\r\n    top: -0.2em;\r\n  }\r\n}\r\n@media all and (min-width: 481px) and (max-width: 768px) {\r\n  .toast-container .ngx-toastr.div {\r\n    padding: 15px 15px 15px 50px;\r\n    width: 25em;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map